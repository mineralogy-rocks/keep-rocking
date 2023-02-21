import { Formula } from '@/lib/interfaces';

export const getRelevantFormula = (formulas: Formula[]) => {
  for (let formula_ of formulas) {
    if (formula_.show_on_site) return formula_.formula;
  }
  return null;
};

export const getRelationEndpoint = (statusGroupId: number) => {

  // TODO: This is a temporary solution. We should have a better way to
  // determine the endpoint for a relation.

  switch (statusGroupId) {
    case 11:
      return 'approved-minerals';
    case 2:
      return 'synonyms';
    case 3:
      return 'varieties';
    default:
      return '';
  }
}
