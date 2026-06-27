import type { ImageSourcePropType } from 'react-native';

export type TrustGrade = 'Diamond' | 'Platinum' | 'Gold';

export interface BreederTrust {
  rating: number;
  reviewCount: number;
  responseRate: number;
  avgResponseMinutes: number;
  completedDeals: number;
  verified: boolean;
  recentActiveText: string;
  trustGrade: TrustGrade;
}

export interface GrowthTimelineItem {
  id: string;
  date: string;
  ageLabel: string;
  weight: string;
  shellLength: string;
  note: string;
  imageSource?: ImageSourcePropType;
}

export const defaultBreederTrust: BreederTrust = {
  rating: 4.9,
  reviewCount: 152,
  responseRate: 98,
  avgResponseMinutes: 5,
  completedDeals: 82,
  verified: true,
  recentActiveText: '10분 전 접속',
  trustGrade: 'Diamond',
};

export const breederTrustById: Record<string, BreederTrust> = {
  b1: defaultBreederTrust,
  b2: {
    rating: 4.8,
    reviewCount: 96,
    responseRate: 94,
    avgResponseMinutes: 8,
    completedDeals: 57,
    verified: true,
    recentActiveText: '24분 전 접속',
    trustGrade: 'Platinum',
  },
  b3: {
    rating: 4.7,
    reviewCount: 74,
    responseRate: 91,
    avgResponseMinutes: 12,
    completedDeals: 39,
    verified: true,
    recentActiveText: '1시간 전 접속',
    trustGrade: 'Gold',
  },
};

export const defaultGrowthTimeline: GrowthTimelineItem[] = [
  { id: 'g1', date: '2026.02', ageLabel: '생후 2개월', weight: '52g', shellLength: '4.8cm', note: '입양 전 건강 체크 완료' },
  { id: 'g2', date: '2026.04', ageLabel: '생후 4개월', weight: '87g', shellLength: '6.1cm', note: '먹이 반응 안정적' },
  { id: 'g3', date: '2026.06', ageLabel: '생후 6개월', weight: '145g', shellLength: '8.4cm', note: '최근 성장 상태 양호' },
];

export const growthTimelineByListingId: Record<string, GrowthTimelineItem[]> = {
  l1: defaultGrowthTimeline,
  l2: [
    { id: 'g4', date: '2026.01', ageLabel: '생후 1개월', weight: '38g', shellLength: '4.1cm', note: '초기 먹이 반응 확인' },
    { id: 'g5', date: '2026.03', ageLabel: '생후 3개월', weight: '74g', shellLength: '5.7cm', note: '온욕 후 활동성 양호' },
    { id: 'g6', date: '2026.06', ageLabel: '생후 6개월', weight: '132g', shellLength: '8.0cm', note: '등갑 성장선 안정적' },
  ],
};

export const growthTimelineByBreederId: Record<string, GrowthTimelineItem[]> = {
  b1: defaultGrowthTimeline,
  b2: growthTimelineByListingId.l2,
};

export function getBreederTrust(breederId: string): BreederTrust {
  return breederTrustById[breederId] ?? defaultBreederTrust;
}

export function getGrowthTimeline(listingId: string): GrowthTimelineItem[] {
  return growthTimelineByListingId[listingId] ?? defaultGrowthTimeline;
}

export function getBreederGrowthTimeline(breederId: string): GrowthTimelineItem[] {
  return growthTimelineByBreederId[breederId] ?? defaultGrowthTimeline;
}
