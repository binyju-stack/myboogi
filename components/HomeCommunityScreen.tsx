import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { breeders, listings, posts, turtles } from '@/data/mockData';

import { BreederCard } from './BreederCard';
import { HorizontalRow, SectionHeader } from './common';
import { ListingCard } from './ListingCard';
import { PostCard } from './PostCard';
import { Page } from './screen';

export function HomeCommunityScreen() {
  return (
    <Page>
      <View className="px-4 pb-3 pt-3">
        <View className="flex-row items-center justify-between">
          <View><Text className="text-[22px] font-black tracking-tight text-ink">마이부기</Text><Text className="mt-1 text-xs text-muted">오늘도 부기와 행복한 하루 보내세요</Text></View>
          <Pressable className="h-11 w-11 items-center justify-center rounded-full bg-blush"><Ionicons name="notifications-outline" size={21} color="#F0447D" /></Pressable>
        </View>
        <Pressable className="mt-5 flex-row items-center rounded-2xl bg-[#F7F5F7] px-4 py-3.5"><Ionicons name="search" size={18} color="#8F8A91" /><Text className="ml-2 text-sm text-muted">분양, 브리더, 커뮤니티 검색</Text></Pressable>
      </View>

      <SectionHeader title="오늘의 추천 분양" onPress={() => router.push('/marketplace')} />
      <HorizontalRow>{listings.slice(0, 4).map((item) => <ListingCard key={item.id} item={item} wide />)}</HorizontalRow>

      <View className="mt-7 bg-[#FAF9FA] pb-6 pt-1">
        <SectionHeader title="믿을 수 있는 인증 브리더" />
        <HorizontalRow>{breeders.map((item) => <BreederCard key={item.id} item={item} />)}</HorizontalRow>
      </View>

      <View className="pb-2">
        <SectionHeader title="인기 커뮤니티 글" onPress={() => router.push('/community')} />
        <View className="mx-4 overflow-hidden rounded-2xl border border-line">
          {posts.slice(0, 3).map((post) => <PostCard key={post.id} item={post} compact />)}
        </View>
      </View>

      <View className="px-4 pb-6 pt-5">
        <Pressable onPress={() => router.push('/growth')} className="mb-3 flex-row items-center rounded-2xl bg-mint p-4">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white"><Ionicons name="analytics-outline" size={22} color="#65A986" /></View>
          <View className="ml-3 flex-1"><Text className="text-sm font-black text-ink">{turtles[0].name}의 성장 기록</Text><Text className="mt-1 text-xs text-muted">몸무게와 등갑 길이를 기록해보세요</Text></View>
          <Ionicons name="chevron-forward" size={18} color="#65A986" />
        </Pressable>
        <Pressable onPress={() => router.push('/ai')} className="flex-row items-center rounded-2xl bg-shell p-4">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white"><Ionicons name="sparkles-outline" size={22} color="#F0447D" /></View>
          <View className="ml-3 flex-1"><Text className="text-sm font-black text-ink">부기 AI 상담</Text><Text className="mt-1 text-xs text-muted">사육 고민을 편하게 물어보세요</Text></View>
          <Ionicons name="chevron-forward" size={18} color="#F0447D" />
        </Pressable>
      </View>
    </Page>
  );
}
