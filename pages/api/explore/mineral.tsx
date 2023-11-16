import { paginatedApiResponse } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl:string = process.env.API_URL;
  const apiKey:string = process.env.API_KEY;
  try {
    if (req.method === 'GET') {
      const query = Object.keys(req.query).map((key) => key + '=' + req.query[key]).join('&');
      const response = await fetch(apiUrl + '/mineral?' + query, {
        headers: {
          'Authorization': `Api-Key ${apiKey}`,
          'Content-Type': 'application/json',
        }
      })
      const data: paginatedApiResponse = await response.json();
      return res.status(200).json(data);
    }
    return res.status(405).json({message: 'Method Not Allowed'});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
