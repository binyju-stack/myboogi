import type {
  AppSettings,
  Banner,
  BlockedUser,
  Breeder,
  BreederApplication,
  BreederReview,
  ContactLog,
  Favorite,
  Follow,
  GrowthRecord,
  Listing,
  Notification,
  Post,
  PostComment,
  Report,
  Turtle,
  User,
  UserProfile,
  UserSettings,
} from '@/types';

const turtleImages = [
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=76',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=72',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=68',
];

const baseBreeders: Breeder[] = [
  { id: 'b1', name: '핑크쉘 브리더', badge: '인증 브리더', level: 7, levelName: '인증 브리더', trustScore: 96, avatar: turtleImages[0], banner: turtleImages[1], intro: '건강하고 사랑스러운 육지거북을 정성껏 브리딩합니다.', followers: 1280, reviews: 86, trades: 214, rating: 4.9, location: '경기 성남시' },
  { id: 'b2', name: '느린숲 거북이', badge: '우수 브리더', level: 6, levelName: '브리더', trustScore: 91, avatar: turtleImages[2], banner: turtleImages[3], intro: '개체의 건강과 새로운 가족과의 인연을 가장 중요하게 생각합니다.', followers: 842, reviews: 53, trades: 127, rating: 4.8, location: '서울 송파구' },
  { id: 'b3', name: '보석거북 연구소', badge: '프리미엄 브리더', level: 7, levelName: '인증 브리더', trustScore: 98, avatar: turtleImages[3], banner: turtleImages[0], intro: '수생거북 전문 브리더입니다. 꼼꼼한 사육 상담을 제공합니다.', followers: 2031, reviews: 142, trades: 390, rating: 5.0, location: '인천 연수구' },
];

