import type { Breeder, BreederReview, GrowthRecord, Listing, Post, PostComment, Turtle } from '@/types';

const turtleImages = [
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=76',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=72',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=68',
];

export const breeders: Breeder[] = [
  { id: 'b1', name: '핑크쉘 브리더', badge: '인증 브리더', avatar: turtleImages[0], banner: turtleImages[1], intro: '건강하고 사랑스러운 육지거북을 정성껏 브리딩합니다.', followers: 1280, reviews: 86, trades: 214, rating: 4.9, location: '경기 성남시' },
  { id: 'b2', name: '느린숲 거북이', badge: '우수 브리더', avatar: turtleImages[2], banner: turtleImages[3], intro: '개체의 건강과 새로운 가족과의 인연을 가장 중요하게 생각합니다.', followers: 842, reviews: 53, trades: 127, rating: 4.8, location: '서울 송파구' },
  { id: 'b3', name: '보석거북 연구소', badge: '프리미엄 브리더', avatar: turtleImages[3], banner: turtleImages[0], intro: '수생거북 전문 브리더입니다. 꼼꼼한 사육 상담을 제공합니다.', followers: 2031, reviews: 142, trades: 390, rating: 5.0, location: '인천 연수구' },
];

export const listings: Listing[] = [
  { id: 'l1', breederId: 'b1', title: '건강한 레오파드 육지거북 유체', species: '레오파드 육지거북', price: 380000, location: '경기 성남시', sex: '미구분', stage: '유체', size: '등갑 6.2cm', hatchDate: '2026.03.18', views: 128, likes: 24, image: turtleImages[0], images: [turtleImages[0], turtleImages[2], turtleImages[3]], description: '먹성이 좋고 활동량이 많은 건강한 유체입니다. 충분히 상담한 뒤 분양을 결정해 주세요.', verified: true, status: '분양중' },
  { id: 'l2', breederId: 'b2', title: '순하고 사람을 잘 따르는 설가타', species: '설가타 육지거북', price: 260000, location: '서울 송파구', sex: '수컷', stage: '유체', size: '등갑 8.1cm', hatchDate: '2025.12.02', views: 302, likes: 48, image: turtleImages[2], images: [turtleImages[2], turtleImages[0]], description: '사람 손을 잘 타고 순합니다. 현재 채소와 전용 사료를 균형 있게 급여하고 있습니다.', verified: true, status: '분양중' },
  { id: 'l3', breederId: 'b3', title: '선명한 무늬의 다이아몬드백', species: '다이아몬드백 테라핀', price: 450000, location: '인천 연수구', sex: '암컷', stage: '유체', size: '등갑 7.5cm', hatchDate: '2026.01.14', views: 511, likes: 81, image: turtleImages[3], images: [turtleImages[3], turtleImages[1]], description: '등갑 무늬가 선명한 개체입니다. 수질과 먹이 관리 방법을 상세히 안내해 드립니다.', verified: true, status: '분양중' },
  { id: 'l4', breederId: 'b1', title: '체리헤드 레드풋 성체', species: '체리헤드 레드풋', price: 720000, location: '경기 성남시', sex: '암컷', stage: '성체', size: '등갑 21cm', hatchDate: '2022.08.11', views: 221, likes: 37, image: turtleImages[1], images: [turtleImages[1], turtleImages[0]], description: '건강하게 성장한 성체입니다. 넓은 사육 환경이 준비된 분께 분양합니다.', verified: true, status: '분양완료' },
  { id: 'l5', breederId: 'b2', title: '귀여운 동헤르만 육지거북', species: '동헤르만 육지거북', price: 330000, location: '서울 송파구', sex: '미구분', stage: '유체', size: '등갑 5.8cm', hatchDate: '2026.04.03', views: 94, likes: 19, image: turtleImages[2], images: [turtleImages[2], turtleImages[3]], description: '초보 집사도 충분히 상담받고 데려갈 수 있습니다.', verified: false, status: '분양중' },
];

export const listingDetails: Record<string, { parentInfo: string; foodResponse: string; healthStatus: string; notes: string }> = {
  l1: { parentInfo: '부모 개체 모두 건강검진 완료', foodResponse: '채소와 전용 사료 반응이 좋아요', healthStatus: '활동량과 배변 상태 모두 양호', notes: '새 환경 적응을 위해 첫 주는 조용한 공간을 권장해요' },
  l2: { parentInfo: '국내 브리딩 부모 개체', foodResponse: '건초와 치커리를 잘 먹어요', healthStatus: '등갑과 눈 상태 양호', notes: '넓은 사육 공간이 필요해요' },
  l3: { parentInfo: '선명한 무늬의 부모 개체', foodResponse: '전용 사료와 생먹이 반응이 좋아요', healthStatus: '수질 적응 및 활동 상태 양호', notes: '수질 관리 방법을 안내해 드려요' },
  l4: { parentInfo: '건강한 성체 부모 개체', foodResponse: '채소와 과일을 균형 있게 먹어요', healthStatus: '정기 검진 완료', notes: '성체 사육 경험이 있는 집사를 권장해요' },
  l5: { parentInfo: '국내 브리딩 부모 개체', foodResponse: '민들레와 전용 사료를 잘 먹어요', healthStatus: '활동량과 배변 상태 양호', notes: '초보 집사에게도 사육 상담을 제공해요' },
};

export const breederReviews: BreederReview[] = [
  { id: 'br1', breederId: 'b1', author: '부기맘', avatar: turtleImages[2], rating: 5, content: '첫 분양이라 걱정했는데 사육 환경부터 먹이까지 정말 친절하게 알려주셨어요.', species: '레오파드 육지거북', createdAt: '3일 전' },
  { id: 'br2', breederId: 'b1', author: '느림보아빠', avatar: turtleImages[3], rating: 5, content: '사진으로 본 것보다 건강하고 활발한 아이를 만났어요. 이후 상담도 꼼꼼합니다.', species: '체리헤드 레드풋', createdAt: '2주 전' },
  { id: 'br3', breederId: 'b2', author: '초록정원', avatar: turtleImages[0], rating: 4.8, content: '초보 집사 눈높이에 맞춰 설명해주셔서 안심하고 새 가족을 맞이했습니다.', species: '설가타 육지거북', createdAt: '5일 전' },
  { id: 'br4', breederId: 'b3', author: '꼬북집사', avatar: turtleImages[1], rating: 5, content: '수생 환경 세팅 방법까지 자세히 안내해주시는 믿음직한 브리더예요.', species: '다이아몬드백 테라핀', createdAt: '1주 전' },
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
  { id: 't1', name: '부기', species: '레오파드 육지거북', sex: '미구분', image: turtleImages[0], birthDate: '2025.09.21' },
  { id: 't2', name: '초록이', species: '설가타 육지거북', sex: '수컷', image: turtleImages[2], birthDate: '2024.11.08' },
  { id: 't3', name: '보석이', species: '다이아몬드백 테라핀', sex: '암컷', image: turtleImages[3], birthDate: '2025.04.16' },
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

export const users = [{ id: 'u1', name: '부기집사', type: '일반회원', location: '서울 마포구' }];
