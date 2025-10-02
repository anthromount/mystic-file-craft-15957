// Mock data for the Fisheries Decision Support System
// In a real system, this would come from Supabase/API

export interface Fisher {
  id: string;
  name: string;
  barangay: string;
  phone: string;
  email?: string;
  boatType: string;
  licenseNumber: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'suspended';
  totalCatches: number;
  avgCatchPerTrip: number;
}

export interface CatchRecord {
  id: string;
  fisherId: string;
  fisherName: string;
  date: string;
  location: string;
  coordinates: { lat: number; lng: number };
  species: string[];
  totalWeight: number;
  marketValue: number;
  gear: string;
  tripDuration: number;
  fuelCost: number;
  crewSize: number;
  weatherConditions: string;
}

export interface FishingZone {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  boundary: { lat: number; lng: number }[];
  status: 'optimal' | 'good' | 'poor' | 'restricted';
  avgCatchRate: number;
  primarySpecies: string[];
  depth: number;
  substrate: string;
  lastSurvey: string;
  restrictions?: string;
}

export interface WeatherData {
  id: string;
  date: string;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  waveHeight: number;
  visibility: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  pressure: number;
  uvIndex: number;
}

// Mock Fishers Data
export const mockFishers: Fisher[] = [
  {
    id: '1',
    name: 'Jose Santos',
    barangay: 'Balite',
    phone: '+63-912-345-6789',
    email: 'jose.santos@email.com',
    boatType: 'Bancor',
    licenseNumber: 'FL-2024-001',
    registrationDate: '2024-01-15',
    status: 'active',
    totalCatches: 245,
    avgCatchPerTrip: 8.5
  },
  {
    id: '2',
    name: 'Maria Cruz',
    barangay: 'San Miguel',
    phone: '+63-912-456-7890',
    boatType: 'Motorized Banca',
    licenseNumber: 'FL-2024-002',
    registrationDate: '2024-02-20',
    status: 'active',
    totalCatches: 189,
    avgCatchPerTrip: 6.2
  },
  {
    id: '3',
    name: 'Roberto Dela Cruz',
    barangay: 'Carangay',
    phone: '+63-912-567-8901',
    boatType: 'Paddle Boat',
    licenseNumber: 'FL-2024-003',
    registrationDate: '2024-01-08',
    status: 'active',
    totalCatches: 156,
    avgCatchPerTrip: 4.8
  },
  {
    id: '4',
    name: 'Ana Reyes',
    barangay: 'Balite',
    phone: '+63-912-678-9012',
    boatType: 'Bancor',
    licenseNumber: 'FL-2024-004',
    registrationDate: '2024-03-10',
    status: 'suspended',
    totalCatches: 98,
    avgCatchPerTrip: 3.2
  }
];

