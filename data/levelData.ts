export const levelSteps = [
  { level: 1, name: '알', minXp: 0, nextLevelXp: 30 },
  { level: 2, name: '해츨', minXp: 30, nextLevelXp: 80 },
  { level: 3, name: '유체', minXp: 80, nextLevelXp: 150 },
  { level: 4, name: '준성체', minXp: 150, nextLevelXp: 260 },
  { level: 5, name: '성체', minXp: 260, nextLevelXp: 420 },
  { level: 6, name: '브리더', minXp: 420, nextLevelXp: 700 },
  { level: 7, name: '인증 브리더', minXp: 700, nextLevelXp: 700 },
] as const;

export const xpActivities = [
  { id: 'post', label: '게시글 작성', xp: 5, icon: 'document-text-outline' },
  { id: 'comment', label: '댓글 작성', xp: 2, icon: 'chatbubble-outline' },
  { id: 'like', label: '좋아요 받기', xp: 1, icon: 'heart-outline' },
  { id: 'growth', label: '성장기록 작성', xp: 3, icon: 'analytics-outline' },
  { id: 'review', label: '후기 작성', xp: 10, icon: 'star-outline' },
  { id: 'listing', label: '분양글 작성', xp: 8, icon: 'storefront-outline' },
] as const;

export const xpMessages = {
  post: '+5 XP가 지급될 예정입니다.',
  comment: '+2 XP가 지급될 예정입니다.',
  growth: '+3 XP가 지급될 예정입니다.',
  review: '+10 XP가 지급될 예정입니다.',
  listing: '+8 XP가 지급될 예정입니다.',
} as const;

export const formatLevel = (level: number, levelName: string) => `Lv.${level} ${levelName}`;

export const getXpProgress = (xp: number, nextLevelXp: number) => {
  if (nextLevelXp <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((xp / nextLevelXp) * 100)));
};

export const getRemainingXp = (xp: number, nextLevelXp: number) => Math.max(0, nextLevelXp - xp);
