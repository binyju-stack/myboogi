export interface MarketPriceReference {
  listingId: string;
  species: string;
  morph: string;
  conditionLabel: string;
  sampleCount: number;
  minPrice: number;
  avgPrice: number;
  maxPrice: number;
  currentPrice: number;
  comparedToAverage: number;
}

export const defaultMarketPriceReference: MarketPriceReference = {
  listingId: 'default',
  species: '다이아몬드백 테라핀',
  morph: '뉴블러드',
  conditionLabel: '암컷 · 베이비 · 7cm',
  sampleCount: 18,
  minPrice: 250000,
  avgPrice: 310000,
  maxPrice: 420000,
  currentPrice: 450000,
  comparedToAverage: 14,
};

export const marketPriceByListingId: Record<string, MarketPriceReference> = {
  l1: {
    listingId: 'l1',
    species: '레오파드 육지거북',
    morph: '기본 모프',
    conditionLabel: '미구분 · 유체 · 6cm',
    sampleCount: 22,
    minPrice: 280000,
    avgPrice: 340000,
    maxPrice: 430000,
    currentPrice: 380000,
    comparedToAverage: 12,
  },
  l2: {
    listingId: 'l2',
    species: '설가타 육지거북',
    morph: '기본 모프',
    conditionLabel: '수컷 · 유체 · 8cm',
    sampleCount: 16,
    minPrice: 220000,
    avgPrice: 270000,
    maxPrice: 350000,
    currentPrice: 260000,
    comparedToAverage: -4,
  },
  l3: defaultMarketPriceReference,
};

export function getMarketPriceReference(listingId: string): MarketPriceReference {
  return marketPriceByListingId[listingId] ?? defaultMarketPriceReference;
}
