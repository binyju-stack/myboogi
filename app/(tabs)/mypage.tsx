import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { useMockUserState } from '@/components/MockUserState';
import { colors } from '@/constants/theme';
import { listings, turtles } from '@/data/mockData';

type IconName = ComponentProps<typeof Ionicons>['name'];
type MenuItem = { label: string; icon: IconName; href: string };
type BreederMenuItem = { label: string; description: string; icon: IconName; href?: string };

const quickMenus: MenuItem[] = [
  { label: '내 분양글', icon: 'storefront-outline', href: '/mypage/listings' },
  { label: '찜한 분양', icon: 'heart-outline', href: '/mypage/favorites' },
  { label: '팔로우 브리더', icon: 'people-outline', href: '/mypage/following' },
  { label: '내 게시글', icon: 'document-text-outline', href: '/mypage/posts' },
  { label: '성장기록', icon: 'analytics-outline', href: '/growth' },
  { label: '알림', icon: 'notifications-outline', href: '/notifications' },
  { label: '공지사항', icon: 'megaphone-outline', href: '/notices' },
  { label: '설정', icon: 'settings-outline', href: '/mypage/settings' },
];

const breederMenus: BreederMenuItem[] = [
  { label: '내 미니샵 관리', description: '브리더 소개와 판매 개체를 관리해요', icon: 'home-outline', href: '/breeder/b1' },
  { label: '분양글 등록', description: '새로운 개체를 분양 등록해요', icon: 'add-circle-outline', href: '/listing/create' },
  { label: '후기 관리', description: '구매자 후기를 확인하고 답변해요', icon: 'star-outline' },
  { label: '인증 브리더 신청', description: '신뢰받는 인증 브리더에 도전해요', icon: 'shield-checkmark-outline' },
  { label: '광고·상위노출 관리', description: '내 분양글을 더 많은 집사에게 알려요', icon: 'rocket-outline' },
];

export default function MyPageScreen() {
  const { favoriteIds, followedBreederIds } = useMockUserState();
  const [readyTitle, setReadyTitle] = useState('');
  const myListingCount = listings.filter((item) => item.breederId === 'b1').length;
  const metrics = [
    { value: turtles.length, label: '내 거북이' },
    { value: myListingCount, label: '내 분양글' },
    { value: followedBreederIds.length, label: '팔로우' },
    { value: favoriteIds.length, label: '찜한 분양' },
  ];

  return (
    <Page>
      <View className="bg-white px-5 pb-7 pt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-[24px] font-black tracking-[-0.8px] text-ink">마이페이지</Text>
          <View className="h-10 w-10">
            <AnimatedPressable onPress={() => router.push('/mypage/settings')} className="h-10 w-10 items-center justify-center rounded-full bg-soft">
              <Ionicons name="settings-outline" size={19} color={colors.ink} />
            </AnimatedPressable>
          </View>
        </View>

        <View className="mt-7 flex-row items-center">
          <Image source={{ uri: turtles[0].image }} className="h-[72px] w-[72px] rounded-full bg-shell" />
          <View className="ml-4 flex-1">
            <View className="flex-row items-center">
              <Text className="text-[20px] font-black text-ink">부기집사</Text>
              <View className="ml-2 rounded-full bg-blush px-2.5 py-1.5">
                <Text className="text-[9px] font-black text-berry">인증 브리더</Text>
              </View>
            </View>
            <Text className="mt-2 text-[11px] leading-5 text-muted">거북이와 함께 천천히, 건강하게 성장 중이에요.</Text>
          </View>
          <AnimatedPressable onPress={() => router.push('/mypage/profile')} className="h-10 w-10 items-center justify-center rounded-full bg-soft">
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </AnimatedPressable>
        </View>
      </View>

      <FadeInView>
        <View className="mx-5 mt-4 rounded-[26px] bg-ink px-4 py-5 shadow-sm">
          <Text className="px-1 text-[10px] font-black text-petal">MY BOOGI ACTIVITY</Text>
          <View className="mt-4 flex-row">
            {metrics.map((item, index) => (
              <View key={item.label} className={`flex-1 items-center ${index ? 'border-l border-white/10' : ''}`}>
                <Text className="text-[20px] font-black text-white">{item.value}</Text>
                <Text className="mt-1 text-[9px] text-white/50">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </FadeInView>

      <View className="px-5 pt-8">
        <Text className="text-[10px] font-black text-berry">QUICK MENU</Text>
        <Text className="mt-1 text-[20px] font-black text-ink">자주 찾는 메뉴</Text>
        <View className="mt-4 flex-row flex-wrap justify-between">
          {quickMenus.map((item, index) => (
            <View key={item.label} className="mb-3 w-[48%]">
              <FadeInView delay={index * 35}>
                <AnimatedPressable onPress={() => router.push(item.href as never)} className="h-[104px] rounded-[22px] bg-white p-4 shadow-sm">
                  <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-blush">
                    <Ionicons name={item.icon} size={18} color={colors.berry} />
                  </View>
                  <Text className="mt-3 text-[12px] font-black text-ink">{item.label}</Text>
                </AnimatedPressable>
              </FadeInView>
            </View>
          ))}
        </View>
      </View>

      <View className="px-5 pt-5">
        <View className="rounded-[26px] bg-white p-5 shadow-sm">
          <View className="flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-ink">
              <Ionicons name="shield-checkmark" size={20} color={colors.petal} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-[10px] font-black text-berry">BREEDER CENTER</Text>
              <Text className="mt-1 text-[18px] font-black text-ink">브리더 전용 관리</Text>
            </View>
          </View>

          <View className="mt-5">
            {breederMenus.map((item, index) => (
              <AnimatedPressable
                key={item.label}
                onPress={() => item.href ? router.push(item.href as never) : setReadyTitle(`${item.label} 기능은 준비중입니다.`)}
                className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}
              >
                <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-soft">
                  <Ionicons name={item.icon} size={18} color={colors.berry} />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-[12px] font-black text-ink">{item.label}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.subtle} />
              </AnimatedPressable>
            ))}
          </View>
        </View>
      </View>

      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}
