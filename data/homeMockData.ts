export const homeCommunityMenus = [
  { label: '자유게시판', icon: 'chatbubble-ellipses-outline', color: '#FFF0F5' },
  { label: '사육정보', icon: 'calendar-outline', color: '#FFF0F5' },
  { label: '질병상담', icon: 'document-text-outline', color: '#FFF0F5' },
  { label: '먹이정보', icon: 'nutrition-outline', color: '#FFF0F5' },
  { label: '합사정보', icon: 'people-outline', color: '#FFF0F5' },
  { label: '번식정보', icon: 'heart-circle-outline', color: '#FFF0F5' },
  { label: '질문답변', icon: 'help-circle-outline', color: '#FFF0F5' },
  { label: '인기글', icon: 'podium-outline', color: '#FFF0F5' },
] as const;

export const homeFeedPosts = [
  {
    id: 'home-1',
    category: '자유',
    categoryColor: '#EAF5FF',
    author: '꼬북집사',
    time: '2시간 전',
    title: '오늘은 부기랑 재미있게 놀았어요',
    content: '날씨가 좋아서 부기와 함께 잠깐 산책을 다녀왔어요. 풀 냄새를 맡으며 천천히 걷는 모습이 너무 귀여웠답니다.',
    likes: 128,
    comments: 32,
    imageColors: ['#BFD8D1', '#DDE8C8', '#C9D7BE'],
  },
  {
    id: 'home-2',
    category: '사육정보',
    categoryColor: '#E9F7EF',
    author: '느림보아빠',
    time: '4시간 전',
    title: '초보 집사를 위한 여름철 온습도 관리',
    content: '장마철에는 사육장 환기가 정말 중요해요. 온도계와 습도계는 거북이가 주로 머무는 높이에 두는 것을 추천합니다.',
    likes: 156,
    comments: 48,
    imageColors: ['#A8C4A2', '#D0B985'],
  },
  {
    id: 'home-3',
    category: '먹이정보',
    categoryColor: '#FFF4E4',
    author: '초록정원',
    time: '6시간 전',
    title: '우리 부기가 잘 먹는 건강 간식 모음',
    content: '민들레와 치커리를 깨끗하게 세척해서 준비했어요. 새로운 먹이는 조금씩 반응을 확인하며 급여하고 있습니다.',
    likes: 93,
    comments: 20,
    imageColors: ['#88A88B'],
  },
  {
    id: 'home-4',
    category: '자유',
    categoryColor: '#EAF5FF',
    author: '첫거북생활',
    time: '어제',
    title: '새 식구를 소개합니다',
    content: '오랫동안 공부하고 기다린 끝에 귀여운 유체가 가족이 되었어요. 앞으로 잘 부탁드립니다.',
    likes: 103,
    comments: 30,
    imageColors: ['#D7C29A'],
  },
] as const;

export const viewRankings = [
  ['레오파드 거북이 키우기 전에 꼭 알아야 할 것', '사육정보', '조회 1,284'],
  ['요즘 우리 부기가 자꾸 땅을 파는 이유는?', '질문답변', '조회 986'],
  ['거북이에게 급여하면 안 되는 음식 정리', '먹이정보', '조회 875'],
  ['처음 거북이를 데려온 날 준비 체크리스트', '자유게시판', '조회 742'],
  ['여름철 사육장 온도 이렇게 관리해요', '사육정보', '조회 691'],
] as const;

export const commentRankings = [
  ['합사 경험 있으신 집사님 계신가요?', '합사정보', '댓글 82'],
  ['우리 거북이 이름 같이 골라주세요', '자유게시판', '댓글 76'],
  ['처음 키우기 좋은 육지거북 품종은?', '질문답변', '댓글 64'],
  ['편식하는 거북이 식단 조언 부탁드려요', '먹이정보', '댓글 58'],
  ['산란 전 행동이 맞는지 궁금합니다', '번식정보', '댓글 47'],
] as const;
