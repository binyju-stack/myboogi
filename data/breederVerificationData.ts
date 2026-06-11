export type VerificationStatus = '대기' | '승인' | '반려';

export interface BreederVerification {
  id: string;
  applicantName: string;
  phone: string;
  kakaoId: string;
  breederName: string;
  region: string;
  specialties: string;
  experience: string;
  introduction: string;
  appliedAt: string;
  status: VerificationStatus;
}

export const breederVerifications: BreederVerification[] = [
  {
    id: 'verification-1',
    applicantName: '김부기',
    phone: '010-1234-5678',
    kakaoId: 'boogi_house',
    breederName: '꼬북하우스',
    region: '경기 성남시',
    specialties: '레오파드 육지거북',
    experience: '7년',
    introduction: '건강한 개체와 투명한 사육 정보를 가장 중요하게 생각합니다. 부화부터 분양 이후 적응까지 꼼꼼하게 안내하고 있어요.',
    appliedAt: '2026.06.11',
    status: '대기',
  },
  {
    id: 'verification-2',
    applicantName: '이초록',
    phone: '010-2468-1357',
    kakaoId: 'green_tortoise',
    breederName: '초록정원',
    region: '서울 송파구',
    specialties: '헤르만 육지거북',
    experience: '5년',
    introduction: '초보 집사도 안심할 수 있도록 사육 환경과 먹이 관리법을 자세히 안내합니다.',
    appliedAt: '2026.06.09',
    status: '승인',
  },
  {
    id: 'verification-3',
    applicantName: '박보석',
    phone: '010-9876-5432',
    kakaoId: 'jewel_turtle',
    breederName: '보석거북 연구소',
    region: '인천 연수구',
    specialties: '다이아몬드백 테라핀',
    experience: '3년',
    introduction: '수생거북 전문 브리더로 건강한 사육 환경을 꾸준히 연구하고 있습니다.',
    appliedAt: '2026.06.04',
    status: '반려',
  },
];