// Mock Catch Records
export const mockCatchRecords: CatchRecord[] = [
  {
    id: '1',
    fisherId: '1',
    fisherName: 'Jose Santos',
    date: '2024-09-28',
    location: 'Balite Bay',
    coordinates: { lat: 13.5827, lng: 124.2337 },
    species: ['Tuna', 'Mackerel'],
    totalWeight: 12.5,
    marketValue: 2800,
    gear: 'Hook and Line',
    tripDuration: 6,
    fuelCost: 450,
    crewSize: 2,
    weatherConditions: 'Fair'
  },
  {
    id: '2',
    fisherId: '2',
    fisherName: 'Maria Cruz',
    date: '2024-09-28',
    location: 'San Miguel Coast',
    coordinates: { lat: 13.5691, lng: 124.2458 },
    species: ['Grouper', 'Snapper'],
    totalWeight: 8.3,
    marketValue: 2200,
    gear: 'Net',
    tripDuration: 4,
    fuelCost: 320,
    crewSize: 3,
    weatherConditions: 'Good'
  },
  {
    id: '3',
    fisherId: '3',
    fisherName: 'Roberto Dela Cruz',
    date: '2024-09-27',
    location: 'Carangay Waters',
    coordinates: { lat: 13.5934, lng: 124.2201 },
    species: ['Sardines', 'Anchovies'],
    totalWeight: 6.7,
    marketValue: 1200,
    gear: 'Small Net',
    tripDuration: 5,
    fuelCost: 280,
    crewSize: 1,
    weatherConditions: 'Cloudy'
  },
  {
    id: '4',
    fisherId: '1',
    fisherName: 'Jose Santos',
    date: '2024-09-26',
    location: 'Palnab Bay',
    coordinates: { lat: 13.5745, lng: 124.2189 },
    species: ['Skipjack', 'Yellowfin'],
    totalWeight: 15.2,
    marketValue: 3500,
    gear: 'Hook and Line',
    tripDuration: 7,
    fuelCost: 520,
    crewSize: 2,
    weatherConditions: 'Fair'
  },
  {
    id: '5',
    fisherId: '2',
    fisherName: 'Maria Cruz',
    date: '2024-09-26',
    location: 'Gogon Point',
    coordinates: { lat: 13.5612, lng: 124.2523 },
    species: ['Barracuda', 'Jack'],
    totalWeight: 9.8,
    marketValue: 2600,
    gear: 'Net',
    tripDuration: 5,
    fuelCost: 380,
    crewSize: 3,
    weatherConditions: 'Good'
  },
  {
    id: '6',
    fisherId: '3',
    fisherName: 'Roberto Dela Cruz',
    date: '2024-09-25',
    location: 'Talisay Reef',
    coordinates: { lat: 13.5978, lng: 124.2412 },
    species: ['Emperor', 'Rabbitfish'],
    totalWeight: 7.4,
    marketValue: 1800,
    gear: 'Small Net',
    tripDuration: 4,
    fuelCost: 300,
    crewSize: 2,
    weatherConditions: 'Cloudy'
  },
  {
    id: '7',
    fisherId: '1',
    fisherName: 'Jose Santos',
    date: '2024-09-25',
    location: 'North Shore',
    coordinates: { lat: 13.6012, lng: 124.2287 },
    species: ['Mahi-mahi', 'Wahoo'],
    totalWeight: 18.6,
    marketValue: 4200,
    gear: 'Trolling',
    tripDuration: 8,
    fuelCost: 650,
    crewSize: 3,
    weatherConditions: 'Good'
  },
  {
    id: '8',
    fisherId: '2',
    fisherName: 'Maria Cruz',
    date: '2024-09-24',
    location: 'East Bay',
    coordinates: { lat: 13.5856, lng: 124.2567 },
    species: ['Threadfin', 'Pompano'],
    totalWeight: 11.3,
    marketValue: 3100,
    gear: 'Net',
    tripDuration: 6,
    fuelCost: 430,
    crewSize: 2,
    weatherConditions: 'Fair'
  }
];

