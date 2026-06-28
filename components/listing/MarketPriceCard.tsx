import { BarChart3, Info, TrendingUp } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { MarketPriceReference } from '@/mockData/marketPrice';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const cardText = {
  title: '비슷한 개체 가격대',
  subtitle: '최근 등록가 기준 참고 가격대예요',
  average: '평균',
  samplePrefix: '최근 등록',
  sampleSuffix: '건 기준',
  notice: '개체 상태, 혈통, 패턴, 성별에 따라 실제 가격은 달라질 수 있어요.',
  similar: '현재 분양가는 평균과 비슷해요',
} as const;

function formatPrice(value: number) {
  return `${value.toLocaleString()}원`;
}

function getCompareText(comparedToAverage: number) {
  if (Math.abs(comparedToAverage) <= 5) return cardText.similar;
  if (comparedToAverage > 0) return `현재 분양가는 평균보다 ${comparedToAverage}% 높아요`;
  return `현재 분양가는 평균보다 ${Math.abs(comparedToAverage)}% 낮아요`;
}

export function MarketPriceCard({ marketPrice }: { marketPrice: MarketPriceReference }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{cardText.title}</Text>
          <Text style={styles.subtitle}>{cardText.subtitle}</Text>
        </View>
        <View style={styles.iconBox}>
          <BarChart3 size={Typography.title.fontSize} strokeWidth={2} color={Colors.primary} />
        </View>
      </View>

      <View style={styles.conditionBox}>
        <Text style={styles.conditionTitle} numberOfLines={1}>
          {marketPrice.species} · {marketPrice.morph}
        </Text>
        <Text style={styles.conditionText} numberOfLines={1}>{marketPrice.conditionLabel}</Text>
      </View>

      <View style={styles.rangeBlock}>
        <Text style={styles.rangeText}>{formatPrice(marketPrice.minPrice)} ~ {formatPrice(marketPrice.maxPrice)}</Text>
        <Text style={styles.avgText}>{cardText.average} {formatPrice(marketPrice.avgPrice)}</Text>
      </View>

      <View style={styles.barTrack}>
        <View style={styles.barFill} />
        <View style={styles.avgMarker} />
      </View>
      <View style={styles.barLabels}>
        <Text style={styles.barLabel}>min</Text>
        <Text style={styles.barLabel}>avg</Text>
        <Text style={styles.barLabel}>max</Text>
      </View>

      <View style={styles.compareBox}>
        <TrendingUp size={Spacing.lg} strokeWidth={2} color={Colors.primary} />
        <Text style={styles.compareText}>{getCompareText(marketPrice.comparedToAverage)}</Text>
      </View>

      <Text style={styles.sampleText}>
        {cardText.samplePrefix} {marketPrice.sampleCount.toLocaleString()}{cardText.sampleSuffix}
      </Text>

      <View style={styles.noticeRow}>
        <Info size={Spacing.lg} strokeWidth={2} color={Colors.subText} />
        <Text style={styles.noticeText}>{cardText.notice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    marginTop: Spacing.xxs,
    color: Colors.subText,
  },
  iconBox: {
    width: Spacing.xxl + Spacing.sm,
    height: Spacing.xxl + Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  conditionBox: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  conditionTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  conditionText: {
    ...Typography.caption,
    marginTop: Spacing.xxs,
    color: Colors.subText,
  },
  rangeBlock: {
    marginTop: Spacing.lg,
  },
  rangeText: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  avgText: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    color: Colors.subText,
  },
  barTrack: {
    height: Spacing.sm,
    marginTop: Spacing.lg,
    overflow: 'hidden',
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
  },
  barFill: {
    width: '72%',
    height: '100%',
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
  },
  avgMarker: {
    position: 'absolute',
    left: '48%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.primary,
  },
  barLabels: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    ...Typography.caption,
    color: Colors.subText,
  },
  compareBox: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  compareText: {
    ...Typography.captionBold,
    flex: 1,
    color: Colors.primary,
  },
  sampleText: {
    ...Typography.caption,
    marginTop: Spacing.sm,
    color: Colors.subText,
  },
  noticeRow: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  noticeText: {
    ...Typography.caption,
    flex: 1,
    color: Colors.subText,
  },
});
