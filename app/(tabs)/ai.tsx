import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

import { BrandHeader, Chip } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { PostCard } from '@/components/PostCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { listings, posts } from '@/data/mockData';

export default function AiScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <View className="bg-blush px-4 py-6">
        <View className="items-center"><View className="h-16 w-16 items-center justify-center rounded-full bg-shell"><Ionicons name="sparkles" size={29} color={colors.berry} /></View><Text className="mt-3 text-xl font-black text-ink">부기 AI에게 물어보세요</Text><Text className="mt-1 text-xs text-muted">거북이 생활에 관한 궁금증을 편하게 남겨주세요</Text></View>
        <View className="mt-5 flex-row items-center rounded-2xl border border-petal bg-white px-4 py-2"><TextInput placeholder="질문을 입력해주세요" className="flex-1 py-2 text-sm" /><View className="h-9 w-9 items-center justify-center rounded-full bg-berry"><Ionicons name="arrow-up" color="white" size={18} /></View></View>
        <View className="mt-4 flex-row flex-wrap gap-y-2"><Chip label="눈이 부었어요" /><Chip label="합사 가능할까요?" /><Chip label="사료 추천해주세요" /><Chip label="산란 준비 행동인가요?" /></View>
      </View>
      <View className="mx-4 mt-5 rounded-2xl border border-line bg-white p-4"><Text className="text-xs font-black text-berry">AI 답변 예시</Text><Text className="mt-2 text-sm font-black text-ink">눈이 부었을 때 확인할 점</Text><Text className="mt-2 text-xs leading-5 text-muted">온습도와 바닥재 상태를 먼저 확인하고, 눈곱이나 콧물 등 다른 증상이 함께 있는지 살펴보세요.</Text><View className="mt-3 rounded-xl bg-cream p-3"><Text className="text-[11px] font-bold text-ink">정확한 진단은 전문 병원 상담을 권장합니다.</Text></View></View>
      <View className="px-4 pt-6"><Text className="mb-2 text-base font-black text-ink">관련 게시글 추천</Text></View><PostCard item={posts[2]} compact />
      <View className="px-4 pt-6"><Text className="mb-3 text-base font-black text-ink">관련 분양 개체 추천</Text><View className="flex-row justify-between"><ListingCard item={listings[0]} /><ListingCard item={listings[1]} /></View></View>
    </Page>
  );
}