export const breeders: Breeder[] = baseBreeders.map((breeder, index) => {
  const profiles = [
    {
      logo: turtleImages[0],
      bannerImage: turtleImages[1],
      shortBio: '건강한 육지거북을 차분하게 소개하는 전문 브리더',
      fullBio: '핑크쉘 브리더는 개체의 컨디션과 사육 환경을 가장 먼저 확인합니다. 분양 전 먹이 반응, 활동성, 부모 개체 정보를 꼼꼼하게 안내하고 초보 집사도 안정적으로 적응할 수 있도록 사후 상담을 제공합니다.',
      specialty: '레오파드 육지거북, 체리헤드 레드풋',
      region: '경기 성남 · 수도권 상담 가능',
      careerYears: 7,
      joinedAt: '2022.04',
      instagramUrl: 'https://instagram.com/myboogi',
      blogUrl: 'https://blog.example.com/pinkshell',
      youtubeUrl: 'https://youtube.com/@myboogi',
      kakaoChannelUrl: 'https://pf.kakao.com/_myboogi',
      websiteUrl: 'https://myboogi.example.com',
      representativeTurtles: [
        { id: 'rt1', name: '루나', species: '레오파드 육지거북', feature: '선명한 갑 패턴과 안정적인 먹이 반응', image: turtleImages[0] },
        { id: 'rt2', name: '모카', species: '체리헤드 레드풋', feature: '활동성이 좋고 체형 밸런스가 우수해요', image: turtleImages[1] },
        { id: 'rt3', name: '로티', species: '레오파드 육지거북', feature: '온순한 성격과 고른 성장 기록 보유', image: turtleImages[2] },
      ],
    },
    {
      logo: turtleImages[2],
      bannerImage: turtleImages[3],
      shortBio: '첫 사육자를 위한 친절한 상담형 브리더',
      fullBio: '느린숲 거북이는 초보 집사의 사육 환경 세팅을 함께 점검합니다. 분양 전후로 온습도, 조명, 먹이 루틴을 안내하며 안정적인 적응을 돕습니다.',
      specialty: '그리스 육지거북, 호스필드 육지거북',
      region: '서울 송파 · 경기 동부',
      careerYears: 5,
      joinedAt: '2023.01',
      instagramUrl: 'https://instagram.com/slowforest',
      blogUrl: 'https://blog.example.com/slowforest',
      youtubeUrl: 'https://youtube.com/@slowforest',
      kakaoChannelUrl: 'https://pf.kakao.com/_slowforest',
      websiteUrl: 'https://slowforest.example.com',
      representativeTurtles: [
        { id: 'rt4', name: '숲이', species: '그리스 육지거북', feature: '초보 집사에게 잘 맞는 차분한 개체', image: turtleImages[2] },
        { id: 'rt5', name: '밤비', species: '호스필드 육지거북', feature: '먹이 반응이 빠르고 적응력이 좋아요', image: turtleImages[3] },
        { id: 'rt6', name: '두리', species: '그리스 육지거북', feature: '건강 검진 완료, 꾸준한 성장 기록', image: turtleImages[0] },
      ],
    },
    {
      logo: turtleImages[3],
      bannerImage: turtleImages[0],
      shortBio: '수생거북과 희귀 라인을 연구하는 프리미엄 브리더',
      fullBio: '보석거북 연구소는 혈통 관리와 장기 컨디션 기록을 기반으로 개체를 소개합니다. 대표 라인별 특징, 성장 패턴, 합사 주의점을 자세히 안내합니다.',
      specialty: '다이아몬드백 테라핀, 머스크 터틀',
      region: '인천 연수 · 전국 상담',
      careerYears: 9,
      joinedAt: '2021.09',
      instagramUrl: 'https://instagram.com/gemturtlelab',
      blogUrl: 'https://blog.example.com/gemturtlelab',
      youtubeUrl: 'https://youtube.com/@gemturtlelab',
      kakaoChannelUrl: 'https://pf.kakao.com/_gemturtlelab',
      websiteUrl: 'https://gemturtlelab.example.com',
      representativeTurtles: [
        { id: 'rt7', name: '아쿠아', species: '다이아몬드백 테라핀', feature: '밝은 등갑 라인과 선명한 무늬', image: turtleImages[3] },
        { id: 'rt8', name: '젬', species: '머스크 터틀', feature: '튼튼한 체형과 안정적인 수중 활동', image: turtleImages[0] },
        { id: 'rt9', name: '오팔', species: '다이아몬드백 테라핀', feature: '대표 혈통 라인에서 선별된 개체', image: turtleImages[1] },
      ],
    },
  ];

  const typeByIndex = index === 1 ? 'individual' : 'business';
  const followMeta = [
    { isFollowing: true, recentActivity: '신규 분양 개체 등록 · 2시간 전', newListingCount: 2 },
    { isFollowing: false, recentActivity: '사육 가이드 업데이트 · 8시간 전', newListingCount: 0 },
    { isFollowing: true, recentActivity: '신규 후기 등록 · 1일 전', newListingCount: 1 },
  ][index];
  return {
    ...breeder,
    ...profiles[index],
    userId: ['u1', 'u4', 'u6'][index],
    breederType: typeByIndex,
    verificationBadgeLabel: typeByIndex === 'business' ? '사업자 인증 브리더' : '개인 인증 브리더',
    ...followMeta,
  };
});

