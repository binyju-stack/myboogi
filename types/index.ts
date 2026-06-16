export type BreederBadge = '일반 브리더' | '인증 브리더' | '우수 브리더' | '프리미엄 브리더';

export interface Breeder {
  id: string;
  name: string;
  badge: BreederBadge;
  breederType?: BreederType;
  verificationBadgeLabel?: string;
  level?: number;
  levelName?: string;
  trustScore?: number;
  logo?: string;
  bannerImage?: string;
  shortBio?: string;
  fullBio?: string;
  specialty?: string;
  region?: string;
  careerYears?: number;
  joinedAt?: string;
  instagramUrl?: string;
  blogUrl?: string;
  youtubeUrl?: string;
  kakaoChannelUrl?: string;
  websiteUrl?: string;
  representativeTurtles?: RepresentativeTurtle[];
  avatar: string;
  banner: string;
  intro: string;
  followers: number;
  reviews: number;
  trades: number;
  rating: number;
  location: string;
}

export type BreederType = 'individual' | 'business';

export interface RepresentativeTurtle {
  id: string;
  name: string;
  species: string;
  feature: string;
  image: string;
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
  listingStatus?: ListingStatus;
  reviewEligible?: boolean;
  status: '분양중' | '예약중' | '분양완료';
}

export type ListingStatus = 'active' | 'reserved' | 'completed';

export interface Post {
  id: string;
  category: string;
  author: string;
  avatar: string;
  authorAvatar?: string;
  title: string;
  content: string;
  image?: string;
  images?: string[];
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  commentsCount?: number;
  commentsList?: PostComment[];
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

export interface User {
  id: string;
  name: string;
  type: string;
  location: string;
  level: number;
  levelName: string;
  xp: number;
  nextLevelXp: number;
  trustScore: number;
}
