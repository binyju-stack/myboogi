import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { posts } from '@/data/communityData';

type Post = (typeof posts)[number];

const tabs = ['전체', '사육상담', '질병상담', '먹이공유', '성장기록', '자유글'] as const;
const myPosts = posts.slice(0, 5);

function CategoryTab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable onPress={onPress} className={`mr-2 rounded-full border px-4 py-2.5 ${active ? 'border-[#FF4F8B] bg-[#FFF0F6]' : 'border-[#EEF0F3] bg-white'}`}>
      <Text className={`text-[13px] font-semibold leading-[18px] ${active ? 'text-[#FF4F8B]' : 'text-[#666666]'}`}>{label}</Text>
    </AnimatedPressable>
  );
}

function Meta({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View className="mr-4 flex-row items-center">
      <Ionicons name={icon} size={14} color="#9CA3AF" />
      <Text className="ml-1 text-[12px] font-normal leading-[18px] text-[#9CA3AF]">{label}</Text>
    </View>
  );
}

function MyPostCard({ post, index }: { post: Post; index: number }) {
  const commentCount = post.commentsCount ?? post.comments;
  const thumbnail = post.images?.[0] ?? post.image;

  return (
    <FadeInView delay={index * 45}>
      <AnimatedPressable onPress={() => router.push(`/community/${post.id}` as never)} className="border-b border-[#ECECEC] bg-white px-5 py-4">
        <View className="flex-row">
          <View className="flex-1 pr-3" style={{ minWidth: 0 }}>
            <View className="flex-row items-center">
              <Image source={{ uri: post.authorAvatar ?? post.avatar }} className="h-7 w-7 rounded-full bg-[#F2F4F6]" resizeMode="cover" />
              <View className="ml-2 flex-1">
                <Text className="text-[13px] font-bold leading-[18px] text-[#222222]" numberOfLines={1}>{post.author}</Text>
                <Text className="mt-0.5 text-[12px] font-normal leading-[18px] text-[#9CA3AF]" numberOfLines={1}>{post.category} · {post.createdAt}</Text>
              </View>
            </View>
            <Text className="mt-3 text-[18px] font-bold leading-[26px] text-[#222222]" numberOfLines={2}>{post.title}</Text>
            <Text className="mt-1.5 text-[14px] font-medium leading-[22px] text-[#666666]" numberOfLines={2}>{post.content}</Text>
          </View>
          {thumbnail ? <Image source={{ uri: thumbnail }} className="h-[86px] w-[86px] rounded-[14px] bg-shell" resizeMode="cover" /> : null}
        </View>
        <View className="mt-3 flex-row items-center">
          <Meta icon="eye-outline" label={`${post.views}`} />
          <Meta icon="chatbubble-outline" label={`${commentCount}`} />
          <Meta icon="heart-outline" label={`${post.likes}`} />
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

export default function MyPostsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('전체');
  const filteredPosts = useMemo(
    () => activeTab === '전체' ? myPosts : myPosts.filter((post) => post.category === activeTab || (activeTab === '사육상담' && post.tags?.includes('사육상담'))),
    [activeTab],
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]" edges={['top']}>
      <View className="border-b border-[#ECECEC] bg-white px-5 pb-4 pt-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <AnimatedPressable onPress={() => router.back()} className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-[#F7F8FA]">
              <Ionicons name="chevron-back" size={22} color={colors.ink} />
            </AnimatedPressable>
            <Text className="text-[22px] font-bold leading-8 text-[#222222]">내가 작성한 글</Text>
          </View>
          <AnimatedPressable className="h-10 w-10 items-center justify-center rounded-full bg-[#F7F8FA]">
            <Ionicons name="options-outline" size={20} color="#222222" />
          </AnimatedPressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 104 + insets.bottom }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 14 }}>
          {tabs.map((tab) => <CategoryTab key={tab} label={tab} active={activeTab === tab} onPress={() => setActiveTab(tab)} />)}
        </ScrollView>
        <View className="bg-white">
          {filteredPosts.map((post, index) => <MyPostCard key={post.id} post={post} index={index} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
