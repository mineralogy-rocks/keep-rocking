import { mineralApiResponse } from '@/lib/types';
import { CrystalSystem, Discovery } from '@/lib/interfaces';

import cx from 'clsx';
import utilsStyles  from '@/styles/utils.module.scss';
import Chip from '@/components/Chip';

import { getStatusColor, getRelevantFormula } from './MineralCard.helpers';

function CrystallographySnippet({ data} : { data: CrystalSystem[] }) {
  if (data.length > 0) {
    return (
      <div className="flex flex-wrap mt-2 space-x-1">
        {data.map((item, id) => {
          return (
            <Chip key={id}>
              <span>{item.name}</span>
              {item.count ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium">
                    {item.count}
                  </span>
                </>) : null}
            </Chip>
          )
        })}
      </div>
    )
  };
  return (<span className="flex text-xs">No data</span>);
};

function DiscoverySnippet({ data } : { data: Discovery[] }) {
  if (data.length > 0) {
    return (
      <div className="flex flex-wrap mt-2 space-x-1">
        {data.map((item, id) => {
          return (
            <Chip backgroundColor='bg-green-200/50' key={id}>
              <span>{item.name}</span>
              {item.count ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium">
                  {item.count}
                </span>
              </>) : null}
            </Chip>
          )
        })}
      </div>
    )
  };
  return null //(<span className="flex text-xs">No data</span>);
};

export default function MineralCard({ mineral } : { mineral: mineralApiResponse }) {

  const mineralFormula = getRelevantFormula(mineral.formulas);

  return (
    <div key={mineral.id} className="bg-gray-50 border rounded-sm p-2 max-w-4xl mx-auto h-auto hover:border-gray-400 transition-all duration-200">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-3 md:col-span-1 pr-2 md:border-r border-gray-200">
          <span className="italic text-base">{mineral.ima_symbol}</span>
          <div className="ml-5 space-y-1">
            <div className="flex">
              <div className={cx(getStatusColor(mineral.statuses), "flex shrink-0 w-1 h-auto rounded")}></div>
              <h1 className="text-2xl font-bold ml-2">{mineral.name}</h1>
            </div>
            {mineralFormula && <h2 className="" dangerouslySetInnerHTML={{ __html: mineralFormula}}></h2>}

            {mineral.description && (
              <div className={cx("h-auto w-auto")}>
                <p className={cx(utilsStyles.secondaryText, "text-xs")} dangerouslySetInnerHTML={{ __html: mineral.description }}></p>
              </div>
            )}
          </div>
          <hr className="my-2 md:hidden" />
        </div>

        <div className="col-span-2 grid grid-rows-2 grid-flow-col gap-1">
          <div className="">
            <h3 className="text-sm font-medium text-center">Crystallography</h3>
            <CrystallographySnippet data={mineral.crystal_systems} />
          </div>
          <div className="">
            <h3 className="text-sm font-medium text-center">Discovery</h3>
            {(mineral.discovery_countries || mineral.history) && (<>
                <DiscoverySnippet data={mineral.discovery_countries} />
                <div className="mt-1 text-xs">
                  {mineral.history?.discovery_year && (<p>Discovered in <span className="font-medium">{mineral.history.discovery_year}</span></p>)}
                  {mineral.history?.publication_year && (<p>Published in <span className="font-medium">{mineral.history.publication_year}</span></p>)}
                </div>
              </>)
            }
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <span className="flex italic font-light text-xxs">Last updated in {mineral.updated_at.toString()}</span>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-xxs">{mineral.seen}</span>
        </div>
      </div>
    </div>
  );
}
