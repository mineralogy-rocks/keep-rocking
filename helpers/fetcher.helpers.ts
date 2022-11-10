import { paginatedApiResponse } from '@/lib/types';

export default async function fetcher(
  input: RequestInfo,
  init?: RequestInit
): Promise<paginatedApiResponse> {

  const apiUrl:string = process.env.API_URL;
  const apiKey:string = process.env.API_KEY;

  const res = await fetch(apiUrl + input, {
    headers: {
      'Authorization': `Api-Key ${apiKey}`,
      'Content-Type': 'application/json',
    }, ...init})
  if (!res.ok) {
    throw new Error("An error occurred while posting the data.")
  }
  return res.json()
}
