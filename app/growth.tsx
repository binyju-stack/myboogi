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
      <View className="px-5 pt-5">
        <View className="flex-row items-center rounded-[28px] bg-shell p-5"><Image source={{ uri: turtle.image }} className="h-24 w-24 rounded-[24px] bg-white" /><View className="ml-4 flex-1"><Text className="text-2xl font-black text-ink">{turtle.name}</Text><Text className="mt-1 text-xs text-muted">{turtle.species} · {turtle.sex}</Text><Text className="mt-3 text-xs font-black text-berry">함께한 지 262일째</Text></View></View>
        <View className="mt-5 flex-row gap-3">{[['238g', '현재 몸무게', 'scale-outline'], ['10.8cm', '등갑 길이', 'resize-outline']].map(([value, label, icon]) => <View key={label} className="flex-1 rounded-[24px] bg-white p-4 shadow-sm"><View className="h-10 w-10 items-center justify-center rounded-full bg-blush"><Ionicons name={icon as never} size={19} color={colors.berry} /></View><Text className="mt-4 text-xl font-black text-ink">{value}</Text><Text className="mt-1 text-[11px] text-muted">{label}</Text></View>)}</View>
        <View className="mt-5 rounded-[28px] bg-white p-5 shadow-sm"><View className="flex-row items-center justify-between"><Text className="text-base font-black text-ink">성장 그래프</Text><Text className="text-xs font-bold text-berry">최근 4개월</Text></View><View className="mt-6 h-40 flex-row items-end justify-around">{[45, 70, 96, 125].map((h, i) => <View key={h} className="items-center"><View style={{ height: h }} className="w-8 rounded-full bg-petal" /><Text className="mt-3 text-[10px] text-muted">{['3월', '4월', '5월', '6월'][i]}</Text></View>)}</View></View>
        <Text className="mb-4 mt-8 text-lg font-black text-ink">최근 기록</Text>
        {growthRecords.map((record) => <View key={record.id} className="mb-4 flex-row rounded-[24px] bg-white p-3 shadow-sm"><Image source={{ uri: record.image }} className="h-20 w-20 rounded-[18px] bg-shell" /><View className="ml-3 flex-1"><Text className="text-[10px] font-bold text-berry">{record.date}</Text><Text className="mt-1 text-sm font-black text-ink">{record.weight}g · 등갑 {record.shellLength}cm</Text><Text className="mt-2 text-xs leading-5 text-muted" numberOfLines={1}>{record.memo}</Text></View></View>)}
      </View>
    </Page>
  );
}
