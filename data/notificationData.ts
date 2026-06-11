export type NotificationType = 'comment' | 'listing' | 'favorite' | 'popular' | 'notice' | 'growth';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  time: string;
  unread: boolean;
  relatedPath: string;
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
  { id: 'n1', type: 'comment', title: '새 댓글이 달렸어요', content: '초록정원님이 회원님의 게시글에 댓글을 남겼어요.', time: '방금 전', unread: true, relatedPath: '/community/p1' },
  { id: 'n2', type: 'listing', title: '인증 브리더의 새 분양', content: '팔로우 중인 꼬북하우스에서 새 개체를 등록했어요.', time: '12분 전', unread: true, relatedPath: '/listing/l1' },
  { id: 'n3', type: 'favorite', title: '찜한 분양 상태가 변경됐어요', content: '찜한 레오파드 육지거북이 예약중으로 변경됐어요.', time: '1시간 전', unread: true, relatedPath: '/mypage/favorites' },
  { id: 'n4', type: 'popular', title: '오늘의 인기글에 선정됐어요', content: '회원님의 게시글이 커뮤니티 인기글에 올랐어요.', time: '3시간 전', unread: false, relatedPath: '/community/p2' },
  { id: 'n5', type: 'notice', title: '마이부기 운영 정책 안내', content: '건강한 분양 문화를 위한 운영 정책을 확인해 주세요.', time: '어제', unread: false, relatedPath: '/notices/notice-1' },
  { id: 'n6', type: 'growth', title: '오늘의 성장기록을 남겨보세요', content: '부기의 몸무게와 등갑 길이를 기록할 시간이에요.', time: '2일 전', unread: false, relatedPath: '/growth/record' },
];

export const notices: Notice[] = [
  {
    id: 'notice-1',
    title: '건강한 거북이 분양 문화를 위한 운영 정책 안내',
    date: '2026.06.10',
    views: 1284,
    important: true,
    content: [
      '안녕하세요, 마이부기입니다.',
      '모든 거북이와 집사가 안전하고 신뢰할 수 있는 환경에서 만날 수 있도록 분양글 운영 정책을 안내드립니다.',
      '분양글 작성 시 개체의 건강 상태와 부화일, 사육 환경을 정확하게 작성해 주세요. 허위 정보나 생명 존중 원칙에 어긋나는 게시글은 별도 안내 없이 제한될 수 있습니다.',
      '마이부기는 더 건강한 거북이 문화를 만들기 위해 계속 노력하겠습니다. 감사합니다.',
    ],
  },
  {
    id: 'notice-2',
    title: '인증 브리더 심사 기준이 새롭게 변경됩니다',
    date: '2026.06.06',
    views: 842,
    important: true,
    content: [
      '인증 브리더 심사 기준이 일부 변경됩니다.',
      '사육 환경, 거래 이력, 후기 평점과 함께 개체 정보의 충실도를 종합적으로 확인합니다.',
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
      '서로를 존중하는 표현을 사용하고, 질병 관련 정보는 전문 병원의 진료를 우선해 주세요.',
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
