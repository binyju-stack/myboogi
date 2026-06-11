export type BreederBadge = '일반 브리더' | '인증 브리더' | '우수 브리더' | '프리미엄 브리더';

export interface Breeder {
  id: string;
  name: string;
  badge: BreederBadge;
  avatar: string;
  banner: string;
  intro: string;
  followers: number;
  reviews: number;
  trades: number;
  rating: number;
  location: string;
}

export interface BreederReview {
  id: string;
  breederId: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  species: string;
  createdAt: string;
}

export interface Listing {
  id: string;
  breederId: string;
  title: string;
  species: string;
  price: number;
  location: string;
  sex: '수컷' | '암컷' | '미구분';
  stage: '유체' | '성체';
  size: string;
  hatchDate: string;
  views: number;
  likes: number;
  image: string;
  images: string[];
  description: string;
  verified: boolean;
  status: '분양중' | '분양완료';
}

export interface Post {
  id: string;
  category: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  image?: string;
  images?: string[];
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
}

export interface PostComment {
  id: string;
  postId: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Turtle {
  id: string;
  name: string;
  species: string;
  sex: '수컷' | '암컷' | '미구분';
  image: string;
  birthDate: string;
}

export interface GrowthRecord {
  id: string;
  turtleId: string;
  date: string;
  weight: number;
  shellLength: number;
  image: string;
  memo: string;
  foodResponse: string;
  bowelMovement: string;
  condition: string;
}
