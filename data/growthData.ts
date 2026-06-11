export interface GrowthTurtle {
  id: string;
  name: string;
  species: string;
  sex: '수컷' | '암컷' | '미구분';
  birthDate: string;
  image: string;
  summary: string;
}

export interface GrowthEntry {
  id: string;
  turtleId: string;
  date: string;
  displayDate: string;
  weight: number;
  shellLength: number;
  foodResponse: string;
  bowelMovement: string;
  condition: string;
  image: string;
  memo: string;
}

const turtlePhoto = 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80';

export const turtles: GrowthTurtle[] = [
  { id: 'boogi', name: '부기', species: '뉴블러드 테라핀', sex: '미구분', birthDate: '2025.09.21', image: turtlePhoto, summary: '먹이 반응이 좋고 안정적으로 성장 중이에요.' },
  { id: 'chorok', name: '초록이', species: '헤르만 육지거북', sex: '수컷', birthDate: '2024.11.08', image: turtlePhoto, summary: '활동량이 많고 건강한 컨디션을 유지하고 있어요.' },
  { id: 'boseok', name: '보석이', species: '다이아몬드백 테라핀', sex: '암컷', birthDate: '2025.04.16', image: turtlePhoto, summary: '최근 등갑 길이가 눈에 띄게 자랐어요.' },
];

export const growthRecords: GrowthEntry[] = [
  { id: 'ge1', turtleId: 'boogi', date: '2026.06.11', displayDate: '오늘', weight: 128, shellLength: 6.4, foodResponse: '좋음', bowelMovement: '정상', condition: '좋음', image: turtlePhoto, memo: '사료와 민들레를 잘 먹었고 활동량도 좋아요.' },
  { id: 'ge2', turtleId: 'boogi', date: '2026.05.28', displayDate: '5월 28일', weight: 121, shellLength: 6.1, foodResponse: '좋음', bowelMovement: '정상', condition: '좋음', image: turtlePhoto, memo: '등갑이 단단하고 눈 상태도 맑아요.' },
  { id: 'ge3', turtleId: 'boogi', date: '2026.05.10', displayDate: '5월 10일', weight: 115, shellLength: 5.8, foodResponse: '보통', bowelMovement: '정상', condition: '좋음', image: turtlePhoto, memo: '먹이 반응은 보통이지만 컨디션은 안정적이에요.' },
  { id: 'ge4', turtleId: 'boogi', date: '2026.04.20', displayDate: '4월 20일', weight: 108, shellLength: 5.5, foodResponse: '좋음', bowelMovement: '정상', condition: '좋음', image: turtlePhoto, memo: '첫 성장기록을 시작했어요.' },
  { id: 'ge5', turtleId: 'chorok', date: '2026.06.08', displayDate: '6월 8일', weight: 342, shellLength: 11.2, foodResponse: '좋음', bowelMovement: '정상', condition: '좋음', image: turtlePhoto, memo: '야외 일광욕 후 활동량이 좋아졌어요.' },
  { id: 'ge6', turtleId: 'boseok', date: '2026.06.05', displayDate: '6월 5일', weight: 206, shellLength: 8.7, foodResponse: '좋음', bowelMovement: '정상', condition: '좋음', image: turtlePhoto, memo: '수온과 먹이 반응 모두 안정적이에요.' },
];
