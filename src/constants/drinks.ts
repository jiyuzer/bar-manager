export interface Drink {
  id: string;
  name: string;
  category: 'spirits' | 'champagnes' | 'premiums' | 'softs';
  price: number;
  requiresMixer?: boolean;
}

export const DRINKS: Drink[] = [
  // Spiritueux
  { id: 'vodka', name: 'Vodka', category: 'spirits', price: 8, requiresMixer: true },
  { id: 'rhum', name: 'Rhum', category: 'spirits', price: 8, requiresMixer: true },
  { id: 'gin', name: 'Gin', category: 'spirits', price: 9, requiresMixer: true },
  { id: 'whiskey', name: 'Whiskey', category: 'spirits', price: 10, requiresMixer: true },
  { id: 'tequila', name: 'Tequila', category: 'spirits', price: 9, requiresMixer: true },
  
  // Champagnes
  { id: 'champagne_standard', name: 'Champagne Brut', category: 'champagnes', price: 12 },
  { id: 'champagne_rose', name: 'Champagne Rosé', category: 'champagnes', price: 14 },
  { id: 'prosecco', name: 'Prosecco', category: 'champagnes', price: 10 },
  
  // Prémiums
  { id: 'mojito', name: 'Mojito', category: 'premiums', price: 12 },
  { id: 'margarita', name: 'Margarita', category: 'premiums', price: 11 },
  { id: 'daiquiri', name: 'Daïquiri', category: 'premiums', price: 11 },
  { id: 'cosmopolitan', name: 'Cosmopolitan', category: 'premiums', price: 12 },
  { id: 'pina_colada', name: 'Piña Colada', category: 'premiums', price: 12 },
  
  // Softs
  { id: 'water', name: 'Eau', category: 'softs', price: 0 },
  { id: 'soda', name: 'Soda', category: 'softs', price: 3 },
  { id: 'juice', name: 'Jus', category: 'softs', price: 4 },
  { id: 'coffee', name: 'Café', category: 'softs', price: 3 },
];

export const MIXERS = [
  'Coca-Cola',
  'Sprite',
  'Tonic',
  'Ginger Ale',
  'Jus d\'Orange',
  'Jus de Cranberry',
  'Glaçons seuls',
];

export const DRINK_CATEGORIES = [
  { id: 'spirits', label: 'Spiritueux' },
  { id: 'champagnes', label: 'Champagnes' },
  { id: 'premiums', label: 'Prémiums' },
  { id: 'softs', label: 'Softs' },
];
