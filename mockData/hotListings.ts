import type { Listing } from '@/types';

export type HotBadgeType = 'HOT' | 'BEST' | 'NEW' | 'views' | 'comments' | 'likes' | 'recommended';

export type HotReasons = {
  viewsIncreaseRate: number;
  likesIncreaseCount: number;
  commentsIncreaseCount: number;
  recentLabel: string;
};

export type HotListingMetric = {
  id: string;
  comments: number;
  createdAt: string;
  hotScore: number;
  badgeType?: HotBadgeType;
  hotReasons: HotReasons;
};

export type HotListing = Listing & HotListingMetric & {
  badgeType: HotBadgeType;
};

export const hotListingMetrics: HotListingMetric[] = [
  {
    id: 'l3',
    comments: 21,
    createdAt: '2026-06-27T09:00:00+09:00',
    hotScore: 0,
    badgeType: undefined,
    hotReasons: {
      viewsIncreaseRate: 182,
      likesIncreaseCount: 43,
      commentsIncreaseCount: 21,
      recentLabel: '24시간 내 등록',
    },
  },
  {
    id: 'l2',
    comments: 14,
    createdAt: '2026-06-26T18:20:00+09:00',
    hotScore: 0,
    badgeType: undefined,
    hotReasons: {
      viewsIncreaseRate: 128,
      likesIncreaseCount: 31,
      commentsIncreaseCount: 14,
      recentLabel: '1일 내 등록',
    },
  },
  {
    id: 'l1',
    comments: 18,
    createdAt: '2026-06-25T11:30:00+09:00',
    hotScore: 0,
    badgeType: undefined,
    hotReasons: {
      viewsIncreaseRate: 96,
      likesIncreaseCount: 26,
      commentsIncreaseCount: 18,
      recentLabel: '3일 내 등록',
    },
  },
  {
    id: 'l5',
    comments: 9,
    createdAt: '2026-06-27T07:40:00+09:00',
    hotScore: 0,
    badgeType: undefined,
    hotReasons: {
      viewsIncreaseRate: 84,
      likesIncreaseCount: 17,
      commentsIncreaseCount: 9,
      recentLabel: '24시간 내 등록',
    },
  },
  {
    id: 'l4',
    comments: 7,
    createdAt: '2026-06-20T12:00:00+09:00',
    hotScore: 0,
    badgeType: undefined,
    hotReasons: {
      viewsIncreaseRate: 62,
      likesIncreaseCount: 12,
      commentsIncreaseCount: 7,
      recentLabel: '1주 내 등록',
    },
  },
];

const metricById = new Map(hotListingMetrics.map((metric) => [metric.id, metric]));
const referenceDate = new Date('2026-06-27T12:00:00+09:00').getTime();

function getRecentBonus(createdAt: string) {
  const createdTime = new Date(createdAt).getTime();
  if (Number.isNaN(createdTime)) return 0;

  const ageHours = Math.max(0, (referenceDate - createdTime) / (1000 * 60 * 60));
  if (ageHours <= 24) return 100;
  if (ageHours <= 72) return 70;
  if (ageHours <= 168) return 40;
  return 10;
}

export function calculateHotScore(listing: Listing, metric: HotListingMetric) {
  const recentBonus = getRecentBonus(metric.createdAt);
  return Math.round(
    listing.views * 0.4
      + listing.likes * 0.3
      + metric.comments * 0.2
      + recentBonus * 0.1,
  );
}

export function resolveHotBadgeType(listing: Listing, metric: HotListingMetric, rank: number): HotBadgeType {
  const score = calculateHotScore(listing, metric);
  const ageHours = (referenceDate - new Date(metric.createdAt).getTime()) / (1000 * 60 * 60);

  if (rank === 0) return 'HOT';
  if (score >= 240) return 'BEST';
  if (ageHours <= 24) return 'NEW';
  if (metric.hotReasons.viewsIncreaseRate >= 150) return 'views';
  if (metric.hotReasons.commentsIncreaseCount >= 20) return 'comments';
  if (metric.hotReasons.likesIncreaseCount >= 35) return 'likes';
  return 'recommended';
}

export function getHotListings(listings: Listing[]) {
  const scoredListings = listings
    .map((listing) => {
      const metric = metricById.get(listing.id);
      if (!metric) return null;

      return {
        ...listing,
        ...metric,
        hotScore: calculateHotScore(listing, metric),
      };
    })
    .filter(Boolean) as Array<Listing & HotListingMetric>;

  return scoredListings
    .sort((a, b) => b.hotScore - a.hotScore)
    .map((listing, index) => ({
      ...listing,
      badgeType: resolveHotBadgeType(listing, listing, index),
    }))
    .slice(0, 5);
}
