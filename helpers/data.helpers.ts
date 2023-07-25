import { mineralDetailApiResponse } from '@/lib/types';


export const getMindatIds = (data: mineralDetailApiResponse) => {
  if (!data) return null;
  const { mindat_id } = data;
  const inheritedIds = data.inheritance_chain.map((item) => item.mindat_id);
  return [mindat_id, ...inheritedIds].filter((item) => item);
};
