import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Avatar, BrandHeader, VerifiedBadge } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breeders, turtles } from '@/data/mockData';

const menus = [
  ['내 분양글', 'storefront-outline', '/marketplace'], ['찜 목록', 'heart-outline', '/marketplace'], ['내 게시글', 'document-text-outline', '/community'],
  ['팔로우 브리더', 'people-outline', `/breeder/${breeders[0].id}`], ['성장 기록', 'analytics-outline', '/growth'], ['설정', 'settings-outline', '/admin'],
] as const;

export default function MyPageScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <View className="border-b-8 border-[#F7F5F7] bg-white p-5">
        <View className="flex-row items-center"><Avatar uri={turtles[0].image} size={66} /><View className="ml-4 flex-1"><Text className="text-lg font-black text-ink">부기집사</Text><Text className="mt-1 text-xs text-muted">서울 마포구 · 일반회원</Text><View className="mt-2"><VerifiedBadge label="매너 집사" /></View></View><Ionicons name="chevron-forward" size={20} color={colors.muted} /></View>
        <View className="mt-5 flex-row rounded-2xl bg-blush py-4">{[['3', '내 분양글'], ['12', '찜'], ['5', '팔로잉']].map(([v, l], i) => <View key={l} className={`flex-1 items-center ${i ? 'border-l border-line' : ''}`}><Text className="text-lg font-black text-berry">{v}</Text><Text className="mt-1 text-[11px] text-muted">{l}</Text></View>)}</View>
      </View>
      <View className="px-4 py-3">{menus.map(([label, icon, href]) => <Pressable key={label} onPress={() => router.push(href as never)} className="flex-row items-center border-b border-line py-4"><View className="h-10 w-10 items-center justify-center rounded-xl bg-shell"><Ionicons name={icon} size={19} color={colors.berry} /></View><Text className="ml-3 flex-1 text-sm font-bold text-ink">{label}</Text><Ionicons name="chevron-forward" size={17} color={colors.muted} /></Pressable>)}</View>
    </Page>
  );
}
