import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BreederCard } from '@/components/BreederCard';
import { BrandHeader, HorizontalRow, SectionHeader, TurtleMark } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { PostCard } from '@/components/PostCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breeders, categories, listings, posts } from '@/data/mockData';

export default function HomeScreen() {
  return (
    <Page>
      <BrandHeader />
      <View className="overflow-hidden bg-berry px-5 pb-7">
        <View className="absolute -right-12 top-0 h-36 w-36 rounded-full bg-white/10" />
        <View className="rounded-2xl bg-[#D72F68] px-4 py-4">
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-[11px] font-black text-white/75">마이부기 한눈에 보는 거북이 생활</Text>
              <Text className="mt-1.5 text-lg font-black leading-6 text-white">건강한 거북이 생활과{'\n'}좋은 인연을 만나보세요</Text>
            </View>
            <TurtleMark size={92} />
          </View>
        </View>
      </View>

      <View className="border-b-8 border-[#F7F5F7] bg-white py-4">
        <HorizontalRow>
          {[['오늘의 분양', 'heart-outline', '#FFE9F0'], ['인증 브리더', 'shield-checkmark-outline', '#E9F7EF'], ['성장 기록', 'analytics-outline', '#EAF5FF'], ['AI 상담', 'sparkles-outline', '#FFF4E4']].map(([label, icon, bg]) => (
            <Pressable key={label} onPress={() => label === '성장 기록' ? router.push('/growth') : label === 'AI 상담' ? router.push('/ai') : router.push('/marketplace')} className="mr-3 w-24 items-center">
              <View style={{ backgroundColor: bg }} className="h-14 w-14 items-center justify-center rounded-2xl"><Ionicons name={icon as never} size={24} color={colors.berry} /></View>
              <Text className="mt-2 text-xs font-bold text-ink">{label}</Text>
            </Pressable>
          ))}
        </HorizontalRow>
      </View>

      <SectionHeader title="오늘의 분양" onPress={() => router.push('/marketplace')} />
      <HorizontalRow>{listings.slice(0, 4).map((item) => <ListingCard key={item.id} item={item} wide />)}</HorizontalRow>
      <SectionHeader title="인기 분양" />
      <HorizontalRow>{listings.slice(1).map((item) => <ListingCard key={item.id} item={item} wide />)}</HorizontalRow>
      <SectionHeader title="신규 등록" />
      <HorizontalRow>{[...listings].reverse().map((item) => <ListingCard key={item.id} item={item} wide />)}</HorizontalRow>

      <View className="mt-6 border-y-8 border-[#F7F5F7] bg-white pb-5">
        <SectionHeader title="인증 브리더 추천" />
        <HorizontalRow>{breeders.map((item) => <BreederCard key={item.id} item={item} />)}</HorizontalRow>
      </View>

      <SectionHeader title="마이부기 커뮤니티" action="" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4">
        {categories.map(([label, icon]) => <Pressable key={label} onPress={() => router.push('/community')} className="mr-3 w-[68px] items-center"><View className="h-12 w-12 items-center justify-center rounded-2xl bg-shell"><Ionicons name={icon} size={21} color={colors.berry} /></View><Text className="mt-2 text-[11px] font-bold text-ink">{label}</Text></Pressable>)}
      </ScrollView>

      <View className="mt-5 border-t-8 border-[#F7F5F7]">
        <SectionHeader title="실시간 인기 게시글" onPress={() => router.push('/community')} />
        {posts.slice(0, 3).map((post) => <PostCard key={post.id} item={post} compact />)}
      </View>
    </Page>
  );
}
