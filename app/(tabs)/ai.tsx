import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

import { BrandHeader, Chip } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';

export default function AiScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <View className="px-5 pb-6 pt-5">
        <Text className="text-2xl font-black tracking-tight text-ink">부기 AI 상담</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">사육 중 궁금한 점을 편하게 물어보세요.</Text>
        <View className="mt-7 items-start">
          <View className="max-w-[82%] rounded-[24px] rounded-tl-md bg-shell px-4 py-3.5"><Text className="text-sm leading-6 text-ink">안녕하세요! 부기 AI예요. 오늘은 어떤 도움이 필요하신가요?</Text></View>
        </View>
        <View className="mt-4 items-end">
          <View className="max-w-[82%] rounded-[24px] rounded-tr-md bg-berry px-4 py-3.5"><Text className="text-sm leading-6 text-white">우리 거북이 눈이 조금 부어 보여요.</Text></View>
        </View>
        <View className="mt-4 items-start">
          <View className="max-w-[88%] rounded-[24px] rounded-tl-md bg-[#F7F5F7] px-4 py-4"><Text className="text-sm font-bold text-ink">먼저 확인해볼 점이에요</Text><Text className="mt-2 text-xs leading-5 text-muted">온습도와 바닥재 상태를 확인하고, 눈곱이나 콧물처럼 함께 나타나는 증상이 있는지 살펴봐 주세요.</Text><View className="mt-3 rounded-2xl bg-cream p-3"><Text className="text-[11px] font-bold leading-4 text-ink">정확한 진단은 전문 병원 상담을 권장합니다.</Text></View></View>
        </View>
        <Text className="mt-9 text-sm font-black text-ink">자주 묻는 질문</Text>
        <View className="mt-3 flex-row flex-wrap gap-y-2"><Chip label="눈이 부었어요" /><Chip label="합사 가능할까요?" /><Chip label="사료 추천해주세요" /><Chip label="산란 준비 행동인가요?" /></View>
      </View>
      <View className="mx-5 mb-6 mt-3 flex-row items-center rounded-[24px] bg-white px-4 py-3 shadow-sm"><TextInput placeholder="부기 AI에게 질문하기" className="flex-1 py-2 text-sm" /><View className="h-10 w-10 items-center justify-center rounded-full bg-berry"><Ionicons name="arrow-up" color="white" size={18} /></View></View>
    </Page>
  );
}
