import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BadgeCheck, Heart, ShieldCheck, Store, type LucideIcon } from 'lucide-react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';
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
  imageRadius = Radius.lg,
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
  const infoHeight = compact ? 208 : 214;

  return (
    <View style={[styles.card, compact ? styles.compactCard : null, bordered ? styles.cardBordered : null, width ? { width } : null]}>
      <Pressable onPress={() => router.push(`/listing/${item.id}` as never)} style={styles.pressable}>
        <View style={[styles.imageWrap, { borderRadius: imageRadius }]}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <View style={[styles.statusBadge, { backgroundColor: statusTone.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusTone.color }]}>{item.status}</Text>
          </View>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              setFavorite((current) => !current);
            }}
            style={styles.likeBadge}
          >
            <Heart size={15} strokeWidth={2} color={Colors.card} fill={favorite ? Colors.card : 'transparent'} />
            <Text style={styles.likeText}>{likes.toLocaleString()}</Text>
          </Pressable>
        </View>

        <View style={[styles.info, { height: infoHeight }]}>
          <Text style={styles.species} numberOfLines={1}>{item.species}</Text>

          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

          <View style={styles.stageRow}>
            {[item.sex, getStageLabel(item.stage)].map((label) => (
              <View key={label} style={styles.stageBadge}>
                <Text style={styles.stageText}>{label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.price} numberOfLines={1}>{item.price.toLocaleString()}원</Text>

          <Text style={styles.breederLine} numberOfLines={1}>
            @{breeder?.name ?? '브리더'} · {item.location}
          </Text>

          <Text style={styles.tradeMethods} numberOfLines={1}>{tradeMethods.join(' · ')}</Text>

          <View style={styles.verificationRow}>
            {verificationIcons.map(({ key, label, icon: VerificationIcon }) => (
              <View key={key} accessibilityLabel={label} style={styles.verificationBadge}>
                <VerificationIcon size={13} strokeWidth={2} color={Colors.verified} />
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    ...Shadows.card,
  },
  compactCard: {
    marginBottom: Spacing.sm,
  },
  cardBordered: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressable: {
    padding: Spacing.lg,
  },
  imageWrap: {
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    left: Spacing.sm,
    top: Spacing.sm,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  statusText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: Typography.captionBold.fontWeight,
  },
  likeBadge: {
    position: 'absolute',
    right: Spacing.sm,
    bottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.overlay,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  likeText: {
    marginLeft: Spacing.xs,
    color: Colors.card,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: Typography.small.fontWeight,
  },
  info: {
    minWidth: 0,
    marginTop: Spacing.md,
  },
  species: {
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: '400',
  },
  title: {
    height: 40,
    marginTop: Spacing.xs,
    color: Colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  stageRow: {
    height: 20,
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageBadge: {
    marginRight: Spacing.xs + 2,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  stageText: {
    color: Colors.subText,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: Typography.small.fontWeight,
  },
  price: {
    marginTop: Spacing.sm + Spacing.xxs,
    color: Colors.text,
    fontSize: Typography.price.fontSize,
    lineHeight: Typography.price.lineHeight,
    fontWeight: Typography.price.fontWeight,
  },
  breederLine: {
    marginTop: Spacing.sm - Spacing.xxs,
    color: Colors.primary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  tradeMethods: {
    marginTop: Spacing.sm - Spacing.xxs,
    color: Colors.delivery,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: '600',
  },
  verificationRow: {
    height: 22,
    marginTop: Spacing.sm + Spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationBadge: {
    width: 22,
    height: 22,
    marginRight: Spacing.xs + 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
});
