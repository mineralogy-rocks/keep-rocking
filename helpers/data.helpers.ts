import groupBy from 'just-group-by';

import { Formula } from '@/lib/interfaces';
import { mineralDetailApiResponse } from '@/lib/types';


export const getMindatIds = (data: mineralDetailApiResponse) => {
  if (!data) return null;
  const { mindat_id } = data;
  const inheritedIds = data.inheritance_chain.map((item) => item.mindat_id);
  return [mindat_id, ...inheritedIds].filter((item) => item);
};


export const mergeFormulas = (formulas: Formula[], inheritanceChain) => {
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
  return _data;
};
