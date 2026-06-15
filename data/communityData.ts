import type { Post, PostComment } from '@/types';

const turtleImages = [
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=76',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=72',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=68',
];

export const communityCategories = [
  '전체',
  '자유게시판',
  '사육정보',
  '질병상담',
  '먹이정보',
  '합사정보',
  '번식정보',
  '질문답변',
] as const;

export const createPostCategories = communityCategories.filter((category) => category !== '전체');

export const postComments: PostComment[] = [
  { id: 'c1', postId: 'p1', author: '부기맘', avatar: turtleImages[2], content: '일광욕하는 모습 너무 귀여워요. 바닥 온도만 체크해주면 짧게 해주는 건 정말 좋은 것 같아요.', createdAt: '5분 전', likes: 12 },
  { id: 'c2', postId: 'p1', author: '초록정원', avatar: turtleImages[1], content: '우리 아이도 햇빛 좋은 날에는 기분이 확 달라져요. 사진 분위기도 따뜻하네요.', createdAt: '12분 전', likes: 5 },
  { id: 'c3', postId: 'p2', author: '꼬북집사', avatar: turtleImages[0], content: '장마철 관리가 늘 어려웠는데 환기 루틴 참고할게요. 좋은 정보 감사합니다.', createdAt: '8분 전', likes: 18 },
  { id: 'c4', postId: 'p3', author: '푸른보아비', avatar: turtleImages[3], content: '증상이 계속되면 전문 병원에 문의해보는 게 좋아요. 사진도 함께 남겨두면 진료 때 도움이 됩니다.', createdAt: '20분 전', likes: 9 },
  { id: 'c5', postId: 'p4', author: '꼬북집사', avatar: turtleImages[0], content: '간식처럼 소량만 주는 방식 좋네요. 저도 기본 사료 비율을 더 챙겨봐야겠어요.', createdAt: '28분 전', likes: 4 },
];

export const posts: Post[] = [
  {
    id: 'p1',
    category: '자유게시판',
    title: '우리 레오파드 첫 일광욕 성공했어요',
    author: '꼬북집사',
    avatar: turtleImages[0],
    authorAvatar: turtleImages[0],
    createdAt: '방금 전',
    views: 219,
    likes: 68,
    comments: 12,
    commentsCount: 12,
    content: '햇빛이 좋아서 베란다에 잠깐 일광욕 자리를 만들어줬어요. 처음에는 조심스럽게 둘러보다가 곧 편하게 쉬더라고요. 바닥 온도만 계속 체크하면서 15분 정도 함께 있었는데 표정이 정말 편안해 보여서 기록으로 남깁니다.',
    image: turtleImages[1],
    images: [turtleImages[1], turtleImages[0]],
  },
  {
    id: 'p2',
    category: '사육정보',
    title: '습도 높은 장마철 사육장 관리 루틴',
    author: '푸른보아비',
    avatar: turtleImages[2],
    authorAvatar: turtleImages[2],
    createdAt: '12분 전',
    views: 608,
    likes: 156,
    comments: 33,
    commentsCount: 33,
    content: '장마철에는 환기와 바닥재 상태를 더 자주 확인하고 있어요. 습도가 오래 높게 유지되면 곰팡이와 냄새가 생길 수 있어서 하루 두 번 환기하고, 먹이 찌꺼기는 바로 치우는 편입니다.',
    image: turtleImages[2],
    images: [turtleImages[2]],
  },
  {
    id: 'p3',
    category: '질병상담',
    title: '눈이 조금 부어 보여요. 병원에 가야 할까요?',
    author: '부기맘',
    avatar: turtleImages[3],
    authorAvatar: turtleImages[3],
    createdAt: '34분 전',
    views: 420,
    likes: 31,
    comments: 28,
    commentsCount: 28,
    content: '오늘 아침부터 한쪽 눈을 평소보다 덜 뜨는 것 같아 걱정돼요. 먹이는 먹었고 움직임도 괜찮은데, 물 온도나 조명 문제일 수도 있을까요? 비슷한 경험 있으신 분 조언 부탁드려요.',
    image: turtleImages[3],
    images: [turtleImages[3]],
  },
  {
    id: 'p4',
    category: '먹이정보',
    title: '밀웜 급여 전 꼭 확인하세요',
    author: '초록정원',
    avatar: turtleImages[1],
    authorAvatar: turtleImages[1],
    createdAt: '1시간 전',
    views: 330,
    likes: 89,
    comments: 17,
    commentsCount: 17,
    content: '밀웜은 반응이 좋아 간식으로 쓰기 좋지만 너무 자주 주면 영양 균형이 깨질 수 있어요. 저는 전용 사료와 채소를 기본으로 두고, 밀웜은 보상처럼 소량만 급여하고 있습니다.',
    image: turtleImages[1],
    images: [turtleImages[1]],
  },
].map((post) => ({
  ...post,
  commentsList: postComments.filter((comment) => comment.postId === post.id),
}));