// Mock Fishing Zones
export const mockFishingZones: FishingZone[] = [
  {
    id: '1',
    name: 'Balite Bay',
    coordinates: { lat: 13.5827, lng: 124.2337 },
    boundary: [
      { lat: 13.5800, lng: 124.2300 },
      { lat: 13.5850, lng: 124.2300 },
      { lat: 13.5850, lng: 124.2370 },
      { lat: 13.5800, lng: 124.2370 }
    ],
    status: 'optimal',
    avgCatchRate: 8.5,
    primarySpecies: ['Tuna', 'Mackerel', 'Sardines'],
    depth: 45,
    substrate: 'Rocky',
    lastSurvey: '2024-09-15'
  },
  {
    id: '2',
    name: 'San Miguel Coast',
    coordinates: { lat: 13.5691, lng: 124.2458 },
    boundary: [
      { lat: 13.5650, lng: 124.2420 },
      { lat: 13.5730, lng: 124.2420 },
      { lat: 13.5730, lng: 124.2500 },
      { lat: 13.5650, lng: 124.2500 }
    ],
    status: 'good',
    avgCatchRate: 6.2,
    primarySpecies: ['Grouper', 'Snapper', 'Parrotfish'],
    depth: 32,
    substrate: 'Coral',
    lastSurvey: '2024-09-10'
  },
  {
    id: '3',
    name: 'Carangay Waters',
    coordinates: { lat: 13.5934, lng: 124.2201 },
    boundary: [
      { lat: 13.5900, lng: 124.2150 },
      { lat: 13.5970, lng: 124.2150 },
      { lat: 13.5970, lng: 124.2250 },
      { lat: 13.5900, lng: 124.2250 }
    ],
    status: 'restricted',
    avgCatchRate: 0,
    primarySpecies: [],
    depth: 25,
    substrate: 'Sandy',
    lastSurvey: '2024-08-20',
    restrictions: 'Marine Protected Area - No fishing allowed'
  },
  {
    id: '4',
    name: 'Palnab Bay',
    coordinates: { lat: 13.5745, lng: 124.2189 },
    boundary: [
      { lat: 13.5710, lng: 124.2140 },
      { lat: 13.5780, lng: 124.2140 },
      { lat: 13.5780, lng: 124.2240 },
      { lat: 13.5710, lng: 124.2240 }
    ],
    status: 'optimal',
    avgCatchRate: 9.8,
    primarySpecies: ['Skipjack', 'Yellowfin', 'Mahi-mahi'],
    depth: 55,
    substrate: 'Rocky',
    lastSurvey: '2024-09-18'
  },
  {
    id: '5',
    name: 'Gogon Point',
    coordinates: { lat: 13.5612, lng: 124.2523 },
    boundary: [
      { lat: 13.5580, lng: 124.2480 },
      { lat: 13.5650, lng: 124.2480 },
      { lat: 13.5650, lng: 124.2570 },
      { lat: 13.5580, lng: 124.2570 }
    ],
    status: 'good',
    avgCatchRate: 7.1,
    primarySpecies: ['Barracuda', 'Jack', 'Trevally'],
    depth: 38,
    substrate: 'Coral',
    lastSurvey: '2024-09-12'
  },
  {
    id: '6',
    name: 'Talisay Reef',
    coordinates: { lat: 13.5978, lng: 124.2412 },
    boundary: [
      { lat: 13.5940, lng: 124.2370 },
      { lat: 13.6020, lng: 124.2370 },
      { lat: 13.6020, lng: 124.2460 },
      { lat: 13.5940, lng: 124.2460 }
    ],
    status: 'good',
    avgCatchRate: 5.5,
    primarySpecies: ['Emperor', 'Rabbitfish', 'Surgeonfish'],
    depth: 28,
    substrate: 'Coral Reef',
    lastSurvey: '2024-09-05'
  },
  {
    id: '7',
    name: 'North Shore',
    coordinates: { lat: 13.6012, lng: 124.2287 },
    boundary: [
      { lat: 13.5980, lng: 124.2240 },
      { lat: 13.6050, lng: 124.2240 },
      { lat: 13.6050, lng: 124.2340 },
      { lat: 13.5980, lng: 124.2340 }
    ],
    status: 'optimal',
    avgCatchRate: 11.2,
    primarySpecies: ['Wahoo', 'Sailfish', 'Marlin'],
    depth: 68,
    substrate: 'Deep Rock',
    lastSurvey: '2024-09-20'
  },
  {
    id: '8',
    name: 'East Bay',
    coordinates: { lat: 13.5856, lng: 124.2567 },
    boundary: [
      { lat: 13.5820, lng: 124.2520 },
      { lat: 13.5890, lng: 124.2520 },
      { lat: 13.5890, lng: 124.2620 },
      { lat: 13.5820, lng: 124.2620 }
    ],
    status: 'poor',
    avgCatchRate: 3.2,
    primarySpecies: ['Threadfin', 'Pompano'],
    depth: 22,
    substrate: 'Muddy',
    lastSurvey: '2024-08-28'
  }
];

