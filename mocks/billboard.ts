import type { BillboardCategory, BillboardDisplayItem, BillboardSlot, BillboardSubmission, BillboardTargetType, BillboardTicket } from '@/types/billboard';

export const mockBillboardPolicy = {
  welcomeTickets: 1,
  breederVerifiedTickets: 2,
  exposureMinutes: 60,
  adminGrantEnabled: true,
  paidPlansReady: false,
  futurePaidPlans: [
    { label: '1시간', price: 2000 },
    { label: '3시간', price: 5000 },
    { label: '6시간', price: 9000 },
    { label: '24시간', price: 25000 },
  ],
} as const;

export const mockBillboardTickets: BillboardTicket[] = [
  {
    id: 'ticket-welcome-1',
    userId: 'user-1',
    status: 'available',
    source: 'welcome',
    expiresAt: '2026-07-27T23:59:59+09:00',
    createdAt: '2026-06-27T09:00:00+09:00',
  },
  {
    id: 'ticket-breeder-1',
    userId: 'user-1',
    status: 'available',
    source: 'breeder_verified',
    expiresAt: '2026-08-27T23:59:59+09:00',
    createdAt: '2026-06-27T09:10:00+09:00',
  },
  {
    id: 'ticket-breeder-2',
    userId: 'user-1',
    status: 'available',
    source: 'breeder_verified',
    expiresAt: '2026-08-27T23:59:59+09:00',
    createdAt: '2026-06-27T09:11:00+09:00',
  },
];

export const mockBillboardSlots: BillboardSlot[] = [
  {
    id: 'slot-20260627-1000',
    startAt: '2026-06-27T10:00:00+09:00',
    endAt: '2026-06-27T11:00:00+09:00',
    status: 'available',
  },
  {
    id: 'slot-20260627-1100',
    startAt: '2026-06-27T11:00:00+09:00',
    endAt: '2026-06-27T12:00:00+09:00',
    status: 'reserved',
    reservedByUserId: 'user-22',
  },
  {
    id: 'slot-20260627-1200',
    startAt: '2026-06-27T12:00:00+09:00',
    endAt: '2026-06-27T13:00:00+09:00',
    status: 'available',
  },
  {
    id: 'slot-20260627-1300',
    startAt: '2026-06-27T13:00:00+09:00',
    endAt: '2026-06-27T14:00:00+09:00',
    status: 'available',
  },
];

export const mockBillboardSubmissions: BillboardSubmission[] = [
  {
    id: 'submission-1',
    userId: 'user-1',
    ticketId: 'ticket-used-1',
    originalTitle: '보석거북 연구소 다이아몬드백 분양 오픈',
    title: '보석거북 연구소 다이아몬드백 분양 오픈',
    type: 'listing',
    targetId: 'l3',
    slotId: 'slot-20260626-1500',
    status: 'ended',
    createdAt: '2026-06-26T10:00:00+09:00',
  },
];

export const mockBillboardDisplayItems: BillboardDisplayItem[] = [
  {
    id: 'billboard-listing-1',
    originalTitle: '보석거북 연구소 다이아몬드백 분양 오픈',
    title: '보석거북 연구소 다이아몬드백 분양 오픈',
    type: 'listing',
    targetId: 'l3',
    expiresAt: '2026-07-05T18:00:00+09:00',
    categories: ['home', 'listing'],
  },
  {
    id: 'billboard-community-1',
    originalTitle: '헤르만 육지거북 입문 질문 있습니다',
    title: '헤르만 육지거북 입문 질문 있습니다',
    type: 'post',
    targetId: 'p1',
    expiresAt: '2026-07-03T21:00:00+09:00',
    categories: ['home', 'community'],
  },
  {
    id: 'billboard-breeder-1',
    originalTitle: '신규 인증 브리더 등록',
    title: '신규 인증 브리더 등록',
    type: 'breeder',
    targetId: 'b1',
    expiresAt: '2026-07-08T12:00:00+09:00',
    categories: ['home', 'listing'],
  },
  {
    id: 'billboard-community-2',
    originalTitle: '알 성장 문의',
    title: '알 성장 문의',
    type: 'post',
    targetId: 'p2',
    expiresAt: '2026-07-09T12:00:00+09:00',
    categories: ['home', 'community'],
  },
  {
    id: 'billboard-notice-1',
    originalTitle: '이번 주 인증 브리더 특별 분양',
    title: '이번 주 인증 브리더 특별 분양',
    type: 'notice',
    targetId: 'notice-1',
    expiresAt: '2026-07-10T23:59:59+09:00',
    categories: ['home', 'listing', 'community'],
  },
];

export const billboardTargetOptions: Array<{ label: string; value: BillboardTargetType; targetId: string }> = [
  { label: '분양', value: 'listing', targetId: 'l3' },
  { label: '게시글', value: 'post', targetId: 'p1' },
  { label: '브리더', value: 'breeder', targetId: 'b1' },
  { label: '공지', value: 'notice', targetId: 'notice-1' },
];

export function getBillboardItemsByCategory(category: BillboardCategory) {
  return mockBillboardDisplayItems.filter((item) => item.categories.includes(category));
}


