import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

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
        <Text className="text-[18px] font-black leading-6 text-[#111827]">{title}</Text>
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
        <Text className="text-[20px] font-black leading-7 text-[#111827]" numberOfLines={1}>{turtle.name}</Text>
        <Text className="mt-1 text-[14px] font-semibold leading-5 text-[#666666]" numberOfLines={1}>{turtle.species}</Text>
        <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]" numberOfLines={1}>{turtle.gender} · {turtle.age}</Text>
      </View>
      <View className="h-10 w-10 items-center justify-center rounded-full bg-blush">
        <Ionicons name="paw-outline" size={19} color={colors.berry} />
      </View>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-[16px] bg-[#F7F8FA] px-3 py-3">
      <Text className="text-[11px] font-semibold leading-4 text-[#8A8F98]">{label}</Text>
      <Text className="mt-1 text-[17px] font-black leading-6 text-[#111827]" numberOfLines={1}>{value}</Text>
    </View>
  );
}

function GrowthMiniLine() {
  return (
    <View className="mt-4 h-16 justify-end rounded-[16px] bg-[#FFF8FB] px-4 pb-3">
      <View className="flex-row items-end justify-between">
        {[24, 30, 38, 44].map((height, index) => (
          <View key={height} className="w-10 rounded-t-[10px] bg-[#FFB6CD]" style={{ height, opacity: 0.55 + index * 0.12 }} />
        ))}
      </View>
    </View>
  );
}

function AlbumStrip({ turtles }: { turtles: ManagedTurtle[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 4 }}>
      {turtles.map((turtle, index) => (
        <View key={turtle.id} className={`w-28 ${index ? 'ml-3' : ''}`}>
          <Image source={{ uri: turtle.profileImage }} className="h-28 w-28 rounded-[18px] bg-shell" resizeMode="cover" />
          <Text className="mt-2 text-[12px] font-bold leading-4 text-[#111827]" numberOfLines={1}>{turtle.name}</Text>
          <Text className="mt-0.5 text-[10px] font-medium leading-4 text-[#8A8F98]" numberOfLines={1}>{turtle.lastRecordDate}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function BreedingEntry() {
  const activeClutches = breedingClutches.filter((clutch) => clutch.status === 'incubating');
  const totalEggs = breedingClutches.reduce((total, clutch) => total + clutch.eggCount, 0);
  const nextHatchDate = activeClutches.map((clutch) => clutch.expectedHatchDate).sort()[0] ?? '-';

  return (
    <AnimatedPressable onPress={() => router.push('/my/turtles/breeding' as never)} className="rounded-[20px] bg-[#FFF8FB] p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[16px] font-black leading-6 text-[#111827]">산란 관리</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]">캘린더와 통합 기록으로 클러치를 관리해요</Text>
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-white">
          <Ionicons name="egg-outline" size={22} color={colors.berry} />
        </View>
      </View>
      <View className="mt-4 flex-row gap-2">
        <Metric label="인큐베이팅" value={`${activeClutches.length}건`} />
        <Metric label="총 알" value={`${totalEggs}개`} />
        <Metric label="부화 예정" value={nextHatchDate} />
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
      <Text className="mt-5 text-center text-[18px] font-black text-[#111827]">아직 등록한 거북이가 없어요.</Text>
      <Text className="mt-2 text-center text-[13px] font-medium leading-5 text-[#9CA3AF]">내 거북이를 등록하고 성장기록을 남겨보세요.</Text>
      <AnimatedPressable onPress={showRegisterReady} className="mt-6 rounded-full bg-[#FF4F8B] px-5 py-3">
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
              <Metric label="최근 몸무게" value={`${mainTurtle.weight}g`} />
              <Metric label="최근 등갑 길이" value={`${mainTurtle.shellLength}cm`} />
            </View>
            <View className="mt-2 rounded-[16px] bg-[#F7F8FA] px-3 py-3">
              <Text className="text-[11px] font-semibold leading-4 text-[#8A8F98]">최근 측정일</Text>
              <Text className="mt-1 text-[17px] font-black leading-6 text-[#111827]">{mainTurtle.lastRecordDate}</Text>
            </View>
            <GrowthMiniLine />
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
