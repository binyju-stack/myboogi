import type { BreedingTargetSex } from '@/types/breeding';
import { formatDate, parseDate } from '@/utils/holiday';

interface CalculateBreedingScheduleInput {
  layDate: string;
  targetSex: BreedingTargetSex;
  targetTemperature: number;
}

const targetSexRules: Record<BreedingTargetSex, { minTemp: number; maxTemp: number; minDays: number; maxDays: number }> = {
  male: { minTemp: 27.5, maxTemp: 29.0, minDays: 80, maxDays: 110 },
  mixed: { minTemp: 29.0, maxTemp: 30.5, minDays: 70, maxDays: 95 },
  female: { minTemp: 30.5, maxTemp: 32.0, minDays: 60, maxDays: 85 },
};

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getTargetSexTemperatureRange(targetSex: BreedingTargetSex) {
  return targetSexRules[targetSex];
}

export function calculateBreedingSchedule({ layDate, targetSex, targetTemperature }: CalculateBreedingScheduleInput) {
  const laid = parseDate(layDate);
  const rule = getTargetSexTemperatureRange(targetSex);
  const candlingDate = addDays(laid, 7);
  const expectedHatchStartDate = addDays(laid, rule.minDays);
  const expectedHatchEndDate = addDays(laid, rule.maxDays);
  const temperatureCheckDates = Array.from({ length: Math.ceil(rule.maxDays / 7) }, (_, index) => addDays(laid, (index + 1) * 7))
    .filter((date) => date.getTime() < expectedHatchEndDate.getTime());
  let warningMessage: string | undefined;

  if (targetTemperature < rule.minTemp) {
    warningMessage = '현재 온도는 낮은 편입니다. 부화 기간이 길어질 수 있습니다.';
  }

  if (targetTemperature > rule.maxTemp) {
    warningMessage = '현재 온도는 높은 편입니다. 온도 편차를 주의해주세요.';
  }

  return {
    candlingDate: formatDate(candlingDate),
    expectedHatchStartDate: formatDate(expectedHatchStartDate),
    expectedHatchEndDate: formatDate(expectedHatchEndDate),
    temperatureCheckDates: temperatureCheckDates.map(formatDate),
    warningMessage,
    recommendedTemperatureRange: `${rule.minTemp.toFixed(1)}℃ ~ ${rule.maxTemp.toFixed(1)}℃`,
  };
}
