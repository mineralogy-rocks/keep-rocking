import clone from 'just-clone';
import groupBy from 'just-group-by';

import { Formula } from '@/lib/interfaces';
import { mineralDetailApiResponse } from '@/lib/types';
import { HISTORY_DATA_MAP, DATA_CONTEXT_STRUCTURE } from '@/lib/constants';

import { capitalize, compareColors, getRange, getNumeric, concatStrings } from "@utils";


export const getMindatIds = (data: mineralDetailApiResponse) => {
  if (!data) return [];
  const { mindat_id } = data;
  const inheritedIds = data.inheritance_chain?.map((item) => item.mindat_id) || [];
  return [mindat_id, ...inheritedIds].filter((item) => item !== null && item !== undefined);
};


export const mergeFormulas = (formulas: Formula[], inheritanceChain=[]) => {
  let data = [...formulas];

  for (const item of inheritanceChain) {
    item.formulas.forEach((formula) => {
      formula['mineral'] = {
        id: item.id,
        name: item.name,
        slug: item.slug,
        statuses: item.statuses,
        depth: item.depth + 1,
      };
    });
    data = [...data, ...item.formulas];
  }

  let _data = groupBy(data, item => item.source.name);
  return data;
};


export const prepareHistory = (data: any) => {
  if (!data) return [];
  let _data = []
  data.map((item) => {
      Object.keys(item).forEach((key) => {
        if (key in HISTORY_DATA_MAP && item[key]) {
          _data.push({
            key: HISTORY_DATA_MAP[key],
            value: item[key],
          });
        }
      });
  });
  return _data;
};

export const parsePhysicalProperties = (data) => {
  if (!data) return null;
  const {
    color,
    colorNote,
    streak,
    streakNote,
    lustre,
    lustreNote,
    fracture,
    fractureNote,
    hardnessMin,
    hardnessMax,
    luminescence,
    tenacity,
    transparency,
    densityCalculated,
    densityMeasuredMin,
    densityMeasuredMax
  } = data;
  const _data = {
    color,
    colorNote,
    streak,
    streakNote,
    lustre,
    lustreNote,
    fracture,
    fractureNote,
    transparency,
    luminescence,
    tenacity,
    hardness: getRange(hardnessMin, hardnessMax),
    density: getRange(densityMeasuredMin, densityMeasuredMax),
    densityCalculated
  };

  let cleanData = _data;
  return cleanData;
};


export const _getConclusiveContext = (data) => {
  if (!data) return null;

  let conclusiveMindatData = {};
  let props = [
    {
      key: 'Physical properties',
      callback: parsePhysicalProperties,
    },
    // {
    //   key: 'Optical properties',
    //   callback: parseOpticalProperties,
    // },
  ];

  for (let prop of props) {
    conclusiveMindatData[prop.key] = clone(DATA_CONTEXT_STRUCTURE);
    let _index = -1;

    console.log(conclusiveMindatData)

    data.forEach((item) => {
      let _props = prop.callback(item.data);
      if (_props) {
        _index++;
        let _item = {
          color: compareColors[_index].base,
          ...item.mineral
        };
        conclusiveMindatData[prop.key].minerals.push(_item);

        Object.entries(_props).forEach(([key, value]) => {
          // flatten each key and find corresponding values in the data
          if (!conclusiveMindatData[prop.key].items[key]) conclusiveMindatData[prop.key].items[key] = [];

          // treat `color` and `streak` separately
          if (key === 'color' || key === 'streak') {
            if (!value) return;
            value.forEach((v) => {
              let { primaryColor, entities } = v;
              let _existingItem = conclusiveMindatData[prop.key].items[key].find((item_) => {
                return item_.value === primaryColor;
              });

              let children = entities.map((entity) => {
                return { ids: [item.mineral.id], value: entity};
              });
              if (_existingItem) {
                _existingItem.ids.push(item.mineral.id);
                _existingItem.children.forEach((child) => {
                  if (entities.includes(child.value)) {
                    child.ids.push(item.mineral.id);
                  } else {
                    entities.map((entity) => {
                      _existingItem.children.push({ ids: [item.mineral.id], value: entity});
                    });
                  }
                })

              } else {
                conclusiveMindatData[prop.key].items[key].push({
                  'value': primaryColor,
                  'ids': [item.mineral.id],
                  children: children
                });
              }
            });
            return;
          };


          if (Array.isArray(value)) {
            value.forEach((v) => {
              let _existingItem = conclusiveMindatData[prop.key].items[key].find((item_) => {
                return item_.value === v;
              });
              if (_existingItem) {
                _existingItem.ids.push(item.mineral.id);
              } else {
                conclusiveMindatData[prop.key].items[key].push({ 'value': v, 'ids': [item.mineral.id] });
              }
            });
          } else {
            let _existingItem = conclusiveMindatData[prop.key].items[key].find((item_) => {
              return item_.value === value;
            });
            if (_existingItem) {
              _existingItem.ids.push(item.mineral.id);
            } else {
              conclusiveMindatData[prop.key].items[key].push({ 'value': value, 'ids': [item.mineral.id] });
            }
          }
        });
      }
    });
  };
  return conclusiveMindatData;
};


const _createEmptyContext = () => ({
  'Physical properties': {
    minerals: [],
    items: {}
  },
  // Add more properties as needed
});

const _addMineralToContext = (context, prop, mineral) => {
  const { items, minerals } = context[prop];
  minerals.push({ color: compareColors[minerals.length].base, ...mineral });
  return { items, minerals };
};

const _addValueToItems = (items, key, value, mineralId) => {
  if (!items[key]) items[key] = [];

  if (key === 'color' || key === 'streak') {
    if (!value) return items;
    value.forEach((v) => {
      const { primaryColor, entities } = v;
      const existingItem = items[key].find((item) => item.value === primaryColor);

      const children = entities.map((entity) => ({ ids: [mineralId], value: entity }));

      if (existingItem) {
        existingItem.ids.push(mineralId);
        existingItem.children.forEach((child) => {
          if (entities.includes(child.value)) {
            child.ids.push(mineralId);
          } else {
            entities.forEach((entity) => {
              child.ids.push(mineralId);
              child.value = entity;
            });
          }
        });
      } else {
        items[key].push({ value: primaryColor, ids: [mineralId], children });
      }
    });
    return items;
  }

  if (Array.isArray(value)) {
    value.forEach((v) => {
      const existingItem = items[key].find((item) => item.value === v);
      if (existingItem) {
        existingItem.ids.push(mineralId);
      } else {
        items[key].push({ value: v, ids: [mineralId] });
      }
    });
  } else {
    const existingItem = items[key].find((item) => item.value === value);
    if (existingItem) {
      existingItem.ids.push(mineralId);
    } else {
      items[key].push({ value, ids: [mineralId] });
    }
  }
  return items;
};

export const getConclusiveContext = (data) => {
  if (!data) return null;

  const conclusiveData = _createEmptyContext();
  const props = [
    {
      key: 'Physical properties',
      callback: parsePhysicalProperties,
    },
    // Add more properties as needed
  ];

  props.forEach((prop) => {
    data.forEach((item) => {
      const props = prop.callback(item.data);
      if (props) {
        const { items, minerals } = _addMineralToContext(conclusiveData, prop.key, item.mineral);
        Object.entries(props).forEach(([key, value]) => {
          if (value) _addValueToItems(items, key, value, item.mineral.id);
        });
      }
    });
  });

  // console.log(conclusiveData)
  return conclusiveData;
};