// Mock Weather Data
export const mockWeatherData: WeatherData[] = [
  {
    id: '1',
    date: '2024-09-29',
    location: 'Virac, Catanduanes',
    temperature: 28,
    humidity: 75,
    windSpeed: 12,
    windDirection: 'NE',
    waveHeight: 1.2,
    visibility: 8,
    condition: 'cloudy',
    pressure: 1012,
    uvIndex: 6
  },
  {
    id: '2',
    date: '2024-09-28',
    location: 'Virac, Catanduanes',
    temperature: 30,
    humidity: 68,
    windSpeed: 8,
    windDirection: 'E',
    waveHeight: 0.8,
    visibility: 10,
    condition: 'sunny',
    pressure: 1015,
    uvIndex: 8
  },
  {
    id: '3',
    date: '2024-09-27',
    location: 'San Miguel Coast',
    temperature: 29,
    humidity: 72,
    windSpeed: 15,
    windDirection: 'NE',
    waveHeight: 1.5,
    visibility: 7,
    condition: 'cloudy',
    pressure: 1010,
    uvIndex: 5
  },
  {
    id: '4',
    date: '2024-09-26',
    location: 'Balite Bay',
    temperature: 27,
    humidity: 80,
    windSpeed: 18,
    windDirection: 'N',
    waveHeight: 2.1,
    visibility: 5,
    condition: 'rainy',
    pressure: 1008,
    uvIndex: 3
  },
  {
    id: '5',
    date: '2024-09-25',
    location: 'Palnab Bay',
    temperature: 31,
    humidity: 65,
    windSpeed: 6,
    windDirection: 'SE',
    waveHeight: 0.6,
    visibility: 12,
    condition: 'sunny',
    pressure: 1016,
    uvIndex: 9
  },
  {
    id: '6',
    date: '2024-09-24',
    location: 'Gogon Point',
    temperature: 28,
    humidity: 76,
    windSpeed: 10,
    windDirection: 'E',
    waveHeight: 1.0,
    visibility: 9,
    condition: 'cloudy',
    pressure: 1013,
    uvIndex: 6
  },
  {
    id: '7',
    date: '2024-09-23',
    location: 'North Shore',
    temperature: 26,
    humidity: 85,
    windSpeed: 22,
    windDirection: 'NW',
    waveHeight: 2.8,
    visibility: 4,
    condition: 'stormy',
    pressure: 1005,
    uvIndex: 2
  }
];

// Analytics calculations
export const getAnalytics = () => {
  const totalFishers = mockFishers.length;
  const activeFishers = mockFishers.filter(f => f.status === 'active').length;
  const totalCatches = mockCatchRecords.reduce((sum, record) => sum + record.totalWeight, 0);
  const avgCatchPerTrip = totalCatches / mockCatchRecords.length;
  const totalRevenue = mockCatchRecords.reduce((sum, record) => sum + record.marketValue, 0);
  
  return {
    totalFishers,
    activeFishers,
    totalCatches: totalCatches.toFixed(1),
    avgCatchPerTrip: avgCatchPerTrip.toFixed(1),
    totalRevenue,
    sustainabilityIndex: 72 // Mock calculation
  };
};

// Species data for charts
export const getSpeciesData = () => {
  const speciesCount: Record<string, number> = {};
  
  mockCatchRecords.forEach(record => {
    record.species.forEach(species => {
      speciesCount[species] = (speciesCount[species] || 0) + 1;
    });
  });
  
  return Object.entries(speciesCount).map(([species, count]) => ({
    species,
    count,
    percentage: (count / mockCatchRecords.length * 100).toFixed(1)
  }));
};

// Monthly catch trends
export const getMonthlyCatchTrends = () => {
  return [
    { month: 'Jan', catches: 1250, revenue: 280000 },
    { month: 'Feb', catches: 1180, revenue: 265000 },
    { month: 'Mar', catches: 1320, revenue: 295000 },
    { month: 'Apr', catches: 1420, revenue: 310000 },
    { month: 'May', catches: 1380, revenue: 305000 },
    { month: 'Jun', catches: 1290, revenue: 285000 },
    { month: 'Jul', catches: 1350, revenue: 298000 },
    { month: 'Aug', catches: 1280, revenue: 290000 },
    { month: 'Sep', catches: 1190, revenue: 270000 }
  ];
};