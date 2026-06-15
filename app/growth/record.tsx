import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { turtles } from '@/data/growthData';
import { xpMessages } from '@/data/levelData';

function Choice({ label, options }: { label: string; options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  return <View className="mt-5"><Text className="mb-2 text-[11px] font-black text-ink">{label}</Text><View className="flex-row gap-2">{options.map((option) => <View key={option} className="flex-1"><AnimatedPressable onPress={() => setSelected(option)} className={`items-center rounded-[16px] py-3.5 ${selected === option ? 'bg-berry' : 'bg-soft'}`}><Text className={`text-[10px] font-black ${selected === option ? 'text-white' : 'text-muted'}`}>{option}</Text></AnimatedPressable></View>)}</View></View>;
}

function MeasureField({ label, suffix }: { label: string; suffix: string }) {
  return <View className="mt-5"><Text className="mb-2 text-[11px] font-black text-ink">{label}</Text><View className="flex-row items-center rounded-[18px] bg-soft px-4"><TextInput keyboardType="numeric" placeholder="0.0" placeholderTextColor={colors.subtle} className="flex-1 py-4 text-[13px] text-ink" /><Text className="text-[11px] font-black text-muted">{suffix}</Text></View></View>;
}

export default function GrowthRecordScreen() {
  const { turtleId } = useLocalSearchParams<{ turtleId?: string }>();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(turtleId ?? turtles[0].id);
  const [readyVisible, setReadyVisible] = useState(false);
  const turtle = turtles.find((item) => item.id === selectedId) ?? turtles[0];
  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="오늘 기록하기" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 108 + insets.bottom }}>
          <FadeInView><View className="mx-5 mt-5 rounded-[26px] bg-ink p-5"><Text className="text-[10px] font-black text-petal">TODAY'S NOTE</Text><Text className="mt-2 text-[22px] font-black text-white">{turtle.name}의 오늘을{'\n'}기록해 주세요</Text><Text className="mt-3 text-[10px] text-white/50">{turtle.species}</Text></View></FadeInView>
          <View className="px-5">
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[10px] font-black text-berry">SELECT TURTLE</Text><Text className="mt-1 text-[18px] font-black text-ink">거북이 선택</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">{turtles.map((item) => <View key={item.id} className="mr-2"><AnimatedPressable onPress={() => setSelectedId(item.id)} className={`rounded-full px-4 py-3 ${selectedId === item.id ? 'bg-berry' : 'bg-soft'}`}><Text className={`text-[10px] font-black ${selectedId === item.id ? 'text-white' : 'text-muted'}`}>{item.name}</Text></AnimatedPressable></View>)}</ScrollView></View>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">성장 측정</Text><MeasureField label="몸무게" suffix="g" /><MeasureField label="등갑 길이" suffix="cm" /></View>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">오늘의 컨디션</Text><Choice label="먹이 반응" options={['좋음', '보통', '적음']} /><Choice label="배변 여부" options={['정상', '없음', '확인 필요']} /><Choice label="컨디션" options={['좋음', '보통', '관찰 필요']} /></View>
            <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">사진과 메모</Text><View className="mt-5"><AnimatedPressable className="aspect-[4/3] items-center justify-center rounded-[22px] bg-blush"><View className="h-12 w-12 items-center justify-center rounded-full bg-white"><Ionicons name="camera-outline" size={23} color={colors.berry} /></View><Text className="mt-3 text-[11px] font-black text-ink">오늘의 사진 추가</Text></AnimatedPressable></View><TextInput multiline textAlignVertical="top" placeholder="먹이 반응과 컨디션을 자유롭게 기록해 주세요." placeholderTextColor={colors.subtle} className="mt-5 min-h-32 rounded-[18px] bg-soft px-4 py-4 text-[13px] leading-6 text-ink" /></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}><AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-black text-white">저장하기</Text></AnimatedPressable></View>
      <ReadyModal visible={readyVisible} title={`성장기록 저장 기능은 준비중입니다.\n${xpMessages.growth}`} onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
