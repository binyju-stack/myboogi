import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { homeBreeders, homeListings, homePosts } from '@/data/homeScreenData';

import { Page } from './screen';

type IconName = ComponentProps<typeof Ionicons>['name'];

function Section({ title, action, children }: { title: string; action?: () => void; children: ReactNode }) {
  return (
    <View className="mt-10">
      <View className="mb-5 flex-row items-center justify-between px-5">
        <Text className="text-[20px] font-black tracking-tight text-ink">{title}</Text>
        {action ? <Pressable onPress={action}><Text className="text-xs font-bold text-berry">전체보기</Text></Pressable> : null}
      </View>
      {children}
    </View>
  );
}

function TurtleVisual({ color, size = 100, circle = false }: { color: string; size?: number; circle?: boolean }) {
  return (
    <View style={{ width: size, height: size, backgroundColor: color, borderRadius: circle ? size / 2 : 24 }} className="items-center justify-center overflow-hidden">
      <View className="absolute -right-6 -top-8 h-20 w-20 rounded-full bg-white/25" />
      <View className="absolute -bottom-8 -left-5 h-24 w-24 rounded-full bg-white/20" />
      <View style={{ width: size * 0.52, height: size * 0.38 }} className="items-center justify-center rounded-full bg-[#8FA887]">
        <View style={{ width: size * 0.3, height: size * 0.24 }} className="rotate-45 rounded-lg border border-white/60" />
      </View>
      <View style={{ width: size * 0.2, height: size * 0.2, right: size * 0.14 }} className="absolute rounded-full bg-[#8FA887]">
        <View className="absolute left-1.5 top-1.5 h-1 w-1 rounded-full bg-ink" />
      </View>
    </View>
  );
}

function ListingCard({ item }: { item: (typeof homeListings)[number] }) {
  return (
    <Pressable onPress={() => router.push(`/listing/${item.id}`)} className="mr-4 w-60">
      <TurtleVisual color={item.color} size={240} />
      <Text className="mt-4 text-[15px] font-bold text-ink">{item.species}</Text>
      <Text className="mt-1.5 text-lg font-black text-ink">{item.price.toLocaleString()}원</Text>
    </Pressable>
  );
}

function BreederProfile({ item }: { item: (typeof homeBreeders)[number] }) {
  return (
    <Pressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-5 w-36 items-center">
      <View className="rounded-full bg-white p-1.5 shadow-sm"><TurtleVisual color={item.color} size={92} circle /></View>
      <View className="mt-3 rounded-full bg-mint px-2.5 py-1"><Text className="text-[9px] font-black text-moss">✓ 인증 브리더</Text></View>
      <Text className="mt-2 text-center text-sm font-black text-ink">{item.name}</Text>
      <Text className="mt-1 text-[10px] text-muted">팔로워 {item.followers}</Text>
      <Text className="mt-2 text-center text-[10px] leading-4 text-muted" numberOfLines={2}>{item.intro}</Text>
      <View className="mt-3 rounded-full bg-ink px-4 py-2"><Text className="text-[10px] font-black text-white">상점 방문</Text></View>
    </Pressable>
  );
}

function PopularPost({ post }: { post: (typeof homePosts)[number] }) {
  return (
    <Pressable onPress={() => router.push('/community')} className="mb-3 rounded-[24px] bg-white px-5 py-5 shadow-sm">
      <Text className="text-[15px] font-black leading-6 text-ink">{post.title}</Text>
      <Text className="mt-2 text-xs text-muted">{post.author}</Text>
      <View className="mt-4 flex-row items-center">
        <Metric icon="heart-outline" value={post.likes} />
        <Metric icon="chatbubble-outline" value={post.comments} />
        <Metric icon="eye-outline" value={post.views} />
      </View>
    </Pressable>
  );
}

function Metric({ icon, value }: { icon: IconName; value: number }) {
  return <View className="mr-5 flex-row items-center"><Ionicons name={icon} size={14} color={colors.muted} /><Text className="ml-1.5 text-[10px] text-muted">{value}</Text></View>;
}

export function HomeScreen() {
  return (
    <Page>
      <View className="px-5 pb-2 pt-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-[27px] font-black tracking-tight text-ink">마이부기</Text>
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm"><Ionicons name="notifications-outline" size={21} color={colors.ink} /></Pressable>
        </View>
        <Pressable className="mt-7 flex-row items-center rounded-[22px] bg-[#F7F5F7] px-5 py-4"><Ionicons name="search" size={19} color={colors.muted} /><Text className="ml-3 text-sm text-muted">거북이, 브리더, 게시글 검색</Text></Pressable>
      </View>

      <Section title="오늘의 추천 분양" action={() => router.push('/marketplace')}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">{homeListings.map((item) => <ListingCard key={item.id} item={item} />)}</ScrollView>
      </Section>

      <Section title="인증 브리더">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-3">{homeBreeders.map((item) => <BreederProfile key={item.id} item={item} />)}</ScrollView>
      </Section>

      <Section title="오늘의 인기글" action={() => router.push('/community')}>
        <View className="px-5">{homePosts.map((post) => <PopularPost key={post.id} post={post} />)}</View>
      </Section>

      <View className="px-5 pb-5 pt-10">
        <Pressable onPress={() => router.push('/ai')} className="overflow-hidden rounded-[30px] bg-ink p-6 shadow-sm">
          <View className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/5" />
          <View className="h-12 w-12 items-center justify-center rounded-full bg-berry"><Ionicons name="sparkles" size={22} color="white" /></View>
          <Text className="mt-5 text-xl font-black text-white">부기 AI에게 물어보세요</Text>
          <Text className="mt-2 text-xs leading-5 text-white/60">사육 중 궁금한 점을 편하게 질문해보세요.</Text>
          <View className="mt-5 flex-row"><View className="mr-2 rounded-full bg-white/10 px-3 py-2"><Text className="text-[10px] font-bold text-white">눈이 부었어요</Text></View><View className="rounded-full bg-white/10 px-3 py-2"><Text className="text-[10px] font-bold text-white">합사 가능할까요?</Text></View></View>
        </Pressable>
      </View>

      <View className="px-5 pb-10 pt-2">
        <Pressable onPress={() => router.push('/growth')} className="rounded-[30px] bg-shell p-6">
          <View className="flex-row items-start justify-between"><View><Text className="text-xs font-black text-berry">부기의 성장 기록</Text><Text className="mt-2 text-xl font-black text-ink">오늘도 조금 더 자랐어요</Text></View><View className="h-12 w-12 items-center justify-center rounded-full bg-white"><Ionicons name="analytics-outline" size={22} color={colors.berry} /></View></View>
          <View className="mt-6 flex-row"><View className="mr-8"><Text className="text-[10px] text-muted">몸무게</Text><Text className="mt-1 text-lg font-black text-ink">238g</Text></View><View><Text className="text-[10px] text-muted">등갑 길이</Text><Text className="mt-1 text-lg font-black text-ink">10.8cm</Text></View></View>
          <View className="mt-6 h-20 flex-row items-end justify-between">{[28, 36, 44, 52, 61, 72].map((height) => <View key={height} style={{ height }} className="w-8 rounded-full bg-petal" />)}</View>
        </Pressable>
      </View>
    </Page>
  );
}
