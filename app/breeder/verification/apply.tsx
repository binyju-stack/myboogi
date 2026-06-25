import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import type { BreederType } from '@/types';

function Field({ label, value, onChangeText, placeholder, multiline = false }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; multiline?: boolean }) {
  return (
    <View className="mt-5">
      <Text className="mb-2 text-[11px] font-bold text-ink">{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.subtle} multiline={multiline} textAlignVertical={multiline ? 'top' : 'center'} className={`${multiline ? 'min-h-32' : ''} rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink`} />
    </View>
  );
}

function TypeCard({ type, selected, title, description, icon, onPress }: { type: BreederType; selected: boolean; title: string; description: string; icon: 'person-outline' | 'business-outline'; onPress: (type: BreederType) => void }) {
  return (
    <AnimatedPressable onPress={() => onPress(type)} className={`mt-3 rounded-[22px] border p-4 ${selected ? 'border-berry bg-blush' : 'border-line bg-white'}`}>
      <View className="flex-row items-center">
        <View className={`h-11 w-11 items-center justify-center rounded-[15px] ${selected ? 'bg-berry' : 'bg-soft'}`}>
          <Ionicons name={icon} size={20} color={selected ? 'white' : colors.berry} />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-[13px] font-bold text-ink">{title}</Text>
          <Text className="mt-1 text-[10px] leading-5 text-muted">{description}</Text>
        </View>
        {selected ? <Ionicons name="checkmark-circle" size={21} color={colors.berry} /> : null}
      </View>
    </AnimatedPressable>
  );
}

function PhotoUpload({ title, description, icon }: { title: string; description: string; icon: 'home-outline' | 'image-outline' }) {
  return (
    <View className="mt-3">
      <AnimatedPressable className="items-center rounded-[22px] bg-blush px-4 py-7">
        <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-white"><Ionicons name={icon} size={22} color={colors.berry} /></View>
        <Text className="mt-3 text-[12px] font-bold text-ink">{title}</Text>
        <Text className="mt-1 text-center text-[9px] leading-5 text-muted">{description}</Text>
      </AnimatedPressable>
    </View>
  );
}

