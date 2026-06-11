import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';

function Field({ label, value, onChangeText, placeholder, multiline = false }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; multiline?: boolean }) {
  return (
    <View className="mt-5">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.subtle} multiline={multiline} textAlignVertical={multiline ? 'top' : 'center'} className={`${multiline ? 'min-h-32' : ''} rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink`} />
    </View>
  );
}

function PhotoUpload({ title, description, icon }: { title: string; description: string; icon: 'home-outline' | 'image-outline' }) {
  return (
    <View className="mt-3">
      <AnimatedPressable className="items-center rounded-[22px] bg-blush px-4 py-7">
        <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-white"><Ionicons name={icon} size={22} color={colors.berry} /></View>
        <Text className="mt-3 text-[12px] font-black text-ink">{title}</Text>
        <Text className="mt-1 text-center text-[9px] leading-5 text-muted">{description}</Text>
      </AnimatedPressable>
    </View>
  );
}

function Agreement({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable onPress={onPress} className="mt-4 flex-row items-center">
      <View className={`h-6 w-6 items-center justify-center rounded-[8px] ${checked ? 'bg-berry' : 'bg-soft'}`}>
        {checked ? <Ionicons name="checkmark" size={15} color="white" /> : null}
      </View>
      <Text className="ml-3 flex-1 text-[11px] leading-5 text-ink">{label}</Text>
    </AnimatedPressable>
  );
}

export default function BreederVerificationApplyScreen() {
  const insets = useSafeAreaInsets();
  const [readyVisible, setReadyVisible] = useState(false);
  const [agreements, setAgreements] = useState([false, false]);
  const [form, setForm] = useState({
    name: '김부기',
    phone: '010-1234-5678',
    kakaoId: 'boogi_house',
    breederName: '꼬북하우스',
    region: '경기 성남시',
    specialties: '레오파드 육지거북',
    experience: '7년',
    introduction: '건강한 개체와 투명한 사육 정보를 가장 중요하게 생각합니다.',
  });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="인증 브리더 신청" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 108 + insets.bottom }}>
          <FadeInView>
            <View className="mx-5 mt-5 rounded-[26px] bg-ink p-5 shadow-sm">
              <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-berry"><Ionicons name="shield-checkmark" size={21} color="white" /></View>
              <Text className="mt-4 text-[18px] font-black leading-7 text-white">신뢰받는 인증 브리더가 되어보세요</Text>
              <Text className="mt-2 text-[11px] leading-6 text-white/60">인증 브리더는 본인 확인과 사육 환경 검토 후 승인됩니다.</Text>
            </View>
          </FadeInView>

          <View className="px-5">
            <FadeInView delay={50}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-black text-berry">APPLICANT</Text><Text className="mt-1 text-[19px] font-black text-ink">신청자 정보</Text>
                <Field label="이름" value={form.name} onChangeText={(value) => update('name', value)} placeholder="이름을 입력해 주세요" />
                <Field label="연락처" value={form.phone} onChangeText={(value) => update('phone', value)} placeholder="연락처를 입력해 주세요" />
                <Field label="카카오톡 ID" value={form.kakaoId} onChangeText={(value) => update('kakaoId', value)} placeholder="카카오톡 ID를 입력해 주세요" />
              </View>
            </FadeInView>

            <FadeInView delay={90}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-black text-berry">BREEDER INFO</Text><Text className="mt-1 text-[19px] font-black text-ink">브리더 정보</Text>
                <Field label="브리더명" value={form.breederName} onChangeText={(value) => update('breederName', value)} placeholder="브리더명을 입력해 주세요" />
                <Field label="활동 지역" value={form.region} onChangeText={(value) => update('region', value)} placeholder="활동 지역을 입력해 주세요" />
                <Field label="전문 품종" value={form.specialties} onChangeText={(value) => update('specialties', value)} placeholder="전문 품종을 입력해 주세요" />
                <Field label="사육 경력" value={form.experience} onChangeText={(value) => update('experience', value)} placeholder="사육 경력을 입력해 주세요" />
                <Field label="소개글" value={form.introduction} onChangeText={(value) => update('introduction', value)} placeholder="브리더 활동과 사육 철학을 소개해 주세요" multiline />
              </View>
            </FadeInView>

            <FadeInView delay={130}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-black text-berry">ENVIRONMENT</Text><Text className="mt-1 text-[19px] font-black text-ink">사육 환경 인증</Text>
                <Text className="mt-2 text-[10px] leading-5 text-muted">밝고 선명한 사진을 등록하면 심사가 더 원활해요.</Text>
                <PhotoUpload title="사육장 사진 추가" description="전체 사육 환경이 잘 보이는 사진을 추가해 주세요." icon="home-outline" />
                <PhotoUpload title="대표 개체 사진 추가" description="건강 상태를 확인할 수 있는 대표 개체 사진을 추가해 주세요." icon="image-outline" />
              </View>
            </FadeInView>

            <FadeInView delay={170}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-black text-berry">AGREEMENT</Text><Text className="mt-1 text-[19px] font-black text-ink">신청 전 확인해 주세요</Text>
                <Agreement label="허위 정보 등록 시 서비스 이용이 제한될 수 있음에 동의합니다." checked={agreements[0]} onPress={() => setAgreements(([first, second]) => [!first, second])} />
                <Agreement label="마이부기 브리더 운영정책에 동의합니다." checked={agreements[1]} onPress={() => setAgreements(([first, second]) => [first, !second])} />
              </View>
            </FadeInView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-black text-white">신청하기</Text></AnimatedPressable>
      </View>
      <ReadyModal visible={readyVisible} title="인증 브리더 신청 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
