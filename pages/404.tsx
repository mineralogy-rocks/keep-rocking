import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          404 - Page Not Found
        </h1>

        <p className="mt-3 text-2xl">
          <Link href="/">
            <a className="text-blue-600 hover:text-blue-500">Go home</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
