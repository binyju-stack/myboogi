import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { posts } from '@/data/communityData';
import { getWeeklyPopularPosts } from '@/utils/communityRanking';

export default function WeeklyPopularScreen() {
  const rankedPosts = getWeeklyPopularPosts(posts);

  return (
    <Page>
      <TopBar title="이번 주 인기글" />
      <View className="px-5 pb-5 pt-4">
        <Text className="text-[13px] font-medium leading-5 text-[#94A3B8]">
          최근 7일 동안 조회수, 댓글, 좋아요 반응이 높았던 글이에요.
        </Text>

        <View className="mt-4 overflow-hidden rounded-[16px] bg-white px-4">
          {rankedPosts.map((post, index) => {
            const commentCount = post.commentsCount ?? post.comments;
            return (
              <Pressable
                key={post.id}
                onPress={() => router.push(`/community/${post.id}` as never)}
                className={`flex-row items-center py-4 ${index ? 'border-t border-[#EEF2F6]' : ''}`}
              >
                <Text className="w-9 text-center text-[19px] font-bold leading-6 text-[#FF2E6F]">{index + 1}</Text>
                <View className="ml-2 flex-1" style={{ minWidth: 0 }}>
                  <Text className="text-[15px] font-semibold leading-5 text-[#111827]" numberOfLines={2}>
                    {post.title}
                  </Text>
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="eye-outline" size={14} color="#94A3B8" />
                    <Text className="ml-1 text-[12px] font-normal text-[#94A3B8]">{post.views.toLocaleString()}</Text>
                    <Ionicons name="chatbubble-outline" size={13} color="#94A3B8" style={{ marginLeft: 12 }} />
                    <Text className="ml-1 text-[12px] font-normal text-[#94A3B8]">{commentCount.toLocaleString()}</Text>
                    <Ionicons name="heart-outline" size={13} color="#94A3B8" style={{ marginLeft: 12 }} />
                    <Text className="ml-1 text-[12px] font-normal text-[#94A3B8]">{post.likes.toLocaleString()}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={17} color="#C4C8CF" />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Page>
  );
}
