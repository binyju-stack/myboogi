import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Chip } from '@/components/common';
import { PostCard } from '@/components/PostCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { communityCategories, posts } from '@/data/communityData';

export default function CommunityScreen() {
  return (
    <Page>
      <View className="border-b border-line bg-white px-5 pb-5 pt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-[10px] font-semibold text-berry">MYBOOGI COMMUNITY</Text>
            <Text className="mt-1 text-[22px] font-bold leading-8 text-ink">거북이 집사들의 이야기</Text>
          </View>
          <View className="h-11 w-11">
            <AnimatedPressable onPress={() => router.push('/community/create')} className="h-11 w-11 items-center justify-center rounded-full bg-blush">
              <Ionicons name="create-outline" size={21} color={colors.berry} />
            </AnimatedPressable>
          </View>
        </View>
        <Text className="mt-3 text-[14px] font-medium leading-6 text-muted">사육 정보부터 오늘의 일상까지 편하게 나눠보세요.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        {communityCategories.map((label, index) => (
          <AnimatedPressable key={label} onPress={() => label === '질병상담' ? router.push('/disease') : undefined}>
            <Chip label={label} selected={index === 0} />
          </AnimatedPressable>
        ))}
      </ScrollView>

      <FadeInView>
        <View className="mb-4 flex-row items-end justify-between px-5">
          <View>
            <Text className="text-[10px] font-semibold text-berry">COMMUNITY FEED</Text>
            <Text className="mt-1 text-[20px] font-bold leading-7 text-ink">새로운 이야기</Text>
          </View>
          <Text className="rounded-full bg-white px-3 py-2 text-[12px] font-medium text-muted">최신순</Text>
        </View>
      </FadeInView>

      <View className="mx-5 rounded-[20px] bg-white px-4">{posts.map((post, index) => <PostCard key={post.id} item={post} index={index} />)}</View>

      <View className="absolute bottom-24 right-5">
        <AnimatedPressable onPress={() => router.push('/community/create')} className="h-14 w-14 items-center justify-center rounded-full bg-berry shadow-lg">
          <Ionicons name="create" size={23} color="white" />
        </AnimatedPressable>
      </View>
    </Page>
  );
}
