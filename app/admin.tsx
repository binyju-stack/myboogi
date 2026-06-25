import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors, shadows } from '@/constants/theme';
import { adminStats } from '@/data/adminData';

type IconName = ComponentProps<typeof Ionicons>['name'];

const stats: { label: string; value: number; icon: IconName }[] = [
  { label: '전체 회원', value: adminStats.users, icon: 'people-outline' },
  { label: '브리더', value: adminStats.breeders, icon: 'storefront-outline' },
  { label: '인증 대기', value: adminStats.pendingBreeders, icon: 'shield-checkmark-outline' },
  { label: '전체 분양글', value: adminStats.listings, icon: 'pricetag-outline' },
  { label: '전체 게시글', value: adminStats.posts, icon: 'document-text-outline' },
  { label: '미처리 신고', value: adminStats.pendingReports, icon: 'flag-outline' },
];

const menus: { label: string; description: string; icon: IconName; href: string }[] = [
  { label: '회원 관리', description: '회원 유형과 이용 상태를 관리해요', icon: 'people-outline', href: '/admin/users' },
  { label: '브리더 승인 관리', description: '인증 요청을 검토하고 승인해요', icon: 'shield-checkmark-outline', href: '/admin/breeders' },
  { label: '분양글 관리', description: '등록된 분양글 상태를 확인해요', icon: 'storefront-outline', href: '/admin/listings' },
  { label: '후기 관리', description: '후기 신뢰도와 신고 상태를 관리해요', icon: 'star-outline', href: '/admin/reviews' },
  { label: '배너 관리', description: '홈 프로모션 배너와 광고 노출을 관리해요', icon: 'images-outline', href: '/admin/banners' },
  { label: '게시글 관리', description: '커뮤니티 콘텐츠를 관리해요', icon: 'document-text-outline', href: '/admin/posts' },
  { label: '신고 관리', description: '접수된 신고를 검토하고 처리해요', icon: 'flag-outline', href: '/admin/reports' },
  { label: '공지사항 관리', description: '서비스 공지를 작성하고 관리해요', icon: 'megaphone-outline', href: '/admin/notices' },
];

export default function AdminDashboardScreen() {
  return (
    <Page>
      <TopBar title="관리자" />
      <View className="border-b border-line bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-bold text-berry">MYBOOGI ADMIN</Text>
        <Text className="mt-1 text-[25px] font-bold text-ink">마이부기 운영 현황</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">오늘 확인해야 할 서비스 지표와 관리 업무예요.</Text>
      </View>

      <View className="px-5 pt-6">
        <Text className="text-[10px] font-bold text-berry">OVERVIEW</Text>
        <Text className="mt-1 text-[20px] font-bold text-ink">운영 통계</Text>
        <View className="mt-4 flex-row flex-wrap justify-between">
          {stats.map((item, index) => (
            <View key={item.label} className="mb-3 w-[48%]">
              <FadeInView delay={index * 35}>
                <View style={shadows.card} className="rounded-[24px] bg-white p-4">
                  <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-blush">
                    <Ionicons name={item.icon} size={18} color={colors.berry} />
                  </View>
                  <Text className="mt-4 text-[21px] font-bold text-ink">{item.value.toLocaleString()}</Text>
                  <Text className="mt-1 text-[10px] font-bold text-muted">{item.label}</Text>
                </View>
              </FadeInView>
            </View>
          ))}
        </View>
      </View>

      <View className="px-5 pb-5 pt-5">
        <Text className="text-[10px] font-bold text-berry">MANAGEMENT</Text>
        <Text className="mt-1 text-[20px] font-bold text-ink">관리 메뉴</Text>
        <View style={shadows.card} className="mt-4 rounded-[26px] bg-white px-5 py-2">
          {menus.map((item, index) => (
            <AnimatedPressable key={item.label} onPress={() => router.push(item.href as never)} className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}>
              <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-soft">
                <Ionicons name={item.icon} size={19} color={colors.berry} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[13px] font-bold text-ink">{item.label}</Text>
                <Text className="mt-1 text-[9px] text-muted">{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtle} />
            </AnimatedPressable>
          ))}
        </View>
      </View>
    </Page>
  );
}
