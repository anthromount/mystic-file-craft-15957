import { Fisher, CatchRecord, SystemUser } from './mockData';

// Storage keys
const STORAGE_KEYS = {
  FISHERS: 'fisheries_fishers',
  CATCH_RECORDS: 'fisheries_catch_records',
  FIELD_OBSERVATIONS: 'fisheries_field_observations',
  SYSTEM_USERS: 'fisheries_system_users',
} as const;

// Field Observation interface
export interface FieldObservation {
  id: string;
  date: string;
  time: string;
  location: string;
  coordinates: { lat: string; lng: string };
  observerName: string;
  waterTemp: string;
  waterClarity: string;
  seaState: string;
  currentStrength: string;
  tideInfo: string;
  skyConditions: string;
  windSpeed: string;
  windDirection: string;
  precipitation: string;
  airTemp: string;
  marineDebris: string;
  algaeBloom: string;
  marineSightings: string;
  coralHealth: string;
  fishBehavior: string;
  notes: string;
  photos?: File[];
  createdAt: string;
}

// Generic storage operations
class StorageService {
  private getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }

  // Fishers
  getFishers(): Fisher[] {
    return this.getItem<Fisher[]>(STORAGE_KEYS.FISHERS) || [];
  }

  saveFishers(fishers: Fisher[]): void {
    this.setItem(STORAGE_KEYS.FISHERS, fishers);
  }

  addFisher(fisher: Omit<Fisher, 'id' | 'registrationDate' | 'totalCatches' | 'avgCatchPerTrip'>): Fisher {
    const fishers = this.getFishers();
    const newFisher: Fisher = {
      ...fisher,
      id: `fisher-${Date.now()}`,
      registrationDate: new Date().toISOString(),
      totalCatches: 0,
      avgCatchPerTrip: 0,
    };
    fishers.push(newFisher);
    this.saveFishers(fishers);
    return newFisher;
  }

  updateFisher(fisher: Fisher): void {
    const fishers = this.getFishers();
    const index = fishers.findIndex(f => f.id === fisher.id);
    if (index !== -1) {
      fishers[index] = fisher;
      this.saveFishers(fishers);
    }
  }

  deleteFisher(id: string): void {
    const fishers = this.getFishers().filter(f => f.id !== id);
    this.saveFishers(fishers);
  }

  // Catch Records
  getCatchRecords(): CatchRecord[] {
    return this.getItem<CatchRecord[]>(STORAGE_KEYS.CATCH_RECORDS) || [];
  }

  saveCatchRecords(records: CatchRecord[]): void {
    this.setItem(STORAGE_KEYS.CATCH_RECORDS, records);
  }

  addCatchRecord(record: Omit<CatchRecord, 'id' | 'fisherName' | 'coordinates' | 'tripDuration' | 'fuelCost' | 'crewSize'>): CatchRecord {
    const records = this.getCatchRecords();
    const fisher = this.getFishers().find(f => f.id === record.fisherId);
    
    const newRecord: CatchRecord = {
      id: `catch-${Date.now()}`,
      fisherName: fisher?.name || 'Unknown',
      coordinates: { lat: 0, lng: 0 },
      tripDuration: 0,
      fuelCost: 0,
      crewSize: 0,
      ...record,
    };
    records.push(newRecord);
    this.saveCatchRecords(records);

    // Update fisher stats
    this.updateFisherStats(record.fisherId);
    
    return newRecord;
  }

  private updateFisherStats(fisherId: string): void {
    const fishers = this.getFishers();
    const fisherIndex = fishers.findIndex(f => f.id === fisherId);
    if (fisherIndex === -1) return;

    const catchRecords = this.getCatchRecords().filter(r => r.fisherId === fisherId);
    const totalCatches = catchRecords.length;
    const totalWeight = catchRecords.reduce((sum, r) => sum + r.totalWeight, 0);
    const avgCatchPerTrip = totalCatches > 0 ? Math.round(totalWeight / totalCatches) : 0;

    fishers[fisherIndex] = {
      ...fishers[fisherIndex],
      totalCatches,
      avgCatchPerTrip,
    };
    this.saveFishers(fishers);
  }

  // Field Observations
  getFieldObservations(): FieldObservation[] {
    return this.getItem<FieldObservation[]>(STORAGE_KEYS.FIELD_OBSERVATIONS) || [];
  }

  saveFieldObservations(observations: FieldObservation[]): void {
    this.setItem(STORAGE_KEYS.FIELD_OBSERVATIONS, observations);
  }

  addFieldObservation(observation: Omit<FieldObservation, 'id' | 'createdAt'>): FieldObservation {
    const observations = this.getFieldObservations();
    const newObservation: FieldObservation = {
      ...observation,
      id: `obs-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    observations.push(newObservation);
    this.saveFieldObservations(observations);
    return newObservation;
  }

  deleteFieldObservation(id: string): void {
    const observations = this.getFieldObservations().filter(o => o.id !== id);
    this.saveFieldObservations(observations);
  }

  // System Users
  getSystemUsers(): SystemUser[] {
    return this.getItem<SystemUser[]>(STORAGE_KEYS.SYSTEM_USERS) || [];
  }

  saveSystemUsers(users: SystemUser[]): void {
    this.setItem(STORAGE_KEYS.SYSTEM_USERS, users);
  }

  updateSystemUser(user: SystemUser): void {
    const users = this.getSystemUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.saveSystemUsers(users);
    }
  }

  // Initialize with mock data if storage is empty
  initializeWithMockData(mockFishers: Fisher[], mockCatchRecords: CatchRecord[], mockSystemUsers: SystemUser[]): void {
    if (this.getFishers().length === 0) {
      this.saveFishers(mockFishers);
    }
    if (this.getCatchRecords().length === 0) {
      this.saveCatchRecords(mockCatchRecords);
    }
    if (this.getSystemUsers().length === 0) {
      this.saveSystemUsers(mockSystemUsers);
    }
  }

  // Get today's summary
  getTodaySummary(): {
    catchRecords: number;
    totalWeight: number;
    totalValue: number;
    activeFishers: number;
  } {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = this.getCatchRecords().filter(r => r.date.startsWith(today));
    
    return {
      catchRecords: todayRecords.length,
      totalWeight: todayRecords.reduce((sum, r) => sum + r.totalWeight, 0),
      totalValue: todayRecords.reduce((sum, r) => sum + (r.marketValue || 0), 0),
      activeFishers: new Set(todayRecords.map(r => r.fisherId)).size,
    };
  }
}

export const storageService = new StorageService();
