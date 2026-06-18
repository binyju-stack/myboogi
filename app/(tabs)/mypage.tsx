import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { userProfile } from '@/data/mockData';
import { unreadNotificationCount } from '@/data/notificationData';
import { managedTurtles } from '@/mockData/turtles';
import type { UserProfile } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];
type MenuItem = { label: string; description: string; icon: IconName; href?: string; readyMessage?: string };
type ActivitySummaryItem = { label: string; value: string; icon: IconName; href?: string };

const breederIdByType: Record<Exclude<UserProfile['userType'], 'normal'>, string> = {
  personal_breeder: 'b2',
  business_breeder: 'b3',
};

const turtleMenus: MenuItem[] = [
  { label: '내 거북이 관리', description: '등록한 거북이와 성장기록을 관리해요', icon: 'paw-outline', href: '/my/turtles' },
];

const activityMenus: MenuItem[] = [
  { label: '찜한 분양', description: '관심 있는 분양 개체를 확인해요', icon: 'heart-outline', href: '/mypage/favorites' },
  { label: '최근 본 분양', description: '방금 확인한 분양 정보를 다시 봐요', icon: 'time-outline', readyMessage: '최근 본 분양 기능은 준비중입니다.' },
  { label: '내가 작성한 글', description: '내가 작성한 커뮤니티 글을 확인해요', icon: 'document-text-outline', href: '/mypage/posts' },
  { label: '내가 작성한 댓글', description: '댓글과 답글 활동을 확인해요', icon: 'chatbubble-ellipses-outline', readyMessage: '내가 작성한 댓글 기능은 준비중입니다.' },
  { label: '내가 작성한 후기', description: '내가 작성한 후기를 관리해요', icon: 'star-outline', href: '/mypage/reviews' },
];

const breederMenus: MenuItem[] = [
  { label: '내 미니샵 보기', description: '브리더 소개와 등록 개체를 확인해요', icon: 'storefront-outline' },
  { label: '분양 등록 관리', description: '등록한 분양글을 관리해요', icon: 'albums-outline', href: '/mypage/listings' },
  { label: '브리더 인증 관리', description: '인증 상태와 신청 정보를 확인해요', icon: 'shield-checkmark-outline', href: '/breeder/verification/apply' },
  { label: '후기 관리', description: '구매자 후기를 확인하고 답변해요', icon: 'star-outline', href: '/mypage/reviews' },
  { label: '문의 관리', description: '전화와 카카오 문의 이력을 확인해요', icon: 'call-outline', readyMessage: '문의 관리 기능은 준비중입니다.' },
];

function getProfileRole(profile: UserProfile) {
  if (profile.userType === 'business_breeder') {
    return {
      badge: profile.isVerified ? '✓ 사업자 인증' : '사업자 브리더',
      eyebrow: 'BUSINESS BREEDER',
      coverFallback: colors.ink,
    };
  }

  if (profile.userType === 'personal_breeder') {
    return {
      badge: profile.isVerified ? '✓ 인증 브리더' : '개인 브리더',
      eyebrow: 'PERSONAL BREEDER',
      coverFallback: colors.berry,
    };
  }

  return {
    badge: '일반 회원',
    eyebrow: 'MY PROFILE',
    coverFallback: colors.berry,
  };
}

function getActivitySummary(profile: UserProfile): ActivitySummaryItem[] {
  return [
    { label: '내 거북이', value: `${managedTurtles.length}`, icon: 'paw-outline', href: '/my/turtles' },
    { label: '찜한 분양', value: '12', icon: 'heart-outline', href: '/mypage/favorites' },
    { label: '게시글', value: `${profile.postCount ?? profile.stats.posts ?? 0}`, icon: 'document-text-outline', href: '/mypage/posts' },
    { label: '댓글', value: `${profile.commentCount ?? profile.stats.comments ?? 0}`, icon: 'chatbubble-ellipses-outline' },
  ];
}

function CoverFallback({ color }: { color: string }) {
  return (
    <View className="h-full w-full overflow-hidden" style={{ backgroundColor: color }}>
      <View className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/20" />
      <View className="absolute -bottom-16 left-6 h-52 w-52 rounded-full bg-white/10" />
      <View className="absolute bottom-0 left-0 right-0 h-24 bg-black/10" />
    </View>
  );
}

