export type BreedingTargetSex = 'male' | 'female' | 'mixed';
export type BreedingStatus = 'incubating' | 'hatched' | 'failed';
export type BreedingEventType = 'laid' | 'candling' | 'hatch' | 'temperature';
export type EggStatus = 'unknown' | 'developing' | 'infertile' | 'stopped' | 'hatched' | 'discarded';

export interface TemperatureLog {
  id: string;
  date: string;
  temperature: number;
  humidity: number;
}

export interface BreedingEvent {
  id: string;
  date: string;
  type: BreedingEventType;
  title: string;
  description: string;
}

export interface BreedingEgg {
  id: string;
  clutchId: string;
  eggNumber: number;
  status: EggStatus;
  memo?: string;
  lastCheckedAt?: string;
  photos: string[];
}

export interface CandlingRecord {
  id: string;
  clutchId: string;
  date: string;
  eggNumber: number;
  status: EggStatus;
  memo: string;
}

export interface BreedingClutch {
  id: string;
  turtleId: string;
  turtleName: string;
  species: string;
  clutchNumber: number;
  layDate: string;
  eggCount: number;
  incubatorName: string;
  targetTemperature: number;
  currentTemperature: number;
  humidity: number;
  targetSex: BreedingTargetSex;
  expectedHatchDate: string;
  expectedHatchStartDate: string;
  expectedHatchEndDate: string;
  candlingDate: string;
  temperatureCheckDates: string[];
  temperatureWarning?: string;
  holidayName?: string;
  status: BreedingStatus;
  memo?: string;
  temperatureLogs: TemperatureLog[];
  events: BreedingEvent[];
  eggs: BreedingEgg[];
  candlingRecords: CandlingRecord[];
}

export interface BreedingClutchCreateInput {
  turtleId: string;
  turtleName: string;
  species: string;
  layDate: string;
  eggCount: number;
  incubatorName: string;
  targetTemperature: number;
  currentTemperature: number;
  humidity: number;
  targetSex: BreedingTargetSex;
  memo?: string;
}