const baseListings: Listing[] = [
  { id: 'l1', breederId: 'b1', title: '건강한 레오파드 육지거북 유체', species: '레오파드 육지거북', price: 380000, location: '경기 성남시', sex: '미구분', stage: '유체', size: '등갑 6.2cm', hatchDate: '2026.03.18', views: 128, likes: 24, image: turtleImages[0], images: [turtleImages[0], turtleImages[2], turtleImages[3]], description: '먹성이 좋고 활동량이 많은 건강한 유체입니다. 충분히 상담한 뒤 분양을 결정해 주세요.', verified: true, status: '분양중' },
  { id: 'l2', breederId: 'b2', title: '순하고 사람을 잘 따르는 설가타', species: '설가타 육지거북', price: 260000, location: '서울 송파구', sex: '수컷', stage: '유체', size: '등갑 8.1cm', hatchDate: '2025.12.02', views: 302, likes: 48, image: turtleImages[2], images: [turtleImages[2], turtleImages[0]], description: '사람 손을 잘 타고 순합니다. 현재 채소와 전용 사료를 균형 있게 급여하고 있습니다.', verified: true, status: '분양중' },
  { id: 'l3', breederId: 'b3', title: '선명한 무늬의 다이아몬드백', species: '다이아몬드백 테라핀', price: 450000, location: '인천 연수구', sex: '암컷', stage: '유체', size: '등갑 7.5cm', hatchDate: '2026.01.14', views: 511, likes: 81, image: turtleImages[3], images: [turtleImages[3], turtleImages[1]], description: '등갑 무늬가 선명한 개체입니다. 수질과 먹이 관리 방법을 상세히 안내해 드립니다.', verified: true, status: '분양중' },
  { id: 'l4', breederId: 'b1', title: '체리헤드 레드풋 성체', species: '체리헤드 레드풋', price: 720000, location: '경기 성남시', sex: '암컷', stage: '성체', size: '등갑 21cm', hatchDate: '2022.08.11', views: 221, likes: 37, image: turtleImages[1], images: [turtleImages[1], turtleImages[0]], description: '건강하게 성장한 성체입니다. 넓은 사육 환경이 준비된 분께 분양합니다.', verified: true, status: '분양완료' },
  { id: 'l5', breederId: 'b2', title: '귀여운 동헤르만 육지거북', species: '동헤르만 육지거북', price: 330000, location: '서울 송파구', sex: '미구분', stage: '유체', size: '등갑 5.8cm', hatchDate: '2026.04.03', views: 94, likes: 19, image: turtleImages[2], images: [turtleImages[2], turtleImages[3]], description: '초보 집사도 충분히 상담받고 데려갈 수 있습니다.', verified: false, status: '분양중' },
];

export const listings: Listing[] = baseListings.map((listing) => {
  const statusById: Record<string, Listing['listingStatus']> = {
    l1: 'active',
    l2: 'reserved',
    l3: 'active',
    l4: 'completed',
    l5: 'active',
  };
  const listingStatus = statusById[listing.id] ?? 'active';
  const detailById: Record<string, Partial<Listing>> = {
    l1: {
      listedAt: '2026.06.15',
      shellLength: '6.2cm',
      weight: '238g',
      feedingResponse: '전용 사료와 채소 반응이 좋아요',
      healthStatus: '활동량과 배변 상태 모두 양호',
      specialNotes: '첫 주는 조용한 적응 공간을 권장해요',
      fatherInfo: { name: '아폴로', image: turtleImages[2], feature: '선명한 갑 패턴과 안정적인 체형', lineage: '국내 CB 레오파드 라인' },
      motherInfo: { name: '루나', image: turtleImages[3], feature: '먹이 반응이 좋고 온순한 성격', lineage: '프리미엄 레오파드 라인' },
      relatedListingIds: ['l4'],
    },
    l2: {
      listedAt: '2026.06.11',
      shellLength: '8.1cm',
      weight: '412g',
      feedingResponse: '건초와 치커리를 잘 먹어요',
      healthStatus: '등갑과 눈 상태 양호',
      specialNotes: '넓은 사육 공간이 필요해요',
      fatherInfo: { name: '바오', image: turtleImages[0], feature: '성장 속도가 고르고 사람 손을 잘 타요', lineage: '설가타 안정 성장 라인' },
      motherInfo: { name: '모리', image: turtleImages[1], feature: '체형 밸런스가 좋고 온순해요', lineage: '국내 브리딩 설가타 라인' },
      relatedListingIds: ['l5'],
    },
    l3: {
      listedAt: '2026.06.16',
      shellLength: '7.5cm',
      weight: '186g',
      feedingResponse: '전용 사료와 생먹이 반응이 좋아요',
      healthStatus: '수질 적응 및 활동 상태 양호',
      specialNotes: '수질 관리 방법을 안내해 드려요',
      fatherInfo: { name: '오션', image: turtleImages[1], feature: '밝은 갑색과 또렷한 무늬', lineage: '하이 콘트라스트 테라핀 라인' },
      motherInfo: { name: '마린', image: turtleImages[2], feature: '수영 활동성이 좋고 먹성이 안정적', lineage: '프리미엄 다이아몬드백 라인' },
      relatedListingIds: [],
    },
    l4: {
      listedAt: '2026.05.20',
      shellLength: '21cm',
      weight: '2.8kg',
      feedingResponse: '채소와 과일을 균형 있게 먹어요',
      healthStatus: '정기 검진 완료',
      specialNotes: '성체 사육 경험이 있는 집사를 권장해요',
      fatherInfo: { name: '체로', image: turtleImages[0], feature: '붉은 발색과 안정적인 체형', lineage: '체리헤드 레드풋 라인' },
      motherInfo: { name: '로지', image: turtleImages[2], feature: '온순하고 식성이 좋아요', lineage: '국내 CB 레드풋 라인' },
      relatedListingIds: ['l1'],
    },
    l5: {
      listedAt: '2026.06.13',
      shellLength: '5.8cm',
      weight: '154g',
      feedingResponse: '민들레와 전용 사료를 잘 먹어요',
      healthStatus: '활동량과 배변 상태 양호',
      specialNotes: '초보 집사에게도 사육 상담을 제공해요',
      fatherInfo: { name: '허먼', image: turtleImages[3], feature: '작고 단단한 체형', lineage: '동헤르만 국내 브리딩 라인' },
      motherInfo: { name: '엘리', image: turtleImages[0], feature: '온순하고 적응력이 좋아요', lineage: '동헤르만 안정 라인' },
      relatedListingIds: ['l2'],
    },
  };
  return { ...listing, ...detailById[listing.id], listingStatus, reviewEligible: listingStatus === 'completed' };
});

