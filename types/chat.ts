export type ChatSenderType = 'me' | 'other';

export interface MessageImage {
  id: string;
  uri: string;
  width?: number;
  height?: number;
}

export interface Message {
  id: string;
  roomId: string;
  senderType: ChatSenderType;
  text?: string;
  images: MessageImage[];
  createdAt: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participantName: string;
  participantAvatar: string;
  isVerified: boolean;
  listingId?: string;
  listingTitle?: string;
  listingImage?: string;
  listingPrice?: number;
  listingStatus?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}
