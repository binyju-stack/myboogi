export interface HomeBanner {
  id: string;
  title: string;
  description: string;
  image: string;
  actionLabel: string;
  linkUrl: string;
  isActive: boolean;
  isAd: boolean;
  sortOrder: number;
  startDate: string;
  endDate: string;
}

export const adminBanners: HomeBanner[] = [
  {
    id: 'banner-1',
    title: '이번주 추천 개체',
    description: '희귀 뉴블러드 테라핀 입고',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=82',
    actionLabel: '자세히 보기',
    linkUrl: '/listing/l3',
    isActive: true,
    isAd: false,
    sortOrder: 1,
    startDate: '2026.06.16',
    endDate: '2026.06.23',
  },
  {
    id: 'banner-2',
    title: '100원 경매 이벤트',
    description: '특별 개체를 만나보세요',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=78',
    actionLabel: '참여하기',
    linkUrl: '/marketplace',
    isActive: true,
    isAd: true,
    sortOrder: 2,
    startDate: '2026.06.16',
    endDate: '2026.06.30',
  },
  {
    id: 'banner-3',
    title: '인증 브리더 모집',
    description: '창립 멤버 혜택 제공',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=74',
    actionLabel: '신청하기',
    linkUrl: '/breeder/verification/apply',
    isActive: true,
    isAd: true,
    sortOrder: 3,
    startDate: '2026.06.16',
    endDate: '2026.07.15',
  },
  {
    id: 'banner-4',
    title: '초보 집사 사육 가이드',
    description: '처음 키우는 사람을 위한 정보',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=70',
    actionLabel: '보러가기',
    linkUrl: '/community',
    isActive: true,
    isAd: false,
    sortOrder: 4,
    startDate: '2026.06.16',
    endDate: '2026.12.31',
  },
];

export const homeBanners = adminBanners
  .filter((banner) => banner.isActive)
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const homeBreederStories = [
  { id: 'b1', name: '핑크쉘', badge: '인증', followers: '1.2천', color: '#EBD8C7' },
  { id: 'b2', name: '느린숲', badge: '우수', followers: '842', color: '#C9DBCE' },
  { id: 'b3', name: '보석거북', badge: '프리미엄', followers: '2.0천', color: '#C5D8DD' },
  { id: 'b1', name: '초록마당', badge: '인증', followers: '680', color: '#D8D7B8' },
] as const;

export const homeListings = [
  { id: 'l1', breederId: 'b1', species: '레오파드 육지거북', breeder: '핑크쉘 브리더', price: 380000, color: '#D8C9A9' },
  { id: 'l2', breederId: 'b2', species: '설가타 육지거북', breeder: '느린숲 거북이', price: 260000, color: '#C8D8C3' },
  { id: 'l3', breederId: 'b3', species: '다이아몬드백 테라핀', breeder: '보석거북 연구소', price: 450000, color: '#B9D4D2' },
] as const;

export const homeReviews = [
  { id: 'r1', breederId: 'b1', listingId: 'l1', author: '부기맘', breeder: '핑크쉘 브리더', text: '상담이 꼼꼼하고 건강한 아이를 만났어요.', rating: '5.0', color: '#D8C9A9' },
  { id: 'r2', breederId: 'b2', listingId: 'l2', author: '느림보아빠', breeder: '느린숲 거북이', text: '첫 사육이라 걱정했는데 설명이 친절했어요.', rating: '4.9', color: '#C8D8C3' },
] as const;

export const homePosts = [
  { id: 'p1', category: '자유', title: '우리집 레오파드 첫 산책 다녀왔어요', author: '꼬북집사', likes: 68, comments: 12, views: 219 },
  { id: 'p2', category: '사육정보', title: '여름철 온습도 관리 이렇게 하고 있어요', author: '느림보아빠', likes: 156, comments: 33, views: 608 },
  { id: 'p3', category: '질문답변', title: '처음 키우기 좋은 육지거북 품종은?', author: '첫거북생활', likes: 45, comments: 41, views: 289 },
] as const;
