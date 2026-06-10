import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import type { Breeder } from '@/types';
import { VerifiedBadge } from './common';

export function BreederCard({ item }: { item: Breeder }) {
  return (
    <Pressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-4 w-40 items-center rounded-[24px] bg-white px-4 py-5 shadow-sm">
      <Image source={{ uri: item.avatar }} className="h-20 w-20 rounded-full bg-shell" />
      <View className="mt-3"><VerifiedBadge label={item.badge} /></View>
      <Text className="mt-2 text-center text-sm font-black text-ink" numberOfLines={1}>{item.name}</Text>
      <Text className="mt-1 text-center text-[10px] leading-4 text-muted" numberOfLines={2}>{item.intro}</Text>
    </Pressable>
  );
}
