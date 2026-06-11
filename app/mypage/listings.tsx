import { ListingCard } from '@/components/ListingCard';
import { MyListLayout } from '@/components/MyListLayout';
import { listings } from '@/data/mockData';

const myListingIds = ['l1', 'l4', 'l5'];

export default function MyListingsScreen() {
  const items = listings.filter((item) => myListingIds.includes(item.id));
  const statuses = ['분양중', '예약중', '분양완료'] as const;
  return <MyListLayout title="내 분양글" eyebrow="MY MARKETPLACE" description="등록한 분양글과 진행 상태를 관리해요." count={items.length}>{items.map((item, index) => <ListingCard key={item.id} item={{ ...item, status: statuses[index] }} list index={index} />)}</MyListLayout>;
}
