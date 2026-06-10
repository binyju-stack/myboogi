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
      <View className="px-5 pt-4">
        <View className="flex-row items-center rounded-[24px] border border-line bg-white p-4 shadow-sm"><Image source={{ uri: turtle.image }} className="h-24 w-24 rounded-[20px] bg-shell" /><View className="ml-4 flex-1"><Text className="text-[10px] font-black text-berry">MY TURTLE</Text><Text className="mt-1 text-[22px] font-black text-ink">{turtle.name}</Text><Text className="mt-1 text-[11px] text-muted">{turtle.species} · {turtle.sex}</Text><Text className="mt-3 text-[10px] font-bold text-berry">함께한 지 262일째</Text></View></View>

        <View className="mt-4 flex-row gap-3">{[['238g', '현재 몸무게', 'scale-outline'], ['10.8cm', '등갑 길이', 'resize-outline']].map(([value, label, icon]) => <View key={label} className="flex-1 rounded-[22px] border border-line bg-white p-4 shadow-sm"><View className="h-10 w-10 items-center justify-center rounded-[14px] bg-blush"><Ionicons name={icon as never} size={19} color={colors.berry} /></View><Text className="mt-4 text-[20px] font-black text-ink">{value}</Text><Text className="mt-1 text-[10px] text-muted">{label}</Text></View>)}</View>

        <View className="mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm"><View className="flex-row items-center justify-between"><View><Text className="text-[10px] font-black text-berry">GROWTH CHART</Text><Text className="mt-1 text-[18px] font-black text-ink">꾸준히 잘 자라고 있어요</Text></View><Text className="text-[10px] font-bold text-muted">최근 4개월</Text></View><View className="mt-6 h-36 flex-row items-end justify-around">{[45, 70, 96, 125].map((height, index) => <View key={height} className="items-center"><View style={{ height }} className="w-9 rounded-t-xl bg-petal" /><Text className="mt-3 text-[9px] text-muted">{['3월', '4월', '5월', '6월'][index]}</Text></View>)}</View></View>

        <Text className="mb-4 mt-8 text-[19px] font-black text-ink">최근 기록</Text>
        {growthRecords.map((record) => <View key={record.id} className="mb-3 flex-row rounded-[22px] border border-line bg-white p-3 shadow-sm"><Image source={{ uri: record.image }} className="h-20 w-20 rounded-[17px] bg-shell" /><View className="ml-3 flex-1 py-1"><Text className="text-[9px] font-black text-berry">{record.date}</Text><Text className="mt-1 text-[13px] font-black text-ink">{record.weight}g · 등갑 {record.shellLength}cm</Text><Text className="mt-2 text-[11px] leading-5 text-muted" numberOfLines={1}>{record.memo}</Text></View></View>)}
      </View>
    </Page>
  );
}
