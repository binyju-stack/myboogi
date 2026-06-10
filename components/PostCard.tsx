import { Text, View } from 'react-native';

import type { Post } from '@/types';
import { Avatar, Stat } from './common';

export function PostCard({ item, compact = false }: { item: Post; compact?: boolean }) {
  return (
    <View className="mb-3 rounded-[22px] bg-white px-4 py-4 shadow-sm">
      <View className="flex-row items-center">
        <Avatar uri={item.avatar} size={30} />
        <View className="ml-2 flex-1">
          <Text className="text-xs font-black text-ink">{item.author}</Text>
          <Text className="text-[10px] text-muted">{item.category} · {item.createdAt}</Text>
        </View>
      </View>
      <Text className="mt-3 text-[15px] font-black leading-5 text-ink">{item.title}</Text>
      {!compact ? <Text className="mt-1.5 text-xs leading-5 text-muted" numberOfLines={2}>{item.content}</Text> : null}
      <View className="mt-4 flex-row"><Stat icon="heart-outline" value={item.likes} /><Stat icon="chatbubble-outline" value={item.comments} /></View>
    </View>
  );
}
