import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BadgeCheck, Eye, Heart, MessageCircle, ShieldCheck, Store, type LucideIcon } from 'lucide-react-native';

import { breeders } from '@/data/mockData';
import type { Breeder, Listing } from '@/types';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';
import type { HotBadgeType, HotListing } from '@/mockData/hotListings';

const currencyUnit = '\uC6D0';
const fallbackBreederLabel = '\uBE0C\uB9AC\uB354';
const popularReasonTitle = '\uC778\uAE30 \uC774\uC720';
const viewCountLabel = '\uC870\uD68C\uC218';
const likeLabel = '\uCC1C';
const commentLabel = '\uB313\uAE00';

function getStatusTone(item: Listing) {
  if (item.listingStatus === 'reserved') return { backgroundColor: Colors.warning, color: Colors.card };
  if (item.listingStatus === 'completed') return { backgroundColor: Colors.text, color: Colors.card };
  return { backgroundColor: Colors.primary, color: Colors.card };
}

type VerificationIcon = { key: string; label: string; icon: LucideIcon };

function getVerificationIcons(item: Listing, breeder?: Breeder): VerificationIcon[] {
  const icons: VerificationIcon[] = [];
  if (item.verified) icons.push({ key: 'identity', label: '\uC2E4\uBA85\uC778\uC99D', icon: BadgeCheck });
  if (breeder?.breederType === 'business') icons.push({ key: 'business', label: '\uC0AC\uC5C5\uC790\uC778\uC99D', icon: Store });
  else if (item.verified && breeder) icons.push({ key: 'breeder', label: '\uBE0C\uB9AC\uB354\uC778\uC99D', icon: ShieldCheck });
  return icons.slice(0, 3);
}

function getStageLabel(stage: Listing['stage']) {
  const label = String(stage);
  return label === '\uC720\uCCB4' ? '\uBCA0\uC774\uBE44' : label;
}

function getBadgeLabel(type: HotBadgeType) {
  const labels: Record<HotBadgeType, string> = {
    HOT: 'HOT',
    BEST: 'BEST',
    NEW: 'NEW',
    views: '\uC870\uD68C\uC218 \uAE09\uC0C1\uC2B9',
    comments: '\uB313\uAE00 HOT',
    likes: '\uCC1C \uAE09\uC0C1\uC2B9',
    recommended: '\uCD94\uCC9C',
  };
  return labels[type];
}

function getBadgeStyle(type: HotBadgeType) {
  if (type === 'HOT' || type === 'NEW' || type === 'views') return styles.hotBadgePrimary;
  if (type === 'BEST') return styles.hotBadgeRating;
  return styles.hotBadgeSoft;
}

