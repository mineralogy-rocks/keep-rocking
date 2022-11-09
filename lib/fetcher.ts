export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {

  const apiKey:string = process.env.API_KEY;

  const res = await fetch(input,
    { headers: {
      'Authorization': `Api-Key ${apiKey}`,
      'Content-Type': 'application/json',
    }, ...init})
  return res.json()
}
