import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { AdminListLayout } from '@/components/AdminListLayout';
import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { breederVerifications, type VerificationStatus } from '@/data/breederVerificationData';

const statusStyle: Record<VerificationStatus, string> = { 대기: 'bg-cream text-[#B6751A]', 승인: 'bg-mint text-moss', 반려: 'bg-[#FFF1F1] text-[#E45B5B]' };

export default function AdminBreedersScreen() {
  return (
    <AdminListLayout title="브리더 승인 관리" description="인증 신청 브리더의 정보와 검토 상태를 확인해요." count={breederVerifications.length}>
      {breederVerifications.map((item, index) => (
        <FadeInView key={item.id} delay={index * 50}>
          <View className="mb-3 rounded-[24px] bg-white p-5 shadow-sm">
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush"><Ionicons name="shield-checkmark-outline" size={20} color={colors.berry} /></View>
              <View className="ml-3 flex-1"><Text className="text-[14px] font-black text-ink">{item.breederName}</Text><Text className="mt-1 text-[9px] text-muted">{item.region} · {item.specialties}</Text></View>
              <Text className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusStyle[item.status]}`}>{item.status}</Text>
            </View>
            <View className="mt-4"><AnimatedPressable onPress={() => router.push(`/admin/breeder-verifications/${item.id}`)} className="items-center rounded-[16px] bg-ink py-3.5"><Text className="text-[11px] font-black text-white">상세보기</Text></AnimatedPressable></View>
          </View>
        </FadeInView>
      ))}
    </AdminListLayout>
  );
}
