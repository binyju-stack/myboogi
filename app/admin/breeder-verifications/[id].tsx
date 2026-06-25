import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breederTypeLabels, breederVerifications, verificationStatusLabels } from '@/data/breederVerificationData';

function InfoRow({ label, value }: { label: string; value?: string }) {
  return <View className="flex-row py-3"><Text className="w-28 text-[10px] font-bold text-muted">{label}</Text><Text className="flex-1 text-[11px] font-bold text-ink">{value ?? '-'}</Text></View>;
}

export default function BreederVerificationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [readyVisible, setReadyVisible] = useState(false);
  const application = breederVerifications.find((item) => item.id === id) ?? breederVerifications[0];
  const isBusiness = application.breederType === 'business';

  return (
    <Page>
      <TopBar title="신청 상세" />
      <FadeInView>
        <View className="mx-5 mt-5 rounded-[26px] bg-ink p-5 shadow-sm">
          <Text className="text-[10px] font-bold text-petal">APPLICATION REVIEW</Text>
          <View className="mt-2 flex-row items-center">
            <Text className="text-[22px] font-bold text-white">{application.breederName}</Text>
            <Text className={`ml-2 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${isBusiness ? 'bg-white text-ink' : 'bg-berry text-white'}`}>{breederTypeLabels[application.breederType]}</Text>
          </View>
          <Text className="mt-2 text-[10px] text-white/50">{application.appliedAt} 신청 · 상태 {verificationStatusLabels[application.status]}</Text>
        </View>
      </FadeInView>

      <View className="px-5">
        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-bold text-berry">APPLICANT</Text><Text className="mt-1 text-[18px] font-bold text-ink">신청자 정보</Text>
          <View className="mt-3"><InfoRow label="이름" value={application.applicantName} /><InfoRow label="연락처" value={application.phone} /><InfoRow label="카카오톡 ID" value={application.kakaoId} /></View>
        </View>

        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-bold text-berry">BREEDER INFO</Text><Text className="mt-1 text-[18px] font-bold text-ink">브리더 정보</Text>
          <View className="mt-3"><InfoRow label="브리더명" value={application.breederName} /><InfoRow label="활동 지역" value={application.region} /><InfoRow label="전문 품종" value={application.specialties} /><InfoRow label="사육 경력" value={application.experience} /></View>
          <Text className="mt-4 text-[11px] leading-6 text-ink">{application.introduction}</Text>
        </View>

        {isBusiness ? (
          <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
            <Text className="text-[10px] font-bold text-berry">BUSINESS INFO</Text><Text className="mt-1 text-[18px] font-bold text-ink">사업자 정보</Text>
            <View className="mt-3">
              <InfoRow label="업체명" value={application.businessName} />
              <InfoRow label="사업자등록번호" value={application.businessNumber} />
              <InfoRow label="대표자명" value={application.representativeName} />
              <InfoRow label="사업장 주소" value={application.businessAddress} />
            </View>
            <View className="mt-4 rounded-[20px] border border-dashed border-petal bg-blush p-4">
              <View className="flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-white"><Ionicons name="document-attach-outline" size={20} color={colors.berry} /></View>
                <View className="ml-3 flex-1">
                  <Text className="text-[12px] font-bold text-ink">사업자등록증 첨부 파일</Text>
                  <Text className="mt-1 text-[10px] font-bold text-muted">{application.businessLicenseFile}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-bold text-berry">ENVIRONMENT PHOTO</Text><Text className="mt-1 text-[18px] font-bold text-ink">사육환경 이미지</Text>
          <View className="mt-4 flex-row gap-3">
            {['사육장', '대표 개체'].map((label, index) => <View key={label} className="aspect-square flex-1 items-center justify-center rounded-[20px] bg-blush"><Ionicons name={index ? 'image-outline' : 'home-outline'} size={25} color={colors.berry} /><Text className="mt-2 text-[10px] font-bold text-berry">{label}</Text></View>)}
          </View>
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1"><AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-soft py-4"><Text className="text-[13px] font-bold text-[#E45B5B]">반려</Text></AnimatedPressable></View>
          <View className="flex-1"><AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[13px] font-bold text-white">승인</Text></AnimatedPressable></View>
        </View>
      </View>
      <ReadyModal visible={readyVisible} title="관리자 승인 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </Page>
  );
}
