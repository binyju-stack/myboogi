import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import type { Breeder } from '@/types';
import { AnimatedPressable } from './AnimatedPressable';
import { VerifiedBadge } from './common';
import { useMockUserState } from './MockUserState';

export function BreederCard({ item }: { item: Breeder }) {
  const { isFollowing } = useMockUserState();
  const following = isFollowing(item.id);
  return (
    <AnimatedPressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-4 w-[212px] rounded-[24px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Image source={{ uri: item.avatar }} className="h-16 w-16 rounded-full bg-shell" />
        <View className="ml-3 flex-1"><VerifiedBadge label={item.badge} /><Text className="mt-2 text-[13px] font-black text-ink" numberOfLines={1}>{item.name}</Text><Text className="mt-1 text-[9px] text-muted">팔로워 {(item.followers + (following ? 1 : 0)).toLocaleString()}</Text></View>
      </View>
      {following ? <Text className="mt-3 self-start rounded-full bg-blush px-2.5 py-1.5 text-[9px] font-black text-berry">팔로잉</Text> : null}
      <Text className="mt-3 text-[10px] leading-4 text-muted" numberOfLines={2}>{item.intro}</Text>
    </AnimatedPressable>
  );
}