export function HomeHotListingCard({ item, width }: { item: HotListing; width: number }) {
  const [favorite, setFavorite] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const likes = item.likes + (favorite ? 1 : 0);
  const breeder = breeders.find((entry) => entry.id === item.breederId);
  const statusTone = getStatusTone(item);
  const verificationIcons = getVerificationIcons(item, breeder);
  const tradeMethods = item.tradeMethods?.length ? item.tradeMethods : ['\uC9C1\uAC70\uB798'];

  return (
    <View style={[styles.card, { width }]}>
      <Pressable onPress={() => router.push(`/listing/${item.id}` as never)} style={styles.pressable}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <View style={[styles.statusBadge, { backgroundColor: statusTone.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusTone.color }]}>{item.status}</Text>
          </View>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              setShowReason((current) => !current);
            }}
            style={[styles.hotBadge, getBadgeStyle(item.badgeType)]}
            accessibilityRole="button"
          >
            <Text style={styles.hotBadgeText}>{getBadgeLabel(item.badgeType)}</Text>
          </Pressable>
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
          {showReason ? (
            <View style={styles.reasonPopover}>
              <Text style={styles.reasonTitle}>{popularReasonTitle}</Text>
              <Text style={styles.reasonText}>{item.hotReasons.recentLabel}</Text>
              <Text style={styles.reasonText}>{viewCountLabel} <Text style={styles.reasonHighlight}>+{item.hotReasons.viewsIncreaseRate}%</Text></Text>
              <Text style={styles.reasonText}>{likeLabel} <Text style={styles.reasonHighlight}>+{item.hotReasons.likesIncreaseCount}</Text> · {commentLabel} <Text style={styles.reasonHighlight}>+{item.hotReasons.commentsIncreaseCount}</Text></Text>
            </View>
          ) : null}
        </View>

        <View style={styles.info}>
          <Text style={styles.species} numberOfLines={1}>{item.species}</Text>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

          <View style={styles.stageRow}>
            {[item.sex, getStageLabel(item.stage)].map((label) => (
              <View key={label} style={styles.stageBadge}>
                <Text style={styles.stageText}>{label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.price} numberOfLines={1}>{item.price.toLocaleString()}{currencyUnit}</Text>

          <Text style={styles.metaLine} numberOfLines={1} ellipsizeMode="tail">
            <Text style={styles.metaBreeder}>@{breeder?.name ?? fallbackBreederLabel}</Text>
            <Text style={styles.metaText}> · {item.location}</Text>
          </Text>

          <Text style={styles.tradeMethods} numberOfLines={1}>{tradeMethods.join(' · ')}</Text>

          <View style={styles.hotMetaRow}>
            <View style={styles.hotMetaItem}>
              <Eye size={Typography.small.fontSize + Spacing.xxs} strokeWidth={1.9} color={Colors.subText} />
              <Text style={styles.hotMetaText}>{item.views.toLocaleString()}</Text>
            </View>
            <View style={styles.hotMetaItem}>
              <Heart size={Typography.small.fontSize + Spacing.xxs} strokeWidth={1.9} color={Colors.subText} />
              <Text style={styles.hotMetaText}>{likes.toLocaleString()}</Text>
            </View>
            <View style={styles.hotMetaItem}>
              <MessageCircle size={Typography.small.fontSize + Spacing.xxs} strokeWidth={1.9} color={Colors.subText} />
              <Text style={styles.hotMetaText}>{item.comments.toLocaleString()}</Text>
            </View>
          </View>

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
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    ...Shadows.card,
  },
  pressable: {
    padding: Spacing.lg,
  },
  imageWrap: {
    aspectRatio: 1,
    overflow: 'visible',
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.lg,
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
    color: Colors.card,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  hotBadge: {
    position: 'absolute',
    right: Spacing.sm,
    top: Spacing.sm,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  hotBadgePrimary: {
    backgroundColor: Colors.primary,
  },
  hotBadgeRating: {
    backgroundColor: Colors.rating,
  },
  hotBadgeSoft: {
    backgroundColor: Colors.text,
  },
  hotBadgeText: {
    color: Colors.card,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
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
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  reasonPopover: {
    position: 'absolute',
    right: Spacing.sm,
    top: Spacing.xxl,
    zIndex: 20,
    minWidth: Spacing.xxl * 5,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    padding: Spacing.md,
    ...Shadows.floating,
  },
  reasonTitle: {
    color: Colors.text,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  reasonText: {
    marginTop: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  reasonHighlight: {
    color: Colors.primary,
    fontWeight: Typography.captionBold.fontWeight,
  },
  info: {
    minWidth: 0,
    marginTop: Spacing.sm,
  },
  species: {
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: '400',
  },
  title: {
    marginTop: Spacing.xs,
    color: Colors.text,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  stageRow: {
    height: Typography.caption.lineHeight + Spacing.xxs,
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageBadge: {
    marginRight: Spacing.xs,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  stageText: {
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  price: {
    marginTop: Spacing.sm,
    color: Colors.text,
    fontSize: Typography.price.fontSize,
    lineHeight: Typography.price.lineHeight,
    fontWeight: Typography.price.fontWeight,
  },
  metaLine: {
    marginTop: Spacing.sm,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  metaBreeder: {
    color: Colors.primary,
  },
  metaText: {
    color: Colors.subText,
  },
  tradeMethods: {
    marginTop: Spacing.sm,
    color: Colors.delivery,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
  hotMetaRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotMetaItem: {
    marginRight: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotMetaText: {
    marginLeft: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  verificationRow: {
    height: Spacing.xl - Spacing.xxs,
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationBadge: {
    width: Spacing.xl - Spacing.xxs,
    height: Spacing.xl - Spacing.xxs,
    marginRight: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
});
