import { breederReviews, breeders, listings } from './mockData';
import type { BreederReview, ReviewStatus, ReviewType } from '@/types';

export const reviewTypeLabels: Record<ReviewType, string> = {
  general: '일반 후기',
  contact_based: '문의 기반 후기',
  verified_trade: '실거래 인증',
};

export const reviewStatusLabels: Record<ReviewStatus, string> = {
  active: '정상',
  hidden: '숨김',
  pending: '검토중',
};

export function getReviewSummary(breederId: string) {
  const breeder = breeders.find((item) => item.id === breederId);
  const reviews = breederReviews.filter((review) => review.breederId === breederId);
  const visibleReviews = reviews.filter((review) => review.status !== 'hidden');
  const contactBasedCount = reviews.filter((review) => review.reviewType === 'contact_based').length;
  const verifiedTradeCount = reviews.filter((review) => review.reviewType === 'verified_trade').length;
  const averageRating = visibleReviews.length
    ? visibleReviews.reduce((sum, review) => sum + review.rating, 0) / visibleReviews.length
    : breeder?.rating ?? 0;
  const completedListings = listings.filter((listing) => listing.breederId === breederId && listing.listingStatus === 'completed').length;

  return {
    totalReviews: breeder?.reviews ?? reviews.length,
    contactBasedCount,
    verifiedTradeCount,
    averageRating,
    completedTrades: breeder?.trades ?? completedListings,
  };
}

export const myReviews: BreederReview[] = breederReviews.filter((review) => review.userId === 'u1' || review.userId === 'u3');

export const adminReviewRows = breederReviews.map((review) => {
  const breeder = breeders.find((item) => item.id === review.breederId);
  return {
    ...review,
    breederName: breeder?.name ?? '알 수 없음',
  };
});
