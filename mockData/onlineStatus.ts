export type OnlineStatus = 'online' | 'recent' | 'offline';

export interface BreederOnlineStatus {
  breederId: string;
  status: OnlineStatus;
  lastActiveText: string;
}

export const breederOnlineStatuses: Record<string, BreederOnlineStatus> = {
  b1: { breederId: 'b1', status: 'online', lastActiveText: '지금 접속중' },
  b2: { breederId: 'b2', status: 'recent', lastActiveText: '8분 전 접속' },
  b3: { breederId: 'b3', status: 'offline', lastActiveText: '오늘 접속' },
};

export const fallbackBreederOnlineStatus: BreederOnlineStatus = {
  breederId: 'fallback',
  status: 'offline',
  lastActiveText: '오늘 접속',
};

export function getBreederOnlineStatus(breederId: string): BreederOnlineStatus {
  return breederOnlineStatuses[breederId] ?? { ...fallbackBreederOnlineStatus, breederId };
}
