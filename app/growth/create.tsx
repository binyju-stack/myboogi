import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return <View className="mt-5"><Text className="mb-2 text-[11px] font-bold text-ink">{label}</Text><TextInput placeholder={placeholder} placeholderTextColor={colors.subtle} className="rounded-[18px] bg-soft px-4 py-4 text-[13px] text-ink" /></View>;
}

export default function GrowthCreateScreen() {
  const insets = useSafeAreaInsets();
  const [sex, setSex] = useState('미구분');
  const [readyVisible, setReadyVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="내 거북이 등록" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 108 + insets.bottom }}>
          <FadeInView>
            <View className="items-center bg-white px-5 pb-7 pt-6">
              <AnimatedPressable className="h-28 w-28 items-center justify-center rounded-full bg-blush"><Ionicons name="camera-outline" size={28} color={colors.berry} /><Text className="mt-2 text-[10px] font-bold text-berry">대표 사진 추가</Text></AnimatedPressable>
              <Text className="mt-4 text-[11px] text-muted">우리 거북이의 가장 예쁜 사진을 등록해 주세요.</Text>
            </View>
          </FadeInView>
          <FadeInView delay={60}>
            <View className="mx-5 mt-5 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-bold text-berry">TURTLE PROFILE</Text><Text className="mt-1 text-[19px] font-bold text-ink">기본 정보</Text>
              <Field label="이름" placeholder="거북이 이름을 입력해 주세요" />
              <Field label="품종" placeholder="품종을 입력해 주세요" />
              <Text className="mb-2 mt-5 text-[11px] font-bold text-ink">성별</Text>
              <View className="flex-row gap-2">{['수컷', '암컷', '미구분'].map((item) => <View key={item} className="flex-1"><AnimatedPressable onPress={() => setSex(item)} className={`items-center rounded-[16px] py-3.5 ${sex === item ? 'bg-berry' : 'bg-soft'}`}><Text className={`text-[10px] font-bold ${sex === item ? 'text-white' : 'text-muted'}`}>{item}</Text></AnimatedPressable></View>)}</View>
              <Field label="부화일" placeholder="예: 2025.09.21" />
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}><AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-bold text-white">등록하기</Text></AnimatedPressable></View>
      <ReadyModal visible={readyVisible} title="거북이 등록 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
