export type NotificationType = 'comment' | 'like' | 'follow' | 'review' | 'breederApproved' | 'notice' | 'system';
export type NotificationTargetType = 'post' | 'breeder' | 'notice' | 'listing' | 'system';
export type NotificationFilter = 'all' | 'activity' | 'trade' | 'system';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  targetType: NotificationTargetType;
  targetId: string;
  group: Exclude<NotificationFilter, 'all'>;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  views: number;
  important: boolean;
  content: string[];
}

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'comment',
    title: '댓글',
    message: '회원님 게시글에 댓글이 달렸습니다.',
    createdAt: '5분 전',
    isRead: false,
    targetType: 'post',
    targetId: 'p1',
    group: 'activity',
  },
  {
    id: 'n2',
    type: 'like',
    title: '좋아요',
    message: '회원님 게시글을 좋아합니다.',
    createdAt: '1시간 전',
    isRead: false,
    targetType: 'post',
    targetId: 'p2',
    group: 'activity',
  },
  {
    id: 'n3',
    type: 'follow',
    title: '팔로우',
    message: 'TERRABOX 브리더가 회원님을 팔로우했습니다.',
    createdAt: '2시간 전',
    isRead: false,
    targetType: 'breeder',
    targetId: 'b1',
    group: 'activity',
  },
  {
    id: 'n8',
    type: 'follow',
    title: '팔로우 브리더 신규 분양',
    message: 'TERRABOX에서 Nova Turtle 분양글을 등록했어요.',
    createdAt: '2시간 전',
    isRead: false,
    targetType: 'listing',
    targetId: 'l1',
    group: 'activity',
  },
  {
    id: 'n9',
    type: 'review',
    title: '팔로우 브리더 후기 등록',
    message: '보석거북 연구소에 새 후기가 등록되었어요.',
    createdAt: '1일 전',
    isRead: true,
    targetType: 'breeder',
    targetId: 'b3',
    group: 'activity',
  },
  {
    id: 'n4',
    type: 'review',
    title: '후기',
    message: '분양완료 개체에 후기를 작성할 수 있어요.',
    createdAt: '어제',
    isRead: true,
    targetType: 'listing',
    targetId: 'l4',
    group: 'trade',
  },
  {
    id: 'n5',
    type: 'breederApproved',
    title: '브리더 승인',
    message: '인증 브리더 신청이 승인되었습니다.',
    createdAt: '2일 전',
    isRead: true,
    targetType: 'breeder',
    targetId: 'b1',
    group: 'trade',
  },
  {
    id: 'n6',
    type: 'notice',
    title: '공지사항',
    message: '건강한 거북이 분양 문화를 위한 운영 정책을 확인해 주세요.',
    createdAt: '3일 전',
    isRead: true,
    targetType: 'notice',
    targetId: 'notice-1',
    group: 'system',
  },
  {
    id: 'n7',
    type: 'system',
    title: '시스템',
    message: '마이부기 알림센터 UI가 준비되었습니다.',
    createdAt: '2026.06.16',
    isRead: true,
    targetType: 'system',
    targetId: 'notifications',
    group: 'system',
  },
];

export const unreadNotificationCount = notifications.filter((item) => !item.isRead).length;

export const notices: Notice[] = [
  {
    id: 'notice-1',
    title: '건강한 거북이 분양 문화를 위한 운영 정책 안내',
    date: '2026.06.10',
    views: 1284,
    important: true,
    content: [
      '안녕하세요. 마이부기입니다.',
      '모든 거북이가 안전하고 신뢰할 수 있는 환경에서 만날 수 있도록 분양글 운영 정책을 안내드립니다.',
      '분양글 작성 시 개체의 건강 상태, 부화일, 사육 환경을 정확하게 작성해 주세요. 허위 정보나 생명 존중 원칙에 어긋나는 게시글은 별도 안내 없이 제한될 수 있습니다.',
      '마이부기는 더 건강한 거북이 분양 문화를 만들기 위해 계속 노력하겠습니다. 감사합니다.',
    ],
  },
  {
    id: 'notice-2',
    title: '인증 브리더 심사 기준 변경 안내',
    date: '2026.06.06',
    views: 842,
    important: true,
    content: [
      '인증 브리더 심사 기준이 일부 변경됩니다.',
      '사육 환경, 거래 이력, 후기 평점과 대표 개체 정보의 충실도를 종합적으로 확인합니다.',
      '자세한 심사 일정은 브리더 신청 화면에서 확인해 주세요.',
    ],
  },
  {
    id: 'notice-3',
    title: '커뮤니티 이용 가이드 안내',
    date: '2026.05.28',
    views: 516,
    important: false,
    content: [
      '마이부기 커뮤니티는 거북이를 사랑하는 집사들이 경험과 정보를 나누는 공간입니다.',
      '서로를 존중하는 표현을 사용하고, 질병 관련 정보는 전문 병원 진료를 우선해 주세요.',
    ],
  },
  {
    id: 'notice-4',
    title: '성장기록 기능 업데이트 안내',
    date: '2026.05.20',
    views: 391,
    important: false,
    content: [
      '성장기록 화면에서 몸무게와 등갑 길이 변화를 한눈에 확인할 수 있습니다.',
      '꾸준한 기록으로 우리 거북이의 건강한 성장을 함께 지켜봐 주세요.',
    ],
  },
];
