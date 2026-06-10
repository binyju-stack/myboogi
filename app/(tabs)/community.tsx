import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BrandHeader, Chip } from '@/components/common';
import { PostCard } from '@/components/PostCard';
import { Page } from '@/components/screen';
import { categories, posts } from '@/data/mockData';

export default function CommunityScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <View className="px-4 pb-2"><Text className="text-xs text-muted">거북이 집사들과 편하게 이야기해보세요</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 py-3">{categories.map(([label], index) => <Pressable key={label} onPress={() => label === '질병상담' ? router.push('/disease') : undefined}><Chip label={label} selected={index === 0} /></Pressable>)}</ScrollView>
      <View className="mx-5 mt-3">{posts.map((post) => <PostCard key={post.id} item={post} />)}</View>
      <Pressable onPress={() => router.push('/disease')} className="absolute bottom-24 right-5 h-14 w-14 items-center justify-center rounded-full bg-berry shadow-lg"><Ionicons name="create" size={24} color="white" /></Pressable>
    </Page>
  );
}
