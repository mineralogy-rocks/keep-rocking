import groupBy from 'just-group-by';

import { Formula, History } from '@/lib/interfaces';
import { mineralDetailApiResponse } from '@/lib/types';
import { HISTORY_DATA_MAP } from '@/lib/constants';


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

export const prepareCrystallography = (data: any) => {
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
}
