export const homeListings = [
  { id: 'l1', species: '레오파드 육지거북', price: 380000, color: '#D8C9A9' },
  { id: 'l2', species: '설가타 육지거북', price: 260000, color: '#C8D8C3' },
  { id: 'l3', species: '다이아몬드백 테라핀', price: 450000, color: '#B9D4D2' },
] as const;

export const homeBreeders = [
  { id: 'b1', name: '핑크쉘 브리더', followers: '1.2K', intro: '건강한 육지거북 전문 브리더', color: '#EBD8C7' },
  { id: 'b2', name: '느린숲 거북이', followers: '842', intro: '새로운 가족과의 인연을 소중하게', color: '#C9DBCE' },
  { id: 'b3', name: '보석거북 연구소', followers: '2K', intro: '수생거북 전문 사육 상담', color: '#C5D8DD' },
] as const;

export const homePosts = [
  { id: 'p1', title: '우리집 레오파드 첫 산책 다녀왔어요', author: '꼬북집사', likes: 68, comments: 12, views: 219 },
  { id: 'p2', title: '여름철 온습도 관리, 이렇게 하고 있어요', author: '느림보아빠', likes: 156, comments: 33, views: 608 },
  { id: 'p3', title: '처음 키우기 좋은 육지거북 품종은?', author: '첫거북생활', likes: 45, comments: 41, views: 289 },
] as const;
