import { ListingCard } from '@/components/ListingCard';
import { EmptyList, MyListLayout } from '@/components/MyListLayout';
import { useMockUserState } from '@/components/MockUserState';
import { listings } from '@/data/mockData';

export default function FavoriteListingsScreen() {
  const { favoriteIds } = useMockUserState();
  const favorites = listings.filter((item) => favoriteIds.includes(item.id));
  return <MyListLayout title="찜한 분양" eyebrow="MY FAVORITES" description="관심 있는 거북이를 한곳에서 확인해보세요." count={favorites.length}>{favorites.length ? favorites.map((item, index) => <ListingCard key={item.id} item={item} list index={index} />) : <EmptyList title="찜한 분양이 없어요" description="분양 카드의 하트를 눌러 관심 있는 거북이를 저장해보세요." />}</MyListLayout>;
}
