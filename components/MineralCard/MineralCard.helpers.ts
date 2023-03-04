import { Formula } from '@/lib/interfaces';

export const getRelevantFormula = (formulas: Formula[]) => {
  for (let formula_ of formulas) {
    if (formula_.show_on_site) return formula_.formula;
  }
  return null;
};

export const getRelationEndpoint = (statusGroupId: number) => {
  // TODO: This is a temporary solution. We should have a better way to
  // determine the endpoint.
  if (statusGroupId > 100) statusGroupId -= 100;
  let _relationEndpoint = 'relations/';
  let _groupingEndpoint = 'grouping-members/';

  if ([2, 3, 11].includes(statusGroupId)) return _relationEndpoint + '?group=' + statusGroupId;
  else if ([20, 19, 18, 17, 16, 3].includes(statusGroupId)) return _groupingEndpoint + '?status=' + statusGroupId;
  else return '';
}
