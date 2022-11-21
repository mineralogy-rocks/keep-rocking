import { mineralApiResponse } from '@/lib/types';

import cx from 'clsx';
import utilsStyles  from '@/styles/utils.module.scss';

export default function MineralCard({ mineral } : { mineral: mineralApiResponse }) {

  const mineralFormula = mineral.formulas.filter(formula => formula.show_on_site);

  console.log(mineralFormula);

  return (
    <div key={mineral.id} className="bg-gray-50 border rounded-sm p-2 max-w-4xl mx-auto max-h-40">
      <div className="grid grid-cols-4 gap-2">
        <div className="flex col-span-1 pr-2 border-r border-gray-200">

        <div className="flex flex-shrink-0 w-1 h-full rounded-full bg-green-700/70"></div>
          <span className="italic text-base">{mineral.ima_symbol}</span>
          <div className="ml-5">
            <h1 className="text-2xl font-bold">{mineral.name}</h1>
            {mineralFormula.length > 0 && (
              <h2 dangerouslySetInnerHTML={{ __html: mineralFormula[0].formula }}></h2>
            )}
            {mineral.description && (
              <p className={cx(utilsStyles.secondaryText, "text-xs mt-1 truncate")} dangerouslySetInnerHTML={{ __html: mineral.description }}></p>
            )}
          </div>
          {/* <p>{mineral.formula}</p> */}
        </div>

        <div className="col-span-1">
          <h3 className="text-sm font-medium text-center">Crystallography</h3>
        </div>
      </div>
    </div>
  );
}