export const listingDetails: Record<string, { parentInfo: string; foodResponse: string; healthStatus: string; notes: string }> = {
  l1: { parentInfo: '부모 개체 모두 건강검진 완료', foodResponse: '채소와 전용 사료 반응이 좋아요', healthStatus: '활동량과 배변 상태 모두 양호', notes: '새 환경 적응을 위해 첫 주는 조용한 공간을 권장해요' },
  l2: { parentInfo: '국내 브리딩 부모 개체', foodResponse: '건초와 치커리를 잘 먹어요', healthStatus: '등갑과 눈 상태 양호', notes: '넓은 사육 공간이 필요해요' },
  l3: { parentInfo: '선명한 무늬의 부모 개체', foodResponse: '전용 사료와 생먹이 반응이 좋아요', healthStatus: '수질 적응 및 활동 상태 양호', notes: '수질 관리 방법을 안내해 드려요' },
  l4: { parentInfo: '건강한 성체 부모 개체', foodResponse: '채소와 과일을 균형 있게 먹어요', healthStatus: '정기 검진 완료', notes: '성체 사육 경험이 있는 집사를 권장해요' },
  l5: { parentInfo: '국내 브리딩 부모 개체', foodResponse: '민들레와 전용 사료를 잘 먹어요', healthStatus: '활동량과 배변 상태 양호', notes: '초보 집사에게도 사육 상담을 제공해요' },
};

