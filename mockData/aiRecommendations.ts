export type AIRecommendationSource = 'mock' | 'ai' | 'behavior';

export interface AIRecommendedListing {
  id: string;
  targetListingId: string;
  species: string;
  title: string;
  gender: string;
  age: string;
  price: number;
  imageUrl: string;
  breederName: string;
  location: string;
  rating: number;
  views: number;
  likes: number;
  comments: number;
  recommendationReason: string;
  matchScore: number;
  source: AIRecommendationSource;
}

const turtleImage = 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=78';

export const aiRecommendedListings: AIRecommendedListing[] = [
  {
    id: 'ai-1',
    targetListingId: 'l2',
    species: '헤르만 육지거북',
    title: '초보자에게 적합한 건강한 헤르만',
    gender: '암컷',
    age: '베이비',
    price: 380000,
    imageUrl: turtleImage,
    breederName: '느린숲 거북이',
    location: '서울 송파구',
    rating: 4.9,
    views: 1240,
    likes: 156,
    comments: 33,
    recommendationReason: '비슷한 개체를 본 사용자가 많이 찜했어요',
    matchScore: 92,
    source: 'mock',
  },
  {
    id: 'ai-2',
    targetListingId: 'l3',
    species: '다이아몬드백 테라핀',
    title: '후기 좋은 브리더의 선명한 테라핀',
    gender: '암컷',
    age: '베이비',
    price: 450000,
    imageUrl: turtleImage,
    breederName: '보석거북 연구소',
    location: '인천 연수구',
    rating: 5.0,
    views: 1608,
    likes: 181,
    comments: 41,
    recommendationReason: '최근 조회가 빠르게 늘고 있어요',
    matchScore: 89,
    source: 'mock',
  },
  {
    id: 'ai-3',
    targetListingId: 'l1',
    species: '레오파드 육지거북',
    title: '첫 사육에도 부담 적은 유체',
    gender: '미구분',
    age: '유체',
    price: 380000,
    imageUrl: turtleImage,
    breederName: '핑크쉘 브리더',
    location: '경기 성남시',
    rating: 4.8,
    views: 980,
    likes: 124,
    comments: 21,
    recommendationReason: '초보 입문자에게 많이 저장된 개체예요',
    matchScore: 86,
    source: 'mock',
  },
];

export function getAIRecommendedListings(currentListingId?: string): AIRecommendedListing[] {
  return aiRecommendedListings.filter((item) => item.targetListingId !== currentListingId);
}