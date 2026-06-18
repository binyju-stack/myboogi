import type { BreedingClutch, BreedingClutchCreateInput, BreedingStatus, BreedingTargetSex } from '@/types/breeding';

export const breedingClutches: BreedingClutch[] = [
  {
    id: 'clutch-4',
    turtleId: 'turtle-1',
    turtleName: '설가타 암컷 A',
    species: '설가타 육지거북',
    clutchNumber: 4,
    layDate: '2026.06.05',
    eggCount: 6,
    incubatorName: '부기룸 1호',
    targetTemperature: 31.5,
    currentTemperature: 31.4,
    humidity: 82,
    targetSex: 'female',
    expectedHatchDate: '2026.09.03',
    status: 'incubating',
    temperatureLogs: [
      { id: 'log-4-1', date: '06.15', temperature: 31.5, humidity: 82 },
      { id: 'log-4-2', date: '06.16', temperature: 31.4, humidity: 83 },
      { id: 'log-4-3', date: '06.17', temperature: 31.6, humidity: 81 },
    ],
    events: [
      { id: 'event-4-1', date: '2026.06.05', type: 'laid', title: '산란', description: '6개 산란 확인' },
      { id: 'event-4-2', date: '2026.06.12', type: 'candling', title: '검란', description: '혈관 발달 확인' },
      { id: 'event-4-3', date: '2026.06.18', type: 'temperature', title: '온도 체크 필요', description: '현재온도 31.4℃, 습도 82%' },
      { id: 'event-4-4', date: '2026.09.03', type: 'hatch', title: '부화 예정', description: '90일 기준 예상일' },
    ],
  },
  {
    id: 'clutch-5',
    turtleId: 'turtle-2',
    turtleName: '헤르만 암컷 B',
    species: '헤르만 육지거북',
    clutchNumber: 5,
    layDate: '2026.06.01',
    eggCount: 5,
    incubatorName: '소형 인큐 1호',
    targetTemperature: 29.5,
    currentTemperature: 29.4,
    humidity: 78,
    targetSex: 'mixed',
    expectedHatchDate: '2026.06.30',
    status: 'incubating',
    temperatureLogs: [
      { id: 'log-5-1', date: '06.15', temperature: 29.5, humidity: 78 },
      { id: 'log-5-2', date: '06.16', temperature: 29.4, humidity: 79 },
      { id: 'log-5-3', date: '06.17', temperature: 29.6, humidity: 77 },
    ],
    events: [
      { id: 'event-5-1', date: '2026.06.01', type: 'laid', title: '산란', description: '5개 산란 확인' },
      { id: 'event-5-2', date: '2026.06.08', type: 'candling', title: '검란', description: '전란 유정 확인' },
      { id: 'event-5-3', date: '2026.06.20', type: 'temperature', title: '온도 체크 필요', description: '습도 78% 유지 중' },
      { id: 'event-5-4', date: '2026.06.30', type: 'hatch', title: '부화 예정', description: '가장 가까운 부화 예정일' },
    ],
  },
  {
    id: 'clutch-3',
    turtleId: 'turtle-1',
    turtleName: '설가타 암컷 A',
    species: '설가타 육지거북',
    clutchNumber: 3,
    layDate: '2026.05.18',
    eggCount: 4,
    incubatorName: '부기룸 2호',
    targetTemperature: 30.2,
    currentTemperature: 30.1,
    humidity: 80,
    targetSex: 'male',
    expectedHatchDate: '2026.08.16',
    status: 'incubating',
    temperatureLogs: [
      { id: 'log-3-1', date: '06.15', temperature: 30.2, humidity: 80 },
      { id: 'log-3-2', date: '06.16', temperature: 30.1, humidity: 81 },
      { id: 'log-3-3', date: '06.17', temperature: 30.3, humidity: 79 },
    ],
    events: [
      { id: 'event-3-1', date: '2026.05.18', type: 'laid', title: '산란', description: '4개 산란 확인' },
      { id: 'event-3-2', date: '2026.05.25', type: 'candling', title: '검란', description: '1개 발달 느림' },
      { id: 'event-3-3', date: '2026.08.16', type: 'hatch', title: '부화 예정', description: '90일 기준 예상일' },
    ],
  },
  {
    id: 'clutch-2',
    turtleId: 'turtle-2',
    turtleName: '헤르만 암컷 B',
    species: '헤르만 육지거북',
    clutchNumber: 2,
    layDate: '2026.04.02',
    eggCount: 3,
    incubatorName: '예비 인큐',
    targetTemperature: 28.5,
    currentTemperature: 28.4,
    humidity: 76,
    targetSex: 'male',
    expectedHatchDate: '2026.07.01',
    status: 'hatched',
    temperatureLogs: [
      { id: 'log-2-1', date: '06.15', temperature: 28.5, humidity: 76 },
      { id: 'log-2-2', date: '06.16', temperature: 28.4, humidity: 77 },
      { id: 'log-2-3', date: '06.17', temperature: 28.6, humidity: 75 },
    ],
    events: [
      { id: 'event-2-1', date: '2026.04.02', type: 'laid', title: '산란', description: '3개 산란 확인' },
      { id: 'event-2-2', date: '2026.04.09', type: 'candling', title: '검란', description: '전란 유정 확인' },
      { id: 'event-2-3', date: '2026.07.01', type: 'hatch', title: '부화완료', description: '2마리 부화 완료' },
    ],
  },
  {
    id: 'clutch-1',
    turtleId: 'turtle-3',
    turtleName: '레오파드 암컷 C',
    species: '레오파드 육지거북',
    clutchNumber: 1,
    layDate: '2026.03.11',
    eggCount: 3,
    incubatorName: '격리 인큐',
    targetTemperature: 30,
    currentTemperature: 30.1,
    humidity: 70,
    targetSex: 'mixed',
    expectedHatchDate: '2026.06.09',
    status: 'failed',
    temperatureLogs: [
      { id: 'log-1-1', date: '03.15', temperature: 30.0, humidity: 70 },
      { id: 'log-1-2', date: '03.16', temperature: 30.2, humidity: 68 },
      { id: 'log-1-3', date: '03.17', temperature: 30.1, humidity: 69 },
    ],
    events: [
      { id: 'event-1-1', date: '2026.03.11', type: 'laid', title: '산란', description: '3개 산란 확인' },
      { id: 'event-1-2', date: '2026.03.18', type: 'candling', title: '검란', description: '발달 정지 의심' },
      { id: 'event-1-3', date: '2026.04.01', type: 'temperature', title: '실패 처리', description: '전란 발달 정지' },
    ],
  },
];

