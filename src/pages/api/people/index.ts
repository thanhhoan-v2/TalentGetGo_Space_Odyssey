import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { page = '1' } = req.query;

  try {
    const response = await fetch(`https://swapi.info/api/people/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allPeople = await response.json();

    // Simulate pagination
    const itemsPerPage = 10;
    const pageNum = parseInt(page as string, 10);
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const results = allPeople.slice(startIndex, endIndex);

    const paginatedResponse = {
      count: allPeople.length,
      next: endIndex < allPeople.length ? `page=${pageNum + 1}` : null,
      previous: pageNum > 1 ? `page=${pageNum - 1}` : null,
      results: results,
    };

    res.status(200).json(paginatedResponse);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ message: 'Error fetching people' });
  }
}
