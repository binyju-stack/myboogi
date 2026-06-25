import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

const filledColor = '#FFC83D';
const emptyColor = '#DDE2E8';

export function StarRating({
  rating,
  size = 14,
  showValue = true,
  selectable = false,
  onChange,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  selectable?: boolean;
  onChange?: (rating: number) => void;
}) {
  const starProgress = useMemo(() => Array.from({ length: 5 }, () => new Animated.Value(0)), []);
  const bumpProgress = useMemo(() => Array.from({ length: 5 }, () => new Animated.Value(1)), []);
  const roundedRating = Math.round(rating);
  const ratingText = Number.isInteger(rating) ? rating.toFixed(1) : rating.toFixed(1);

  useEffect(() => {
    Animated.stagger(
      90,
      starProgress.map((progress) =>
        Animated.spring(progress, {
          toValue: 1,
          useNativeDriver: true,
          speed: 18,
          bounciness: 5,
        }),
      ),
    ).start();
  }, [starProgress]);

  const pressStar = (value: number) => {
    if (!selectable) return;

    onChange?.(value);
    const progress = bumpProgress[value - 1];
    progress.setValue(0.88);
    Animated.spring(progress, {
      toValue: 1,
      useNativeDriver: true,
      speed: 22,
      bounciness: 8,
    }).start();
  };

  return (
    <View className="flex-row items-center">
      {starProgress.map((progress, index) => {
        const value = index + 1;
        const filled = value <= roundedRating;
        const star = (
          <Animated.View
            style={{
              opacity: progress,
              transform: [
                { scale: Animated.multiply(progress.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }), bumpProgress[index]) },
              ],
            }}
          >
            <Ionicons name={filled ? 'star' : 'star-outline'} size={size} color={filled ? filledColor : emptyColor} />
          </Animated.View>
        );

        return selectable ? (
          <Pressable key={value} onPress={() => pressStar(value)} className="pr-1.5 py-1">
            {star}
          </Pressable>
        ) : (
          <View key={value} className="pr-0.5">
            {star}
          </View>
        );
      })}
      {showValue ? <Text className="ml-1.5 text-[11px] font-bold text-ink">{ratingText}</Text> : null}
    </View>
  );
}

export function ReviewTypeBadge({ type }: { type: 'general' | 'contact_based' | 'verified_trade' }) {
  const meta = {
    general: { label: '일반 후기', className: 'bg-soft text-muted' },
    contact_based: { label: '문의 기반 후기', className: 'bg-blush text-berry' },
    verified_trade: { label: '실거래 인증', className: 'bg-blue text-[#4593D6]' },
  }[type];

  return (
    <View className={`self-start rounded-full px-2.5 py-1.5 ${meta.className.split(' ')[0]}`}>
      <Text className={`text-[9px] font-bold ${meta.className.split(' ')[1]}`}>{meta.label}</Text>
    </View>
  );
}

export function ReviewRatingSummary({
  rating,
  reviewCount,
  size = 18,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <View>
      <StarRating rating={rating} size={size} showValue={false} />
      <Text className="mt-1.5 text-[11px] font-bold text-ink">
        평점 {rating.toFixed(1)}{typeof reviewCount === 'number' ? ` · 후기 ${reviewCount.toLocaleString()}개` : ''}
      </Text>
    </View>
  );
}

export function ReviewTrustNote() {
  return (
    <View className="rounded-[18px] bg-soft px-4 py-3">
      <Text className="text-[10px] font-bold text-ink">후기 신뢰도 안내</Text>
      <Text className="mt-1 text-[10px] leading-5 text-muted">
        현재 후기는 문의 이력을 기반으로 작성됩니다. 실거래 인증 후기는 추후 안전결제 연동 후 제공됩니다.
      </Text>
    </View>
  );
}

export const starColors = {
  filled: filledColor,
  empty: emptyColor,
  accent: colors.berry,
};
