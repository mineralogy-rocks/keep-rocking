import clone from 'just-clone';
import groupBy from 'just-group-by';

import { Formula } from '@/lib/interfaces';
import { mineralDetailApiResponse } from '@/lib/types';
import { HISTORY_DATA_MAP, DATA_CONTEXT_STRUCTURE, PHYSICAL_DATA_CONTEXT_NAME } from '@/lib/constants';

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
        depth: item.depth,
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


const _createEmptyContext = () => ({
  PHYSICAL_DATA_CONTEXT_NAME: {
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
      key: PHYSICAL_DATA_CONTEXT_NAME,
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

  return conclusiveData;
};
