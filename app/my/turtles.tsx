import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Text as SvgText } from 'react-native-svg';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breedingClutches } from '@/mockData/breeding';
import { managedTurtles } from '@/mockData/turtles';
import type { ManagedTurtle } from '@/types/turtle';

function showRegisterReady() {
  Alert.alert('거북이 등록 기능은 준비중입니다.');
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeInView delay={60}>
      <View className="mx-5 mt-5 rounded-[24px] border border-line bg-white p-5 shadow-sm">
        <Text className={title === '성장 기록' ? 'text-[24px] font-bold leading-8 text-[#111827]' : 'text-[18px] font-bold leading-6 text-[#111827]'}>{title}</Text>
        <View className="mt-4">{children}</View>
      </View>
    </FadeInView>
  );
}

function OwnedTurtleCard({ turtle }: { turtle: ManagedTurtle }) {
  return (
    <View className="flex-row items-center">
      <Image source={{ uri: turtle.profileImage }} className="h-20 w-20 rounded-[20px] bg-shell" resizeMode="cover" />
      <View className="ml-4 flex-1" style={{ minWidth: 0 }}>
        <Text className="text-[20px] font-bold leading-7 text-[#111827]" numberOfLines={1}>{turtle.name}</Text>
        <Text className="mt-1 text-[14px] font-semibold leading-5 text-[#94A3B8]" numberOfLines={1}>{turtle.species}</Text>
        <Text className="mt-1 text-[13px] font-medium leading-5 text-[#94A3B8]" numberOfLines={1}>{turtle.gender} · {turtle.age}</Text>
      </View>
      <View className="h-10 w-10 items-center justify-center rounded-full bg-blush">
        <Ionicons name="paw-outline" size={19} color={colors.berry} />
      </View>
    </View>
  );
}

function GrowthMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-[18px] bg-[#F8F9FA] px-4 py-4">
      <Text className="text-[14px] font-medium leading-5 text-[#94A3B8]" numberOfLines={1}>{label}</Text>
      <Text className="mt-2 text-[18px] font-bold leading-6 text-[#111827]" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78}>{value}</Text>
    </View>
  );
}

function BreedingMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-[16px] bg-white px-3 py-3">
      <Text className="text-[20px] font-bold leading-7 text-[#111827]" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.72}>{value}</Text>
      <Text className="mt-0.5 text-[12px] font-medium leading-4 text-[#94A3B8]" numberOfLines={1}>{label}</Text>
    </View>
  );
}

const weightRecords = [
  { date: '5/01', value: 390 },
  { date: '5/15', value: 405 },
  { date: '6/01', value: 415 },
  { date: '6/10', value: 420 },
];

const shellRecords = [
  { date: '5/01', value: 11.8 },
  { date: '5/15', value: 12.1 },
  { date: '6/01', value: 12.5 },
  { date: '6/10', value: 12.8 },
];

