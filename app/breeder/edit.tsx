import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { colors } from '@/constants/theme';
import { breeders } from '@/data/mockData';

function Field({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  const [text, setText] = useState(value);
  return (
    <View className="mt-5">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholderTextColor={colors.subtle}
        className={`${multiline ? 'min-h-32 leading-6' : ''} rounded-[18px] bg-soft px-4 py-4 text-[13px] text-ink`}
      />
    </View>
  );
}

function ImagePickerBox({ label, uri, icon }: { label: string; uri: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View className="flex-1">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <AnimatedPressable className="overflow-hidden rounded-[22px] bg-blush">
        <Image source={{ uri }} className="aspect-[4/3] w-full bg-shell" resizeMode="cover" />
        <View className="absolute inset-0 items-center justify-center bg-black/20">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-white">
            <Ionicons name={icon} size={21} color={colors.berry} />
          </View>
        </View>
      </AnimatedPressable>
    </View>
  );
}

export default function BreederEditScreen() {
  const insets = useSafeAreaInsets();
  const breeder = breeders[0];

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="미니샵 관리" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 112 + insets.bottom }}
        >
          <FadeInView>
            <View className="mb-6">
              <Text className="text-[25px] font-black leading-9 text-ink">브리더샵 정보를{'\n'}깔끔하게 정리해요</Text>
              <Text className="mt-3 text-[12px] leading-6 text-muted">실제 저장은 나중에 연결하고, 지금은 화면 구조만 준비합니다.</Text>
            </View>
          </FadeInView>

          <FadeInView delay={50}>
            <View className="rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-black text-berry">BRAND IMAGE</Text>
              <Text className="mt-1 text-[18px] font-black text-ink">이미지 설정</Text>
              <View className="mt-5 flex-row gap-3">
                <ImagePickerBox label="로고 변경" uri={breeder.logo ?? breeder.avatar} icon="image-outline" />
                <ImagePickerBox label="배너 이미지 변경" uri={breeder.bannerImage ?? breeder.banner} icon="images-outline" />
              </View>
            </View>
          </FadeInView>

          <FadeInView delay={100}>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-black text-berry">PROFILE</Text>
              <Text className="mt-1 text-[18px] font-black text-ink">브리더 소개</Text>
              <Field label="브리더명" value={breeder.name} />
              <Field label="한줄 소개" value={breeder.shortBio ?? ''} />
              <Field label="상세 소개" value={breeder.fullBio ?? breeder.intro} multiline />
            </View>
          </FadeInView>

          <FadeInView delay={150}>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
              <Text className="text-[10px] font-black text-berry">EXTERNAL LINKS</Text>
              <Text className="mt-1 text-[18px] font-black text-ink">외부 링크</Text>
              <Field label="인스타그램 링크" value={breeder.instagramUrl ?? ''} />
              <Field label="블로그 링크" value={breeder.blogUrl ?? ''} />
              <Field label="유튜브 링크" value={breeder.youtubeUrl ?? ''} />
              <Field label="카카오채널 링크" value={breeder.kakaoChannelUrl ?? ''} />
              <Field label="홈페이지 링크" value={breeder.websiteUrl ?? ''} />
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <AnimatedPressable onPress={() => Alert.alert('브리더샵 수정 기능은 준비중입니다.')} className="items-center rounded-[18px] bg-berry py-4">
          <Text className="text-[14px] font-black text-white">저장</Text>
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}
