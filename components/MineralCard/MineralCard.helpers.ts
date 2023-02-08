import { Formula } from '@/lib/interfaces';

export const getRelevantFormula = (formulas: Formula[]) => {
  for (let formula_ of formulas) {
    if (formula_.show_on_site) return formula_.formula;
  }
  return null;
};
