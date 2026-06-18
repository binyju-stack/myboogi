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
    <AnimatedPressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-4 w-[232px] rounded-[24px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Image source={{ uri: item.avatar }} className="h-[72px] w-[72px] rounded-full bg-shell" />
        <View className="ml-3 flex-1"><VerifiedBadge label={item.badge} /><Text className="mt-2 text-[17px] font-bold leading-6 text-ink" numberOfLines={1}>{item.name}</Text><Text className="mt-1 text-[12px] font-medium text-subtle">팔로워 {(item.followers + (following ? 1 : 0)).toLocaleString()}</Text></View>
      </View>
      {following ? <Text className="mt-3 self-start rounded-full bg-blush px-2.5 py-1.5 text-[10px] font-semibold text-berry">팔로잉</Text> : null}
      <Text className="mt-3 text-[13px] font-medium leading-5 text-subtle" numberOfLines={2}>{item.intro}</Text>
    </AnimatedPressable>
  );
}
