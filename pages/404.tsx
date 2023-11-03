import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-auto items-center justify-center text-center flex-col sm:flex-row px-4">
        <h1 className="text-2xl font-bold border-r border-r-slate-300 pr-2 mr-2">
          404
        </h1>
        <h2 className="text-lg font-normal">This page could not be found.</h2>
      </div>
    </div>
  );
}

NotFound.layoutProps = {
  meta: {
    title: "404 - Page Not Found",
  },
}
