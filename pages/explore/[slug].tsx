import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import groupBy from 'just-group-by';

import { Formula, History } from '@/lib/interfaces';
import { fetcher } from '@/helpers/fetcher.helpers';
import { abortableMiddleware } from '@/middleware/abortable-swr';


const Section = ({ title, children }) => (
  <section className="mt-10 px-2">
    <h2 className="text-xl font-semibold text-font-blueDark">{title}</h2>
    <div className="flex flex-col p-2">
      {children}
    </div>
  </section>
);

export default function MineralPage() {
  const router = useRouter();
  console.log(router.query.slug);
  const { data, error, isLoading } = useSWR(
    router.isReady ? '/mineral/' + router.query.slug + '/' : null,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { history, formulas, name, description } : { history: History, formulas: [Formula], name: string, description: string } = data;
  const _formulas = groupBy(formulas, item => item.source.name);
  console.log(_formulas);

  return (
    <>
      <Head>
        <title>mineralogy.rocks - {name}</title>
      </Head>

      <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto mt-10">
        <h1 className="text-xl sm:text-3xl font-semibold sm:font-bold ml-2 break-words">{name}</h1>
        <p className="mt-10 px-2" dangerouslySetInnerHTML={{ __html: description }}></p>

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
              {Object.keys(_formulas).map((key, index) => {
                let _localFormulas = _formulas[key].sort((a, b) => {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                })
                return (
                  <div key={index} className="flex flex-col">
                    <span className="font-semibold">{key}</span>
                    {_localFormulas.map((item, index) => (
                      <div key={index} className="flex items-center p-2 space-x-2 text-sm">
                        <span className="text-font-secondary italic">{item.created_at}</span>
                        <span className="w-1 h-1 rounded-full bg-blue-900"></span>
                        <span className="font-medium" dangerouslySetInnerHTML={{ __html: item.formula }}></span>
                      </div>
                      )
                    )}
                  </div>
                )}
              )}
            </div>
          </section>
        )}
      </div>
    </>
  )
};
