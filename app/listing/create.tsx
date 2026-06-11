import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { emptyListingDraft, ListingForm, type ListingDraft } from '@/components/ListingForm';
import { ReadyModal } from '@/components/ReadyModal';

export default function ListingCreateScreen() {
  const [draft, setDraft] = useState<ListingDraft>(emptyListingDraft);
  const [readyVisible, setReadyVisible] = useState(false);
  const [readyTitle, setReadyTitle] = useState('분양글 등록 기능은 준비중입니다.');
  const updateDraft = (key: keyof ListingDraft, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const showReady = (title: string) => {
    setReadyTitle(title);
    setReadyVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-page">
      <View className="flex-row items-center bg-white px-4 py-3.5">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center"><Text className="text-[26px] text-ink">‹</Text></Pressable>
        <Text className="flex-1 text-center text-[16px] font-black text-ink">분양글 등록</Text>
        <Pressable onPress={() => showReady('임시저장 기능은 준비중입니다.')} className="h-10 min-w-16 items-center justify-center"><Text className="text-[11px] font-black text-berry">임시저장</Text></Pressable>
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-32 pt-5">
          <View className="mb-5"><Text className="text-[25px] font-black tracking-[-0.8px] text-ink">새 가족을 기다리는{'\n'}거북이를 소개해주세요</Text><Text className="mt-3 text-[12px] leading-6 text-muted">정확하고 자세한 정보는 좋은 인연을 만나는 데 도움이 돼요.</Text></View>
          <ListingForm draft={draft} onChange={updateDraft} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 py-3">
        <Pressable onPress={() => showReady('분양글 등록 기능은 준비중입니다.')} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-black text-white">분양글 등록하기</Text></Pressable>
      </View>
      <ReadyModal visible={readyVisible} title={readyTitle} description="작성한 내용은 실제로 저장되지 않아요." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
