import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Avatar, VerifiedBadge } from '@/components/common';
import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breeders, turtles } from '@/data/mockData';
import { useMockUserState } from '@/components/MockUserState';

type IconName = ComponentProps<typeof Ionicons>['name'];
const menus: { label: string; description: string; icon: IconName; href: string }[] = [
  { label: '내 분양글', description: '등록한 분양글을 관리해요', icon: 'storefront-outline', href: '/mypage/listings' },
  { label: '찜한 분양', description: '관심 있는 거북이를 모아봤어요', icon: 'heart-outline', href: '/mypage/favorites' },
  { label: '내 게시글', description: '커뮤니티 활동을 확인해요', icon: 'document-text-outline', href: '/mypage/posts' },
  { label: '팔로우 브리더', description: '새 소식을 빠르게 만나보세요', icon: 'people-outline', href: '/mypage/following' },
  { label: '성장 기록', description: '부기의 변화를 기록해요', icon: 'analytics-outline', href: '/growth' },
  { label: '설정', description: '알림과 서비스 설정을 관리해요', icon: 'settings-outline', href: '/admin' },
];

export default function MyPageScreen() {
  const { favoriteIds, followedBreederIds } = useMockUserState();
  return (
    <Page>
      <View className="bg-white px-5 pb-6 pt-4">
        <View className="flex-row items-center justify-between"><Text className="text-[22px] font-black tracking-[-0.7px] text-ink">마이페이지</Text><View className="h-10 w-10 items-center justify-center rounded-full bg-soft"><Ionicons name="settings-outline" size={19} color={colors.ink} /></View></View>
        <View className="mt-6 flex-row items-center"><Avatar uri={turtles[0].image} size={68} /><View className="ml-4 flex-1"><Text className="text-[18px] font-black text-ink">부기집사</Text><Text className="mt-1 text-[11px] text-muted">서울 마포구 · 일반회원</Text><View className="mt-2"><VerifiedBadge label="매너 집사" /></View></View><Ionicons name="chevron-forward" size={20} color={colors.muted} /></View>
      </View>

      <View className="mx-5 mt-4 rounded-[24px] bg-ink px-5 py-5 shadow-sm">
        <Text className="text-[10px] font-black text-petal">MY BOOGI ACTIVITY</Text>
        <View className="mt-4 flex-row">{[['3', '내 분양글'], [favoriteIds.length, '찜'], [followedBreederIds.length, '팔로잉']].map(([value, label], index) => <View key={label} className={`flex-1 ${index ? 'border-l border-white/10 pl-5' : ''}`}><Text className="text-[20px] font-black text-white">{value}</Text><Text className="mt-1 text-[10px] text-white/50">{label}</Text></View>)}</View>
      </View>

      <View className="px-5 pt-5">
        {menus.map((item, index) => <FadeInView key={item.label} delay={index * 45}><AnimatedPressable onPress={() => router.push(item.href as never)} className="mb-3 flex-row items-center rounded-[20px] border border-line bg-white p-4 shadow-sm"><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush"><Ionicons name={item.icon} size={19} color={colors.berry} /></View><View className="ml-3 flex-1"><Text className="text-[13px] font-black text-ink">{item.label}</Text><Text className="mt-1 text-[10px] text-muted">{item.description}</Text></View><Ionicons name="chevron-forward" size={17} color={colors.subtle} /></AnimatedPressable></FadeInView>)}
      </View>
    </Page>
  );
}
