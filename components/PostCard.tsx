import { Image, Text, View } from 'react-native';

import type { Post } from '@/types';
import { Avatar, Stat } from './common';

export function PostCard({ item, compact = false }: { item: Post; compact?: boolean }) {
  return (
    <View className="border-b border-line bg-white px-4 py-4 last:border-b-0">
      <View className="flex-row items-center">
        <Avatar uri={item.avatar} size={30} />
        <View className="ml-2 flex-1">
          <Text className="text-xs font-black text-ink">{item.author}</Text>
          <Text className="text-[10px] text-muted">{item.category} · {item.createdAt}</Text>
        </View>
      </View>
      <Text className="mt-3 text-sm font-black leading-5 text-ink">{item.title}</Text>
      <Text className="mt-1.5 text-xs leading-5 text-muted" numberOfLines={compact ? 2 : 3}>{item.content}</Text>
      {item.image && !compact ? <Image source={{ uri: item.image }} className="mt-3 h-48 w-full rounded-xl bg-shell" resizeMode="cover" /> : null}
      <View className="mt-3 flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon="heart-outline" value={item.likes} /><Stat icon="chatbubble-outline" value={item.comments} /></View>
    </View>
  );
}