export const breederReviews: BreederReview[] = [
  { id: 'br1', breederId: 'b1', listingId: 'l1', userId: 'u1', author: '부기맘', avatar: turtleImages[2], rating: 5, content: '첫 분양이라 걱정했는데 사육 환경부터 먹이까지 정말 친절하게 알려주셨어요.', species: '레오파드 육지거북', createdAt: '3일 전', reviewType: 'contact_based', status: 'active', reportCount: 0 },
  { id: 'br2', breederId: 'b1', listingId: 'l4', userId: 'u2', author: '느림보아빠', avatar: turtleImages[3], rating: 5, content: '사진으로 본 것보다 건강하고 활발한 아이를 만났어요. 이후 상담도 꼼꼼합니다.', species: '체리헤드 레드풋', createdAt: '2주 전', reviewType: 'verified_trade', status: 'active', reportCount: 0 },
  { id: 'br3', breederId: 'b1', listingId: 'l1', userId: 'u3', author: '작은등갑', avatar: turtleImages[0], rating: 4.6, content: '카카오톡으로 사육장 세팅을 먼저 상담했고 답변이 빠르고 차분했어요.', species: '레오파드 육지거북', createdAt: '1개월 전', reviewType: 'contact_based', status: 'active', reportCount: 1 },
  { id: 'br4', breederId: 'b2', listingId: 'l2', userId: 'u4', author: '초록정원', avatar: turtleImages[0], rating: 4.8, content: '초보 집사 눈높이에 맞춰 설명해주셔서 안심하고 새 가족을 맞이했습니다.', species: '설가타 육지거북', createdAt: '5일 전', reviewType: 'contact_based', status: 'active', reportCount: 0 },
  { id: 'br5', breederId: 'b2', listingId: 'l5', userId: 'u5', author: '느린하루', avatar: turtleImages[2], rating: 4.2, content: '전화 문의로 기본 정보를 확인했어요. 실제 분양 전 상담만 진행한 후기입니다.', species: '동헤르만 육지거북', createdAt: '3주 전', reviewType: 'general', status: 'pending', reportCount: 0 },
  { id: 'br6', breederId: 'b3', listingId: 'l3', userId: 'u6', author: '꼬북집사', avatar: turtleImages[1], rating: 5, content: '수생 환경 세팅 방법까지 자세히 안내해주시는 믿음직한 브리더예요.', species: '다이아몬드백 테라핀', createdAt: '1주 전', reviewType: 'contact_based', status: 'active', reportCount: 0 },
  { id: 'br7', breederId: 'b3', listingId: 'l3', userId: 'u7', author: '아쿠아집사', avatar: turtleImages[3], rating: 5, content: '문의 후 사진과 먹이 반응 영상을 자세히 공유받아 신뢰가 갔습니다.', species: '다이아몬드백 테라핀', createdAt: '2개월 전', reviewType: 'contact_based', status: 'active', reportCount: 0 },
];

const legacyPosts: Post[] = [
  { id: 'p1', category: '자유게시판', author: '꼬북집사', avatar: turtleImages[0], title: '우리집 레오파드 첫 산책 다녀왔어요', content: '날씨가 좋아서 짧게 산책했는데 정말 신나 있어요.', image: turtleImages[1], createdAt: '방금 전', views: 219, likes: 68, comments: 12 },
  { id: 'p2', category: '사육정보', author: '느림보아빠', avatar: turtleImages[2], title: '육지거북 여름철 온습도 관리 팁', content: '장마철에는 습도가 너무 높아지지 않도록 환기를 자주 해주세요.', image: turtleImages[2], createdAt: '12분 전', views: 608, likes: 156, comments: 33 },
  { id: 'p3', category: '질병상담', author: '부기맘', avatar: turtleImages[3], title: '눈이 조금 부어 보여요. 병원에 가야 할까요?', content: '오늘 아침부터 한쪽 눈을 잘 뜨지 못합니다.', image: turtleImages[3], createdAt: '34분 전', views: 420, likes: 31, comments: 28 },
  { id: 'p4', category: '먹이정보', author: '초록정원', avatar: turtleImages[1], title: '민들레 급여 전 꼭 확인하세요', content: '길가의 민들레보다 농약 걱정 없는 곳에서 채집하세요.', createdAt: '1시간 전', views: 330, likes: 89, comments: 17 },
];

const legacyPostComments: PostComment[] = [
  { id: 'c1', postId: 'p1', author: '부기맘', avatar: turtleImages[2], content: '산책하는 모습이 정말 귀여워요. 바닥 온도만 잘 확인하면 좋을 것 같아요!', createdAt: '5분 전', likes: 12 },
  { id: 'c2', postId: 'p1', author: '초록정원', avatar: turtleImages[1], content: '우리 아이도 날씨 좋은 날 짧게 산책해요.', createdAt: '12분 전', likes: 5 },
  { id: 'c3', postId: 'p2', author: '꼬북집사', avatar: turtleImages[0], content: '습도 관리가 늘 어려웠는데 좋은 정보 감사합니다.', createdAt: '8분 전', likes: 18 },
  { id: 'c4', postId: 'p3', author: '느림보아빠', avatar: turtleImages[3], content: '증상이 계속되면 꼭 전문 병원에 방문해보세요.', createdAt: '20분 전', likes: 9 },
];

