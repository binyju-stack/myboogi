import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import type { Breeder } from '@/types';
import { AnimatedPressable } from './AnimatedPressable';
import { VerifiedBadge } from './common';

export function BreederCard({ item }: { item: Breeder }) {
  return (
    <AnimatedPressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-4 w-52 rounded-[22px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Image source={{ uri: item.avatar }} className="h-16 w-16 rounded-full bg-shell" />
        <View className="ml-3 flex-1"><VerifiedBadge label={item.badge} /><Text className="mt-2 text-[13px] font-black text-ink" numberOfLines={1}>{item.name}</Text><Text className="mt-1 text-[9px] text-muted">팔로워 {item.followers.toLocaleString()}</Text></View>
      </View>
      <Text className="mt-3 text-[10px] leading-4 text-muted" numberOfLines={2}>{item.intro}</Text>
    </AnimatedPressable>
  );
}
