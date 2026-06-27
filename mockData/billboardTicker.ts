export type BillboardTickerType = 'post' | 'listing' | 'breeder' | 'notice';

export type BillboardTickerItem = {
  id: string;
  title: string;
  type: BillboardTickerType;
  targetId: string;
  expiresAt: string;
};

export const billboardTickerItems: BillboardTickerItem[] = [
  {
    id: 'billboard-1',
    title: '보석거북 연구소 다이아몬드백 분양 오픈',
    type: 'listing',
    targetId: 'l3',
    expiresAt: '2026-07-04T23:59:59+09:00',
  },
  {
    id: 'billboard-2',
    title: '헤르만 육지거북 입문 질문 답변 부탁드려요',
    type: 'post',
    targetId: 'p1',
    expiresAt: '2026-07-01T23:59:59+09:00',
  },
  {
    id: 'billboard-3',
    title: '핑크쉐 브리더 신규 후기 등록',
    type: 'breeder',
    targetId: 'b1',
    expiresAt: '2026-07-02T23:59:59+09:00',
  },
  {
    id: 'billboard-4',
    title: '이번 주 인증 브리더 특별 분양',
    type: 'notice',
    targetId: 'notice-1',
    expiresAt: '2026-07-05T23:59:59+09:00',
  },
];