export const posts: Post[] = [
  { id: 'p1', category: '자유게시판', author: '꼬북집사', avatar: turtleImages[0], title: '우리집 레오파드 첫 일광욕 성공했어요', content: '날씨가 좋아서 짧게 일광욕을 했는데 정말 신나 보였어요.', image: turtleImages[1], createdAt: '방금 전', views: 219, likes: 68, comments: 12 },
  { id: 'p2', category: '사육정보', author: '어린보아비', avatar: turtleImages[2], title: '육지거북 여름철 습도 관리 팁', content: '장마철에는 습도가 너무 높아지지 않도록 환기를 자주 해주세요.', image: turtleImages[2], createdAt: '12분 전', views: 608, likes: 156, comments: 33 },
  { id: 'p3', category: '질병상담', author: '부기맘', avatar: turtleImages[3], title: '눈이 조금 부어 보여요, 병원에 가야 할까요?', content: '오늘 아침부터 한쪽 눈을 잘 뜨지 못합니다. 비슷한 경험이 있으신가요?', image: turtleImages[3], createdAt: '34분 전', views: 420, likes: 31, comments: 28 },
  { id: 'p4', category: '먹이정보', author: '초록정원', avatar: turtleImages[1], title: '민들레 급여 전 꼭 확인하세요', content: '길가의 민들레보다 농약 걱정 없는 곳에서 채집해 주세요.', createdAt: '1시간 전', views: 330, likes: 89, comments: 17 },
];

export const postComments: PostComment[] = [
  { id: 'c1', postId: 'p1', author: '부기맘', avatar: turtleImages[2], content: '일광욕하는 모습이 정말 귀여워요. 바닥 온도만 잘 확인하면 좋을 것 같아요.', createdAt: '5분 전', likes: 12 },
  { id: 'c2', postId: 'p1', author: '초록정원', avatar: turtleImages[1], content: '우리 아이도 날씨 좋은 날에는 짧게 일광욕해요.', createdAt: '12분 전', likes: 5 },
  { id: 'c3', postId: 'p2', author: '꼬북집사', avatar: turtleImages[0], content: '습도 관리가 늘 어려웠는데 좋은 정보 감사합니다.', createdAt: '8분 전', likes: 18 },
  { id: 'c4', postId: 'p3', author: '어린보아비', avatar: turtleImages[3], content: '증상이 계속되면 꼭 전문 병원에 방문해보세요.', createdAt: '20분 전', likes: 9 },
];

void legacyPosts;
void legacyPostComments;

export const turtles: Turtle[] = [
  { id: 't1', userId: 'u1', name: '부기', species: '레오파드 육지거북', sex: '미구분', image: turtleImages[0], birthDate: '2025.09.21' },
  { id: 't2', userId: 'u1', name: '초록이', species: '설가타 육지거북', sex: '수컷', image: turtleImages[2], birthDate: '2024.11.08' },
  { id: 't3', userId: 'u1', name: '보석이', species: '다이아몬드백 테라핀', sex: '암컷', image: turtleImages[3], birthDate: '2025.04.16' },
];

export const growthRecords: GrowthRecord[] = [
  { id: 'g1', turtleId: 't1', date: '2026.06.10', weight: 238, shellLength: 10.8, image: turtleImages[0], memo: '먹이 반응이 좋고 활동량도 많아요.', foodResponse: '매우 좋음', bowelMovement: '정상', condition: '활발함' },
  { id: 'g2', turtleId: 't1', date: '2026.05.20', weight: 221, shellLength: 10.3, image: turtleImages[2], memo: '등갑이 조금 더 단단해진 것 같아요.', foodResponse: '좋음', bowelMovement: '정상', condition: '좋음' },
  { id: 'g3', turtleId: 't1', date: '2026.04.28', weight: 198, shellLength: 9.7, image: turtleImages[3], memo: '첫 야외 산책을 했어요.', foodResponse: '좋음', bowelMovement: '정상', condition: '활발함' },
  { id: 'g4', turtleId: 't1', date: '2026.03.25', weight: 181, shellLength: 9.2, image: turtleImages[1], memo: '새 사육장에 잘 적응했어요.', foodResponse: '보통', bowelMovement: '정상', condition: '좋음' },
  { id: 'g5', turtleId: 't2', date: '2026.06.08', weight: 865, shellLength: 16.4, image: turtleImages[2], memo: '건초를 아주 잘 먹어요.', foodResponse: '매우 좋음', bowelMovement: '정상', condition: '활발함' },
  { id: 'g6', turtleId: 't3', date: '2026.06.05', weight: 412, shellLength: 13.1, image: turtleImages[3], memo: '수질 교체 후 컨디션이 좋아요.', foodResponse: '좋음', bowelMovement: '정상', condition: '좋음' },
];

