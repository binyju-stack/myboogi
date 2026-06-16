import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { ListingCard } from '@/components/ListingCard';
import { PostCard } from '@/components/PostCard';
import { colors } from '@/constants/theme';
import { posts } from '@/data/communityData';
import { breeders, listings } from '@/data/mockData';
import { popularKeywords, recentKeywords, suggestedKeywords } from '@/data/searchData';
import type { Breeder } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];
type SearchTab = 'all' | 'listings' | 'breeders' | 'community';

const tabs: { key: SearchTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'listings', label: '분양' },
  { key: 'breeders', label: '브리더' },
  { key: 'community', label: '커뮤니티' },
];

function KeywordGroup({ title, items, icon }: { title: string; items: string[]; icon: IconName }) {
  return (
    <View className="mt-6">
      <View className="mb-3 flex-row items-center">
        <Ionicons name={icon} size={15} color={colors.berry} />
        <Text className="ml-1.5 text-[14px] font-black text-ink">{title}</Text>
      </View>
      <View className="flex-row flex-wrap">
        {items.map((item) => (
          <AnimatedPressable key={item} className="mb-2 mr-2 rounded-full bg-white px-3.5 py-2.5 shadow-sm">
            <Text className="text-[11px] font-bold text-muted">{item}</Text>
          </AnimatedPressable>
        ))}
      </View>
    </View>
  );
}

function BreederResultCard({ breeder, index = 0 }: { breeder: Breeder; index?: number }) {
  return (
    <FadeInView delay={index * 45}>
      <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mb-3 flex-row rounded-[22px] border border-line bg-white p-4 shadow-sm">
        <Image source={{ uri: breeder.logo ?? breeder.avatar }} className="h-16 w-16 rounded-[20px] bg-shell" resizeMode="cover" />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text className="flex-1 text-[14px] font-black text-ink" numberOfLines={1}>{breeder.name}</Text>
            <Text className="rounded-full bg-blush px-2 py-1 text-[9px] font-black text-berry">인증</Text>
          </View>
          <Text className="mt-1.5 text-[10px] leading-4 text-muted" numberOfLines={2}>{breeder.shortBio ?? breeder.intro}</Text>
          <View className="mt-2 flex-row">
            <Text className="mr-3 text-[9px] font-bold text-muted">팔로워 {breeder.followers.toLocaleString()}</Text>
            <Text className="text-[9px] font-bold text-muted">후기 {breeder.reviews}</Text>
          </View>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const showListings = activeTab === 'all' || activeTab === 'listings';
  const showBreeders = activeTab === 'all' || activeTab === 'breeders';
  const showCommunity = activeTab === 'all' || activeTab === 'community';

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <View className="flex-row items-center bg-white px-4 py-3.5">
        <AnimatedPressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center">
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </AnimatedPressable>
        <View className="ml-1 flex-1 flex-row items-center rounded-[18px] bg-soft px-4 py-3">
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            autoFocus
            placeholder="품종, 브리더, 커뮤니티 검색"
            placeholderTextColor={colors.subtle}
            className="ml-2 flex-1 text-[13px] text-ink"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-28">
        <View className="px-5">
          <KeywordGroup title="최근 검색어" items={recentKeywords} icon="time-outline" />
          <KeywordGroup title="인기 검색어" items={popularKeywords} icon="flame-outline" />
          <KeywordGroup title="추천 검색어" items={suggestedKeywords} icon="sparkles-outline" />
        </View>

        <View className="mt-6 border-y border-line bg-white">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-3">
            {tabs.map((tab) => (
              <AnimatedPressable key={tab.key} onPress={() => setActiveTab(tab.key)} className={`mr-2 rounded-full px-4 py-2.5 ${activeTab === tab.key ? 'bg-ink' : 'bg-soft'}`}>
                <Text className={`text-[12px] font-black ${activeTab === tab.key ? 'text-white' : 'text-muted'}`}>{tab.label}</Text>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </View>

        {showListings ? (
          <View className="px-5 pt-6">
            <Text className="mb-4 text-[18px] font-black text-ink">분양 결과</Text>
            {listings.slice(0, activeTab === 'all' ? 2 : listings.length).map((item, index) => <ListingCard key={item.id} item={item} list index={index} />)}
          </View>
        ) : null}

        {showBreeders ? (
          <View className="px-5 pt-6">
            <Text className="mb-4 text-[18px] font-black text-ink">브리더 결과</Text>
            {breeders.slice(0, activeTab === 'all' ? 2 : breeders.length).map((breeder, index) => <BreederResultCard key={breeder.id} breeder={breeder} index={index} />)}
          </View>
        ) : null}

        {showCommunity ? (
          <View className="px-5 pt-6">
            <Text className="mb-4 text-[18px] font-black text-ink">커뮤니티 결과</Text>
            {posts.slice(0, activeTab === 'all' ? 2 : posts.length).map((post, index) => <PostCard key={post.id} item={post} compact index={index} />)}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
