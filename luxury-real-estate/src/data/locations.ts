export interface Location {
  name: string;
  postalCode: string;
  country: string;
  region?: string;
  searchTerms: string[];
}

export const locations: Location[] = [
  // Monaco
  { 
    name: 'Monaco', 
    postalCode: '98000', 
    country: 'Monaco', 
    searchTerms: ['monaco', 'monte carlo', '98000', 'mc'] 
  },
  { 
    name: 'Monte-Carlo', 
    postalCode: '98000', 
    country: 'Monaco', 
    searchTerms: ['monte carlo', 'monte-carlo', 'monaco', '98000'] 
  },
  { 
    name: 'La Condamine', 
    postalCode: '98000', 
    country: 'Monaco', 
    searchTerms: ['la condamine', 'condamine', 'monaco', '98000'] 
  },
  { 
    name: 'Fontvieille', 
    postalCode: '98000', 
    country: 'Monaco', 
    searchTerms: ['fontvieille', 'monaco', '98000'] 
  },

  // France - Alpes-Maritimes (06)
  { 
    name: 'Nice', 
    postalCode: '06000', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['nice', '06000', '06100', '06200', '06300'] 
  },
  { 
    name: 'Cannes', 
    postalCode: '06400', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['cannes', '06400'] 
  },
  { 
    name: 'Antibes', 
    postalCode: '06160', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['antibes', '06160', '06600'] 
  },
  { 
    name: 'Grasse', 
    postalCode: '06130', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['grasse', '06130'] 
  },
  { 
    name: 'Menton', 
    postalCode: '06500', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['menton', '06500'] 
  },
  { 
    name: 'Roquebrune-Cap-Martin', 
    postalCode: '06190', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['roquebrune', 'roquebrune-cap-martin', 'cap martin', '06190'] 
  },
  { 
    name: 'Beausoleil', 
    postalCode: '06240', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['beausoleil', '06240'] 
  },
  { 
    name: 'Villefranche-sur-Mer', 
    postalCode: '06230', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['villefranche', 'villefranche-sur-mer', '06230'] 
  },
  { 
    name: 'Saint-Jean-Cap-Ferrat', 
    postalCode: '06230', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['saint-jean-cap-ferrat', 'cap ferrat', '06230'] 
  },
  { 
    name: 'Beaulieu-sur-Mer', 
    postalCode: '06310', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['beaulieu', 'beaulieu-sur-mer', '06310'] 
  },
  { 
    name: 'Èze', 
    postalCode: '06360', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['eze', 'èze', '06360'] 
  },
  { 
    name: 'Saint-Paul-de-Vence', 
    postalCode: '06570', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['saint-paul-de-vence', 'saint paul de vence', '06570'] 
  },
  { 
    name: 'Vence', 
    postalCode: '06140', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['vence', '06140'] 
  },
  { 
    name: 'Cagnes-sur-Mer', 
    postalCode: '06800', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['cagnes', 'cagnes-sur-mer', '06800'] 
  },
  { 
    name: 'Mandelieu-la-Napoule', 
    postalCode: '06210', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['mandelieu', 'la napoule', 'mandelieu-la-napoule', '06210'] 
  },
  { 
    name: 'Mougins', 
    postalCode: '06250', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['mougins', '06250'] 
  },
  { 
    name: 'Vallauris', 
    postalCode: '06220', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['vallauris', '06220'] 
  },
  { 
    name: 'Biot', 
    postalCode: '06410', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['biot', '06410'] 
  },
  { 
    name: 'Valbonne', 
    postalCode: '06560', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['valbonne', '06560'] 
  },
  { 
    name: 'Peymeinade', 
    postalCode: '06530', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['peymeinade', '06530'] 
  },
  { 
    name: 'Le Cannet', 
    postalCode: '06110', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['le cannet', 'cannet', '06110'] 
  },
  { 
    name: 'Théoule-sur-Mer', 
    postalCode: '06590', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['theoule', 'théoule-sur-mer', '06590'] 
  },
  { 
    name: 'Aspremont', 
    postalCode: '06790', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['aspremont', '06790'] 
  },
  { 
    name: 'Tourrette-Levens', 
    postalCode: '06690', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['tourrette-levens', 'tourrette levens', '06690'] 
  },
  { 
    name: 'Contes', 
    postalCode: '06390', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['contes', '06390'] 
  },
  { 
    name: 'Castagniers', 
    postalCode: '06670', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['castagniers', '06670'] 
  },
  { 
    name: 'Peille', 
    postalCode: '06440', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['peille', '06440'] 
  },
  { 
    name: 'Peillon', 
    postalCode: '06440', 
    country: 'France', 
    region: 'Alpes-Maritimes',
    searchTerms: ['peillon', '06440'] 
  }
];

export const searchLocations = (query: string): Location[] => {
  if (!query.trim()) return locations.slice(0, 8);
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return locations
    .filter(location => 
      location.searchTerms.some(term => 
        term.toLowerCase().includes(normalizedQuery) || 
        normalizedQuery.includes(term.toLowerCase())
      )
    )
    .slice(0, 10);
};