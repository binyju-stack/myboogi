import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { growthRecords, turtles } from '@/data/growthData';

function Chart({ values, color, suffix }: { values: number[]; color: string; suffix: string }) {
  const max = Math.max(...values);
  return <View className="mt-5 h-28 flex-row items-end justify-between">{values.map((value, index) => <View key={`${value}-${index}`} className="items-center"><Text className="mb-2 text-[8px] font-bold text-muted">{value}{suffix}</Text><View style={{ height: Math.max(25, (value / max) * 82), backgroundColor: color }} className="w-8 rounded-t-lg" /></View>)}</View>;
}

export default function GrowthDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const turtle = turtles.find((item) => item.id === id) ?? turtles[0];
  const records = growthRecords.filter((entry) => entry.turtleId === turtle.id);
  const latest = records[0];
  const chartRecords = [...records].reverse();
  return (
    <Page>
      <TopBar title={`${turtle.name} 성장기록`} right="add-circle-outline" onRightPress={() => router.push(`/growth/record?turtleId=${turtle.id}`)} />
      <FadeInView><View className="mx-5 mt-5 rounded-[28px] bg-ink p-5 shadow-sm"><View className="flex-row items-center"><Image source={{ uri: turtle.image }} className="h-24 w-24 rounded-[24px] bg-shell" /><View className="ml-4 flex-1"><Text className="text-[10px] font-black text-petal">MY TURTLE</Text><Text className="mt-1 text-[24px] font-black text-white">{turtle.name}</Text><Text className="mt-2 text-[10px] leading-5 text-white/50">{turtle.species}{'\n'}{turtle.sex} · 부화일 {turtle.birthDate}</Text></View></View><AnimatedPressable onPress={() => router.push(`/growth/record?turtleId=${turtle.id}`)} className="mt-5 items-center rounded-[18px] bg-berry py-4"><Text className="text-[12px] font-black text-white">오늘 기록하기</Text></AnimatedPressable></View></FadeInView>
      <View className="px-5">
        <View className="mt-4 flex-row gap-3"><View className="flex-1 rounded-[22px] bg-white p-4 shadow-sm"><Text className="text-[9px] text-muted">현재 몸무게</Text><Text className="mt-2 text-[19px] font-black text-ink">{latest?.weight ?? '-'}g</Text></View><View className="flex-1 rounded-[22px] bg-white p-4 shadow-sm"><Text className="text-[9px] text-muted">현재 등갑 길이</Text><Text className="mt-2 text-[19px] font-black text-ink">{latest?.shellLength ?? '-'}cm</Text></View></View>
        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[10px] font-black text-berry">WEIGHT</Text><Text className="mt-1 text-[18px] font-black text-ink">몸무게 변화</Text><Chart values={chartRecords.map((item) => item.weight)} color={colors.berry} suffix="g" /></View>
        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[10px] font-black text-berry">SHELL LENGTH</Text><Text className="mt-1 text-[18px] font-black text-ink">등갑 길이 변화</Text><Chart values={chartRecords.map((item) => item.shellLength)} color={colors.petal} suffix="" /></View>
        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><View className="flex-row items-center justify-between"><View><Text className="text-[10px] font-black text-berry">CALENDAR</Text><Text className="mt-1 text-[18px] font-black text-ink">달력 기록</Text></View><Ionicons name="calendar-outline" size={21} color={colors.berry} /></View><View className="mt-5 flex-row justify-between">{[5, 10, 20, 28].map((day) => <View key={day} className="items-center"><View className="h-10 w-10 items-center justify-center rounded-full bg-blush"><Text className="text-[11px] font-black text-berry">{day}</Text></View><View className="mt-2 h-1.5 w-1.5 rounded-full bg-berry" /></View>)}</View></View>
        <Text className="mb-4 mt-8 text-[20px] font-black text-ink">최근 기록과 메모</Text>
        {records.map((record, index) => <FadeInView key={record.id} delay={index * 45}><View className="mb-3 rounded-[24px] bg-white p-4 shadow-sm"><View className="flex-row"><Image source={{ uri: record.image }} className="h-20 w-20 rounded-[18px] bg-shell" /><View className="ml-3 flex-1"><Text className="text-[10px] font-black text-berry">{record.displayDate}</Text><Text className="mt-1 text-[13px] font-black text-ink">{record.weight}g · {record.shellLength}cm</Text><Text className="mt-2 text-[9px] text-muted">먹이 {record.foodResponse} · 컨디션 {record.condition}</Text></View></View><Text className="mt-3 text-[10px] leading-5 text-muted">{record.memo}</Text></View></FadeInView>)}
      </View>
    </Page>
  );
}
