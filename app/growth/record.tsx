import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { turtles } from '@/data/mockData';

function Field({ label, placeholder, suffix, multiline = false }: { label: string; placeholder: string; suffix?: string; multiline?: boolean }) {
  return <View className="mb-4"><Text className="mb-2 text-[11px] font-black text-ink">{label}</Text><View className={`flex-row rounded-[18px] bg-soft px-4 ${multiline ? 'min-h-32 items-start py-4' : 'items-center'}`}><TextInput placeholder={placeholder} placeholderTextColor={colors.subtle} multiline={multiline} textAlignVertical={multiline ? 'top' : 'center'} keyboardType={suffix ? 'numeric' : 'default'} className={`${multiline ? 'min-h-24' : 'py-4'} flex-1 text-[13px] text-ink`} />{suffix ? <Text className="text-[11px] font-bold text-muted">{suffix}</Text> : null}</View></View>;
}

function Choice({ label, options }: { label: string; options: string[] }) {
  const [selected, setSelected] = useState('');
  return <View className="mb-5"><Text className="mb-2 text-[11px] font-black text-ink">{label}</Text><View className="flex-row gap-2">{options.map((option) => <Pressable key={option} onPress={() => setSelected(option)} className={`flex-1 items-center rounded-[16px] border py-3.5 ${selected === option ? 'border-berry bg-blush' : 'border-line bg-white'}`}><Text className={`text-[10px] font-black ${selected === option ? 'text-berry' : 'text-muted'}`}>{option}</Text></Pressable>)}</View></View>;
}

export default function GrowthRecordScreen() {
  const { turtleId } = useLocalSearchParams<{ turtleId?: string }>();
  const turtle = turtles.find((item) => item.id === turtleId) ?? turtles[0];
  const [readyVisible, setReadyVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-page">
      <View className="flex-row items-center bg-white px-4 py-3.5"><Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center"><Ionicons name="chevron-back" size={24} color={colors.ink} /></Pressable><Text className="flex-1 text-center text-[16px] font-black text-ink">오늘 기록하기</Text><View className="h-10 w-10" /></View>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-32 pt-5">
          <View className="rounded-[24px] bg-ink p-5"><Text className="text-[9px] font-black text-petal">TODAY'S NOTE</Text><Text className="mt-2 text-[22px] font-black text-white">{turtle.name}의 오늘을{'\n'}기록해주세요</Text><Text className="mt-3 text-[11px] text-white/50">{turtle.species}</Text></View>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm"><Text className="mb-5 text-[18px] font-black text-ink">성장 측정</Text><Field label="몸무게" placeholder="현재 몸무게" suffix="g" /><Field label="등갑 길이" placeholder="현재 등갑 길이" suffix="cm" /></View>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm"><Text className="mb-5 text-[18px] font-black text-ink">오늘의 컨디션</Text><Choice label="먹이 반응" options={['좋아요', '보통', '적어요']} /><Choice label="배변 여부" options={['정상', '없음', '확인 필요']} /><Choice label="컨디션" options={['활발함', '보통', '걱정돼요']} /></View>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">사진과 메모</Text><Pressable className="mt-5 aspect-[4/3] items-center justify-center rounded-[22px] border border-dashed border-petal bg-blush"><View className="h-12 w-12 items-center justify-center rounded-full bg-white"><Ionicons name="camera-outline" size={23} color={colors.berry} /></View><Text className="mt-3 text-[11px] font-black text-ink">오늘의 사진 추가</Text></Pressable><View className="mt-5"><Field label="메모" placeholder="오늘 달라진 점이나 기억하고 싶은 내용을 적어주세요." multiline /></View></View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white px-5 py-3"><Pressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[14px] font-black text-white">성장기록 저장하기</Text></Pressable></View>
      <ReadyModal visible={readyVisible} title="성장기록 저장 기능은 준비중입니다." description="입력한 기록은 현재 실제로 저장되지 않아요." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
