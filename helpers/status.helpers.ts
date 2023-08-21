import { IMA_STATUS_CHOICES, COMPLEMENTING_STATUS_GROUPS } from '@/lib/constants';
import { Status, StatusGroup, colorTuple } from '@/lib/interfaces';


export const getUniqueStatusGroups = (statuses: Status[]) => {
  let groups = statuses.filter(_item => _item.group)
  groups = groups.filter((item, index) => groups.findIndex(_item => _item.group?.id === item.group?.id) === index);
  return groups;
};

export const reduceStatusGroups = (statusGroups: StatusGroup[]): any => {
  let groups = [];
  Object.values(COMPLEMENTING_STATUS_GROUPS).forEach((group, index) => {
    let _groups = statusGroups.filter((statusGroup) => group.includes(statusGroup.group?.id));
    if (_groups.length > 0) groups.push(_groups.map(item => { return { group: item.group} }));
  });
  return groups;
};

export const getStatusGroupColor = (statuses: Status[]): string => {
  for (let status of statuses) {
    if (status.group?.id === 11) return 'bg-green-700/70';
    else if (COMPLEMENTING_STATUS_GROUPS[1].includes(status.group?.id)) return 'bg-blue-700/70';
    else if (COMPLEMENTING_STATUS_GROUPS[2].includes(status.group?.id)) return 'bg-red-700/70';
    else return 'bg-gray-600/70';
  }
  return 'bg-gray-600/70';
};

export const getStatusColor = (statuses: [number]): string => {
  console.log(statuses)
  for (let status of statuses.sort()) {
    let _status = Math.floor(status);
    if (_status === 0) return 'bg-green-700/70';
    else if (_status === 1) return 'bg-blue-700/70';
    else if (_status in [2, 3, 4, 5, 6, 7, 8, 9, 10]) return 'bg-red-700/70';
    else return 'bg-gray-600/70';
  }
  return 'bg-gray-600/70';
};

export const getIMAStatusColor = (status: string): colorTuple => {
  switch (status) {
    case IMA_STATUS_CHOICES.approved:
      return { textColor: 'text-green-800', backgroundColor: 'bg-green-300/30' };
    case IMA_STATUS_CHOICES.discredited:
      return { textColor: 'text-red-800', backgroundColor: 'bg-rose-200/70' };
    case IMA_STATUS_CHOICES.pending:
      return { textColor: 'text-gray-800', backgroundColor: 'bg-gray-300/70' };
    case IMA_STATUS_CHOICES.grandfathered:
      return { textColor: 'text-green-800', backgroundColor: 'bg-green-600/30' };
    case IMA_STATUS_CHOICES.questionable:
      return { textColor: 'text-blue-600', backgroundColor: 'bg-cyan-300/30' };
    default:
      return { textColor: 'text-green-300', backgroundColor: 'bg-green-700/70' };
  }
};

export const getIMAStatus = (status: string): string => {
  switch (status) {
    case IMA_STATUS_CHOICES.approved:
      return 'approved';
    case IMA_STATUS_CHOICES.discredited:
      return 'discredited';
    case IMA_STATUS_CHOICES.pending:
      return 'pending';
    case IMA_STATUS_CHOICES.grandfathered:
      return 'grandfathered';
    case IMA_STATUS_CHOICES.questionable:
      return 'questionable';
    default:
      return 'approved';
  }
};
