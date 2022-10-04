import Head from 'next/head';
import Link from 'next/link';


export default function Explore() {
  return (
    <div className='bg-gray-500 border-b-2 border-b-neutral-600'>
      <Head>
        <title>Explore</title>
      </Head>
      <div>Explore</div>
      <Link href='/'>home</Link>
    </div>
  );
}