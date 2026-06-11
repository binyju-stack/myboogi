import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BrandHeader, Chip } from '@/components/common';
import { AnimatedPressable } from '@/components/AnimatedPressable';
import { PostCard } from '@/components/PostCard';
import { Page } from '@/components/screen';
import { categories, posts } from '@/data/mockData';

export default function CommunityScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <View className="bg-white px-5 pb-4"><Text className="text-[22px] font-black tracking-[-0.7px] text-ink">거북이 집사들의 이야기</Text><Text className="mt-2 text-[12px] text-muted">사육 정보부터 오늘의 일상까지 나눠보세요.</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-4">{categories.map(([label], index) => <Pressable key={label} onPress={() => label === '질병상담' ? router.push('/disease') : undefined}><Chip label={label} selected={index === 0} /></Pressable>)}</ScrollView>
      <View className="mb-4 flex-row items-end justify-between px-5"><View><Text className="text-[10px] font-black text-berry">COMMUNITY FEED</Text><Text className="mt-1 text-[19px] font-black text-ink">새로운 이야기</Text></View><Text className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-muted">최신순 ▾</Text></View>
      <View className="mx-5">{posts.map((post, index) => <PostCard key={post.id} item={post} index={index} />)}</View>
      <View className="absolute bottom-24 right-5"><AnimatedPressable onPress={() => router.push('/community/create')} className="h-14 w-14 items-center justify-center rounded-full bg-berry shadow-lg"><Ionicons name="create" size={23} color="white" /></AnimatedPressable></View>
    </Page>
  );
}