function ProfileHero({ profile }: { profile: UserProfile }) {
  const role = getProfileRole(profile);
  const coverImage = profile.coverImage;

  return (
    <View className="bg-white pb-6 shadow-sm">
      <View className="h-[206px] overflow-hidden rounded-b-[28px]">
        {coverImage ? (
          <ImageBackground source={{ uri: coverImage }} className="h-full w-full" resizeMode="cover">
            <View className="absolute inset-0 bg-black/20" />
          </ImageBackground>
        ) : (
          <CoverFallback color={role.coverFallback} />
        )}

        <View className="absolute left-5 right-5 top-4 flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] font-black text-white/70">{role.eyebrow}</Text>
            <Text className="mt-1 text-[22px] font-black text-white">마이페이지</Text>
          </View>
          <View className="flex-row">
            <AnimatedPressable onPress={() => router.push('/notifications')} className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-white/90">
              <Ionicons name="notifications-outline" size={19} color={colors.ink} />
              {unreadNotificationCount ? (
                <View className="absolute -right-1 -top-1 min-w-5 items-center justify-center rounded-full bg-berry px-1.5 py-0.5">
                  <Text className="text-[9px] font-black text-white">{unreadNotificationCount}</Text>
                </View>
              ) : null}
            </AnimatedPressable>
            <AnimatedPressable onPress={() => router.push('/settings')} className="h-10 w-10 items-center justify-center rounded-full bg-white/90">
              <Ionicons name="settings-outline" size={19} color={colors.ink} />
            </AnimatedPressable>
          </View>
        </View>
      </View>

      <View className="-mt-11 px-5">
        <Image source={{ uri: profile.profileImage }} className="h-[86px] w-[86px] rounded-full border-4 border-white bg-shell shadow-sm" />
        <View className="mt-3 flex-row items-start">
          <View className="flex-1">
            <View className="flex-row flex-wrap items-center">
              <Text className="mr-2 text-[24px] font-black text-[#111827]" numberOfLines={1}>{profile.nickname}</Text>
              <View className="rounded-full bg-blush px-2.5 py-1.5">
                <Text className="text-[9px] font-black text-berry">{role.badge}</Text>
              </View>
            </View>
            <Text className="mt-2 text-[14px] font-medium leading-6 text-[#6B7280]">{profile.bio}</Text>
            <View className="mt-2 flex-row items-center">
              <Ionicons name="location-outline" size={14} color={colors.muted} />
              <Text className="ml-1 text-[12px] font-semibold text-[#9CA3AF]">{profile.region}</Text>
            </View>
          </View>
          <AnimatedPressable onPress={() => router.push('/mypage/edit')} className="ml-3 h-11 w-11 items-center justify-center rounded-full bg-soft">
            <Ionicons name="create-outline" size={19} color={colors.ink} />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}

function ActivitySummary({ items }: { items: ActivitySummaryItem[] }) {
  return (
    <View
      className="flex-row px-4"
      style={{ columnGap: 8, marginTop: 16, marginBottom: 24, overflow: 'visible' }}
    >
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => item.href ? router.push(item.href as never) : undefined}
          className="flex-1 items-center justify-center border border-line bg-white shadow-sm"
          style={{
            height: 104,
            minWidth: 0,
            borderRadius: 20,
            paddingVertical: 12,
            overflow: 'visible',
          }}
        >
          <View
            className="items-center justify-center rounded-full bg-blush"
            style={{ width: 40, height: 40, marginBottom: 8 }}
          >
            <Ionicons name={item.icon} size={23} color={colors.berry} />
          </View>
          <Text
            className="text-center text-[24px] font-extrabold leading-[30px] text-[#111827]"
            numberOfLines={1}
            style={{ marginBottom: 4, includeFontPadding: false }}
          >
            {item.value}
          </Text>
          <Text
            className="text-center text-[13px] font-semibold leading-[18px] text-[#8A8F98]"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            style={{ includeFontPadding: false }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function MenuSection({ title, items, onReady, compact = false }: { title?: string; items: MenuItem[]; onReady: (message: string) => void; compact?: boolean }) {
  return (
    <FadeInView delay={80}>
      <View className={compact ? 'mt-5' : 'mx-5 mt-6 rounded-[22px] border border-line bg-white px-4 py-3 shadow-sm'}>
        {title ? <Text className={compact ? 'mx-5 mb-2 text-[13px] font-bold leading-5 text-[#8A8F98]' : 'mb-2 px-1 text-[18px] font-bold leading-6 text-[#111827]'}>{title}</Text> : null}
        <View className={compact ? 'border-y border-line bg-white' : ''}>
        {items.map((item, index) => (
          <AnimatedPressable
            key={item.label}
            onPress={() => item.href ? router.push(item.href as never) : onReady(item.readyMessage ?? `${item.label} 기능은 준비중입니다.`)}
            className={`${compact ? 'mx-5 h-14' : 'min-h-[62px]'} flex-row items-center ${index ? 'border-t border-line' : ''}`}
          >
            <View className="h-9 w-9 items-center justify-center rounded-[13px] bg-blush">
              <Ionicons name={item.icon} size={18} color={colors.berry} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-[16px] font-semibold leading-5 text-[#111827]">{item.label}</Text>
              {!compact ? <Text className="mt-1 text-[13px] font-medium leading-[18px] text-[#8A8F98]" numberOfLines={1}>{item.description}</Text> : null}
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
          </AnimatedPressable>
        ))}
        </View>
      </View>
    </FadeInView>
  );
}

export default function MyPageScreen() {
  const [readyTitle, setReadyTitle] = useState('');
  const profile = userProfile;
  const isBreeder = profile.userType !== 'normal';
  const breederProfileType = profile.userType === 'normal' ? undefined : profile.userType;
  const visibleBreederMenus = breederMenus.map((item) => item.label === '내 미니샵 보기' && breederProfileType ? { ...item, href: `/breeder/${breederIdByType[breederProfileType]}` } : item);
  const primaryMenus: MenuItem[] = [
    activityMenus[0],
    activityMenus[1],
    activityMenus[2],
    activityMenus[3],
    activityMenus[4],
  ];

  return (
    <Page>
      <ProfileHero profile={profile} />
      <ActivitySummary items={getActivitySummary(profile)} />

      <MenuSection items={[turtleMenus[0], ...primaryMenus]} onReady={setReadyTitle} compact />
      {isBreeder ? <MenuSection title="브리더 관리" items={visibleBreederMenus.filter((item) => item.label !== '후기 관리')} onReady={setReadyTitle} /> : null}

      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}
