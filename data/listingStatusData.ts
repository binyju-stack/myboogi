import type { Listing, ListingStatus } from '@/types';

export const listingStatusOptions: { key: ListingStatus; label: string; actionLabel: string }[] = [
  { key: 'active', label: '분양중', actionLabel: '분양중으로 변경' },
  { key: 'reserved', label: '예약중', actionLabel: '예약중으로 변경' },
  { key: 'completed', label: '분양완료', actionLabel: '분양완료로 변경' },
];

export const listingStatusMeta: Record<ListingStatus, { label: string; badgeClass: string; textClass: string; softClass: string }> = {
  active: { label: '분양중', badgeClass: 'bg-berry', textClass: 'text-white', softClass: 'bg-blush' },
  reserved: { label: '예약중', badgeClass: 'bg-[#F59E0B]', textClass: 'text-white', softClass: 'bg-cream' },
  completed: { label: '분양완료', badgeClass: 'bg-muted', textClass: 'text-white', softClass: 'bg-soft' },
};

export function getListingStatus(listing: Listing): ListingStatus {
  if (listing.listingStatus) return listing.listingStatus;
  if (listing.status.includes('예약')) return 'reserved';
  if (listing.status.includes('완료')) return 'completed';
  return 'active';
}
