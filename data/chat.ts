import type { ChatRoom } from '@/types/chat';

const turtleImages = [
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=76',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=72',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=68',
];

export const chatRooms: ChatRoom[] = [
  {
    id: 'chat-pinkshell-leopard',
    participantName: '핑크쉘 브리더',
    participantAvatar: turtleImages[0],
    isVerified: true,
    listingId: 'l1',
    listingTitle: '레오파드 육지거북',
    listingImage: turtleImages[0],
    listingPrice: 380000,
    listingStatus: '분양중',
    lastMessage: '사진 보내주시면 상태 확인해드릴게요.',
    lastMessageAt: '오후 2:31',
    unreadCount: 2,
    messages: [
      { id: 'm1', roomId: 'chat-pinkshell-leopard', senderType: 'other', text: '안녕하세요. 레오파드 육지거북 문의 주셔서 감사합니다.', images: [], createdAt: '오후 2:20', isRead: true },
      { id: 'm2', roomId: 'chat-pinkshell-leopard', senderType: 'me', text: '등갑 쪽이 하얗게 보이는데 괜찮을까요?', images: [{ id: 'img1', uri: turtleImages[1] }], createdAt: '오후 2:28', isRead: true },
      { id: 'm3', roomId: 'chat-pinkshell-leopard', senderType: 'other', text: '사진상으로는 탈피 과정일 가능성이 있어 보입니다. 등갑을 손으로 억지로 떼지는 마세요.', images: [], createdAt: '오후 2:31', isRead: false },
      { id: 'm4', roomId: 'chat-pinkshell-leopard', senderType: 'other', text: '사진 보내주시면 상태 확인해드릴게요.', images: [], createdAt: '오후 2:31', isRead: false },
    ],
  },
  {
    id: 'chat-slowforest-sulcata',
    participantName: '느린손 거북이',
    participantAvatar: turtleImages[2],
    isVerified: true,
    listingId: 'l2',
    listingTitle: '설가타 육지거북',
    listingImage: turtleImages[2],
    listingPrice: 260000,
    listingStatus: '예약중',
    lastMessage: '온욕은 주 2~3회 정도면 충분합니다.',
    lastMessageAt: '오전 11:08',
    unreadCount: 0,
    messages: [
      { id: 'm5', roomId: 'chat-slowforest-sulcata', senderType: 'me', text: '처음 키우는 설가타인데 온욕은 매일 해야 하나요?', images: [], createdAt: '오전 10:58', isRead: true },
      { id: 'm6', roomId: 'chat-slowforest-sulcata', senderType: 'other', text: '온욕은 주 2~3회 정도면 충분합니다. 사육장 습도와 먹이 반응을 같이 봐주세요.', images: [], createdAt: '오전 11:08', isRead: true },
    ],
  },
  {
    id: 'chat-terrabox-terrapin',
    participantName: 'TERRABOX',
    participantAvatar: turtleImages[3],
    isVerified: true,
    listingId: 'l3',
    listingTitle: '테라핀 뉴블러드',
    listingImage: turtleImages[3],
    listingPrice: 450000,
    listingStatus: '분양중',
    lastMessage: '등갑 사진을 위에서 한 장 더 보내주세요.',
    lastMessageAt: '어제',
    unreadCount: 1,
    messages: [
      { id: 'm7', roomId: 'chat-terrabox-terrapin', senderType: 'me', text: '수질 적응 중인데 등갑 색이 조금 변한 것 같아요.', images: [{ id: 'img2', uri: turtleImages[3] }, { id: 'img3', uri: turtleImages[0] }], createdAt: '어제 오후 6:12', isRead: true },
      { id: 'm8', roomId: 'chat-terrabox-terrapin', senderType: 'other', text: '등갑 사진을 위에서 한 장 더 보내주세요. 조명 반사인지 실제 변화인지 같이 확인해볼게요.', images: [], createdAt: '어제 오후 6:20', isRead: false },
    ],
  },
];

export const unreadChatCount = chatRooms.reduce((total, room) => total + room.unreadCount, 0);

export function getChatRoomIdForListing(listingId?: string) {
  return chatRooms.find((room) => room.listingId === listingId)?.id ?? chatRooms[0]?.id;
}

export function getChatRoomIdForBreeder(breederName?: string) {
  return chatRooms.find((room) => room.participantName === breederName)?.id ?? chatRooms[0]?.id;
}
