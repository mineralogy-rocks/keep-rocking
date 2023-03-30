import clsx from 'clsx';

import utilsStyles  from '@/styles/utils.module.scss';
import { getStatusColor } from '@/helpers/status.helpers';

import Chip from '../Chip';


export default function RelationChip({ name, statuses, hasArrow = true }) {
  return (
    <>
      {hasArrow && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      )}

      <Chip type="default" className={clsx("text-xs", "bg-red-50/60 border-gray-200 hover:border-gray-300")}>
        <span className={clsx("flex shrink-0 w-1.5 h-1.5 rounded mr-1", getStatusColor(statuses))}></span>
        <span className={clsx(utilsStyles.linkSmall, "cursor-default")}>{name}</span>
      </Chip>
    </>
  )
}
