import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('req', req.body);

  const { address } = JSON.parse(req.body);

  if (!address) {
    res.status(400).json({ error: 'Address not found' });
  }

  const token = process.env.TOKEN;

  if (!token) {
    res.status(400).json({ error: 'Token not found' });
  }

  const response = await fetch(
    `https://api.ordiscan.com/v1/address/${address}/activity`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
