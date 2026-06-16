import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { getListingStatus, listingStatusMeta } from '@/data/listingStatusData';
import type { Listing } from '@/types';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { useMockUserState } from './MockUserState';

export function ListingCard({
  item,
  wide = false,
  list = false,
  index = 0,
  onStatusPress,
}: {
  item: Listing;
  wide?: boolean;
  list?: boolean;
  index?: number;
  onStatusPress?: (item: Listing) => void;
}) {
  const { isFavorite, toggleFavorite } = useMockUserState();
  const favorite = isFavorite(item.id);
  const likes = item.likes + (favorite ? 1 : 0);
  const status = getListingStatus(item);
  const statusMeta = listingStatusMeta[status];
  const statusBadge = <Text className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusMeta.badgeClass} ${statusMeta.textClass}`}>{statusMeta.label}</Text>;
  const heart = (compact = false) => (
    <Pressable onPress={(event) => { event.stopPropagation(); toggleFavorite(item.id); }} className={`${compact ? 'h-8 w-8' : 'h-9 w-9'} items-center justify-center rounded-full bg-blush`}>
      <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={compact ? 16 : 18} color={colors.berry} />
    </Pressable>
  );

  if (list) {
    return (
      <FadeInView delay={index * 45}>
        <AnimatedPressable onPress={() => router.push(`/listing/${item.id}`)} className="mb-3 flex-row rounded-[24px] border border-line bg-white p-4 shadow-sm">
          <View className="h-28 w-28 overflow-hidden rounded-[20px] bg-shell">
            <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
            <View className="absolute right-2 top-2">{statusBadge}</View>
          </View>
          <View className="ml-4 flex-1 py-1">
            <View className="flex-row items-center">{item.verified ? <Text className="text-[9px] font-bold text-muted">인증 브리더</Text> : null}</View>
            <Text className="mt-2 text-[14px] font-black leading-5 text-ink" numberOfLines={2}>{item.species}</Text>
            <Text className="mt-1 text-[17px] font-black text-ink">{item.price.toLocaleString()}원</Text>
            <View className="mt-auto flex-row items-center justify-between">
              <Text className="text-[10px] text-muted">{item.location}</Text>
              <View className="flex-row items-center"><Text className="mr-2 text-[9px] text-subtle">조회 {item.views} · 찜 {likes}</Text>{heart(true)}</View>
            </View>
            {onStatusPress ? (
              <Pressable onPress={(event) => { event.stopPropagation(); onStatusPress(item); }} className="mt-3 items-center rounded-[16px] bg-soft py-2.5">
                <Text className="text-[10px] font-black text-ink">상태 변경</Text>
              </Pressable>
            ) : null}
          </View>
        </AnimatedPressable>
      </FadeInView>
    );
  }

  return (
    <AnimatedPressable onPress={() => router.push(`/listing/${item.id}`)} className={`${wide ? 'mr-4 w-[212px] rounded-[24px] border border-line bg-white p-3 shadow-sm' : 'mb-7 w-[48%]'}`}>
      <View className={`${wide ? 'h-40' : 'aspect-square'} overflow-hidden rounded-[20px] bg-shell`}>
        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute left-2 top-2">{statusBadge}</View>
        <View className="absolute right-2 top-2">{heart(true)}</View>
      </View>
      <Text className="mt-3 text-[14px] font-bold text-ink" numberOfLines={1}>{item.species}</Text>
      <Text className="mt-1.5 text-[16px] font-black text-ink">{item.price.toLocaleString()}원</Text>
      <View className="mt-1.5 flex-row items-center justify-between"><Text className="text-[10px] text-muted">{item.location}</Text><Text className="text-[9px] text-muted">조회 {item.views} · 찜 {likes}</Text></View>
    </AnimatedPressable>
  );
}
