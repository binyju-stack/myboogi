import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breederTypeLabels, breederVerifications, verificationStatusLabels, type VerificationStatus } from '@/data/breederVerificationData';

const statusStyle: Record<VerificationStatus, string> = {
  pending: 'bg-cream text-[#B6751A]',
  approved: 'bg-mint text-moss',
  rejected: 'bg-[#FFF1F1] text-[#E45B5B]',
};

export default function BreederVerificationAdminScreen() {
  const waiting = breederVerifications.filter((item) => item.status === 'pending').length;

  return (
    <Page>
      <TopBar title="브리더 승인 관리" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">VERIFICATION ADMIN</Text>
        <Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">신청 내역을 검토해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">현재 검토가 필요한 신청이 {waiting}건 있어요.</Text>
      </View>

      <View className="px-5 pb-5 pt-6">
        {breederVerifications.map((item, index) => (
          <FadeInView key={item.id} delay={index * 55}>
            <View className="mb-3 rounded-[24px] bg-white p-5 shadow-sm">
              <View className="flex-row items-center">
                <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush">
                  <Ionicons name={item.breederType === 'business' ? 'business-outline' : 'person-outline'} size={20} color={colors.berry} />
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-[14px] font-black text-ink">{item.breederName}</Text>
                    <Text className={`ml-2 rounded-full px-2 py-1 text-[8px] font-black ${item.breederType === 'business' ? 'bg-ink text-white' : 'bg-blush text-berry'}`}>
                      {breederTypeLabels[item.breederType]}
                    </Text>
                  </View>
                  <Text className="mt-1 text-[9px] text-muted">{item.applicantName} · {item.appliedAt}</Text>
                </View>
                <Text className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusStyle[item.status]}`}>{verificationStatusLabels[item.status]}</Text>
              </View>
              <View className="mt-4 rounded-[18px] bg-soft px-4 py-3">
                <Text className="text-[10px] text-muted">지역 <Text className="font-black text-ink">{item.region}</Text></Text>
                <Text className="mt-2 text-[10px] text-muted">전문 품종 <Text className="font-black text-ink">{item.specialties}</Text></Text>
                {item.breederType === 'business' ? <Text className="mt-2 text-[10px] text-muted">업체명 <Text className="font-black text-ink">{item.businessName}</Text></Text> : null}
              </View>
              <View className="mt-4">
                <AnimatedPressable onPress={() => router.push(`/admin/breeder-verifications/${item.id}` as never)} className="items-center rounded-[16px] bg-ink py-3.5">
                  <Text className="text-[11px] font-black text-white">상세보기</Text>
                </AnimatedPressable>
              </View>
            </View>
          </FadeInView>
        ))}
      </View>
    </Page>
  );
}
