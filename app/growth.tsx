import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { growthRecords, turtles } from '@/data/growthData';

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);
const recordDays = [5, 10, 20, 28];

function MiniChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return <View className="mt-4 h-20 flex-row items-end justify-between">{values.map((value, index) => <View key={`${value}-${index}`} style={{ height: Math.max(18, (value / max) * 72), backgroundColor: color }} className="w-8 rounded-t-lg" />)}</View>;
}

export default function GrowthScreen() {
  const turtle = turtles[0];
  const records = growthRecords.filter((entry) => entry.turtleId === turtle.id);
  const latest = records[0];
  const previous = records[1];

  return (
    <Page>
      <TopBar title="성장기록" right="add-circle-outline" onRightPress={() => router.push('/growth/create')} />
      <View className="px-5 pt-5">
        <FadeInView>
          <View className="rounded-[28px] bg-ink p-5 shadow-sm">
            <View className="flex-row items-center"><Image source={{ uri: turtle.image }} className="h-20 w-20 rounded-[22px] bg-shell" /><View className="ml-4 flex-1"><Text className="text-[10px] font-black text-petal">MY TURTLE</Text><Text className="mt-1 text-[24px] font-black text-white">{turtle.name}</Text><Text className="mt-1 text-[10px] text-white/50">{turtle.species} · 부화일 {turtle.birthDate}</Text></View></View>
            <View className="mt-5 flex-row gap-2">
              <View className="flex-1 rounded-[20px] bg-white/10 p-4"><Text className="text-[9px] text-white/50">현재 몸무게</Text><Text className="mt-2 text-[19px] font-black text-white">{latest.weight}g</Text></View>
              <View className="flex-1 rounded-[20px] bg-white/10 p-4"><Text className="text-[9px] text-white/50">현재 등갑 길이</Text><Text className="mt-2 text-[19px] font-black text-white">{latest.shellLength}cm</Text></View>
            </View>
            <View className="mt-3 rounded-[18px] bg-white/10 px-4 py-3"><Text className="text-[10px] leading-5 text-white">{turtle.summary}{'\n'}최근 기록 {latest.displayDate} · 이전보다 {latest.weight - previous.weight}g 성장</Text></View>
            <AnimatedPressable onPress={() => router.push(`/growth/record?turtleId=${turtle.id}`)} className="mt-3 items-center rounded-[18px] bg-berry py-4"><Text className="text-[13px] font-black text-white">오늘 기록하기</Text></AnimatedPressable>
          </View>
        </FadeInView>

        <View className="mb-4 mt-8 flex-row items-end justify-between"><View><Text className="text-[10px] font-black text-berry">MY TURTLES</Text><Text className="mt-1 text-[20px] font-black text-ink">내 거북이</Text></View><AnimatedPressable onPress={() => router.push('/growth/create')} className="rounded-full bg-blush px-3 py-2"><Text className="text-[10px] font-black text-berry">거북이 등록</Text></AnimatedPressable></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}>
        {turtles.map((item, index) => {
          const itemLatest = growthRecords.find((entry) => entry.turtleId === item.id);
          return <View key={item.id} className="mr-3 w-60"><FadeInView delay={index * 45}><AnimatedPressable onPress={() => router.push(`/growth/${item.id}`)} className="rounded-[24px] bg-white p-4 shadow-sm"><View className="flex-row items-center"><Image source={{ uri: item.image }} className="h-16 w-16 rounded-full bg-shell" /><View className="ml-3 flex-1"><Text className="text-[15px] font-black text-ink">{item.name}</Text><Text className="mt-1 text-[9px] text-muted" numberOfLines={1}>{item.species}</Text><Text className="mt-2 text-[10px] font-black text-berry">{itemLatest?.weight ?? '-'}g · {itemLatest?.displayDate ?? '기록 전'}</Text></View><Ionicons name="chevron-forward" size={16} color={colors.subtle} /></View></AnimatedPressable></FadeInView></View>;
        })}
      </ScrollView>

      <View className="px-5 pt-7">
        <View className="rounded-[26px] bg-white p-5 shadow-sm"><View className="flex-row items-center justify-between"><View><Text className="text-[10px] font-black text-berry">GROWTH CHART</Text><Text className="mt-1 text-[19px] font-black text-ink">성장 그래프 미리보기</Text></View><Ionicons name="analytics-outline" size={21} color={colors.berry} /></View><MiniChart values={[108, 115, 121, 128]} color={colors.berry} /><Text className="mt-3 text-[10px] text-muted">몸무게가 꾸준히 증가하고 있어요.</Text></View>
      </View>

      <View className="px-5 pt-4">
        <View className="rounded-[26px] bg-white p-5 shadow-sm"><View className="flex-row items-center justify-between"><View><Text className="text-[10px] font-black text-berry">JUNE 2026</Text><Text className="mt-1 text-[19px] font-black text-ink">달력 기록 미리보기</Text></View><Ionicons name="calendar-outline" size={21} color={colors.berry} /></View><View className="mt-5 flex-row flex-wrap">{calendarDays.map((day) => <View key={day} className="mb-3 w-[14.28%] items-center"><View className={`h-8 w-8 items-center justify-center rounded-full ${day === 11 ? 'bg-berry' : ''}`}><Text className={`text-[10px] font-bold ${day === 11 ? 'text-white' : 'text-ink'}`}>{day}</Text></View>{recordDays.includes(day) || day === 11 ? <View className="mt-1 h-1 w-1 rounded-full bg-berry" /> : <View className="mt-1 h-1" />}</View>)}</View></View>
      </View>

      <View className="px-5 pb-4 pt-8"><Text className="text-[10px] font-black text-berry">PHOTO TIMELINE</Text><Text className="mt-1 text-[20px] font-black text-ink">사진 타임라인 미리보기</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}>{records.slice(0, 3).map((record) => <View key={record.id} className="mr-3 w-44 overflow-hidden rounded-[22px] bg-white shadow-sm"><Image source={{ uri: record.image }} className="h-36 w-full bg-shell" /><View className="p-3"><Text className="text-[9px] font-black text-berry">{record.displayDate}</Text><Text className="mt-1 text-[11px] font-black text-ink">{record.weight}g · {record.shellLength}cm</Text></View></View>)}</ScrollView>
    </Page>
  );
}