export const breedingStatusLabels: Record<BreedingStatus, string> = {
  incubating: '인큐베이팅중',
  hatched: '부화완료',
  failed: '실패',
};

export const breedingTargetSexLabels: Record<BreedingTargetSex, string> = {
  male: '♂ 숫컷',
  female: '♀ 암컷',
  mixed: '혼합',
};

function parseDate(date: string) {
  const [year, month, day] = date.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function formatShortDate(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${month}.${day}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function calculateBreedingSchedule(layDate: string) {
  const laid = parseDate(layDate);
  const candlingDate = addDays(laid, 7);
  const expectedHatchDate = addDays(laid, 90);
  const temperatureCheckDates = Array.from({ length: 12 }, (_, index) => addDays(laid, (index + 1) * 7))
    .filter((date) => date.getTime() < expectedHatchDate.getTime());

  return {
    candlingDate: formatDate(candlingDate),
    expectedHatchDate: formatDate(expectedHatchDate),
    temperatureCheckDates: temperatureCheckDates.map(formatDate),
  };
}

export function createBreedingClutch(input: BreedingClutchCreateInput) {
  const schedule = calculateBreedingSchedule(input.layDate);
  const nextNumber = Math.max(...breedingClutches.map((clutch) => clutch.clutchNumber), 0) + 1;
  const id = `clutch-${Date.now()}`;
  const weeklyTemperatureEvents = schedule.temperatureCheckDates.map((date, index) => ({
    id: `${id}-temperature-${index + 1}`,
    date,
    type: 'temperature' as const,
    title: '온도 체크일',
    description: `${input.currentTemperature.toFixed(1)}℃ / 습도 ${input.humidity}% 확인 예정`,
  }));
  const clutch: BreedingClutch = {
    id,
    turtleId: input.turtleId,
    turtleName: input.turtleName,
    species: input.species,
    clutchNumber: nextNumber,
    layDate: input.layDate,
    eggCount: input.eggCount,
    incubatorName: input.incubatorName,
    targetTemperature: input.targetTemperature,
    currentTemperature: input.currentTemperature,
    humidity: input.humidity,
    targetSex: input.targetSex,
    expectedHatchDate: schedule.expectedHatchDate,
    status: 'incubating',
    memo: input.memo,
    temperatureLogs: [
      {
        id: `${id}-log-1`,
        date: formatShortDate(parseDate(input.layDate)),
        temperature: input.currentTemperature,
        humidity: input.humidity,
      },
    ],
    events: [
      { id: `${id}-laid`, date: input.layDate, type: 'laid', title: '산란일', description: `${input.eggCount}개 산란 기록` },
      { id: `${id}-candling`, date: schedule.candlingDate, type: 'candling', title: '검란 예정일', description: '산란일 기준 7일 후 검란 예정' },
      ...weeklyTemperatureEvents,
      { id: `${id}-hatch`, date: schedule.expectedHatchDate, type: 'hatch', title: '부화 예정일', description: '산란일 기준 90일 후 부화 예정' },
    ],
  };

  breedingClutches.unshift(clutch);
  return clutch;
}
