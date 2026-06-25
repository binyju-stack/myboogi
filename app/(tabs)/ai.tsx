import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

import { Chip } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';

export default function AiScreen() {
  return (
    <Page>
      <View className="flex-row items-center bg-white px-5 py-4">
        <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-berry"><Ionicons name="sparkles" size={20} color="white" /></View>
        <View className="ml-3 flex-1"><Text className="text-[17px] font-bold text-ink">부기 AI 상담</Text><View className="mt-1 flex-row items-center"><View className="mr-1.5 h-2 w-2 rounded-full bg-moss" /><Text className="text-[10px] text-muted">지금 상담 가능해요</Text></View></View>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-soft"><Ionicons name="information-circle-outline" size={20} color={colors.ink} /></View>
      </View>

      <View className="mx-5 mt-4 rounded-[18px] bg-cream px-4 py-3"><Text className="text-[11px] font-bold leading-5 text-ink">AI 답변은 참고용이에요. 정확한 진단은 전문 병원 상담을 권장합니다.</Text></View>

      <View className="px-5 pt-5">
        <Text className="mb-3 text-[11px] font-bold text-muted">많이 묻는 질문</Text>
        <View className="flex-row flex-wrap gap-y-2"><Chip label="눈이 부었어요" /><Chip label="합사 가능할까요?" /><Chip label="사료 추천해주세요" /></View>

        <View className="mt-7 items-start"><View className="max-w-[86%] rounded-[20px] rounded-tl-md border border-line bg-white px-4 py-3.5 shadow-sm"><Text className="text-[13px] leading-6 text-ink">안녕하세요, 부기 AI예요. 사육 중 궁금한 점을 편하게 물어보세요.</Text></View></View>
        <View className="mt-4 items-end"><View className="max-w-[82%] rounded-[20px] rounded-tr-md bg-berry px-4 py-3.5"><Text className="text-[13px] leading-6 text-white">우리 거북이 눈이 조금 부어 보여요.</Text></View></View>
        <View className="mt-4 items-start"><View className="max-w-[90%] rounded-[20px] rounded-tl-md border border-line bg-white px-4 py-4 shadow-sm"><Text className="text-[13px] font-bold text-ink">먼저 확인해볼 점이에요</Text><Text className="mt-2 text-[12px] leading-6 text-muted">온습도와 바닥재 상태를 확인하고, 눈곱이나 콧물처럼 함께 나타나는 증상이 있는지 살펴봐 주세요.</Text></View></View>
      </View>

      <View className="mx-5 mb-4 mt-8 flex-row items-center rounded-[20px] border border-line bg-white px-4 py-3 shadow-sm"><TextInput placeholder="부기 AI에게 질문하기" placeholderTextColor={colors.muted} className="flex-1 py-2 text-[13px] text-ink" /><View className="h-10 w-10 items-center justify-center rounded-full bg-berry"><Ionicons name="arrow-up" color="white" size={18} /></View></View>
    </Page>
  );
}
