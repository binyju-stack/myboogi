export type BillboardCategory = 'home' | 'listing' | 'community';
export type BillboardTicketStatus = 'available' | 'used' | 'expired';
export type BillboardTicketSource = 'welcome' | 'breeder_verified' | 'admin_grant' | 'purchase';
export type BillboardSlotStatus = 'available' | 'reserved' | 'active' | 'ended';
export type BillboardTargetType = 'post' | 'listing' | 'breeder' | 'notice';
export type BillboardSubmissionStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'scheduled' | 'active' | 'ended';

export type BillboardTicket = {
  id: string;
  userId: string;
  status: BillboardTicketStatus;
  source: BillboardTicketSource;
  expiresAt: string;
  createdAt: string;
};

export type BillboardSlot = {
  id: string;
  startAt: string;
  endAt: string;
  status: BillboardSlotStatus;
  reservedByUserId?: string;
};

export type BillboardSubmission = {
  id: string;
  userId: string;
  ticketId: string;
  originalTitle: string;
  title: string;
  type: BillboardTargetType;
  targetId: string;
  slotId: string;
  status: BillboardSubmissionStatus;
  createdAt: string;
};

export type BillboardSubmissionCreateInput = {
  userId: string;
  ticketId: string;
  originalTitle: string;
  title: string;
  type: BillboardTargetType;
  targetId: string;
  slotId: string;
};

export type BillboardDisplayItem = {
  id: string;
  originalTitle: string;
  title: string;
  type: BillboardTargetType;
  targetId: string;
  expiresAt: string;
  categories: BillboardCategory[];
};


