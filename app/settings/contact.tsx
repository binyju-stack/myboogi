import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';

const inquiryTypes = ['계정', '분양글', '브리더', '결제 준비', '기타'];

export default function ContactScreen() {
  const [type, setType] = useState(inquiryTypes[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Page>
      <TopBar title="문의하기" />

      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">CONTACT</Text>
        <Text className="mt-1 text-[24px] font-black text-ink">무엇을 도와드릴까요?</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">현재는 문의 UI만 준비되어 있고 실제 접수는 나중에 연결됩니다.</Text>
      </View>

      <View className="px-5 pt-5">
        <FadeInView>
          <View className="rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <Text className="text-[13px] font-black text-ink">문의 유형</Text>
            <View className="mt-4 flex-row flex-wrap">
              {inquiryTypes.map((item) => {
                const selected = item === type;
                return (
                  <AnimatedPressable key={item} onPress={() => setType(item)} className={`mb-2 mr-2 rounded-full px-3.5 py-2.5 ${selected ? 'bg-ink' : 'border border-line bg-white'}`}>
                    <Text className={`text-[11px] font-black ${selected ? 'text-white' : 'text-muted'}`}>{item}</Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={45}>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <Text className="mb-2 text-[11px] font-black text-ink">제목</Text>
            <TextInput value={title} onChangeText={setTitle} placeholder="문의 제목을 입력하세요" placeholderTextColor={colors.subtle} className="h-[52px] rounded-[18px] bg-soft px-4 text-[13px] font-bold text-ink" />
            <Text className="mb-2 mt-4 text-[11px] font-black text-ink">내용</Text>
            <TextInput value={content} onChangeText={setContent} multiline textAlignVertical="top" placeholder="문의 내용을 자세히 적어주세요" placeholderTextColor={colors.subtle} className="min-h-[160px] rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink" />
          </View>
        </FadeInView>

        <FadeInView delay={90}>
          <AnimatedPressable onPress={() => Alert.alert('이미지 첨부 기능은 준비중입니다.')} className="mt-4 items-center rounded-[24px] border border-dashed border-line bg-white px-5 py-8 shadow-sm">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-blush">
              <Ionicons name="image-outline" size={23} color={colors.berry} />
            </View>
            <Text className="mt-3 text-[12px] font-black text-ink">이미지 첨부</Text>
            <Text className="mt-1 text-[10px] text-muted">스크린샷이나 참고 이미지를 첨부할 수 있어요.</Text>
          </AnimatedPressable>
        </FadeInView>

        <AnimatedPressable onPress={() => Alert.alert('문의 접수 기능은 준비중입니다.')} className="mt-5 items-center rounded-[20px] bg-berry py-4 shadow-sm">
          <Text className="text-[13px] font-black text-white">보내기</Text>
        </AnimatedPressable>
      </View>
    </Page>
  );
}
