import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { Listing } from '@/types';
import { VerifiedBadge } from './common';

export function ListingCard({ item, wide = false }: { item: Listing; wide?: boolean }) {
  return (
    <Pressable onPress={() => router.push(`/listing/${item.id}`)} className={`${wide ? 'mr-3 w-44 rounded-2xl border border-line bg-white p-2.5' : 'mb-5 w-[48%]'}`}>
      <View className={`${wide ? 'h-32' : 'aspect-square'} overflow-hidden rounded-xl bg-shell`}>
        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
        <Pressable className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white/90">
          <Ionicons name="heart-outline" size={17} color={colors.berry} />
        </Pressable>
      </View>
      <View className="mt-2">{item.verified ? <VerifiedBadge /> : null}</View>
      <Text className="mt-1.5 text-sm font-black text-ink" numberOfLines={1}>{item.species}</Text>
      <Text className="mt-1 text-[11px] text-muted">{item.location} · {item.stage} · {item.sex}</Text>
      <Text className="mt-1.5 text-[15px] font-black text-ink">{item.price.toLocaleString()}원</Text>
      <Text className="mt-1 text-[10px] text-muted">조회 {item.views} · 찜 {item.likes}</Text>
    </Pressable>
  );
}
