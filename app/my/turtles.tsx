import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { managedTurtles } from '@/mockData/turtles';
import type { ManagedTurtle } from '@/types/turtle';

function showRegisterReady() {
  Alert.alert('거북이 등록 기능은 준비중입니다.');
}

function TurtleCard({ turtle, index }: { turtle: ManagedTurtle; index: number }) {
  return (
    <FadeInView delay={index * 50}>
      <View className="mb-4 rounded-[24px] border border-line bg-white p-4 shadow-sm">
        <View className="flex-row">
          <Image source={{ uri: turtle.profileImage }} className="h-[86px] w-[86px] rounded-[22px] bg-shell" resizeMode="cover" />
          <View className="ml-4 flex-1" style={{ minWidth: 0 }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-[20px] font-black leading-7 text-[#111827]" numberOfLines={1}>{turtle.name}</Text>
                <Text className="mt-1 text-[13px] font-semibold leading-5 text-[#666666]" numberOfLines={1}>
                  {turtle.species} · {turtle.gender} · {turtle.age}
                </Text>
              </View>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-blush">
                <Ionicons name="paw-outline" size={18} color={colors.berry} />
              </View>
            </View>

            <View className="mt-3 flex-row">
              <View className="mr-2 rounded-[14px] bg-[#F7F8FA] px-3 py-2">
                <Text className="text-[10px] font-semibold text-[#9CA3AF]">몸무게</Text>
                <Text className="mt-0.5 text-[14px] font-black text-[#222222]">{turtle.weight}g</Text>
              </View>
              <View className="rounded-[14px] bg-[#F7F8FA] px-3 py-2">
                <Text className="text-[10px] font-semibold text-[#9CA3AF]">등갑</Text>
                <Text className="mt-0.5 text-[14px] font-black text-[#222222]">{turtle.shellLength}cm</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between border-t border-line pt-4">
          <Text className="text-[12px] font-semibold leading-4 text-[#9CA3AF]">최근 기록 {turtle.lastRecordDate}</Text>
          <AnimatedPressable onPress={() => router.push(`/growth/${turtle.id}` as never)} className="flex-row items-center rounded-full bg-[#FFF0F6] px-3.5 py-2">
            <Text className="text-[12px] font-bold leading-4 text-[#FF4F8B]">성장기록 보기</Text>
            <Ionicons name="chevron-forward" size={14} color="#FF4F8B" />
          </AnimatedPressable>
        </View>
      </View>
    </FadeInView>
  );
}

function EmptyTurtles() {
  return (
    <View className="mx-5 mt-8 items-center rounded-[28px] border border-line bg-white px-5 py-10 shadow-sm">
      <View className="h-16 w-16 items-center justify-center rounded-[22px] bg-blush">
        <Ionicons name="paw-outline" size={28} color={colors.berry} />
      </View>
      <Text className="mt-5 text-center text-[18px] font-black text-[#111827]">아직 등록한 거북이가 없어요.</Text>
      <Text className="mt-2 text-center text-[13px] font-medium leading-5 text-[#9CA3AF]">
        내 거북이를 등록하고 성장기록을 남겨보세요.
      </Text>
      <AnimatedPressable onPress={showRegisterReady} className="mt-6 rounded-full bg-[#FF4F8B] px-5 py-3">
        <Text className="text-[13px] font-bold text-white">거북이 등록하기</Text>
      </AnimatedPressable>
    </View>
  );
}

export default function MyTurtlesScreen() {
  const turtles = managedTurtles;

  return (
    <Page>
      <TopBar title="내 거북이 관리" right="add" onRightPress={showRegisterReady} />

      <View className="px-5 pt-5">
        <FadeInView>
          <View className="mb-5 rounded-[24px] bg-[#FFF0F6] px-5 py-4">
            <Text className="text-[11px] font-black leading-4 text-[#FF4F8B]">MY TURTLES</Text>
            <Text className="mt-1 text-[20px] font-black leading-7 text-[#222222]">등록한 거북이와 성장기록</Text>
            <Text className="mt-2 text-[13px] font-medium leading-5 text-[#666666]">몸무게와 등갑 길이를 꾸준히 남기고 변화를 확인해요.</Text>
          </View>
        </FadeInView>

        {turtles.length ? turtles.map((turtle, index) => <TurtleCard key={turtle.id} turtle={turtle} index={index} />) : null}
      </View>

      {!turtles.length ? <EmptyTurtles /> : null}
    </Page>
  );
}
