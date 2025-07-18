import { NextApiRequest, NextApiResponse } from 'next';

// Static character names array for search functionality
const CHARACTER_NAMES = [
  { id: '1', name: 'Luke Skywalker' },
  { id: '2', name: 'C-3PO' },
  { id: '3', name: 'R2-D2' },
  { id: '4', name: 'Darth Vader' },
  { id: '5', name: 'Leia Organa' },
  { id: '6', name: 'Owen Lars' },
  { id: '7', name: 'Beru Whitesun lars' },
  { id: '8', name: 'R5-D4' },
  { id: '9', name: 'Biggs Darklighter' },
  { id: '10', name: 'Obi-Wan Kenobi' },
  { id: '11', name: 'Anakin Skywalker' },
  { id: '12', name: 'Wilhuff Tarkin' },
  { id: '13', name: 'Chewbacca' },
  { id: '14', name: 'Han Solo' },
  { id: '15', name: 'Greedo' },
  { id: '16', name: 'Jabba Desilijic Tiure' },
  { id: '18', name: 'Wedge Antilles' },
  { id: '19', name: 'Jek Tono Porkins' },
  { id: '20', name: 'Yoda' },
  { id: '21', name: 'Palpatine' },
  { id: '22', name: 'Boba Fett' },
  { id: '23', name: 'IG-88' },
  { id: '24', name: 'Bossk' },
  { id: '25', name: 'Lando Calrissian' },
  { id: '26', name: 'Lobot' },
  { id: '27', name: 'Ackbar' },
  { id: '28', name: 'Mon Mothma' },
  { id: '29', name: 'Arvel Crynyd' },
  { id: '30', name: 'Wicket Systri Warrick' },
  { id: '31', name: 'Nien Nunb' },
  { id: '32', name: 'Qui-Gon Jinn' },
  { id: '33', name: 'Nute Gunray' },
  { id: '34', name: 'Finis Valorum' },
  { id: '35', name: 'Padmé Amidala' },
  { id: '36', name: 'Jar Jar Binks' },
  { id: '37', name: 'Roos Tarpals' },
  { id: '38', name: 'Rugor Nass' },
  { id: '39', name: 'Ric Olié' },
  { id: '40', name: 'Watto' },
  { id: '41', name: 'Sebulba' },
  { id: '42', name: 'Quarsh Panaka' },
  { id: '43', name: 'Shmi Skywalker' },
  { id: '44', name: 'Darth Maul' },
  { id: '45', name: 'Bib Fortuna' },
  { id: '46', name: 'Ayla Secura' },
  { id: '47', name: 'Ratts Tyerel' },
  { id: '48', name: 'Dud Bolt' },
  { id: '49', name: 'Gasgano' },
  { id: '50', name: 'Ben Quadinaros' },
  { id: '51', name: 'Mace Windu' },
  { id: '52', name: 'Ki-Adi-Mundi' },
  { id: '53', name: 'Kit Fisto' },
  { id: '54', name: 'Eeth Koth' },
  { id: '55', name: 'Adi Gallia' },
  { id: '56', name: 'Saesee Tiin' },
  { id: '57', name: 'Yarael Poof' },
  { id: '58', name: 'Plo Koon' },
  { id: '59', name: 'Mas Amedda' },
  { id: '60', name: 'Gregar Typho' },
  { id: '61', name: 'Cordé' },
  { id: '62', name: 'Cliegg Lars' },
  { id: '63', name: 'Poggle the Lesser' },
  { id: '64', name: 'Luminara Unduli' },
  { id: '65', name: 'Barriss Offee' },
  { id: '66', name: 'Dormé' },
  { id: '67', name: 'Dooku' },
  { id: '68', name: 'Bail Prestor Organa' },
  { id: '69', name: 'Jango Fett' },
  { id: '70', name: 'Zam Wesell' },
  { id: '71', name: 'Dexter Jettster' },
  { id: '72', name: 'Lama Su' },
  { id: '73', name: 'Taun We' },
  { id: '74', name: 'Jocasta Nu' },
  { id: '75', name: 'R4-P17' },
  { id: '76', name: 'Wat Tambor' },
  { id: '77', name: 'San Hill' },
  { id: '78', name: 'Shaak Ti' },
  { id: '79', name: 'Grievous' },
  { id: '80', name: 'Tarfful' },
  { id: '81', name: 'Raymus Antilles' },
  { id: '82', name: 'Sly Moore' },
  { id: '83', name: 'Tion Medon' },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q: query = '', page = '1' } = req.query;

  try {
    // Search through character names array
    const filteredCharacters = CHARACTER_NAMES.filter((char) =>
      char.name.toLowerCase().includes((query as string).toLowerCase())
    );

    const itemsPerPage = 10;
    const pageNum = parseInt(page as string, 10);
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get character IDs for this page of search results
    const characterIds = filteredCharacters
      .slice(startIndex, endIndex)
      .map((char) => char.id);

    // Fetch characters by ID from external API (server-side, avoiding CORS)
    const characters = await Promise.all(
      characterIds.map(async (id) => {
        try {
          const response = await fetch(`https://swapi.info/api/people/${id}/`);
          if (!response.ok) {
            console.error(
              `Failed to fetch character ${id}: ${response.status}`
            );
            return null;
          }
          return response.json();
        } catch (error) {
          console.error(`Error fetching character ${id}:`, error);
          return null;
        }
      })
    );

    // Filter out failed requests
    const validCharacters = characters.filter((char) => char !== null);

    const searchResponse = {
      count: filteredCharacters.length,
      next: endIndex < filteredCharacters.length ? `page=${pageNum + 1}` : null,
      previous: pageNum > 1 ? `page=${pageNum - 1}` : null,
      results: validCharacters,
    };

    res.status(200).json(searchResponse);
  } catch (error) {
    console.error('Error searching people:', error);
    res.status(500).json({
      message: 'Error searching people',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
