import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { getListingStatus, listingStatusMeta } from '@/data/listingStatusData';
import { breeders, listings } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import type { Listing } from '@/types';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { useMockUserState } from './MockUserState';

const currentDate = new Date('2026-06-17T00:00:00');

function isNewListing(listedAt?: string) {
  if (!listedAt) return false;
  const listedDate = new Date(`${listedAt.replace(/\./g, '-')}T00:00:00`);
  const diffDays = (currentDate.getTime() - listedDate.getTime()) / 86400000;
  return diffDays >= 0 && diffDays <= 7;
}

function isHotListing(item: Listing) {
  const topCount = Math.max(1, Math.ceil(listings.length * 0.1));
  const topViews = [...listings].sort((a, b) => b.views - a.views).slice(0, topCount).map((listing) => listing.id);
  const topLikes = [...listings].sort((a, b) => b.likes - a.likes).slice(0, topCount).map((listing) => listing.id);
  return topViews.includes(item.id) || topLikes.includes(item.id);
}

function ListingChip({ label }: { label: string }) {
  return (
    <View className="mr-1.5 mt-1.5 rounded-full bg-soft px-2.5 py-1">
      <Text className="text-[8px] font-black text-muted">{label}</Text>
    </View>
  );
}

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
  const breeder = breeders.find((entry) => entry.id === item.breederId);
  const reviewSummary = getReviewSummary(item.breederId);
  const rating = breeder?.rating ?? reviewSummary.averageRating;
  const hot = isHotListing(item);
  const fresh = isNewListing(item.listedAt);
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
            <View className="absolute left-2 top-2">{statusBadge}</View>
          </View>
          <View className="ml-4 flex-1 py-1">
            <Text className="text-[9px] font-bold text-berry">{item.verified ? '✓ 인증 브리더' : '일반 브리더'}</Text>
            <Text className="mt-2 text-[14px] font-black leading-5 text-ink" numberOfLines={2}>{item.species}</Text>
            <Text className="mt-1 text-[17px] font-black text-ink">{item.price.toLocaleString()}원</Text>
            <View className="mt-auto flex-row items-center justify-between">
              <Text className="text-[10px] text-muted">{item.location}</Text>
              <View className="flex-row items-center">
                <Text className="mr-2 text-[9px] text-subtle">조회 {item.views} · 찜 {likes}</Text>
                {heart(true)}
              </View>
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
    <FadeInView delay={index * 45}>
      <AnimatedPressable onPress={() => router.push(`/listing/${item.id}`)} className={`${wide ? 'mr-4 w-[212px]' : 'mb-6 w-[48%]'} rounded-[24px] border border-line bg-white p-2.5 shadow-sm`}>
        <View className="aspect-[4/5] overflow-hidden rounded-[20px] bg-shell">
          <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
          <View className="absolute left-2 top-2 flex-row flex-wrap">
            {statusBadge}
            {hot ? <Text className="ml-1 rounded-full bg-ink px-2.5 py-1.5 text-[9px] font-black text-white">🔥 HOT</Text> : null}
            {fresh ? <Text className="ml-1 rounded-full bg-white px-2.5 py-1.5 text-[9px] font-black text-berry">NEW</Text> : null}
          </View>
          <Pressable onPress={(event) => { event.stopPropagation(); toggleFavorite(item.id); }} className="absolute right-2 top-2 flex-row items-center rounded-full bg-white/95 px-2.5 py-1.5">
            <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={13} color={colors.berry} />
            <Text className="ml-1 text-[9px] font-black text-berry">{likes}</Text>
          </Pressable>
        </View>
        <View className="px-1 pb-1 pt-3">
          <Text className="text-[13px] font-black text-ink" numberOfLines={1}>{item.species}</Text>
          <Text className="mt-1 text-[10px] font-bold text-muted" numberOfLines={1}>{item.title}</Text>
          <Text className="mt-2 text-[18px] font-black text-ink">{item.price.toLocaleString()}원</Text>
          <View className="mt-1 flex-row flex-wrap">
            <ListingChip label={item.sex} />
            <ListingChip label={item.stage} />
          </View>
          <View className="mt-3">
            <Text className="text-[9px] font-black text-berry">✓ 인증 브리더</Text>
            <Text className="mt-1 text-[11px] font-black text-ink" numberOfLines={1}>{breeder?.name ?? '브리더 정보 없음'}</Text>
          </View>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="star" size={12} color="#FFC83D" />
            <Text className="ml-1 text-[10px] font-black text-ink">{rating.toFixed(1)}</Text>
            <Text className="ml-1.5 text-[9px] font-bold text-muted">후기 {reviewSummary.totalReviews.toLocaleString()}개</Text>
          </View>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="eye-outline" size={12} color={colors.muted} />
            <Text className="ml-1 mr-3 text-[9px] font-bold text-muted">{item.views.toLocaleString()}</Text>
            <Ionicons name="heart" size={11} color={colors.berry} />
            <Text className="ml-1 text-[9px] font-bold text-muted">{likes.toLocaleString()}</Text>
          </View>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}
