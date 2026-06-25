import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { userProfile } from '@/data/mockData';
import { unreadNotificationCount } from '@/data/notificationData';
import { managedTurtles } from '@/mockData/turtles';
import type { UserProfile } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];

type MenuItem = {
  label: string;
  icon: IconName;
  href?: string;
  readyMessage?: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
  breederOnly?: boolean;
};

function getProfileBadge(profile: UserProfile) {
  if (profile.userType === 'business_breeder') {
    return { label: profile.isVerified ? '사업자 인증' : '사업자 브리더', color: '#FF2E6F', backgroundColor: '#FFF0F5' };
  }

  if (profile.userType === 'personal_breeder') {
    return { label: profile.isVerified ? '인증 브리더' : '브리더', color: '#FF2E6F', backgroundColor: '#FFF0F5' };
  }

  return { label: '일반 회원', color: '#94A3B8', backgroundColor: '#F5F6F8' };
}

const stats = [
  { label: '내 거북이', value: `${managedTurtles.length}`, icon: 'paw-outline' as IconName, href: '/my/turtles' },
  { label: '찜', value: '12', icon: 'heart-outline' as IconName, href: '/mypage/favorites' },
  { label: '게시글', value: `${userProfile.postCount}`, icon: 'document-text-outline' as IconName, href: '/mypage/posts' },
  { label: '댓글', value: `${userProfile.commentCount}`, icon: 'chatbubble-ellipses-outline' as IconName },
];

const sections: MenuSection[] = [
  {
    title: '내 거북이',
    items: [
      { label: '내 거북이 관리', icon: 'paw-outline', href: '/my/turtles' },
      { label: '성장 기록', icon: 'trending-up-outline', href: '/growth' },
      { label: '산란 관리', icon: 'egg-outline', href: '/my/turtles/breeding' },
      { label: '성장 앨범', icon: 'images-outline', readyMessage: '성장 앨범 기능은 준비중입니다.' },
    ],
  },
  {
    title: '내 활동',
    items: [
      { label: '찜한 분양', icon: 'heart-outline', href: '/mypage/favorites' },
      { label: '최근 본 분양', icon: 'time-outline', readyMessage: '최근 본 분양 기능은 준비중입니다.' },
      { label: '내가 작성한 글', icon: 'document-text-outline', href: '/mypage/posts' },
      { label: '내가 작성한 댓글', icon: 'chatbubble-ellipses-outline', readyMessage: '내가 작성한 댓글 기능은 준비중입니다.' },
      { label: '알림 관리', icon: 'notifications-outline', href: '/settings/notifications' },
    ],
  },
  {
    title: '브리더',
    breederOnly: true,
    items: [
      { label: '내 분양글', icon: 'albums-outline', href: '/mypage/listings' },
      { label: '분양 등록', icon: 'add-circle-outline', href: '/listing/create' },
      { label: '분양 통계', icon: 'bar-chart-outline', readyMessage: '분양 통계 기능은 준비중입니다.' },
      { label: '문의 관리', icon: 'call-outline', readyMessage: '문의 관리 기능은 준비중입니다.' },
    ],
  },
  {
    title: '쇼핑',
    items: [
      { label: '주문 내역', icon: 'receipt-outline', readyMessage: '주문 내역 기능은 준비중입니다.' },
      { label: '배송 조회', icon: 'car-outline', readyMessage: '배송 조회 기능은 준비중입니다.' },
      { label: '리뷰 관리', icon: 'star-outline', href: '/mypage/reviews' },
      { label: '배송지 관리', icon: 'location-outline', readyMessage: '배송지 관리 기능은 준비중입니다.' },
    ],
  },
  {
    title: '도움말',
    items: [
      { label: '공지사항', icon: 'megaphone-outline', href: '/notices' },
      { label: '1:1 문의', icon: 'help-circle-outline', href: '/settings/contact' },
      { label: '자주 묻는 질문', icon: 'chatbox-ellipses-outline', readyMessage: '자주 묻는 질문 기능은 준비중입니다.' },
      { label: '앱 설정', icon: 'settings-outline', href: '/settings' },
    ],
  },
];

