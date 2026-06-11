export type ReportStatus = '대기' | '처리완료' | '반려';
export type ReportTargetType = '분양글' | '커뮤니티 게시글' | '댓글' | '브리더';

export interface ReportItem {
  id: string;
  targetType: ReportTargetType;
  targetName: string;
  reason: string;
  detail: string;
  reporter: string;
  reportedAt: string;
  status: ReportStatus;
}

export const reportReasons = ['허위 분양글', '사기 의심', '부적절한 사진', '욕설/비방', '광고/도배', '기타'];

export const reports: ReportItem[] = [
  { id: 'report-1', targetType: '분양글', targetName: '레오파드 육지거북 유체', reason: '허위 분양글', detail: '게시된 개체 정보와 문의 시 안내받은 내용이 달라 확인이 필요합니다.', reporter: '부기집사', reportedAt: '2026.06.11', status: '대기' },
  { id: 'report-2', targetType: '커뮤니티 게시글', targetName: '무료 분양 링크 확인하세요', reason: '광고/도배', detail: '동일한 외부 링크 게시글이 반복적으로 등록되고 있습니다.', reporter: '초록정원', reportedAt: '2026.06.10', status: '처리완료' },
  { id: 'report-3', targetType: '브리더', targetName: '거북마켓', reason: '사기 의심', detail: '입금 후 연락이 원활하지 않다는 제보입니다.', reporter: '꼬북집사', reportedAt: '2026.06.08', status: '반려' },
];
