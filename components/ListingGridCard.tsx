import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { breeders } from '@/data/mockData';
import type { Breeder, Listing } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];

type Tone = {
  backgroundColor?: string;
  color: string;
  icon?: IconName;
  label?: string;
};

function getStatusTone(item: Listing): Tone {
  if (item.listingStatus === 'reserved') return { backgroundColor: '#FF7A00', color: '#FFFFFF' };
  if (item.listingStatus === 'completed') return { backgroundColor: '#111827', color: '#FFFFFF' };
  return { backgroundColor: '#FF4F8B', color: '#FFFFFF' };
}

function getSpeciesColor(species: string) {
  if (species.includes('헤르만')) return '#22A06B';
  if (species.includes('설가타')) return '#FF7A00';
  if (species.includes('레오파드')) return '#7C3AED';
  if (species.includes('테라핀') || species.includes('다이아몬드백')) return '#0F9F9A';
  return '#9CA3AF';
}

function getBreederBadge(breeder?: Breeder): Tone {
  if (breeder?.trustScore && breeder.trustScore >= 98) {
    return { label: '프리미엄', icon: 'trophy', backgroundColor: '#FFF1E6', color: '#D4A017' };
  }
  if (breeder?.trustScore && breeder.trustScore >= 96) {
    return { label: 'TOP', icon: 'star', backgroundColor: '#FFF1E6', color: '#FF7A00' };
  }
  if (breeder?.breederType === 'business') {
    return { label: '사업자', icon: 'shield-checkmark', backgroundColor: '#F3E8FF', color: '#7C3AED' };
  }
  if (breeder?.trustScore && breeder.trustScore >= 91) {
    return { label: '우수', icon: 'star', backgroundColor: '#FFF1E6', color: '#FF7A00' };
  }
  return { label: '인증', icon: 'checkmark-circle', backgroundColor: '#EEF7FF', color: '#2F80ED' };
}

function getBreederNameTone(item: Listing, breeder?: Breeder): Tone {
  if (!breeder || !item.verified) return { color: '#8A8F98' };
  if (breeder.trustScore && breeder.trustScore >= 98) return { icon: 'trophy', color: '#D4A017' };
  if (breeder.trustScore && breeder.trustScore >= 96) return { icon: 'star', color: '#FF7A00' };
  if (breeder.breederType === 'business') return { icon: 'shield-checkmark', color: '#7C3AED' };
  if (breeder.trustScore && breeder.trustScore >= 91) return { icon: 'star', color: '#FF7A00' };
  return { icon: 'checkmark-circle', color: '#2F80ED' };
}

export function ListingGridCard({
  item,
  width,
  imageRadius = 8,
}: {
  item: Listing;
  index?: number;
  width?: number;
  imageRadius?: number;
}) {
  const [favorite, setFavorite] = useState(false);
  const likes = item.likes + (favorite ? 1 : 0);
  const breeder = breeders.find((entry) => entry.id === item.breederId);
  const statusTone = getStatusTone(item);
  const breederBadge = getBreederBadge(breeder);
  const breederNameTone = getBreederNameTone(item, breeder);
  const speciesColor = getSpeciesColor(item.species);

  return (
    <View style={width ? { width } : undefined} className="mb-7 bg-white">
      <Pressable onPress={() => router.push(`/listing/${item.id}` as never)} className="w-full">
        <View className="aspect-square overflow-hidden bg-shell" style={{ borderRadius: imageRadius }}>
          <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
          <View
            className="absolute left-2 top-2 rounded-full"
            style={{ backgroundColor: statusTone.backgroundColor, paddingHorizontal: 7, paddingVertical: 3 }}
          >
            <Text className="text-[10px] font-bold leading-4" style={{ color: statusTone.color }}>
              {item.status}
            </Text>
          </View>
          {item.verified ? (
            <View
              className="absolute right-2 top-2 flex-row items-center rounded-full"
              style={{
                backgroundColor: breederBadge.backgroundColor,
                paddingHorizontal: 7,
                paddingVertical: 3,
              }}
            >
              {breederBadge.icon ? <Ionicons name={breederBadge.icon} size={10} color={breederBadge.color} /> : null}
              <Text className="ml-1 text-[10px] font-bold leading-4" style={{ color: breederBadge.color }}>
                {breederBadge.label}
              </Text>
            </View>
          ) : null}
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              setFavorite((current) => !current);
            }}
            className="absolute bottom-2 right-2 flex-row items-center rounded-full bg-black/60 px-2 py-1"
          >
            <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={15} color="#FFFFFF" />
            <Text className="ml-1 text-[11px] font-medium leading-4 text-white">{likes.toLocaleString()}</Text>
          </Pressable>
        </View>

        <View className="mt-2" style={{ minWidth: 0 }}>
          <Text className="text-[11px] font-normal leading-[15px]" style={{ color: speciesColor }} numberOfLines={1}>
            {item.species}
          </Text>
          <Text className="mt-1 text-[14px] font-semibold leading-5 text-[#111827]" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="mt-1.5 text-[18px] font-bold leading-6 text-[#111827]" numberOfLines={1}>
            {item.price.toLocaleString()}원
          </Text>
          <View className="mt-1.5 flex-row items-center" style={{ minWidth: 0 }}>
            {breederNameTone.icon ? <Ionicons name={breederNameTone.icon} size={12} color={breederNameTone.color} /> : null}
            <Text
              className={`${breederNameTone.icon ? 'ml-1' : ''} flex-1 text-[12px] font-medium leading-4`}
              style={{ color: breederNameTone.color }}
              numberOfLines={1}
            >
              {breeder?.name ?? '브리더'}
            </Text>
          </View>
          <Text className="mt-0.5 text-[12px] font-normal leading-4 text-[#8A8F98]" numberOfLines={1}>
            {item.location}
          </Text>
          <View className="mt-2 flex-row items-center">
            <View className="mr-3 flex-row items-center">
              <Ionicons name="heart-outline" size={12} color="#FF4F8B" />
              <Text className="ml-1 text-[11px] font-medium leading-[15px] text-[#FF4F8B]">{likes.toLocaleString()}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="eye-outline" size={13} color="#9CA3AF" />
              <Text className="ml-1 text-[11px] font-medium leading-[15px] text-[#9CA3AF]">{item.views.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
