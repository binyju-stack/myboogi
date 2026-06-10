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
      <View className="border-b border-line bg-white p-4">
        <Pressable className="flex-row items-center rounded-xl bg-[#F7F5F7] px-4 py-3"><Ionicons name="search" size={18} color={colors.muted} /><Text className="ml-2 text-sm text-muted">어떤 거북이를 찾고 계신가요?</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 py-3">
        <Chip label="전체" selected /><Chip label="품종" icon="chevron-down" /><Chip label="가격" icon="chevron-down" /><Chip label="지역" icon="chevron-down" /><Chip label="유체/성체" icon="chevron-down" /><Chip label="인증 브리더" />
      </ScrollView>
      <View className="flex-row items-center justify-between px-4 pb-3 pt-2"><Text className="text-sm font-black text-ink">분양 개체 {listings.length}마리</Text><Text className="text-xs text-muted">최신순 ▾</Text></View>
      <View className="flex-row flex-wrap justify-between px-4">{listings.map((item) => <ListingCard key={item.id} item={item} />)}</View>
    </Page>
  );
}
