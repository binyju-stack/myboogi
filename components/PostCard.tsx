import { router } from 'expo-router';
import { Text, View } from 'react-native';

import type { Post } from '@/types';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { Avatar, Stat } from './common';

const middleDot = '\u00B7';

export function PostCard({ item, compact = false, index = 0 }: { item: Post; compact?: boolean; index?: number }) {
  return (
    <FadeInView delay={index * 55}><AnimatedPressable onPress={() => router.push(`/community/${item.id}`)} className="border-b border-line bg-white py-4">
      <View className="flex-row items-center">
        <Avatar uri={item.avatar} size={30} />
        <View className="ml-2 flex-1">
          <Text className="text-[13px] font-semibold text-ink">{item.author}</Text>
          <Text className="mt-0.5 text-[12px] font-medium text-subtle">{item.category} {middleDot} {item.createdAt}</Text>
        </View>
      </View>
      <Text className="mt-3 text-[17px] font-bold leading-[26px] text-ink">{item.title}</Text>
      {!compact ? <Text className="mt-1 text-[14px] font-medium leading-6 text-muted" numberOfLines={2}>{item.content}</Text> : null}
      <View className="mt-3 flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon="chatbubble-outline" value={item.commentsCount ?? item.comments} /><Stat icon="heart-outline" value={item.likes} /></View>
    </AnimatedPressable></FadeInView>
  );
}