function ProfileHeader({ profile }: { profile: UserProfile }) {
  const badge = getProfileBadge(profile);

  return (
    <View className="bg-white px-5 pb-5 pt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center" style={{ minWidth: 0 }}>
          <Image source={{ uri: profile.profileImage }} className="h-[72px] w-[72px] rounded-full bg-shell" />
          <View className="ml-4 flex-1" style={{ minWidth: 0 }}>
            <View className="flex-row items-center" style={{ minWidth: 0 }}>
              <Text className="text-[22px] font-bold leading-7 text-[#111827]" numberOfLines={1}>
                {profile.nickname}
              </Text>
              <View className="ml-2 rounded-full px-2 py-1" style={{ backgroundColor: badge.backgroundColor, flexShrink: 0 }}>
                <Text className="text-[10px] font-bold leading-[14px]" style={{ color: badge.color }}>
                  {badge.label}
                </Text>
              </View>
            </View>
            <Text className="mt-1.5 text-[14px] font-medium leading-5 text-[#94A3B8]" numberOfLines={1} style={{ flexShrink: 1 }}>
              {profile.bio}
            </Text>
            <View className="mt-1.5 flex-row items-center" style={{ minWidth: 0 }}>
              <Ionicons name="location-outline" size={13} color="#94A3B8" />
              <Text className="ml-1 text-[12px] font-medium leading-4 text-[#94A3B8]" numberOfLines={1} style={{ flexShrink: 1 }}>
                {profile.region}
              </Text>
            </View>
          </View>
        </View>
        <Pressable onPress={() => router.push('/mypage/edit')} className="ml-3 h-9 w-9 items-center justify-center rounded-full bg-[#F5F6F8]">
          <Ionicons name="create-outline" size={17} color="#111827" />
        </Pressable>
      </View>
    </View>
  );
}

function StatBar() {
  return (
    <View className="mx-5 mt-3 h-[66px] flex-row items-center border-y border-[#EEF2F6] bg-white">
      {stats.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => (item.href ? router.push(item.href as never) : undefined)}
          className="flex-1 items-center justify-center"
        >
          <Ionicons name={item.icon} size={17} color="#FF2E6F" />
          <Text className="mt-0.5 text-[17px] font-bold leading-[21px] text-[#111827]">{item.value}</Text>
          <Text className="text-[11px] font-medium leading-[15px] text-[#94A3B8]" numberOfLines={1}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function SectionList({ section, onReady }: { section: MenuSection; onReady: (message: string) => void }) {
  return (
    <View className="mt-6">
      <Text className="mx-5 mb-2 text-[15px] font-bold leading-5 text-[#111827]">{section.title}</Text>
      <View className="border-y border-[#EEF2F6] bg-white">
        {section.items.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => (item.href ? router.push(item.href as never) : onReady(item.readyMessage ?? `${item.label} 기능은 준비중입니다.`))}
            className={`mx-5 h-[54px] flex-row items-center ${index ? 'border-t border-[#EEF2F6]' : ''}`}
          >
            <View className="h-8 w-8 items-center justify-center">
              <Ionicons name={item.icon} size={19} color="#FF2E6F" />
            </View>
            <Text className="ml-3 flex-1 text-[15px] font-medium leading-5 text-[#111827]">{item.label}</Text>
            <Ionicons name="chevron-forward" size={17} color="#C4C8CF" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function MyPageScreen() {
  const [readyTitle, setReadyTitle] = useState('');
  const profile = userProfile;
  const isBreeder = profile.userType !== 'normal';
  const visibleSections = sections.filter((section) => !section.breederOnly || isBreeder);

  return (
    <Page>
      <View className="bg-white pb-4">
        <ProfileHeader profile={profile} />
        <StatBar />
        {visibleSections.map((section) => (
          <SectionList key={section.title} section={section} onReady={setReadyTitle} />
        ))}
      </View>

      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}
