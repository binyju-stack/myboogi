import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';

const categories = ['자유게시판', '사육정보', '질병상담', '먹이정보', '합사정보', '번식정보', '질문답변'];

export default function CommunityCreateScreen() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState(categories[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [readyVisible, setReadyVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <View className="flex-row items-center bg-white px-4 py-3.5">
        <View className="h-10 w-10">
          <AnimatedPressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center">
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </AnimatedPressable>
        </View>
        <Text className="flex-1 text-center text-[16px] font-black text-ink">글쓰기</Text>
        <View className="h-10 w-10" />
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 112 + insets.bottom }}
        >
          <FadeInView>
            <View className="mb-6">
              <Text className="text-[25px] font-black leading-9 tracking-[-0.8px] text-ink">거북이 집사들과{'\n'}이야기를 나눠보세요</Text>
              <Text className="mt-3 text-[12px] leading-6 text-muted">궁금한 점과 소중한 경험을 편안하게 공유해 주세요.</Text>
            </View>
          </FadeInView>

          <FadeInView delay={50}>
            <View className="rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-black text-berry">CATEGORY</Text>
              <Text className="mt-1 text-[18px] font-black text-ink">카테고리 선택</Text>
              <View className="mt-5 flex-row flex-wrap">
                {categories.map((item) => (
                  <View key={item} className="mb-2 mr-2">
                    <AnimatedPressable onPress={() => setCategory(item)} className={`rounded-full px-3.5 py-2.5 ${category === item ? 'bg-berry' : 'bg-soft'}`}>
                      <Text className={`text-[10px] font-black ${category === item ? 'text-white' : 'text-muted'}`}>{item}</Text>
                    </AnimatedPressable>
                  </View>
                ))}
              </View>
            </View>
          </FadeInView>

          <FadeInView delay={100}>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="mb-2 text-[11px] font-black text-ink">제목</Text>
              <TextInput value={title} onChangeText={setTitle} placeholder="어떤 이야기를 나누고 싶나요?" placeholderTextColor={colors.subtle} className="rounded-[18px] bg-soft px-4 py-4 text-[13px] text-ink" />
              <View className="mb-2 mt-5 flex-row items-center justify-between">
                <Text className="text-[11px] font-black text-ink">내용</Text>
                <Text className="text-[9px] text-muted">{content.length} / 2,000</Text>
              </View>
              <TextInput value={content} onChangeText={setContent} multiline maxLength={2000} textAlignVertical="top" placeholder="집사들과 나누고 싶은 이야기를 자세히 적어주세요." placeholderTextColor={colors.subtle} className="min-h-52 rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink" />
            </View>
          </FadeInView>

          <FadeInView delay={150}>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[18px] font-black text-ink">이미지 추가</Text>
              <Text className="mt-2 text-[11px] leading-5 text-muted">거북이의 모습을 보여주면 더 정확한 답변을 받을 수 있어요.</Text>
              <View className="mt-5">
                <AnimatedPressable className="aspect-[4/3] items-center justify-center rounded-[22px] bg-blush">
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-white"><Ionicons name="images-outline" size={23} color={colors.berry} /></View>
                  <Text className="mt-3 text-[11px] font-black text-ink">사진 추가하기</Text>
                  <Text className="mt-1 text-[9px] text-muted">최대 10장까지 등록할 수 있어요</Text>
                </AnimatedPressable>
              </View>
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4">
          <Text className="text-[14px] font-black text-white">게시글 등록하기</Text>
        </AnimatedPressable>
      </View>
      <ReadyModal visible={readyVisible} title="게시글 등록 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
