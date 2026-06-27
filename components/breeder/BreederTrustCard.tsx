import type { ReactNode } from 'react';
import { CheckCircle, Clock, MessageCircle, ShieldCheck, Star } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { BreederTrust } from '@/mockData/breederTrust';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const trustText = {
  title: '브리더 신뢰지수',
  review: '후기',
  responseRate: '응답률',
  avgResponse: '평균 응답',
  completedDeals: '분양 성공',
  recentActive: '최근 접속',
  verified: '인증 브리더',
  verifiedMeta: '검증된 프로필과 거래 이력을 기반으로 표시됩니다.',
  minute: '분',
  count: '건',
} as const;

function TrustMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricIcon}>{icon}</View>
      <View style={styles.metricText}>
        <Text style={styles.metricValue} numberOfLines={1}>{value}</Text>
        <Text style={styles.metricLabel} numberOfLines={1}>{label}</Text>
      </View>
    </View>
  );
}

export function BreederTrustCard({ trust }: { trust: BreederTrust }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>BREEDER TRUST</Text>
          <Text style={styles.title}>{trustText.title}</Text>
        </View>
        <View style={styles.gradeBadge}>
          <ShieldCheck size={Spacing.lg} strokeWidth={2} color={Colors.primary} />
          <Text style={styles.gradeText}>{trust.trustGrade}</Text>
        </View>
      </View>

      <View style={styles.ratingRow}>
        <Star size={Spacing.lg} strokeWidth={2} color={Colors.rating} fill={Colors.rating} />
        <Text style={styles.ratingText}>{trust.rating.toFixed(1)}</Text>
        <Text style={styles.ratingMeta}>/ {trustText.review} {trust.reviewCount.toLocaleString()}개</Text>
      </View>

      <View style={styles.grid}>
        <TrustMetric icon={<MessageCircle size={Spacing.lg} strokeWidth={2} color={Colors.primary} />} label={trustText.responseRate} value={`${trust.responseRate}%`} />
        <TrustMetric icon={<Clock size={Spacing.lg} strokeWidth={2} color={Colors.primary} />} label={trustText.avgResponse} value={`${trust.avgResponseMinutes}${trustText.minute}`} />
        <TrustMetric icon={<CheckCircle size={Spacing.lg} strokeWidth={2} color={Colors.primary} />} label={trustText.completedDeals} value={`${trust.completedDeals}${trustText.count}`} />
        <TrustMetric icon={<ShieldCheck size={Spacing.lg} strokeWidth={2} color={Colors.primary} />} label={trustText.recentActive} value={trust.recentActiveText} />
      </View>

      {trust.verified ? (
        <View style={styles.verifiedRow}>
          <ShieldCheck size={Spacing.lg} strokeWidth={2} color={Colors.primary} />
          <Text style={styles.verifiedText}>{trustText.verified}</Text>
          <Text style={styles.verifiedMeta}>{trustText.verifiedMeta}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  eyebrow: {
    ...Typography.small,
    color: Colors.primary,
  },
  title: {
    ...Typography.title,
    marginTop: Spacing.xs,
    color: Colors.text,
  },
  gradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  gradeText: {
    ...Typography.captionBold,
    color: Colors.primary,
  },
  ratingRow: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.subtitle,
    marginLeft: Spacing.xs,
    color: Colors.text,
  },
  ratingMeta: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
    color: Colors.subText,
  },
  grid: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  metric: {
    width: '48%',
    minHeight: Spacing.xxl + Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  metricIcon: {
    width: Spacing.xxl,
    height: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  metricText: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  metricValue: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  metricLabel: {
    ...Typography.small,
    marginTop: Spacing.xxs,
    color: Colors.subText,
  },
  verifiedRow: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  verifiedText: {
    ...Typography.captionBold,
    marginLeft: Spacing.xs,
    color: Colors.primary,
  },
  verifiedMeta: {
    ...Typography.small,
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.subText,
  },
});
