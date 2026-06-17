import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { UserLevelCard } from '@/components/LevelProgress';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { userProfile, users } from '@/data/mockData';
import { unreadNotificationCount } from '@/data/notificationData';
import type { UserProfile } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];
type MenuItem = { label: string; description: string; icon: IconName; href?: string; readyMessage?: string };
type ProfileStat = { value: string; label: string };

const breederIdByType: Record<Exclude<UserProfile['userType'], 'normal'>, string> = {
  personal_breeder: 'b2',
  business_breeder: 'b3',
};

const normalMenus: MenuItem[] = [
  { label: '찜한 개체', description: '관심 있는 분양 개체를 확인해요', icon: 'heart-outline', href: '/mypage/favorites' },
  { label: '최근 본 분양', description: '방금 확인한 분양 정보를 다시 봐요', icon: 'time-outline', readyMessage: '최근 본 분양 기능은 준비중입니다.' },
  { label: '작성한 후기', description: '내가 작성한 후기를 관리해요', icon: 'star-outline', href: '/mypage/reviews' },
  { label: '성장 기록', description: '우리 거북이 성장 변화를 기록해요', icon: 'analytics-outline', href: '/growth' },
  { label: '내 커뮤니티 활동', description: '작성한 글과 댓글을 확인해요', icon: 'chatbubbles-outline', href: '/mypage/posts' },
];

const breederMenus: MenuItem[] = [
  { label: '내 미니샵 보기', description: '브리더 소개와 등록 개체를 확인해요', icon: 'storefront-outline' },
  { label: '분양 등록 관리', description: '등록한 분양글을 관리해요', icon: 'albums-outline', href: '/mypage/listings' },
  { label: '브리더 인증 관리', description: '인증 상태와 신청 정보를 확인해요', icon: 'shield-checkmark-outline', href: '/breeder/verification/apply' },
  { label: '후기 관리', description: '구매자 후기를 확인하고 답변해요', icon: 'star-outline', href: '/mypage/reviews' },
  { label: '문의 관리', description: '전화와 카카오 문의 이력을 확인해요', icon: 'call-outline', readyMessage: '문의 관리 기능은 준비중입니다.' },
];

const commonMenus: MenuItem[] = [
  { label: '프로필 수정', description: '닉네임, 소개, SNS 정보를 관리해요', icon: 'person-outline', href: '/mypage/edit' },
  { label: '알림 설정', description: '댓글, 좋아요, 팔로우 알림을 선택해요', icon: 'notifications-outline', href: '/settings/notifications' },
  { label: '고객센터', description: '서비스 이용 중 궁금한 점을 보내요', icon: 'help-circle-outline', href: '/settings/contact' },
  { label: '설정', description: '차단, 약관, 개인정보 메뉴를 확인해요', icon: 'settings-outline', href: '/settings' },
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

function getProfileStats(profile: UserProfile): ProfileStat[] {
  if (profile.userType === 'normal') {
    return [
      { value: `${profile.postCount ?? profile.stats.posts ?? 0}`, label: '내 게시글' },
      { value: `${profile.commentCount ?? profile.stats.comments ?? 0}`, label: '내 댓글' },
      { value: `${profile.likeCount ?? 0}`, label: '받은 좋아요' },
    ];
  }

  return [
    { value: `⭐ ${(profile.rating ?? 0).toFixed(1)}`, label: '평점' },
    { value: `${profile.reviewCount ?? 0}`, label: '후기' },
    { value: `${profile.followerCount ?? profile.stats.followers ?? 0}`, label: '팔로워' },
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

function ProfileStats({ stats }: { stats: ProfileStat[] }) {
  return (
    <FadeInView delay={40}>
      <View className="mx-5 mt-4 flex-row rounded-[24px] border border-line bg-white px-2 py-4 shadow-sm">
        {stats.map((item, index) => (
          <View key={item.label} className={`flex-1 items-center justify-center px-2 ${index ? 'border-l border-line' : ''}`}>
            <Text className="text-center text-[20px] font-black text-[#111827]" numberOfLines={1}>{item.value}</Text>
            <Text className="mt-1 text-[12px] font-semibold text-[#9CA3AF]">{item.label}</Text>
          </View>
        ))}
      </View>
    </FadeInView>
  );
}

function MenuGroup({ title, items, onReady }: { title: string; items: MenuItem[]; onReady: (message: string) => void }) {
  return (
    <View className="mx-5 mt-5 overflow-hidden rounded-[26px] border border-line bg-white px-4 shadow-sm">
      <Text className="px-1 pt-5 text-[11px] font-black text-berry">{title}</Text>
      <View className="mt-2">
        {items.map((item, index) => (
          <AnimatedPressable
            key={item.label}
            onPress={() => item.href ? router.push(item.href as never) : onReady(item.readyMessage ?? `${item.label} 기능은 준비중입니다.`)}
            className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}
          >
            <View className="h-11 w-11 items-center justify-center rounded-[16px] bg-blush">
              <Ionicons name={item.icon} size={19} color={colors.berry} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-[15px] font-bold text-[#111827]">{item.label}</Text>
              <Text className="mt-1 text-[12px] font-medium leading-4 text-[#9CA3AF]" numberOfLines={1}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={17} color={colors.subtle} />
          </AnimatedPressable>
        ))}
      </View>
    </View>
  );
}

export default function MyPageScreen() {
  const [readyTitle, setReadyTitle] = useState('');
  const currentUser = users[0];
  const profile = userProfile;
  const isBreeder = profile.userType !== 'normal';
  const breederProfileType = profile.userType === 'normal' ? undefined : profile.userType;
  const roleMenus = isBreeder
    ? breederMenus.map((item) => item.label === '내 미니샵 보기' && breederProfileType ? { ...item, href: `/breeder/${breederIdByType[breederProfileType]}` } : item)
    : normalMenus;

  return (
    <Page>
      <ProfileHero profile={profile} />
      <ProfileStats stats={getProfileStats(profile)} />

      <FadeInView delay={80}>
        <View className="mx-5 mt-4">
          <AnimatedPressable onPress={() => router.push('/levels')}>
            <UserLevelCard user={currentUser} compact />
          </AnimatedPressable>
        </View>
      </FadeInView>

      <MenuGroup title={isBreeder ? '브리더 관리' : '내 활동'} items={roleMenus} onReady={setReadyTitle} />
      <MenuGroup title="공통 메뉴" items={commonMenus} onReady={setReadyTitle} />

      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}
