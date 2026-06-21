export type HomeColumn = {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  route: string;
};

export const homeColumns: HomeColumn[] = [
  {
    id: 'column-1',
    category: '초보 가이드',
    title: '육지거북 입양 전 꼭 준비해야 할 기본 환경',
    description: '사육장부터 UVB, 온도와 습도까지 처음 필요한 기준을 정리했어요.',
    thumbnail: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=80',
    route: '/community',
  },
  {
    id: 'column-2',
    category: '건강 관리',
    title: '온욕 주기와 물 온도는 어떻게 정할까요?',
    description: '개체의 크기와 컨디션에 맞춰 무리 없이 온욕하는 방법을 살펴봐요.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    route: '/community',
  },
  {
    id: 'column-3',
    category: '영양 관리',
    title: '칼슘제와 비타민을 급여할 때 확인할 것',
    description: '성장 단계에 따라 필요한 보충제와 과급여를 피하는 기준을 알려드려요.',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    route: '/community',
  },
];
