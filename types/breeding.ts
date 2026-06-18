export type BreedingTargetSex = 'male' | 'female' | 'mixed';
export type BreedingStatus = 'incubating' | 'hatched' | 'failed';
export type BreedingEventType = 'laid' | 'candling' | 'hatch' | 'temperature';

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
  status: BreedingStatus;
  memo?: string;
  temperatureLogs: TemperatureLog[];
  events: BreedingEvent[];
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
