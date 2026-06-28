export type BreederNoticeType = 'schedule' | 'shipping' | 'consultation' | 'general';

export interface BreederNotice {
  id: string;
  breederId: string;
  type: BreederNoticeType;
  title: string;
  description: string;
  createdAt: string;
  isUrgent: boolean;
}

export const breederNotices: Record<string, BreederNotice> = {
  b1: {
    id: 'bn1',
    breederId: 'b1',
    type: 'schedule',
    title: '이번 주말 상담 가능 시간이 변경됐어요',
    description: '토요일은 오후 2시 이후 답변 가능합니다.',
    createdAt: '2026.06.27',
    isUrgent: true,
  },
  b2: {
    id: 'bn2',
    breederId: 'b2',
    type: 'consultation',
    title: '오늘 저녁 상담은 예약순으로 진행됩니다',
    description: '오후 7시부터 순차적으로 답변드릴게요.',
    createdAt: '2026.06.27',
    isUrgent: false,
  },
  b3: {
    id: 'bn3',
    breederId: 'b3',
    type: 'shipping',
    title: '수생거북 발송 일정을 먼저 확인해 주세요',
    description: '기온과 수온을 확인한 뒤 안전하게 전달합니다.',
    createdAt: '2026.06.26',
    isUrgent: true,
  },
};

export function getBreederNotice(breederId: string): BreederNotice | undefined {
  return breederNotices[breederId];
}
