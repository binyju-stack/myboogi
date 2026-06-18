export interface HolidayInfo {
  date: string;
  name: string;
  substitute?: boolean;
}

const koreanHolidays: HolidayInfo[] = [
  { date: '2026.01.01', name: '신정' },
  { date: '2026.02.16', name: '설날 연휴' },
  { date: '2026.02.17', name: '설날' },
  { date: '2026.02.18', name: '설날 연휴' },
  { date: '2026.03.01', name: '삼일절' },
  { date: '2026.03.02', name: '대체공휴일', substitute: true },
  { date: '2026.05.05', name: '어린이날' },
  { date: '2026.05.24', name: '부처님오신날' },
  { date: '2026.05.25', name: '대체공휴일', substitute: true },
  { date: '2026.06.06', name: '현충일' },
  { date: '2026.08.15', name: '광복절' },
  { date: '2026.08.17', name: '대체공휴일', substitute: true },
  { date: '2026.09.24', name: '추석 연휴' },
  { date: '2026.09.25', name: '추석' },
  { date: '2026.09.26', name: '추석 연휴' },
  { date: '2026.10.03', name: '개천절' },
  { date: '2026.10.05', name: '대체공휴일', substitute: true },
  { date: '2026.10.09', name: '한글날' },
  { date: '2026.12.25', name: '성탄절' },
];

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function parseDate(date: string) {
  const [year, month, day] = date.split('.').map(Number);
  return new Date(year, month - 1, day);
}

export function getHoliday(date: string) {
  return koreanHolidays.find((holiday) => holiday.date === date);
}

export function isSunday(date: Date) {
  return date.getDay() === 0;
}

export function getCalendarDayMeta(date: Date) {
  const formatted = formatDate(date);
  const holiday = getHoliday(formatted);

  return {
    date: formatted,
    holidayName: holiday?.name,
    isHoliday: Boolean(holiday),
    isSunday: isSunday(date),
  };
}
