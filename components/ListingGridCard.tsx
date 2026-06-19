import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { breeders } from '@/data/mockData';
import type { Listing } from '@/types';

function getStatusTone(item: Listing) {
  if (item.listingStatus === 'reserved') return { backgroundColor: '#FFF1E6', color: '#FF9B4A' };
  if (item.listingStatus === 'completed') return { backgroundColor: '#F5F6F8', color: '#8A8F98' };
  return { backgroundColor: '#FFF0F6', color: '#FF4F8B' };
}

export function ListingGridCard({
  item,
  width,
}: {
  item: Listing;
  index?: number;
  width?: number;
}) {
  const [favorite, setFavorite] = useState(false);
  const likes = item.likes + (favorite ? 1 : 0);
  const breeder = breeders.find((entry) => entry.id === item.breederId);
  const tone = getStatusTone(item);

  return (
    <View style={width ? { width } : undefined} className="mb-7">
      <Pressable onPress={() => router.push(`/listing/${item.id}` as never)} className="w-full">
        <View className="aspect-square overflow-hidden rounded-[12px] bg-shell">
          <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
          <View
            className="absolute left-2 top-2 rounded-full"
            style={{ backgroundColor: tone.backgroundColor, paddingHorizontal: 9, paddingVertical: 5 }}
          >
            <Text className="text-[11px] font-semibold leading-[15px]" style={{ color: tone.color }}>
              {item.status}
            </Text>
          </View>
          {item.verified ? (
            <View className="absolute right-2 top-2 flex-row items-center rounded-full bg-white/95" style={{ paddingHorizontal: 9, paddingVertical: 5 }}>
              <Ionicons name="checkmark-circle" size={12} color="#FF4F8B" />
              <Text className="ml-1 text-[11px] font-semibold leading-[15px] text-[#FF4F8B]">인증</Text>
            </View>
          ) : null}
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              setFavorite((current) => !current);
            }}
            className="absolute bottom-2 right-2 h-[42px] w-[42px] items-center justify-center rounded-full bg-white/95"
          >
            <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={22} color={colors.berry} />
          </Pressable>
        </View>

        <View className="mt-2.5" style={{ minWidth: 0 }}>
          <Text className="text-[12px] font-normal leading-4 text-[#8A8F98]" numberOfLines={1}>
            {item.species}
          </Text>
          <Text className="mt-1 text-[15px] font-semibold leading-[21px] text-[#111827]" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="mt-1.5 text-[19px] font-bold leading-6 text-[#111827]" numberOfLines={1}>
            {item.price.toLocaleString()}원
          </Text>
          <Text className="mt-[5px] text-[12px] font-normal leading-4 text-[#8A8F98]" numberOfLines={1}>
            {breeder?.name ?? '브리더'} · {item.location}
          </Text>
          <View className="mt-2 flex-row items-center">
            <View className="mr-3 flex-row items-center">
              <Ionicons name="heart-outline" size={14} color="#8A8F98" />
              <Text className="ml-1 text-[12px] font-normal leading-4 text-[#8A8F98]">{likes.toLocaleString()}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="eye-outline" size={15} color="#8A8F98" />
              <Text className="ml-1 text-[12px] font-normal leading-4 text-[#8A8F98]">{item.views.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
