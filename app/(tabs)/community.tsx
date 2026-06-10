import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BrandHeader, Chip } from '@/components/common';
import { PostCard } from '@/components/PostCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { categories, posts } from '@/data/mockData';

export default function CommunityScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 py-3">{categories.map(([label], index) => <Pressable key={label} onPress={() => label === '질병상담' ? router.push('/disease') : undefined}><Chip label={label} selected={index === 0} /></Pressable>)}</ScrollView>
      <View className="border-y border-line bg-blush px-4 py-3"><Text className="text-xs font-bold text-berry">지금 가장 많이 이야기하는 주제</Text><Text className="mt-1 text-sm font-black text-ink">우리 거북이 여름철 건강 관리법</Text></View>
      {posts.map((post) => <PostCard key={post.id} item={post} />)}
      <Pressable onPress={() => router.push('/disease')} className="absolute bottom-24 right-5 h-14 w-14 items-center justify-center rounded-full bg-berry shadow-lg"><Ionicons name="create" size={24} color="white" /></Pressable>
    </Page>
  );
}
