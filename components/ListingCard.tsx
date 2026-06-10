import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { Listing } from '@/types';

export function ListingCard({ item, wide = false }: { item: Listing; wide?: boolean }) {
  return (
    <Pressable onPress={() => router.push(`/listing/${item.id}`)} className={`${wide ? 'mr-4 w-52 rounded-[24px] bg-white p-2.5 shadow-sm' : 'mb-7 w-[48%]'}`}>
      <View className={`${wide ? 'h-40' : 'aspect-square'} overflow-hidden rounded-[20px] bg-shell`}>
        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
        <Pressable className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white/90">
          <Ionicons name="heart-outline" size={17} color={colors.berry} />
        </Pressable>
      </View>
      <Text className="mt-3 text-[14px] font-bold text-ink" numberOfLines={1}>{item.species}</Text>
      <Text className="mt-1.5 text-[16px] font-black text-ink">{item.price.toLocaleString()}원</Text>
      <View className="mt-1.5 flex-row items-center justify-between"><Text className="text-[10px] text-muted">{item.location}</Text><Text className="text-[9px] text-muted">조회 {item.views} · 찜 {item.likes}</Text></View>
    </Pressable>
  );
}
