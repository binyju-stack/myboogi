import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TextInput, View } from 'react-native';

import { Avatar, TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { posts } from '@/data/mockData';

export default function DiseaseScreen() {
  const post = posts[2];
  return (
    <Page>
      <TopBar title="질병 Q&A" right="create-outline" />
      <View className="bg-cream p-4"><View className="flex-row items-center"><Ionicons name="information-circle" size={19} color={colors.berry} /><Text className="ml-2 text-xs font-bold text-ink">정확한 진단은 전문 병원 상담을 권장합니다.</Text></View></View>
      <View className="border-b-8 border-[#F7F5F7] p-4"><Text className="text-base font-black text-ink">질문 작성</Text><View className="mt-3 h-24 rounded-xl border border-line bg-white p-3"><TextInput multiline placeholder="거북이의 증상을 자세히 입력해주세요." className="text-sm" /></View><View className="mt-3 h-20 w-20 items-center justify-center rounded-xl border border-dashed border-petal bg-shell"><Ionicons name="camera-outline" size={24} color={colors.berry} /><Text className="mt-1 text-[10px] font-bold text-berry">사진 첨부</Text></View></View>
      <View className="border-b-8 border-[#F7F5F7] p-4"><View className="flex-row items-center"><Avatar uri={post.avatar} /><View className="ml-3"><Text className="text-xs font-black text-ink">{post.author}</Text><Text className="mt-1 text-[10px] text-muted">{post.createdAt}</Text></View></View><Text className="mt-4 text-lg font-black text-ink">{post.title}</Text><Text className="mt-2 text-sm leading-6 text-muted">{post.content}</Text>{post.image ? <Image source={{ uri: post.image }} className="mt-4 h-56 w-full rounded-xl bg-shell" /> : null}</View>
      <View className="p-4"><Text className="text-base font-black text-ink">답변 2</Text><View className="mt-3 rounded-2xl border border-petal bg-blush p-4"><Text className="text-xs font-black text-berry">부기 AI 답변</Text><Text className="mt-2 text-xs leading-5 text-muted">사진만으로 정확한 판단은 어렵지만 안구 부종은 비타민 A 부족, 온습도 문제, 감염 등 여러 원인이 있을 수 있습니다. 다른 증상도 함께 관찰해 주세요.</Text></View><View className="mt-3 rounded-2xl border border-line p-4"><Text className="text-xs font-black text-ink">육지거북집사 · 사용자 답변</Text><Text className="mt-2 text-xs leading-5 text-muted">비슷한 증상으로 병원에 방문한 적이 있어요. 먹이를 잘 먹더라도 빠르게 특수동물 병원에 문의하는 편이 좋습니다.</Text></View></View>
    </Page>
  );
}