export const categories = [
  ['전체', 'chatbubbles-outline'], ['사육정보', 'book-outline'], ['질병상담', 'medkit-outline'],
  ['먹이정보', 'leaf-outline'], ['합사정보', 'people-outline'], ['번식정보', 'heart-outline'], ['질문답변', 'help-circle-outline'],
] as const;

export const users: User[] = [
  {
    id: 'u1',
    name: '부기집사',
    type: '일반회원',
    location: '서울 마포구',
    level: 3,
    levelName: '유체',
    xp: 96,
    nextLevelXp: 150,
    trustScore: 82,
  },
  { id: 'u2', name: '느림보아빠', type: '일반회원', location: '서울 송파구', level: 4, levelName: '성장기', xp: 188, nextLevelXp: 260, trustScore: 86 },
  { id: 'u3', name: '작은등갑', type: '일반회원', location: '경기 성남시', level: 3, levelName: '유체', xp: 114, nextLevelXp: 150, trustScore: 80 },
  { id: 'u4', name: '초록정원', type: '브리더', location: '서울 송파구', level: 6, levelName: '브리더', xp: 510, nextLevelXp: 700, trustScore: 91 },
  { id: 'u5', name: '느린하루', type: '일반회원', location: '서울 강동구', level: 2, levelName: '입문', xp: 62, nextLevelXp: 100, trustScore: 74 },
  { id: 'u6', name: '꼬북집사', type: '일반회원', location: '인천 연수구', level: 5, levelName: '집사', xp: 320, nextLevelXp: 420, trustScore: 88 },
  { id: 'u7', name: '아쿠아집사', type: '일반회원', location: '인천 연수구', level: 5, levelName: '집사', xp: 338, nextLevelXp: 420, trustScore: 90 },
];

export const userProfile: UserProfile = {
  nickname: '느린숲',
  bio: '테라핀 전문 브리더',
  region: '서울 송파구',
  instagram: 'https://instagram.com/slowforest',
  blog: 'https://blog.example.com/slowforest',
  youtube: 'https://youtube.com/@slowforest',
  openChat: 'https://open.kakao.com/o/slowforest',
  interests: ['다이아몬드백 테라핀', '머스크터틀'],
  stats: {
    posts: 18,
    comments: 64,
    listings: 7,
    followers: 842,
    following: 12,
  },
};

export const blockedUsers: BlockedUser[] = [
  { id: 'blocked-1', nickname: '무리한분양요청', avatar: turtleImages[1], userType: '일반회원', blockedAt: '2026.06.12' },
  { id: 'blocked-2', nickname: '반복문의계정', avatar: turtleImages[2], userType: '브리더', blockedAt: '2026.06.03' },
  { id: 'blocked-3', nickname: '거래분쟁주의', avatar: turtleImages[3], userType: '일반회원', blockedAt: '2026.05.28' },
];

export const settings: AppSettings = {
  notificationEnabled: true,
  commentNotification: true,
  likeNotification: true,
  followNotification: true,
  listingNotification: true,
  breederNotification: false,
  noticeNotification: true,
};

export const comments: PostComment[] = postComments.map((comment, index) => ({
  ...comment,
  userId: ['u1', 'u4', 'u6', 'u2'][index % 4],
}));

export const reviews: BreederReview[] = breederReviews;

