


export default async function Blog({ searchParams }: { searchParams: blogApiRequest }) {
  const cleanQuery = filter(searchParams, (key, value) => value !== '' && value !== null);
  let data: blogApiResponse[] | null = null;
  if ('q' in cleanQuery) data = await getBlog('?' + new URLSearchParams(cleanQuery as Record<string, string>).toString());
}