function GrowthLineChart({ title, records, unit }: { title: string; records: { date: string; value: number }[]; unit: string }) {
  const width = 320;
  const height = 194;
  const chartLeft = 42;
  const chartRight = 16;
  const chartTop = 38;
  const chartBottom = 42;
  const plotWidth = width - chartLeft - chartRight;
  const plotHeight = height - chartTop - chartBottom;
  const max = Math.max(...records.map((record) => record.value));
  const min = Math.min(...records.map((record) => record.value));
  const range = Math.max(max - min, unit === 'g' ? 10 : 0.5);
  const yMin = min - range * 0.18;
  const yMax = max + range * 0.18;
  const yRange = yMax - yMin;
  const points = records.map((record, index) => {
    const x = chartLeft + (plotWidth / Math.max(records.length - 1, 1)) * index;
    const y = chartTop + (1 - (record.value - yMin) / yRange) * plotHeight;
    return { ...record, x, y };
  });
  const gridValues = [max, (max + min) / 2, min];
  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <View className="mt-4 overflow-hidden rounded-[20px] bg-[#FFF7F3] px-4 py-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-[18px] font-bold leading-6 text-[#111827]">{title}</Text>
        <Text className="text-[13px] font-semibold leading-5 text-[#FF2E6F]">단위 {unit}</Text>
      </View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {gridValues.map((value) => {
          const y = chartTop + (1 - (value - yMin) / yRange) * plotHeight;
          return (
            <Line
              key={`${title}-grid-${value}`}
              x1={chartLeft}
              x2={width - chartRight}
              y1={y}
              y2={y}
              stroke="#F1DDE6"
              strokeWidth={1}
              strokeDasharray="4 5"
            />
          );
        })}
        <Line x1={chartLeft} x2={chartLeft} y1={chartTop - 6} y2={height - chartBottom} stroke="#E9D5DD" strokeWidth={1} />
        <Line x1={chartLeft} x2={width - chartRight} y1={height - chartBottom} y2={height - chartBottom} stroke="#E9D5DD" strokeWidth={1} />
        {gridValues.map((value) => {
          const y = chartTop + (1 - (value - yMin) / yRange) * plotHeight;
          return (
            <SvgText key={`${title}-axis-${value}`} x={8} y={y + 4} fill="#94A3B8" fontSize={11} fontWeight="400">
              {Math.round(value * 10) / 10}
            </SvgText>
          );
        })}
        <Polyline points={polylinePoints} fill="none" stroke="#FF2E6F" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <Circle key={`${title}-point-${point.date}`} cx={point.x} cy={point.y} r={5} fill="#FFFFFF" stroke="#FF2E6F" strokeWidth={3} />
        ))}
        {points.map((point) => (
          <SvgText key={`${title}-value-${point.date}`} x={point.x} y={point.y - 14} fill="#94A3B8" fontSize={12} fontWeight="500" textAnchor="middle">
            {point.value}{unit}
          </SvgText>
        ))}
        {points.map((point) => (
          <SvgText key={`${title}-date-${point.date}`} x={point.x} y={height - 14} fill="#94A3B8" fontSize={11} fontWeight="500" textAnchor="middle">
            {point.date}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

function daysUntil(dateText: string) {
  const target = new Date(`${dateText.replace(/\./g, '-')}T00:00:00+09:00`);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86400000));
}

function AlbumStrip({ turtles }: { turtles: ManagedTurtle[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 4 }}>
      {turtles.map((turtle, index) => (
        <View key={turtle.id} className={`w-28 ${index ? 'ml-3' : ''}`}>
          <Image source={{ uri: turtle.profileImage }} className="h-28 w-28 rounded-[18px] bg-shell" resizeMode="cover" />
          <Text className="mt-2 text-[12px] font-bold leading-4 text-[#111827]" numberOfLines={1}>{turtle.name}</Text>
          <Text className="mt-0.5 text-[10px] font-medium leading-4 text-[#94A3B8]" numberOfLines={1}>{turtle.lastRecordDate}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function BreedingEntry() {
  const activeClutches = breedingClutches.filter((clutch) => clutch.status === 'incubating');
  const totalEggs = breedingClutches.reduce((total, clutch) => total + clutch.eggCount, 0);
  const nextHatchDate = activeClutches.map((clutch) => clutch.expectedHatchDate).sort()[0];
  const hatchDday = nextHatchDate ? `D-${daysUntil(nextHatchDate)}` : '-';

  return (
    <AnimatedPressable onPress={() => router.push('/my/turtles/breeding' as never)} className="rounded-[20px] bg-[#FFF7F3] p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[16px] font-bold leading-6 text-[#111827]">산란 관리</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#94A3B8]">캘린더와 통합 기록으로 클러치를 관리해요</Text>
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-white">
          <Ionicons name="egg-outline" size={22} color={colors.berry} />
        </View>
      </View>
      <View className="mt-4 flex-row gap-2">
        <BreedingMetric label="인큐베이팅" value={`${activeClutches.length}건`} />
        <BreedingMetric label="총 알" value={`${totalEggs}개`} />
        <BreedingMetric label="부화 예정" value={hatchDday} />
      </View>
    </AnimatedPressable>
  );
}

function EmptyTurtles() {
  return (
    <View className="mx-5 mt-8 items-center rounded-[28px] border border-line bg-white px-5 py-10 shadow-sm">
      <View className="h-16 w-16 items-center justify-center rounded-[22px] bg-blush">
        <Ionicons name="paw-outline" size={28} color={colors.berry} />
      </View>
      <Text className="mt-5 text-center text-[18px] font-bold text-[#111827]">아직 등록한 거북이가 없어요.</Text>
      <Text className="mt-2 text-center text-[13px] font-medium leading-5 text-[#94A3B8]">내 거북이를 등록하고 성장기록을 남겨보세요.</Text>
      <AnimatedPressable onPress={showRegisterReady} className="mt-6 rounded-full bg-[#FF2E6F] px-5 py-3">
        <Text className="text-[13px] font-bold text-white">거북이 등록하기</Text>
      </AnimatedPressable>
    </View>
  );
}

export default function MyTurtlesScreen() {
  const turtles = managedTurtles;
  const mainTurtle = turtles[0];

  return (
    <Page>
      <TopBar title="내 거북이 관리" right="add" onRightPress={showRegisterReady} />

      {mainTurtle ? (
        <>
          <Section title="보유 개체">
            <OwnedTurtleCard turtle={mainTurtle} />
          </Section>

          <Section title="성장 기록">
            <View className="flex-row gap-2">
              <GrowthMetric label="최근 몸무게" value={`${mainTurtle.weight}g`} />
              <GrowthMetric label="최근 등갑 길이" value={`${mainTurtle.shellLength}cm`} />
            </View>
            <View className="mt-2 rounded-[18px] bg-[#F8F9FA] px-4 py-4">
              <Text className="text-[14px] font-medium leading-5 text-[#94A3B8]">최근 측정일</Text>
              <Text className="mt-2 text-[16px] font-semibold leading-6 text-[#111827]" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78}>{mainTurtle.lastRecordDate}</Text>
            </View>
            <GrowthLineChart title="몸무게 변화" records={weightRecords} unit="g" />
            <GrowthLineChart title="등갑 길이 변화" records={shellRecords} unit="cm" />
          </Section>

          <Section title="산란 관리">
            <BreedingEntry />
          </Section>

          <Section title="성장 앨범">
            <AlbumStrip turtles={turtles} />
          </Section>
        </>
      ) : (
        <EmptyTurtles />
      )}
    </Page>
  );
}
