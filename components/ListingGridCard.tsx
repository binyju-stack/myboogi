import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { breeders } from '@/data/mockData';
import type { Listing } from '@/types';

const statusTone: Record<string, { backgroundColor: string; color: string }> = {
  분양중: { backgroundColor: '#FFF0F6', color: '#FF4F8B' },
  예약중: { backgroundColor: '#FFF1E6', color: '#FF9B4A' },
  분양완료: { backgroundColor: '#F5F6F8', color: '#8A8F98' },
};

export function ListingGridCard({
  item,
  index = 0,
  width,
}: {
  item: Listing;
  index?: number;
  width?: number;
}) {
  const [favorite, setFavorite] = useState(false);
  const likes = item.likes + (favorite ? 1 : 0);
  const breeder = breeders.find((entry) => entry.id === item.breederId);
  const tone = statusTone[item.status] ?? statusTone.분양중;

  return (
    <View style={width ? { width } : undefined} className="mb-5">
      <View>
        <Pressable onPress={() => router.push(`/listing/${item.id}` as never)} className="w-full">
          <View className="aspect-square overflow-hidden rounded-[14px] bg-shell">
            <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
            <View className="absolute left-2 top-2 rounded-full px-2.5 py-1" style={{ backgroundColor: tone.backgroundColor }}>
              <Text className="text-[10px] font-semibold leading-[14px]" style={{ color: tone.color }}>
                {item.status}
              </Text>
            </View>
            {item.verified ? (
              <View className="absolute right-2 top-2 flex-row items-center rounded-full bg-white/95 px-2 py-1">
                <Ionicons name="checkmark-circle" size={12} color="#FF4F8B" />
                <Text className="ml-1 text-[10px] font-semibold leading-[14px] text-[#FF4F8B]">인증</Text>
              </View>
            ) : null}
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                setFavorite((current) => !current);
              }}
              className="absolute bottom-2 right-2 h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm"
            >
              <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={19} color={colors.berry} />
            </Pressable>
          </View>

          <View className="pt-2.5" style={{ minWidth: 0 }}>
            <Text className="text-[12px] font-medium leading-4 text-[#8A8F98]" numberOfLines={1}>
              {item.species}
            </Text>
            <Text className="mt-1 text-[15px] font-bold leading-5 text-[#111827]" numberOfLines={2}>
              {item.title}
            </Text>
            <Text className="mt-1.5 text-[22px] font-extrabold leading-7 text-[#111827]" numberOfLines={1}>
              {item.price.toLocaleString()}원
            </Text>
            <Text className="mt-1 text-[13px] font-medium leading-[18px] text-[#8A8F98]" numberOfLines={1}>
              {breeder?.name ?? '브리더'} · {item.location}
            </Text>
            <View className="mt-2 flex-row items-center">
              <View className="mr-3 flex-row items-center">
                <Ionicons name="heart" size={14} color="#FF4F8B" />
                <Text className="ml-1 text-[12px] font-medium leading-4 text-[#6B7280]">{likes.toLocaleString()}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="eye-outline" size={15} color="#8A8F98" />
                <Text className="ml-1 text-[12px] font-medium leading-4 text-[#6B7280]">{item.views.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