export const favorites: Favorite[] = [
  { id: 'favorite-1', userId: 'u1', listingId: 'l1', createdAt: '2026.06.16' },
  { id: 'favorite-2', userId: 'u1', listingId: 'l3', createdAt: '2026.06.15' },
];

export const follows: Follow[] = [
  { id: 'follow-1', userId: 'u1', breederId: 'b1', createdAt: '2026.06.10' },
  { id: 'follow-2', userId: 'u1', breederId: 'b3', createdAt: '2026.06.12' },
];

export const contactLogs: ContactLog[] = [
  { id: 'contact-1', userId: 'u1', breederId: 'b1', listingId: 'l1', contactType: 'kakao', contactedAt: '2026.06.13' },
  { id: 'contact-2', userId: 'u4', breederId: 'b2', listingId: 'l2', contactType: 'phone', contactedAt: '2026.06.14' },
  { id: 'contact-3', userId: 'u6', breederId: 'b3', listingId: 'l3', contactType: 'open_chat', contactedAt: '2026.06.15' },
];

export const notifications: Notification[] = [
  { id: 'notification-1', userId: 'u1', type: 'comment', title: '새 댓글', message: '내 게시글에 새 댓글이 달렸어요.', targetType: 'post', targetId: 'p1', read: false, createdAt: '2026.06.16' },
  { id: 'notification-2', userId: 'u1', type: 'listing', title: '분양글 알림', message: '관심 분양글 상태가 변경되었어요.', targetType: 'listing', targetId: 'l3', read: false, createdAt: '2026.06.15' },
  { id: 'notification-3', userId: 'u1', type: 'notice', title: '공지사항', message: '서비스 운영 정책 안내가 등록되었어요.', targetType: 'notice', targetId: 'notice-1', read: true, createdAt: '2026.06.10' },
];

export const reports: Report[] = [
  { id: 'report-1', reporterId: 'u1', targetType: 'post', targetId: 'p3', reason: '부정확한 사육 정보', status: 'pending', createdAt: '2026.06.15' },
  { id: 'report-2', reporterId: 'u4', targetType: 'listing', targetId: 'l3', reason: '분양 정보 확인 필요', status: 'resolved', createdAt: '2026.06.12' },
  { id: 'report-3', reporterId: 'u6', targetType: 'review', targetId: 'br3', reason: '후기 내용 검토 요청', status: 'pending', createdAt: '2026.06.11' },
];

export const banners: Banner[] = [
  {
    id: 'banner-1',
    title: '이번주 추천 개체',
    description: '희귀 뉴블러드 테라핀 입고',
    image: turtleImages[0],
    actionLabel: '자세히 보기',
    linkUrl: '/listing/l3',
    isActive: true,
    isAd: false,
    sortOrder: 1,
    startDate: '2026.06.16',
    endDate: '2026.06.23',
    createdBy: 'u1',
  },
  {
    id: 'banner-3',
    title: '인증 브리더 모집',
    description: '창립 멤버 혜택 제공',
    image: turtleImages[3],
    actionLabel: '신청하기',
    linkUrl: '/breeder/verification/apply',
    isActive: true,
    isAd: true,
    sortOrder: 2,
    startDate: '2026.06.16',
    endDate: '2026.07.15',
    createdBy: 'u1',
  },
];

export const breederApplications: BreederApplication[] = [
  {
    id: 'application-1',
    userId: 'u4',
    breederType: 'individual',
    breederName: '초록정원',
    region: '서울 송파구',
    specialties: ['그리스 육지거북', '호스필드 육지거북'],
    introduction: '초보 집사를 위한 친절한 상담형 브리더입니다.',
    status: 'approved',
    appliedAt: '2026.06.09',
  },
  {
    id: 'application-2',
    userId: 'u6',
    breederType: 'business',
    breederName: '보석거북 연구소',
    region: '인천 연수구',
    specialties: ['다이아몬드백 테라핀'],
    introduction: '수생거북 전문 브리더로 건강한 사육 환경을 연구합니다.',
    status: 'pending',
    appliedAt: '2026.06.11',
  },
];

export const userSettings: UserSettings[] = [
  { userId: 'u1', ...settings },
];
