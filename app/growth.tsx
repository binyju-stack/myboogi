import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { growthRecords, turtles } from '@/data/mockData';

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);
const recordDays = [5, 10, 20, 28];

function MiniStat({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return <View className="flex-1 rounded-[20px] bg-soft p-4"><View className="h-9 w-9 items-center justify-center rounded-[13px] bg-white"><Ionicons name={icon} size={17} color={colors.berry} /></View><Text className="mt-3 text-[17px] font-black text-ink">{value}</Text><Text className="mt-1 text-[9px] text-muted">{label}</Text></View>;
}

function GrowthChart({ records }: { records: typeof growthRecords }) {
  const chartRecords = [...records].reverse().slice(-4);
  const maxWeight = Math.max(...chartRecords.map((record) => record.weight), 1);
  const maxShell = Math.max(...chartRecords.map((record) => record.shellLength), 1);
  return (
    <View className="rounded-[26px] border border-line bg-white p-5 shadow-sm">
      <View className="flex-row items-start justify-between"><View><Text className="text-[9px] font-black text-berry">GROWTH CHART</Text><Text className="mt-1 text-[19px] font-black text-ink">꾸준히 잘 자라고 있어요</Text></View><View className="rounded-full bg-blush px-3 py-2"><Text className="text-[9px] font-black text-berry">최근 4회</Text></View></View>
      <View className="mt-7 flex-row gap-5">
        <View className="flex-1"><Text className="text-[10px] font-black text-muted">몸무게 변화</Text><View className="mt-4 h-28 flex-row items-end justify-around">{chartRecords.map((record) => <View key={record.id} className="items-center"><Text className="mb-2 text-[8px] font-bold text-muted">{record.weight}g</Text><View style={{ height: Math.max(24, (record.weight / maxWeight) * 78) }} className="w-7 rounded-t-lg bg-berry" /></View>)}</View></View>
        <View className="flex-1"><Text className="text-[10px] font-black text-muted">등갑 길이 변화</Text><View className="mt-4 h-28 flex-row items-end justify-around">{chartRecords.map((record) => <View key={record.id} className="items-center"><Text className="mb-2 text-[8px] font-bold text-muted">{record.shellLength}</Text><View style={{ height: Math.max(24, (record.shellLength / maxShell) * 78) }} className="w-7 rounded-t-lg bg-petal" /></View>)}</View></View>
      </View>
    </View>
  );
}

export default function GrowthScreen() {
  const [selectedId, setSelectedId] = useState(turtles[0].id);
  const turtle = turtles.find((item) => item.id === selectedId) ?? turtles[0];
  const records = useMemo(() => growthRecords.filter((record) => record.turtleId === turtle.id), [turtle.id]);
  const latest = records[0];
  const previous = records[1];
  const weightChange = latest && previous ? latest.weight - previous.weight : 0;

  return (
    <Page>
      <TopBar title="성장 기록" right="add-circle-outline" />
      <View className="px-5 pt-4">
        <View className="rounded-[28px] bg-ink p-5 shadow-sm">
          <View className="flex-row items-center"><Image source={{ uri: turtle.image }} className="h-20 w-20 rounded-[22px] bg-shell" /><View className="ml-4 flex-1"><Text className="text-[9px] font-black text-petal">MY TURTLE</Text><Text className="mt-1 text-[23px] font-black text-white">{turtle.name}</Text><Text className="mt-1 text-[10px] text-white/50">{turtle.species} · 부화일 {turtle.birthDate}</Text></View></View>
          <View className="mt-5 flex-row gap-2"><MiniStat icon="scale-outline" label="현재 몸무게" value={`${latest?.weight ?? '-'}g`} /><MiniStat icon="resize-outline" label="현재 등갑 길이" value={`${latest?.shellLength ?? '-'}cm`} /></View>
          <View className="mt-4 rounded-[18px] bg-white/10 px-4 py-3"><Text className="text-[11px] font-bold text-white">{weightChange > 0 ? `지난 기록보다 ${weightChange}g 자랐어요` : '첫 성장 기록을 남겨보세요'} · 최근 기록 {latest?.date ?? '-'}</Text></View>
          <AnimatedPressable onPress={() => router.push(`/growth/record?turtleId=${turtle.id}`)} className="mt-3 items-center rounded-[18px] bg-berry py-4"><Text className="text-[13px] font-black text-white">오늘 기록하기</Text></AnimatedPressable>
        </View>

        <View className="mb-4 mt-8 flex-row items-end justify-between"><View><Text className="text-[9px] font-black text-berry">MY TURTLES</Text><Text className="mt-1 text-[19px] font-black text-ink">내 거북이</Text></View><Text className="text-[10px] font-bold text-muted">{turtles.length}마리</Text></View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
        {turtles.map((item) => {
          const itemLatest = growthRecords.find((record) => record.turtleId === item.id);
          const selected = item.id === turtle.id;
          return <FadeInView key={item.id}><AnimatedPressable onPress={() => setSelectedId(item.id)} className={`mr-3 w-56 rounded-[22px] border p-4 shadow-sm ${selected ? 'border-berry bg-blush' : 'border-line bg-white'}`}><View className="flex-row items-center"><Image source={{ uri: item.image }} className="h-14 w-14 rounded-full bg-shell" /><View className="ml-3 flex-1"><Text className="text-[14px] font-black text-ink">{item.name}</Text><Text className="mt-1 text-[9px] text-muted" numberOfLines={1}>{item.species}</Text><Text className="mt-1 text-[9px] font-bold text-berry">{itemLatest?.weight ?? '-'}g · {item.birthDate}</Text></View></View></AnimatedPressable></FadeInView>;
        })}
      </ScrollView>

      <View className="px-5 pt-7"><GrowthChart records={records} /></View>

      <View className="px-5 pt-4">
        <View className="rounded-[26px] border border-line bg-white p-5 shadow-sm">
          <View className="flex-row items-center justify-between"><View><Text className="text-[9px] font-black text-berry">JUNE 2026</Text><Text className="mt-1 text-[19px] font-black text-ink">기록 달력</Text></View><Ionicons name="calendar-outline" size={21} color={colors.berry} /></View>
          <View className="mt-5 flex-row flex-wrap">{calendarDays.map((day) => <View key={day} className="mb-3 w-[14.28%] items-center"><View className={`h-8 w-8 items-center justify-center rounded-full ${day === 10 ? 'bg-berry' : ''}`}><Text className={`text-[10px] font-bold ${day === 10 ? 'text-white' : 'text-ink'}`}>{day}</Text></View>{recordDays.includes(day) ? <View className="mt-1 h-1 w-1 rounded-full bg-berry" /> : <View className="mt-1 h-1" />}</View>)}</View>
        </View>
      </View>

      <View className="px-5 pb-4 pt-8"><Text className="text-[9px] font-black text-berry">PHOTO TIMELINE</Text><Text className="mt-1 text-[19px] font-black text-ink">사진으로 보는 성장</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-3">{records.map((record) => <View key={record.id} className="mr-3 w-44 overflow-hidden rounded-[22px] border border-line bg-white shadow-sm"><Image source={{ uri: record.image }} className="h-40 w-full bg-shell" /><View className="p-3"><Text className="text-[9px] font-black text-berry">{record.date}</Text><Text className="mt-1 text-[11px] font-black text-ink">{record.weight}g · {record.shellLength}cm</Text><Text className="mt-2 text-[9px] leading-4 text-muted" numberOfLines={2}>{record.memo}</Text></View></View>)}</ScrollView>
    </Page>
  );
}
