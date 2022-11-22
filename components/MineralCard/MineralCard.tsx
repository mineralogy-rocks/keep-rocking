import { mineralApiResponse } from '@/lib/types';

import cx from 'clsx';
import utilsStyles  from '@/styles/utils.module.scss';

import { getStatusColor, getRelevantFormula } from './MineralCard.helpers';

export default function MineralCard({ mineral } : { mineral: mineralApiResponse }) {

  const mineralFormula = getRelevantFormula(mineral.formulas);

  return (
    <div key={mineral.id} className="bg-gray-50 border rounded-sm p-2 max-w-4xl mx-auto h-auto hover:border-gray-400 transition-all duration-200">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-3 md:col-span-1 pr-2 border-r border-gray-200">
          <span className="italic text-base">{mineral.ima_symbol}</span>
          <div className="ml-5 space-y-1">
            <div className="flex">
              <div className={cx(getStatusColor(mineral.statuses), "flex shrink-0 w-1 h-auto rounded")}></div>
              <h1 className="text-2xl font-bold ml-2">{mineral.name}</h1>
            </div>
            {mineralFormula && (
              <h2 className="" dangerouslySetInnerHTML={{ __html: mineralFormula}}></h2>
            )}

            {mineral.description && (
              <div className={cx("h-auto w-auto")}>
                <p className={cx(utilsStyles.secondaryText, "text-xs")} dangerouslySetInnerHTML={{ __html: mineral.description }}></p>
              </div>
            )}
          </div>
          <span className="flex mt-2 italic font-light text-xs">Last updated in {mineral.updated_at.toString()}</span>
        </div>

        <div className="col-span-2 grid grid-cols-3">
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-center">Crystallography</h3>
            {mineral.crystal_systems && (
              <div className="flex mt-1 space-x-1">
                {mineral.crystal_systems.map((crystal_system, id) => {
                  return (
                    <div className="flex bg-gray-200 rounded px-2" key={id}>
                      <span className="text-xs font-light">{crystal_system.name}
                        {crystal_system.count ? <span className="ml-1 font-medium">{crystal_system.count}</span> : null}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
