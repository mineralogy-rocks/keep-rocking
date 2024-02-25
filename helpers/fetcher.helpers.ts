import { paginatedApiResponse } from '@/lib/types';


export async function fetcher(
  input: any,
  init?: RequestInit
): Promise<any> {
  const res = await fetch('/api/explore/mineral?' + input, {
    headers: {
      'Content-Type': 'application/json',
    }, ...init})

  if (!res.ok) {
    // instead of throwing an error, we return null
    // which allows us to render 404 pages
    return null;
  }
  return res.json()
};

export async function clientFetcher(
  input: any,
  init?: RequestInit
): Promise<any> {

  const apiUrl:string = process.env.API_URL || '';
  const apiKey:string = process.env.API_KEY || '';

  const controller = new AbortController();

  const res = await fetch(apiUrl + input, {
    headers: {
      'Authorization': `Api-Key ${apiKey}`,
      'Content-Type': 'application/json',
    }, ...init,
    signal: controller.signal
  })

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.")
  }
  return res.json()
};

export async function mindatFetcher(
  input: RequestInfo,
  init?: RequestInit
): Promise<paginatedApiResponse> {

  const apiUrl:string = process.env.MINDAT_API_URL || '';
  const apiKey:string = process.env.MINDAT_API_KEY || '';

  const res = await fetch(apiUrl + input, {
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    }, ...init})
  if (!res.ok) {
    throw new Error("An error occurred while fetching the mindat data.")
  }
  return res.json()
};

