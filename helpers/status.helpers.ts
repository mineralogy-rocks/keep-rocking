import { IMA_STATUS_CHOICES, COMPLEMENTING_STATUS_GROUPS } from '@/lib/constants';
import { Status, StatusGroup, colorTuple } from '@/lib/interfaces';


export const getUniqueStatusGroups = (statuses: Status[]) => {
  let groups = statuses.filter(_item => _item.group)
  groups = groups.filter((item, index) => groups.findIndex(_item => _item.group?.id === item.group?.id) === index);
  return groups;
};

export const reduceStatusGroups = (statusGroups: StatusGroup[]): any => {
  let groups: any[] = [];
  Object.values(COMPLEMENTING_STATUS_GROUPS).forEach((group, index) => {
    let _groups = statusGroups.filter(statusGroup => group.includes(statusGroup.group?.id));
    if (!!_groups.length) groups.push(_groups.map(item => { return { group: item.group} }));
  });
  return groups;
};

export const getStatusGroupColor = (statuses: Status[]): string => {
  for (let status of statuses) {
    if (status.group?.id === 11) return 'bg-green-700/70 dark:bg-green-500';
    else if (COMPLEMENTING_STATUS_GROUPS[1].includes(status.group?.id)) return 'bg-blue-700/70 dark:bg-blue-500';
    else if (COMPLEMENTING_STATUS_GROUPS[2].includes(status.group?.id)) return 'bg-red-700/70 dark:bg-red-500';
    else return 'bg-slate-600/70 dark:bg-slate-400';
  }
  return 'bg-slate-600/70 dark:bg-slate-400';
};

export const getStatusColor = (statuses: number[]): string => {
  for (let status of statuses.sort()) {
    let _status = Math.floor(status);
    if (_status === 0) return 'bg-green-700/70 dark:bg-green-500';
    else if (_status === 1) return 'bg-blue-700/70 dark:bg-green-500';
    else if (_status in [2, 3, 4, 5, 6, 7, 8, 9, 10]) return 'bg-red-700/70 dark:bg-blue-500';
    else return 'bg-slate-600/70 dark:bg-slate-400';
  }
  return 'bg-slate-600/70 dark:bg-slate-400';
};
