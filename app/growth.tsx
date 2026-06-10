import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { growthRecords, turtles } from '@/data/mockData';

export default function GrowthScreen() {
  const turtle = turtles[0];
  return (
    <Page>
      <TopBar title="성장 기록" right="add-circle-outline" />
      <View className="border-b-8 border-[#F7F5F7] p-4"><View className="flex-row items-center rounded-2xl bg-shell p-4"><Image source={{ uri: turtle.image }} className="h-20 w-20 rounded-2xl bg-white" /><View className="ml-4 flex-1"><Text className="text-xl font-black text-ink">{turtle.name}</Text><Text className="mt-1 text-xs text-muted">{turtle.species} · {turtle.sex}</Text><Text className="mt-2 text-xs font-bold text-berry">함께한 지 262일째</Text></View></View></View>
      <View className="border-b-8 border-[#F7F5F7] p-4"><Text className="text-base font-black text-ink">성장 그래프</Text><View className="mt-4 h-44 rounded-2xl bg-blush p-4"><View className="flex-1 flex-row items-end justify-around border-b border-l border-petal">{[35, 52, 68, 86].map((h, i) => <View key={h} className="items-center"><View style={{ height: h }} className="w-7 rounded-t-lg bg-berry" /><Text className="mt-2 text-[9px] text-muted">{['3월', '4월', '5월', '6월'][i]}</Text></View>)}</View></View></View>
      <View className="border-b-8 border-[#F7F5F7] p-4"><View className="flex-row items-center justify-between"><Text className="text-base font-black text-ink">달력 보기</Text><Text className="text-xs text-berry">2026년 6월</Text></View><View className="mt-4 flex-row flex-wrap">{Array.from({ length: 28 }, (_, i) => <View key={i} className="h-10 w-[14.28%] items-center justify-center"><View className={`h-8 w-8 items-center justify-center rounded-full ${i === 9 ? 'bg-berry' : ''}`}><Text className={`text-xs ${i === 9 ? 'font-black text-white' : 'text-muted'}`}>{i + 1}</Text></View></View>)}</View></View>
      <View className="p-4"><Text className="mb-4 text-base font-black text-ink">사진 타임라인</Text>{growthRecords.map((record) => <View key={record.id} className="mb-4 flex-row rounded-2xl border border-line p-3"><Image source={{ uri: record.image }} className="h-20 w-20 rounded-xl bg-shell" /><View className="ml-3 flex-1"><Text className="text-[11px] font-bold text-berry">{record.date}</Text><Text className="mt-1 text-sm font-black text-ink">{record.weight}g · 등갑 {record.shellLength}cm</Text><Text className="mt-2 text-xs leading-5 text-muted">{record.memo}</Text></View><Ionicons name="chevron-forward" size={16} color={colors.muted} /></View>)}</View>
    </Page>
  );
}
