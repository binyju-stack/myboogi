import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, Text, View } from 'react-native';

import { AdminListLayout } from '@/components/AdminListLayout';
import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { adminBanners } from '@/data/homeScreenData';

export default function AdminBannersScreen() {
  const sortedBanners = [...adminBanners].sort((a, b) => a.sortOrder - b.sortOrder);
  const action = (
    <AnimatedPressable onPress={() => router.push('/admin/banners/create' as never)} className="flex-row items-center rounded-full bg-berry px-3.5 py-2.5">
      <Ionicons name="add" size={14} color="white" />
      <Text className="ml-1 text-[10px] font-bold text-white">배너 등록</Text>
    </AnimatedPressable>
  );

  return (
    <AdminListLayout title="배너 관리" description="홈 메인 프로모션 배너의 노출, 광고 여부, 기간을 관리해요." count={sortedBanners.length} action={action}>
      {sortedBanners.map((banner, index) => (
        <FadeInView key={banner.id} delay={index * 45}>
          <View className="mb-3 overflow-hidden rounded-[24px] bg-white shadow-sm">
            <View className="h-36 bg-soft">
              <Image source={{ uri: banner.image }} className="h-full w-full" resizeMode="cover" />
              <View className="absolute left-3 top-3 flex-row">
                <Text className={`mr-2 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${banner.isAd ? 'bg-ink text-white' : 'bg-white text-muted'}`}>
                  {banner.isAd ? '광고 배너' : '일반 배너'}
                </Text>
                <Text className={`rounded-full px-2.5 py-1.5 text-[9px] font-bold ${banner.isActive ? 'bg-blush text-berry' : 'bg-soft text-muted'}`}>
                  {banner.isActive ? '노출중' : '숨김'}
                </Text>
              </View>
            </View>

            <View className="p-4">
              <View className="flex-row items-start">
                <View className="flex-1 pr-3">
                  <Text className="text-[15px] font-bold text-ink">{banner.title}</Text>
                  <Text className="mt-1 text-[11px] leading-5 text-muted">{banner.description}</Text>
                </View>
                <Text className="rounded-full bg-soft px-2.5 py-1.5 text-[9px] font-bold text-muted">순서 {banner.sortOrder}</Text>
              </View>

              <View className="mt-4 rounded-[18px] bg-soft p-4">
                <Text className="text-[10px] font-bold text-muted">버튼 문구: {banner.actionLabel}</Text>
                <Text className="mt-2 text-[10px] font-bold text-muted">기간: {banner.startDate} - {banner.endDate}</Text>
                <Text className="mt-2 text-[10px] font-bold text-muted">연결: {banner.linkUrl}</Text>
              </View>

              <View className="mt-4 flex-row">
                <AnimatedPressable onPress={() => router.push(`/admin/banners/${banner.id}/edit` as never)} className="mr-2 flex-1 items-center rounded-[16px] bg-blush py-3">
                  <Text className="text-[11px] font-bold text-berry">수정</Text>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => Alert.alert('안내', '배너 노출 상태 변경 기능은 준비중입니다.')} className="mr-2 flex-1 items-center rounded-[16px] bg-soft py-3">
                  <Text className="text-[11px] font-bold text-ink">{banner.isActive ? '숨김' : '노출'}</Text>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => Alert.alert('안내', '배너 삭제 기능은 준비중입니다.')} className="flex-1 items-center rounded-[16px] bg-[#FFF1F1] py-3">
                  <Text className="text-[11px] font-bold text-[#E45B5B]">삭제</Text>
                </AnimatedPressable>
              </View>
            </View>
          </View>
        </FadeInView>
      ))}
    </AdminListLayout>
  );
}