function BusinessLicenseUpload() {
  return (
    <AnimatedPressable onPress={() => Alert.alert('안내', '사업자등록증 첨부 기능은 준비중입니다.')} className="mt-5 items-center rounded-[22px] border border-dashed border-petal bg-blush px-4 py-7">
      <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-white"><Ionicons name="document-attach-outline" size={23} color={colors.berry} /></View>
      <Text className="mt-3 text-[12px] font-bold text-ink">사업자등록증 첨부</Text>
      <Text className="mt-1 text-center text-[9px] leading-5 text-muted">이미지 또는 PDF 파일을 첨부할 수 있어요.</Text>
      <View className="mt-4 rounded-full bg-white px-3 py-2"><Text className="text-[9px] font-bold text-berry">파일 추가</Text></View>
      <Text className="mt-3 text-[9px] font-bold text-muted">첨부된 파일 없음</Text>
    </AnimatedPressable>
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
  const [breederType, setBreederType] = useState<BreederType>('individual');
  const [agreements, setAgreements] = useState([false, false]);
  const [form, setForm] = useState({
    breederName: '꼬북하우스',
    region: '경기 성남시',
    specialties: '레오파드 육지거북',
    experience: '7년',
    introduction: '건강한 개체와 투명한 사육 정보를 가장 중요하게 생각합니다.',
    businessName: '꼬북하우스 브리딩',
    businessNumber: '123-45-67890',
    representativeName: '김부기',
    businessAddress: '경기 성남시 분당구 거북로 12',
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
              <Text className="mt-4 text-[18px] font-bold leading-7 text-white">신뢰받는 인증 브리더가 되어보세요</Text>
              <Text className="mt-2 text-[11px] leading-6 text-white/60">개인 활동과 사업자 운영 유형에 맞게 심사 정보를 제출할 수 있어요.</Text>
            </View>
          </FadeInView>

          <View className="px-5">
            <FadeInView delay={50}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-bold text-berry">BREEDER TYPE</Text>
                <Text className="mt-1 text-[19px] font-bold text-ink">브리더 유형 선택</Text>
                <TypeCard type="individual" selected={breederType === 'individual'} title="개인 브리더" description="개인 사육자 또는 개인 브리딩 활동 회원" icon="person-outline" onPress={setBreederType} />
                <TypeCard type="business" selected={breederType === 'business'} title="사업자 브리더" description="사업자등록증을 보유한 업체 또는 전문 브리딩 사업자" icon="business-outline" onPress={setBreederType} />
              </View>
            </FadeInView>

            <FadeInView delay={90}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-bold text-berry">BREEDER INFO</Text>
                <Text className="mt-1 text-[19px] font-bold text-ink">기본 정보</Text>
                <Field label="브리더명" value={form.breederName} onChangeText={(value) => update('breederName', value)} placeholder="브리더명을 입력해 주세요" />
                <Field label="활동 지역" value={form.region} onChangeText={(value) => update('region', value)} placeholder="활동 지역을 입력해 주세요" />
                <Field label="전문 품종" value={form.specialties} onChangeText={(value) => update('specialties', value)} placeholder="전문 품종을 입력해 주세요" />
                <Field label="사육 경력" value={form.experience} onChangeText={(value) => update('experience', value)} placeholder="사육 경력을 입력해 주세요" />
                <Field label="소개글" value={form.introduction} onChangeText={(value) => update('introduction', value)} placeholder="브리딩 활동과 사육 철학을 소개해 주세요" multiline />
              </View>
            </FadeInView>

            {breederType === 'business' ? (
              <FadeInView delay={110}>
                <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                  <Text className="text-[10px] font-bold text-berry">BUSINESS INFO</Text>
                  <Text className="mt-1 text-[19px] font-bold text-ink">사업자 정보</Text>
                  <Field label="업체명" value={form.businessName} onChangeText={(value) => update('businessName', value)} placeholder="업체명을 입력해 주세요" />
                  <Field label="사업자등록번호" value={form.businessNumber} onChangeText={(value) => update('businessNumber', value)} placeholder="000-00-00000" />
                  <Field label="대표자명" value={form.representativeName} onChangeText={(value) => update('representativeName', value)} placeholder="대표자명을 입력해 주세요" />
                  <Field label="사업장 주소" value={form.businessAddress} onChangeText={(value) => update('businessAddress', value)} placeholder="사업장 주소를 입력해 주세요" />
                  <BusinessLicenseUpload />
                </View>
              </FadeInView>
            ) : null}

            <FadeInView delay={130}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-bold text-berry">ENVIRONMENT</Text>
                <Text className="mt-1 text-[19px] font-bold text-ink">사육 환경 인증</Text>
                <Text className="mt-2 text-[10px] leading-5 text-muted">밝고 선명한 사진을 등록하면 심사가 더 원활해요.</Text>
                <PhotoUpload title="사육장 사진 추가" description="전체 사육 환경이 잘 보이는 사진을 추가해 주세요." icon="home-outline" />
                <PhotoUpload title="대표 개체 사진 추가" description="건강 상태를 확인할 수 있는 대표 개체 사진을 추가해 주세요." icon="image-outline" />
              </View>
            </FadeInView>

            <FadeInView delay={170}>
              <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
                <Text className="text-[10px] font-bold text-berry">AGREEMENT</Text>
                <Text className="mt-1 text-[19px] font-bold text-ink">신청 전 확인해 주세요</Text>
                <Agreement label="허위 정보 등록 시 서비스 이용이 제한될 수 있음에 동의합니다." checked={agreements[0]} onPress={() => setAgreements(([first, second]) => [!first, second])} />
                <Agreement label="마이부기 브리더 운영정책에 동의합니다." checked={agreements[1]} onPress={() => setAgreements(([first, second]) => [first, !second])} />
              </View>
            </FadeInView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-bold text-white">신청하기</Text></AnimatedPressable>
      </View>
      <ReadyModal visible={readyVisible} title="인증 브리더 신청 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
