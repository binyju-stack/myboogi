import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BrandHeader, Chip } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { listings } from '@/data/mockData';

export default function MarketplaceScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <View className="bg-white px-5 pb-4">
        <Text className="mb-4 text-[22px] font-black tracking-[-0.7px] text-ink">건강한 새 가족을 만나보세요</Text>
        <Pressable className="flex-row items-center rounded-[18px] bg-soft px-4 py-3.5"><Ionicons name="search" size={18} color={colors.muted} /><Text className="ml-2 text-[13px] text-muted">어떤 거북이를 찾고 계신가요?</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-4"><Chip label="전체" selected /><Chip label="품종" icon="chevron-down" /><Chip label="가격" icon="chevron-down" /><Chip label="지역" icon="chevron-down" /><Chip label="유체/성체" icon="chevron-down" /></ScrollView>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-1"><View><Text className="text-[10px] font-black text-berry">MARKETPLACE</Text><Text className="mt-1 text-[19px] font-black text-ink">분양 중인 거북이</Text></View><Text className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-muted">최신순 ▾</Text></View>
      <View className="px-5">{listings.map((item) => <ListingCard key={item.id} item={item} list />)}</View>
    </Page>
  );
}
