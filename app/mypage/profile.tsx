import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { turtles } from '@/data/mockData';

function ProfileField({ label, value, onChangeText, placeholder, multiline = false }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; multiline?: boolean }) {
  return (
    <View className="mt-5">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtle}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`${multiline ? 'min-h-28' : ''} rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink`}
      />
    </View>
  );
}

export default function ProfileEditScreen() {
  const insets = useSafeAreaInsets();
  const [nickname, setNickname] = useState('부기집사');
  const [intro, setIntro] = useState('거북이와 함께 천천히, 건강하게 성장 중이에요.');
  const [phone, setPhone] = useState('010-1234-5678');
  const [kakaoId, setKakaoId] = useState('myboogi_keeper');
  const [readyVisible, setReadyVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="프로필 수정" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 104 + insets.bottom }}>
          <FadeInView>
            <View className="items-center bg-white px-5 pb-7 pt-6">
              <View>
                <Image source={{ uri: turtles[0].image }} className="h-24 w-24 rounded-full bg-shell" />
                <View className="absolute bottom-0 right-0 h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-berry">
                  <Ionicons name="camera" size={16} color="white" />
                </View>
              </View>
              <Text className="mt-4 text-[14px] font-black text-ink">프로필 이미지 변경</Text>
              <Text className="mt-1 text-[10px] text-muted">현재는 이미지 선택 UI만 제공해요.</Text>
            </View>
          </FadeInView>

          <FadeInView delay={60}>
            <View className="mx-5 mt-5 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-black text-berry">PROFILE INFO</Text>
              <Text className="mt-1 text-[19px] font-black text-ink">기본 정보</Text>
              <ProfileField label="닉네임" value={nickname} onChangeText={setNickname} placeholder="닉네임을 입력해 주세요" />
              <ProfileField label="한줄 소개" value={intro} onChangeText={setIntro} placeholder="나를 소개해 주세요" multiline />
              <ProfileField label="연락처" value={phone} onChangeText={setPhone} placeholder="연락처를 입력해 주세요" />
              <ProfileField label="카카오톡 ID" value={kakaoId} onChangeText={setKakaoId} placeholder="카카오톡 ID를 입력해 주세요" />
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4">
          <Text className="text-[14px] font-black text-white">저장하기</Text>
        </AnimatedPressable>
      </View>
      <ReadyModal visible={readyVisible} title="프로필 수정 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
