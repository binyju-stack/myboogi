export interface FollowingBreederMeta {
  breederId: string;
  recentActivity: string;
  isNew: boolean;
}

export interface FollowActivity {
  id: string;
  breederId: string;
  breederName: string;
  breederLogo: string;
  activityType: 'listing' | 'review' | 'notice';
  title: string;
  description: string;
  createdAt: string;
  listingStatus?: string;
  targetType: 'listing' | 'breeder';
  targetId: string;
  notificationPreview: {
    title: string;
    message: string;
  };
}

const turtleImage = 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80';

export const followingBreeders: FollowingBreederMeta[] = [
  { breederId: 'b1', recentActivity: '신규 분양 개체 등록 · 2시간 전', isNew: true },
  { breederId: 'b2', recentActivity: '사육 가이드 업데이트 · 8시간 전', isNew: false },
  { breederId: 'b3', recentActivity: '신규 후기 등록 · 1일 전', isNew: true },
];

export const followActivities: FollowActivity[] = [
  {
    id: 'fa1',
    breederId: 'b1',
    breederName: 'TERRABOX',
    breederLogo: turtleImage,
    activityType: 'listing',
    title: '신규 분양 개체 등록',
    description: 'Nova Turtle',
    createdAt: '2시간 전',
    listingStatus: '분양중',
    targetType: 'listing',
    targetId: 'l1',
    notificationPreview: {
      title: '팔로우 브리더 신규 분양',
      message: 'TERRABOX에서 Nova Turtle 분양글을 등록했어요.',
    },
  },
  {
    id: 'fa2',
    breederId: 'b3',
    breederName: '보석거북 연구소',
    breederLogo: turtleImage,
    activityType: 'review',
    title: '신규 후기 등록',
    description: '인증 브리더 후기 평점 5.0',
    createdAt: '1일 전',
    targetType: 'breeder',
    targetId: 'b3',
    notificationPreview: {
      title: '팔로우 브리더 새 후기',
      message: '보석거북 연구소에 새 후기가 등록되었어요.',
    },
  },
  {
    id: 'fa3',
    breederId: 'b1',
    breederName: '핑크쉘 브리더',
    breederLogo: turtleImage,
    activityType: 'listing',
    title: '분양 상태 업데이트',
    description: '레오파드 육지거북',
    createdAt: '3일 전',
    listingStatus: '예약중',
    targetType: 'listing',
    targetId: 'l2',
    notificationPreview: {
      title: '팔로우 브리더 분양 상태 변경',
      message: '핑크쉘 브리더의 개체가 예약중으로 변경되었어요.',
    },
  },
];
