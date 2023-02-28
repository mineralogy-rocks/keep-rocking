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
  if (statusGroupId > 100) statusGroupId -= 100;

  switch (statusGroupId) {
    case 11:
      return 'approved-minerals';
    case 2:
      return 'synonyms';
    case 3:
      return 'varieties';
    case 20:
      return 'supergroups';
    case 19:
      return 'groups';
    case 18:
      return 'subgroups';
    case 17:
      return 'roots';
    case 16:
      return 'series';
    case 3:
      return 'varieties';
    default:
      return '';
  }
}
