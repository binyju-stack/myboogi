import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { posts } from '@/data/communityData';

const categories = ['전체', '사육상담', '질병상담', '산란정보', '자유글', '분양후기'];

function CategoryPill({ label, selected }: { label: string; selected: boolean }) {
  return (
    <AnimatedPressable className={`mr-2 rounded-full px-4 py-2.5 ${selected ? 'bg-[#FFF1E6]' : 'bg-[#F5F6F8]'}`}>
      <Text className={`text-[13px] font-semibold ${selected ? 'text-[#FF9B4A]' : 'text-[#8A8F98]'}`}>{label}</Text>
    </AnimatedPressable>
  );
}

function Meta({ icon, value }: { icon: keyof typeof Ionicons.glyphMap; value: number }) {
  return (
    <View className="mr-4 flex-row items-center">
      <Ionicons name={icon} size={13} color="#9CA3AF" />
      <Text className="ml-1 text-[12px] font-normal leading-[18px] text-[#9CA3AF]">{value.toLocaleString()}</Text>
    </View>
  );
}

function CommunityListItem({ post, index }: { post: (typeof posts)[number]; index: number }) {
  const commentCount = post.commentsCount ?? post.comments;

  return (
    <FadeInView delay={index * 45}>
      <AnimatedPressable
        onPress={() => router.push(`/community/${post.id}` as never)}
        className={`px-5 py-6 ${index ? 'border-t border-[#ECECEC]' : ''}`}
      >
        <Text className="text-[18px] font-bold leading-[26px] text-[#222222]" numberOfLines={2}>
          {post.title}
        </Text>
        <Text className="mt-2.5 text-[14px] font-medium leading-[22px] text-[#8A8F98]" numberOfLines={2} ellipsizeMode="tail">
          {post.content}
        </Text>
        <Text className="mt-3 text-[13px] font-medium leading-[18px] text-[#8A8F98]" numberOfLines={1}>
          {post.author} · {post.createdAt}
        </Text>
        <View className="mt-3 flex-row items-center">
          <Meta icon="heart-outline" value={post.likes} />
          <Meta icon="chatbubble-outline" value={commentCount} />
          <Meta icon="eye-outline" value={post.views} />
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="border-b border-[#ECECEC] bg-white px-5 pb-4 pt-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-[24px] font-bold leading-8 text-[#222222]">커뮤니티</Text>
          <View className="flex-row items-center">
            <AnimatedPressable onPress={() => router.push('/search')} className="h-10 w-10 items-center justify-center rounded-full">
              <Ionicons name="search" size={21} color="#222222" />
            </AnimatedPressable>
            <AnimatedPressable onPress={() => router.push('/community/create')} className="ml-1 h-10 w-10 items-center justify-center rounded-full">
              <Ionicons name="create-outline" size={21} color="#222222" />
            </AnimatedPressable>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 116 + insets.bottom }}>
        <View className="mx-5 mt-5 overflow-hidden rounded-[24px] bg-[#FFF8F2] px-5 py-5">
          <View className="flex-row items-center">
            <View className="flex-1 pr-4">
              <Text className="text-[22px] font-bold leading-8 text-[#222222]">
                거북이 이야기를{'\n'}편하게 나눠보세요 :)
              </Text>
              <Text className="mt-2 text-[14px] font-medium leading-[22px] text-[#8A8F98]">
                사육 상담부터 분양 후기까지 부기톡에서 가볍게 이야기해요.
              </Text>
            </View>
            <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-white/80">
              <Ionicons name="chatbubbles" size={31} color={colors.berry} />
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8, paddingTop: 18 }}>
          {categories.map((category, index) => (
            <CategoryPill key={category} label={category} selected={index === 0} />
          ))}
        </ScrollView>

        <View className="mt-1 bg-white">
          {posts.map((post, index) => (
            <CommunityListItem key={post.id} post={post} index={index} />
          ))}
        </View>
      </ScrollView>

      <View className="absolute right-6" style={{ bottom: 104 + insets.bottom }}>
        <AnimatedPressable onPress={() => router.push('/community/create')} className="h-14 w-14 items-center justify-center rounded-full bg-[#FFD85A] shadow-lg">
          <Ionicons name="pencil" size={24} color="#222222" />
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}
