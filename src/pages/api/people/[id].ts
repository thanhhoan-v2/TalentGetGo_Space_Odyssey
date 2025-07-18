import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const response = await fetch(`https://swapi.info/api/people/${id}/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const person = await response.json();
    res.status(200).json(person);
  } catch (error) {
    console.error(`Error fetching person ${id}:`, error);
    res.status(500).json({ message: 'Error fetching person' });
  }
}
