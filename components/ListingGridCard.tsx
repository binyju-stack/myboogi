import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { BadgeCheck, Heart, ShieldCheck, Store, type LucideIcon } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/theme';
import { breeders } from '@/data/mockData';
import type { Breeder, Listing } from '@/types';

function getStatusTone(item: Listing) {
  if (item.listingStatus === 'reserved') return { backgroundColor: Colors.warning, color: Colors.card };
  if (item.listingStatus === 'completed') return { backgroundColor: Colors.text, color: Colors.card };
  return { backgroundColor: Colors.primary, color: Colors.card };
}

type VerificationIcon = { key: string; label: string; icon: LucideIcon };

function getVerificationIcons(item: Listing, breeder?: Breeder): VerificationIcon[] {
  const icons: VerificationIcon[] = [];
  if (item.verified) icons.push({ key: 'identity', label: '실명 인증', icon: BadgeCheck });
  if (breeder?.breederType === 'business') icons.push({ key: 'business', label: '사업자 인증', icon: Store });
  else if (item.verified && breeder) icons.push({ key: 'breeder', label: '브리더 인증', icon: ShieldCheck });
  return icons.slice(0, 3);
}

function getStageLabel(stage: Listing['stage']) {
  return stage === '유체' ? '베이비' : stage;
}

export function ListingGridCard({
  item,
  width,
  imageRadius = Radius.sm,
  bordered = true,
  compact = false,
}: {
  item: Listing;
  index?: number;
  width?: number;
  imageRadius?: number;
  bordered?: boolean;
  compact?: boolean;
}) {
  const [favorite, setFavorite] = useState(false);
  const likes = item.likes + (favorite ? 1 : 0);
  const breeder = breeders.find((entry) => entry.id === item.breederId);
  const statusTone = getStatusTone(item);
  const verificationIcons = getVerificationIcons(item, breeder);
  const tradeMethods = item.tradeMethods?.length ? item.tradeMethods : ['직거래'];

  return (
    <View
      style={width ? { width } : undefined}
      className={`mb-5 bg-white ${bordered ? 'overflow-hidden rounded-[12px] border border-line' : ''}`}
    >
      <Pressable onPress={() => router.push(`/listing/${item.id}` as never)} className="w-full">
        <View className="aspect-square overflow-hidden bg-shell" style={{ borderRadius: imageRadius }}>
          <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
          <View
            className="absolute left-2 top-2 rounded-full"
            style={{ backgroundColor: statusTone.backgroundColor, paddingHorizontal: Spacing.sm - 1, paddingVertical: Spacing.xs - 1 }}
          >
            <Text style={{ color: statusTone.color, fontWeight: Typography.captionBold.fontWeight }} className="text-[10px] leading-4">
              {item.status}
            </Text>
          </View>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              setFavorite((current) => !current);
            }}
            className="absolute bottom-2 right-2 flex-row items-center rounded-full bg-black/35 px-2 py-1"
          >
            <Heart size={15} strokeWidth={2} color={Colors.card} fill={favorite ? Colors.card : 'transparent'} />
            <Text className="ml-1 text-[11px] font-medium leading-4 text-white">{likes.toLocaleString()}</Text>
          </Pressable>
        </View>

        <View className="px-2.5 pb-3" style={{ minWidth: 0, height: compact ? 202 : 230, marginTop: compact ? Spacing.sm : Spacing.md - 2 }}>
          <Text className="text-[11px] font-normal leading-[15px] text-muted" numberOfLines={1}>
            {item.species}
          </Text>

          <Text className={`${compact ? 'mt-0.5' : 'mt-1'} text-[14px] font-bold leading-5 text-ink`} style={compact ? undefined : { height: 40 }} numberOfLines={2}>
            {item.title}
          </Text>

          <View className={`${compact ? 'mt-2' : 'mt-1.5'} h-5 flex-row items-center`}>
            {[item.sex, getStageLabel(item.stage)].map((label) => (
              <View key={label} className="mr-1.5 rounded-full bg-line px-2 py-0.5">
                <Text className="text-[10px] font-medium leading-4 text-muted">{label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-2 flex-row items-center">
            <Text className="text-[18px] font-bold leading-6 text-ink" numberOfLines={1}>
              {item.price.toLocaleString()}원
            </Text>
          </View>

          {compact ? (
            <Text className="mt-1 text-[13px] font-medium leading-[18px] text-muted" numberOfLines={1}>
              @{breeder?.name ?? 'Breeder'} · {item.location}
            </Text>
          ) : (
            <View className="mt-2" style={{ minWidth: 0 }}>
              <Text className="text-[12px] font-medium leading-4 text-berry" numberOfLines={1}>
                {breeder?.name ?? '브리더'}
              </Text>
              <Text className="mt-0.5 text-[11px] font-normal leading-[15px] text-muted" numberOfLines={1}>
                {item.location}
              </Text>
            </View>
          )}

          <Text className={`${compact ? 'mt-0.5' : 'mt-1.5'} text-[12px] font-semibold leading-4`} style={{ color: Colors.delivery }} numberOfLines={1}>
            {tradeMethods.join(' · ')}
          </Text>

          <View className={`${compact ? 'mt-1' : 'mt-2'} h-5 flex-row items-center`}>
            {verificationIcons.map(({ key, label, icon: VerificationIcon }) => (
              <View key={key} accessibilityLabel={label} className="mr-1.5 h-5 w-5 items-center justify-center rounded-full bg-blush">
                <VerificationIcon size={13} strokeWidth={2} color={Colors.verified} />
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
