export type BreederBadge = '일반 브리더' | '인증 브리더' | '우수 브리더' | '프리미엄 브리더';

export interface Breeder {
  id: string;
  userId?: string;
  name: string;
  badge: BreederBadge;
  breederType?: BreederType;
  verificationBadgeLabel?: string;
  isFollowing?: boolean;
  recentActivity?: string;
  newListingCount?: number;
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
  listingId: string;
  userId: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  species: string;
  createdAt: string;
  reviewType: ReviewType;
  status: ReviewStatus;
  reportCount: number;
}

export type ReviewType = 'general' | 'contact_based' | 'verified_trade';

export type ReviewStatus = 'active' | 'hidden' | 'pending';

export type Review = BreederReview;

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
  listedAt?: string;
  shellLength?: string;
  weight?: string;
  feedingResponse?: string;
  healthStatus?: string;
  specialNotes?: string;
  fatherInfo?: ParentTurtleInfo;
  motherInfo?: ParentTurtleInfo;
  relatedListingIds?: string[];
  views: number;
  currentViewers?: number;
  likes: number;
  image: string;
  images: string[];
  description: string;
  verified: boolean;
  tradeMethods?: string[];
  listingStatus?: ListingStatus;
  reviewEligible?: boolean;
  status: '분양중' | '예약중' | '분양완료';
}

export type ListingStatus = 'active' | 'reserved' | 'completed';

export interface ParentTurtleInfo {
  name: string;
  image: string;
  feature: string;
  lineage: string;
}

export interface Post {
  id: string;
  userId?: string;
  category: string;
  badge?: string;
  author: string;
  avatar: string;
  authorAvatar?: string;
  petInfo?: string;
  title: string;
  content: string;
  image?: string;
  images?: string[];
  tags?: string[];
  relatedListing?: {
    title: string;
    price: number;
    actionLabel: string;
  };
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
  userId?: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export type Comment = PostComment;

export interface Turtle {
  id: string;
  userId?: string;
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

export type UserType = 'normal' | 'personal_breeder' | 'business_breeder';

export interface UserProfile {
  userType: UserType;
  profileImage: string;
  coverImage?: string;
  nickname: string;
  bio: string;
  region: string;
  isVerified: boolean;
  breederType?: BreederType;
  rating?: number;
  reviewCount?: number;
  followerCount?: number;
  postCount: number;
  commentCount: number;
  likeCount: number;
  instagram: string;
  blog: string;
  youtube: string;
  openChat: string;
  interests: string[];
  stats: {
    posts: number;
    comments: number;
    listings: number;
    followers: number;
    following: number;
  };
}

export interface BlockedUser {
  id: string;
  nickname: string;
  avatar: string;
  userType: string;
  blockedAt: string;
}

export interface AppSettings {
  notificationEnabled: boolean;
  commentNotification: boolean;
  likeNotification: boolean;
  followNotification: boolean;
  listingNotification: boolean;
  breederNotification: boolean;
  noticeNotification: boolean;
}

export type UserSettings = AppSettings & {
  userId: string;
};

export interface Favorite {
  id: string;
  userId: string;
  listingId: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  userId: string;
  breederId: string;
  createdAt: string;
}

export interface ContactLog {
  id: string;
  userId: string;
  breederId: string;
  listingId?: string;
  contactType: 'phone' | 'kakao' | 'open_chat';
  contactedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'comment' | 'like' | 'follow' | 'review' | 'listing' | 'notice' | 'system';
  title: string;
  message: string;
  targetType?: 'post' | 'listing' | 'breeder' | 'review' | 'notice';
  targetId?: string;
  read: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'user' | 'post' | 'comment' | 'listing' | 'breeder' | 'review';
  targetId: string;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  actionLabel: string;
  linkUrl: string;
  isActive: boolean;
  isAd: boolean;
  sortOrder: number;
  startDate: string;
  endDate: string;
  createdBy: string;
}

export interface BreederApplication {
  id: string;
  userId: string;
  breederType: BreederType;
  breederName: string;
  region: string;
  specialties: string[];
  introduction: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}
