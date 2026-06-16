import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { ReviewTrustNote, StarRating } from '@/components/StarRating';

export default function ReviewCreateScreen() {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  return (
    <Page>
      <TopBar title="후기 작성" />

      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">REVIEW</Text>
        <Text className="mt-1 text-[24px] font-black text-ink">브리더 후기를 남겨주세요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">문의 이력 기반 후기 신뢰도를 함께 표시합니다.</Text>
      </View>

      <View className="px-5 pt-6">
        <View className="rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[13px] font-black text-ink">평점 선택</Text>
          <View className="mt-4">
            <StarRating rating={rating} size={32} selectable onChange={setRating} />
          </View>
        </View>

        <View className="mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[13px] font-black text-ink">후기 입력</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            placeholder="상담 과정, 개체 컨디션, 사육 안내가 어땠는지 적어주세요."
            placeholderTextColor="#B0B8C1"
            className="mt-4 min-h-[150px] rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink"
          />
        </View>

        <View className="mt-4">
          <ReviewTrustNote />
        </View>

        <AnimatedPressable onPress={() => Alert.alert('후기 등록 기능은 준비중입니다.')} className="mt-5 items-center rounded-[18px] bg-berry py-4">
          <Text className="text-[12px] font-black text-white">등록하기</Text>
        </AnimatedPressable>
      </View>
    </Page>
  );
}
