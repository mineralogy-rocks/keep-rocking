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


export const getConclusiveContext = (data) => {
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
          id: item.mineral,
          name: item.name,
          color: compareColors[_index].base,
          statuses: item.statuses,
        };
        conclusiveMindatData[prop.key].minerals.push(_item);

        Object.entries(_props).forEach(([key, value]) => {
          // flatten each key and find corresponding values in the data
          if (!conclusiveMindatData[prop.key].items[key]) conclusiveMindatData[prop.key].items[key] = [];

          // treat `color` and `streak` separately
          if (key === 'color' || key === 'streak') {
            value.forEach((v) => {
              let { primaryColor, entities } = v;
              let _existingItem = conclusiveMindatData[prop.key].items[key].find((item_) => {
                return item_.value === primaryColor;
              });
              if (_existingItem) {
                _existingItem.ids.push(item.mineral);
              } else {
                conclusiveMindatData[prop.key].items[key].push({ 'value': primaryColor, 'ids': [item.mineral] });
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
                _existingItem.ids.push(item.mineral);
              } else {
                conclusiveMindatData[prop.key].items[key].push({ 'value': v, 'ids': [item.mineral] });
              }
            });
          } else {
            let _existingItem = conclusiveMindatData[prop.key].items[key].find((item_) => {
              return item_.value === value;
            });
            if (_existingItem) {
              _existingItem.ids.push(item.mineral);
            } else {
              conclusiveMindatData[prop.key].items[key].push({ 'value': value, 'ids': [item.mineral] });
            }
          }
        });
      }
    });
  };
  return conclusiveMindatData;
};
