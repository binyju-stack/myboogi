import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';

const categories = ['자유게시판', '사육정보', '질병상담', '먹이정보', '합사정보', '번식정보', '질문답변'];

export default function CommunityCreateScreen() {
  const [category, setCategory] = useState(categories[0]);
  const [readyVisible, setReadyVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-page">
      <View className="flex-row items-center bg-white px-4 py-3.5"><Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center"><Ionicons name="chevron-back" size={24} color={colors.ink} /></Pressable><Text className="flex-1 text-center text-[16px] font-black text-ink">글쓰기</Text><View className="h-10 w-10" /></View>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-32 pt-5">
          <View className="mb-5"><Text className="text-[25px] font-black tracking-[-0.8px] text-ink">거북이 집사들과{'\n'}이야기를 나눠보세요</Text><Text className="mt-3 text-[12px] leading-6 text-muted">질문과 경험을 나누며 더 좋은 사육 환경을 만들어요.</Text></View>
          <View className="rounded-[26px] border border-line bg-white p-5 shadow-sm"><Text className="text-[9px] font-black text-berry">CATEGORY</Text><Text className="mt-1 text-[18px] font-black text-ink">카테고리 선택</Text><View className="mt-5 flex-row flex-wrap">{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} className={`mb-2 mr-2 rounded-full border px-3.5 py-2.5 ${category === item ? 'border-berry bg-blush' : 'border-line bg-white'}`}><Text className={`text-[10px] font-black ${category === item ? 'text-berry' : 'text-muted'}`}>{item}</Text></Pressable>)}</View></View>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm"><Text className="mb-2 text-[11px] font-black text-ink">제목</Text><TextInput placeholder="제목을 입력해주세요" placeholderTextColor={colors.subtle} className="rounded-[18px] bg-soft px-4 py-4 text-[13px] text-ink" /><Text className="mb-2 mt-5 text-[11px] font-black text-ink">내용</Text><TextInput multiline textAlignVertical="top" placeholder="집사님들과 나누고 싶은 이야기를 작성해주세요." placeholderTextColor={colors.subtle} className="min-h-52 rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink" /></View>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">이미지 추가</Text><Pressable className="mt-5 aspect-[4/3] items-center justify-center rounded-[22px] border border-dashed border-petal bg-blush"><View className="h-12 w-12 items-center justify-center rounded-full bg-white"><Ionicons name="images-outline" size={23} color={colors.berry} /></View><Text className="mt-3 text-[11px] font-black text-ink">사진을 추가해주세요</Text><Text className="mt-1 text-[9px] text-muted">최대 10장까지 등록할 수 있어요</Text></Pressable></View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 py-3"><Pressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-black text-white">게시글 등록하기</Text></Pressable></View>
      <ReadyModal visible={readyVisible} title="게시글 등록 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
