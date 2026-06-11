export type AdminStatus = '정상' | '주의' | '정지';

export interface AdminUser {
  id: string;
  nickname: string;
  memberType: '일반회원' | '브리더' | '인증 브리더';
  joinedAt: string;
  status: AdminStatus;
}

export const adminUsers: AdminUser[] = [
  { id: 'u1', nickname: '부기집사', memberType: '인증 브리더', joinedAt: '2025.11.02', status: '정상' },
  { id: 'u2', nickname: '초록정원', memberType: '브리더', joinedAt: '2026.01.14', status: '정상' },
  { id: 'u3', nickname: '꼬북집사', memberType: '일반회원', joinedAt: '2026.03.21', status: '정상' },
  { id: 'u4', nickname: '거북마켓', memberType: '브리더', joinedAt: '2026.04.08', status: '주의' },
  { id: 'u5', nickname: '레오맘', memberType: '일반회원', joinedAt: '2026.05.17', status: '정지' },
];

export const adminListings = [
  { id: 'l1', species: '레오파드 육지거북', breeder: '꼬북하우스', price: 380000, status: '분양중', reports: 1 },
  { id: 'l2', species: '헤르만 육지거북', breeder: '초록정원', price: 260000, status: '분양중', reports: 0 },
  { id: 'l3', species: '다이아몬드백 테라핀', breeder: '보석거북 연구소', price: 450000, status: '예약중', reports: 2 },
  { id: 'l4', species: '체리헤드 레드풋', breeder: '꼬북하우스', price: 720000, status: '분양완료', reports: 0 },
];

export const adminPosts = [
  { id: 'p1', title: '우리집 레오파드 첫 일광욕 성공했어요', category: '자유게시판', author: '꼬북집사', reports: 0, status: '게시중' },
  { id: 'p2', title: '육지거북 여름철 습도 관리 팁', category: '사육정보', author: '어린보아비', reports: 0, status: '게시중' },
  { id: 'p3', title: '눈이 조금 부어 보여요', category: '질병상담', author: '부기맘', reports: 1, status: '검토중' },
  { id: 'p4', title: '무료 분양 링크 확인하세요', category: '자유게시판', author: '거북마켓', reports: 4, status: '숨김' },
];

export const adminNotices = [
  { id: 'notice-1', title: '건강한 거북이 분양 문화를 위한 운영 정책 안내', date: '2026.06.10', important: true },
  { id: 'notice-2', title: '인증 브리더 심사 기준 변경 안내', date: '2026.06.06', important: true },
  { id: 'notice-3', title: '커뮤니티 이용 가이드 안내', date: '2026.05.28', important: false },
  { id: 'notice-4', title: '성장기록 기능 업데이트 안내', date: '2026.05.20', important: false },
];

export const adminStats = {
  users: 1248,
  breeders: 86,
  pendingBreeders: 12,
  listings: 342,
  posts: 2891,
  pendingReports: 7,
};
