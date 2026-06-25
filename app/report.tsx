import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { reportReasons } from '@/data/reportData';

export default function ReportScreen() {
  const params = useLocalSearchParams<{ targetType?: string; targetName?: string }>();
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState(reportReasons[0]);
  const [detail, setDetail] = useState('');
  const [completeVisible, setCompleteVisible] = useState(false);
  const targetType = params.targetType ?? '콘텐츠';
  const targetName = params.targetName ?? '신고 대상';

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="신고하기" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 108 + insets.bottom }}>
          <FadeInView>
            <View className="mx-5 mt-5 rounded-[26px] bg-white p-5 shadow-sm">
              <View className="flex-row items-center">
                <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-[#FFF1F1]"><Ionicons name="flag-outline" size={20} color="#E45B5B" /></View>
                <View className="ml-3 flex-1"><Text className="text-[10px] font-bold text-[#E45B5B]">REPORT TARGET</Text><Text className="mt-1 text-[17px] font-bold text-ink">{targetType}</Text></View>
              </View>
              <Text className="mt-4 rounded-[16px] bg-soft px-4 py-3 text-[11px] font-bold leading-5 text-ink">{targetName}</Text>
            </View>
          </FadeInView>

          <FadeInView delay={60}>
            <View className="mx-5 mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-bold text-berry">REASON</Text><Text className="mt-1 text-[19px] font-bold text-ink">신고 사유를 선택해 주세요</Text>
              <View className="mt-4">
                {reportReasons.map((item) => (
                  <AnimatedPressable key={item} onPress={() => setReason(item)} className="mb-2 flex-row items-center rounded-[18px] bg-soft px-4 py-4">
                    <View className={`h-5 w-5 items-center justify-center rounded-full border-2 ${reason === item ? 'border-berry' : 'border-subtle'}`}>{reason === item ? <View className="h-2.5 w-2.5 rounded-full bg-berry" /> : null}</View>
                    <Text className="ml-3 text-[12px] font-bold text-ink">{item}</Text>
                  </AnimatedPressable>
                ))}
              </View>
            </View>
          </FadeInView>

          <FadeInView delay={100}>
            <View className="mx-5 mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-bold text-berry">DETAIL</Text><Text className="mt-1 text-[19px] font-bold text-ink">상세 내용을 알려주세요</Text>
              <TextInput value={detail} onChangeText={setDetail} multiline maxLength={1000} textAlignVertical="top" placeholder="신고 내용을 자세히 작성해 주세요." placeholderTextColor={colors.subtle} className="mt-4 min-h-40 rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink" />
              <Text className="mt-2 text-right text-[9px] text-muted">{detail.length} / 1,000</Text>
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => setCompleteVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-bold text-white">신고하기</Text></AnimatedPressable>
      </View>
      <ReadyModal visible={completeVisible} title="신고가 접수되었습니다." description="운영팀에서 내용을 확인한 후 필요한 조치를 진행할게요." onClose={() => setCompleteVisible(false)} />
    </SafeAreaView>
  );
}
