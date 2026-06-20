export interface CareTip {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  relatedProductText: string;
  relatedProductUrl: string;
  productIds?: string[];
}

export const careTips: CareTip[] = [
  {
    id: 'tip-beginner-setup',
    category: '초보가이드',
    title: '육지거북 입문자가 꼭 준비해야 할 기본 용품',
    description: '사육장, 온열등, UVB, 바닥재까지 처음 세팅에 필요한 것만 정리했어요.',
    thumbnail: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=82',
    relatedProductText: '추천 용품 보기',
    relatedProductUrl: '/marketplace',
    productIds: ['starter-enclosure', 'uvb-lamp'],
  },
  {
    id: 'tip-bathing',
    category: '온욕관리',
    title: '온욕은 얼마나 자주 해야 할까요?',
    description: '거북이 크기와 컨디션에 따라 온욕 주기와 물 온도가 달라질 수 있어요.',
    thumbnail: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?auto=format&fit=crop&w=900&q=82',
    relatedProductText: '온욕용품 보기',
    relatedProductUrl: '/marketplace',
    productIds: ['bath-tub', 'water-thermometer'],
  },
  {
    id: 'tip-nutrition',
    category: '영양관리',
    title: '칼슘제와 비타민은 언제 필요할까요?',
    description: '등갑 성장과 식욕 관리를 위해 알아두면 좋은 보충제 기준을 정리했어요.',
    thumbnail: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=900&q=82',
    relatedProductText: '관련 용품 보기',
    relatedProductUrl: '/marketplace',
    productIds: ['calcium-powder', 'reptile-vitamin'],
  },
  {
    id: 'tip-temperature',
    category: '온도관리',
    title: '밤낮 온도 차이는 어느 정도가 좋을까요?',
    description: '종별 권장 온도와 바스킹존을 안정적으로 유지하는 방법을 확인해보세요.',
    thumbnail: 'https://images.unsplash.com/photo-1551189014-fe516aed0e9e?auto=format&fit=crop&w=900&q=82',
    relatedProductText: '온도관리 용품 보기',
    relatedProductUrl: '/marketplace',
    productIds: ['digital-thermometer', 'heat-lamp'],
  },
];
