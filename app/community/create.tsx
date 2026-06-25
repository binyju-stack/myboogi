import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { createPostCategories } from '@/data/communityData';
import { xpMessages } from '@/data/levelData';

export default function CommunityCreateScreen() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState(createPostCategories[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <View className="flex-row items-center bg-white px-4 py-3.5">
        <View className="h-10 w-10">
          <AnimatedPressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center">
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </AnimatedPressable>
        </View>
        <Text className="flex-1 text-center text-[16px] font-bold text-ink">글쓰기</Text>
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
              <Text className="text-[25px] font-bold leading-9 text-ink">커뮤니티에{'\n'}이야기를 남겨보세요</Text>
              <Text className="mt-3 text-[12px] leading-6 text-muted">사육 팁, 질문, 일상 기록을 편하게 공유할 수 있어요.</Text>
            </View>
          </FadeInView>

          <FadeInView delay={50}>
            <View className="rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-bold text-berry">CATEGORY</Text>
              <Text className="mt-1 text-[18px] font-bold text-ink">카테고리 선택</Text>
              <View className="mt-5 flex-row flex-wrap">
                {createPostCategories.map((item) => (
                  <View key={item} className="mb-2 mr-2">
                    <AnimatedPressable onPress={() => setCategory(item)} className={`rounded-full px-3.5 py-2.5 ${category === item ? 'bg-berry' : 'bg-soft'}`}>
                      <Text className={`text-[10px] font-bold ${category === item ? 'text-white' : 'text-muted'}`}>{item}</Text>
                    </AnimatedPressable>
                  </View>
                ))}
              </View>
            </View>
          </FadeInView>

          <FadeInView delay={100}>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="mb-2 text-[11px] font-bold text-ink">제목</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="제목을 입력해주세요"
                placeholderTextColor={colors.subtle}
                className="rounded-[18px] bg-soft px-4 py-4 text-[13px] text-ink"
              />
              <View className="mb-2 mt-5 flex-row items-center justify-between">
                <Text className="text-[11px] font-bold text-ink">내용</Text>
                <Text className="text-[9px] text-muted">{content.length} / 2,000</Text>
              </View>
              <TextInput
                value={content}
                onChangeText={setContent}
                multiline
                maxLength={2000}
                textAlignVertical="top"
                placeholder="나누고 싶은 이야기를 자세히 적어주세요"
                placeholderTextColor={colors.subtle}
                className="min-h-52 rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink"
              />
            </View>
          </FadeInView>

          <FadeInView delay={150}>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[18px] font-bold text-ink">이미지 추가</Text>
              <Text className="mt-2 text-[11px] leading-5 text-muted">사진을 추가하면 상황을 더 정확하게 공유할 수 있어요.</Text>
              <AnimatedPressable className="mt-5 aspect-[4/3] items-center justify-center rounded-[22px] bg-blush">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-white">
                  <Ionicons name="images-outline" size={23} color={colors.berry} />
                </View>
                <Text className="mt-3 text-[11px] font-bold text-ink">사진 추가하기</Text>
                <Text className="mt-1 text-[9px] text-muted">최대 10장까지 등록할 수 있어요</Text>
              </AnimatedPressable>
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => Alert.alert(`게시글 등록 기능은 준비중입니다.\n${xpMessages.post}`)} className="items-center rounded-[18px] bg-berry py-4">
          <Text className="text-[14px] font-bold text-white">등록</Text>
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}
