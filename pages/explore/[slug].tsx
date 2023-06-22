import { useRouter } from 'next/router';
import useSWR from 'swr';

import { fetcher } from '@/helpers/fetcher.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';


export default function MineralPage() {
  const router = useRouter();
  console.log(router.query.slug);
  const { data, error, isLoading } = useSWR(
    router.isReady ? '/mineral/' + router.query.slug + '/' : null,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { history, formulas, name, description } = data;
  return (
    <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto mt-10">
      <h1 className="text-xl sm:text-3xl font-semibold sm:font-bold ml-2 break-words">{data.name}</h1>
      <p className="mt-10 px-2" dangerouslySetInnerHTML={{ __html: data.description }}></p>

      {history && (
        <section className="mt-10 px-2">
          <h2 className="text-xl font-semibold text-font-blueDark">History</h2>
          <div className="flex flex-col p-2">
            {history.discovery_year && (<span className="">Discovered in <strong>{history.discovery_year}</strong></span>)}
            {history.publication_year && (<span className="">Published in <strong>{history.publication_year}</strong></span>)}
            {history.approval_year && (<span className="">Approved by IMA in <strong>{history.approval_year}</strong></span>)}
          </div>
        </section>
      )}

      {formulas && (
        <section className="mt-10 px-2">
          <h2 className="text-xl font-semibold text-font-blueDark">Stoichiometric Formulas</h2>
          <div className="flex flex-col p-2">
            {formulas.map((formula_, index) => (
              <div key={index} className="flex flex-col">
                <span className="" dangerouslySetInnerHTML={{ __html: formula_.formula }}></span>
                <span className="">{formula_.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
};
