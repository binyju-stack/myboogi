import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Megaphone } from 'lucide-react-native';

import { getBillboardItemsByCategory } from '@/mocks/billboard';
import { Colors, Motion, Radius, Spacing, Typography } from '@/theme';
import type { BillboardCategory, BillboardDisplayItem } from '@/types/billboard';

type BillboardTickerProps = {
  category: BillboardCategory;
};

const label = '\uC804\uAD11\uD310';
const adLabel = 'AD';
const separator = '\u2022';

function getTickerRoute(item: BillboardDisplayItem) {
  switch (item.type) {
    case 'listing':
      return `/listing/${item.targetId}`;
    case 'breeder':
      return `/breeder/${item.targetId}`;
    case 'post':
      return `/community/${item.targetId}`;
    case 'notice':
      return `/notices/${item.targetId}`;
    default:
      return null;
  }
}

function getRemainingLabel(expiresAt?: string) {
  if (!expiresAt) {
    return null;
  }

  const endTime = new Date(expiresAt).getTime();
  if (Number.isNaN(endTime)) {
    return null;
  }

  const remainingMs = endTime - Date.now();
  if (remainingMs <= 0) {
    return '\uC624\uB298 \uC885\uB8CC';
  }

  const remainingMinutes = Math.ceil(remainingMs / 60000);
  if (remainingMinutes < 60) {
    return `${remainingMinutes}\uBD84 \uB0A8\uC74C`;
  }

  const remainingHours = Math.ceil(remainingMinutes / 60);
  if (remainingHours < 24) {
    return `${remainingHours}\uC2DC\uAC04 \uB0A8\uC74C`;
  }

  return `${Math.ceil(remainingHours / 24)}\uC77C \uB0A8\uC74C`;
}

function getTickerTitle(item: BillboardDisplayItem) {
  const remainingLabel = getRemainingLabel(item.expiresAt);
  return remainingLabel ? `${item.title} \u00B7 ${remainingLabel}` : item.title;
}

function MarqueeGroup({ items }: { items: BillboardDisplayItem[] }) {
  return (
    <View style={styles.marqueeGroup}>
      {items.map((item) => (
        <View key={item.id} style={styles.marqueeItem}>
          <Text style={styles.title} numberOfLines={1}>{getTickerTitle(item)}</Text>
          <Text style={styles.separator}>{separator}</Text>
        </View>
      ))}
    </View>
  );
}

export function BillboardTicker({ category }: BillboardTickerProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const items = useMemo(() => getBillboardItemsByCategory(category), [category]);
  const firstItem = items[0];

  useEffect(() => {
    if (!groupWidth || !items.length) return undefined;

    let isMounted = true;

    const startMarquee = () => {
      translateX.stopAnimation();
      translateX.setValue(0);

      animationRef.current = Animated.timing(translateX, {
        toValue: -groupWidth,
        duration: Motion.duration.marquee,
        easing: Motion.easing.linear,
        useNativeDriver: true,
      });

      animationRef.current.start(({ finished }) => {
        if (finished && isMounted) {
          startMarquee();
        }
      });
    };

    animationRef.current?.stop();
    startMarquee();

    return () => {
      isMounted = false;
      animationRef.current?.stop();
      animationRef.current = null;
      translateX.stopAnimation();
      translateX.setValue(0);
    };
  }, [groupWidth, items.length, translateX]);

  if (!firstItem) {
    return null;
  }

  const handlePress = () => {
    const nextRoute = getTickerRoute(firstItem);

    if (!nextRoute) {
      console.log('[BillboardTicker] fallback', firstItem);
      return;
    }

    router.push(nextRoute as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelGroup}>
        <Megaphone size={Typography.subtitle.fontSize} strokeWidth={2} color={Colors.primary} />
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </View>
      <View style={styles.divider} />
      <Pressable
        style={({ pressed }) => [styles.marqueePressable, pressed ? styles.marqueePressed : null]}
        onPress={handlePress}
        accessibilityRole="button"
      >
        <View style={styles.marqueeViewport}>
          <Animated.View style={[styles.marqueeTrack, { transform: [{ translateX }] }]}>
            <View
              onLayout={(event) => {
                const nextWidth = event.nativeEvent.layout.width;
                setGroupWidth((current) => (Math.abs(current - nextWidth) > 1 ? nextWidth : current));
              }}
            >
              <MarqueeGroup items={items} />
            </View>
            <MarqueeGroup items={items} />
            <MarqueeGroup items={items} />
          </Animated.View>
        </View>
      </Pressable>
      <View style={styles.adBadge}>
        <Text style={styles.adBadgeText}>{adLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Spacing.xxl + Spacing.md + Spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.text,
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.sm,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  label: {
    marginLeft: Spacing.xs,
    color: Colors.card,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: Typography.title.lineHeight,
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.border,
  },
  marqueePressable: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  marqueePressed: {
    opacity: Motion.scale.pressed,
  },
  marqueeViewport: {
    overflow: 'hidden',
  },
  marqueeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.card,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  separator: {
    marginHorizontal: Spacing.md,
    color: Colors.primary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  adBadge: {
    marginLeft: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
  },
  adBadgeText: {
    color: Colors.primary,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
});







