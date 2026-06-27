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
    title: '\uBCF4\uC11D\uAC70\uBD81 \uC5F0\uAD6C\uC18C \uB2E4\uC774\uC544\uBAAC\uB4DC\uBC31 \uBD84\uC591 \uC624\uD508',
    type: 'listing',
    targetId: 'l3',
    expiresAt: '2026-07-04T23:59:59+09:00',
  },
  {
    id: 'billboard-2',
    title: '\uD5E4\uB974\uB9CC \uC721\uC9C0\uAC70\uBD81 \uC785\uBB38 \uC9C8\uBB38 \uB2F5\uBCC0 \uBD80\uD0C1\uB4DC\uB824\uC694',
    type: 'post',
    targetId: 'p1',
    expiresAt: '2026-07-01T23:59:59+09:00',
  },
  {
    id: 'billboard-3',
    title: '\uD551\uD06C\uC250 \uBE0C\uB9AC\uB354 \uC2E0\uADDC \uD6C4\uAE30 \uB4F1\uB85D',
    type: 'breeder',
    targetId: 'b1',
    expiresAt: '2026-07-02T23:59:59+09:00',
  },
  {
    id: 'billboard-4',
    title: '\uC774\uBC88 \uC8FC \uC778\uC99D \uBE0C\uB9AC\uB354 \uD2B9\uBCC4 \uBD84\uC591',
    type: 'notice',
    targetId: 'notice-1',
    expiresAt: '2026-07-05T23:59:59+09:00',
  },
];
