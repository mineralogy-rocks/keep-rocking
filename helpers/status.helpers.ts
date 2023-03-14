import { IMA_STATUS_CHOICES } from '@/lib/constants';
import { Status, colorTuple } from '@/lib/interfaces';


export const getStatusGroupColor = (statuses: Status[]): string => {
  for (let status of statuses) {
    if (status.group?.id === 11) return 'bg-green-700/70';
    else if (status.group?.id === 1) return 'bg-blue-700/70';
    else if (status.group?.id in [2, 3, 4, 5, 6, 7, 8, 9, 10]) return 'bg-red-700/70';
    else return 'bg-gray-600/70';
  }
  return 'bg-gray-600/70';
};

export const getStatusColor = (statuses: [number]): string => {
  for (let status of statuses) {
    let _status = Math.floor(status);
    if (_status === 0) return 'bg-green-700/70';
    else if (_status === 1) return 'bg-blue-700/70';
    else if (status in [2, 3, 4, 5, 6, 7, 8, 9, 10]) return 'bg-red-700/70';
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
