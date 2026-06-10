import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import type { Breeder } from '@/types';
import { VerifiedBadge } from './common';

export function BreederCard({ item }: { item: Breeder }) {
  return (
    <Pressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-3 w-56 rounded-2xl border border-line bg-white p-3">
      <View className="flex-row items-center">
        <Image source={{ uri: item.avatar }} className="h-14 w-14 rounded-full bg-shell" />
        <View className="ml-3 flex-1">
          <VerifiedBadge label={item.badge} />
          <Text className="mt-1.5 font-black text-ink" numberOfLines={1}>{item.name}</Text>
          <Text className="mt-1 text-[10px] text-muted">평점 {item.rating} · 후기 {item.reviews}</Text>
        </View>
      </View>
      <Text className="mt-3 text-xs leading-5 text-muted" numberOfLines={2}>{item.intro}</Text>
    </Pressable>
  );
}
