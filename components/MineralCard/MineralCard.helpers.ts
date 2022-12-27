import { Status, Formula } from '@/lib/interfaces';


export const getStatusColor = (statuses: Status[]): string => {
  for (let status of statuses) {
    if (status.group?.id === 11) return 'bg-green-700/70';
    else if (status.group?.id === 1) return 'bg-blue-700/70';
    else if (status.group?.id in [2, 3, 4, 5, 6, 7, 8, 9, 10]) return 'bg-red-700/70';
    else return 'bg-gray-600/70';
  }
  return 'bg-gray-600/70';
};

export const getRelevantFormula = (formulas: Formula[]) => {
  for (let formula_ of formulas) {
    if (formula_.show_on_site) return formula_.formula;
  }
  return null;
};
