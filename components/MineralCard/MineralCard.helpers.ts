import { Formula } from '@/lib/interfaces';
import { STATUS_GROUPS_PLURAL } from '@/lib/constants';

export const getRelevantFormula = (formulas: Formula[]) => {
  const relevandFormula = formulas.find((formula) => formula.show_on_site);
  if (relevandFormula) return relevandFormula;
  return formulas[0];
};

export const getSelfOrInheritedProp = (mineral, prop) => {

}

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

export const getRelationDesignation = (statuses, group) => {
  const designation = { name: group.name, minerals: null };
  let _minerals = statuses.filter(_item => _item.mineral).map(_item => _item.mineral);
  _minerals = _minerals.filter((item, index) => _minerals.findIndex(_item => _item.mineral === item.mineral) === index);
  if ([2, 3].includes(group.id) && _minerals.length > 0) designation.minerals = _minerals;
  return designation;
};

export const pluralizeGroupName = (group, count, isGrouping = false) => {
  if (count === 1) return group.name;
  else if (!isGrouping && group.id == 11) return group.name;
  else if (group.id in STATUS_GROUPS_PLURAL) return STATUS_GROUPS_PLURAL[group.id];
  return group.name;
};
