import type { ReactNode } from 'react';
import { Activity, CheckCircle, Clock, MessageCircle, ShieldCheck, Star } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { BreederTrust } from '@/mockData/breederTrust';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const trustText = {
  title: '브리더 신뢰점수',
  breeder: '브리더',
  review: '후기',
  responseRate: '응답률',
  avgResponse: '평균 응답',
  completedDeals: '분양 성공',
  recentActive: '최근 접속',
  verified: '인증 브리더',
  minute: '분',
  count: '건',
  gae: '개',
} as const;

function TrustMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricIcon}>{icon}</View>
      <View style={styles.metricText}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel} numberOfLines={1}>{label}</Text>
      </View>
    </View>
  );
}

export function BreederTrustCard({ trust }: { trust: BreederTrust }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>BREEDER TRUST</Text>
          <Text style={styles.title}>{trustText.title}</Text>
        </View>
        <View style={styles.badgeStack}>
          <View style={styles.gradeBadge}>
            <Activity size={Spacing.md} strokeWidth={2} color={Colors.primary} />
            <Text style={styles.gradeText}>{trust.trustGrade} {trustText.breeder}</Text>
          </View>
          {trust.verified ? (
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={Spacing.lg} strokeWidth={2} color={Colors.primary} />
              <Text style={styles.verifiedBadgeText}>{trustText.verified}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.ratingRow}>
        <Star size={Spacing.lg} strokeWidth={2} color={Colors.rating} fill={Colors.rating} />
        <Text style={styles.ratingText}>{trust.rating.toFixed(1)}</Text>
        <Text style={styles.ratingMeta}>/ {trustText.review} {trust.reviewCount.toLocaleString()}{trustText.gae}</Text>
      </View>

      <View style={styles.grid}>
        <TrustMetric icon={<MessageCircle size={Spacing.md} strokeWidth={2} color={Colors.primary} />} label={trustText.responseRate} value={`${trust.responseRate}%`} />
        <TrustMetric icon={<Clock size={Spacing.md} strokeWidth={2} color={Colors.primary} />} label={trustText.avgResponse} value={`${trust.avgResponseMinutes}${trustText.minute}`} />
        <TrustMetric icon={<CheckCircle size={Spacing.md} strokeWidth={2} color={Colors.primary} />} label={trustText.completedDeals} value={`${trust.completedDeals}${trustText.count}`} />
        <TrustMetric icon={<Activity size={Spacing.md} strokeWidth={2} color={Colors.primary} />} label={trustText.recentActive} value={trust.recentActiveText} />
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
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  eyebrow: {
    ...Typography.small,
    color: Colors.primary,
  },
  title: {
    ...Typography.trustTitle,
    marginTop: Spacing.xxs,
    color: Colors.text,
  },
  badgeStack: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  gradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  gradeText: {
    ...Typography.badge,
    color: Colors.primary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
  },
  verifiedBadgeText: {
    ...Typography.badge,
    color: Colors.primary,
  },
  ratingRow: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.ratingValue,
    marginLeft: Spacing.xs,
    color: Colors.text,
  },
  ratingMeta: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
    color: Colors.subText,
  },
  grid: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  metric: {
    width: '49%',
    minHeight: Spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  metricIcon: {
    width: Spacing.lg,
    height: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  metricText: {
    flex: 1,
    marginLeft: Spacing.xs,
  },
  metricValue: {
    ...Typography.statValue,
    lineHeight: Typography.statValue.lineHeight,
    color: Colors.text,
  },
  metricLabel: {
    ...Typography.statLabel,
    marginTop: Spacing.xxs,
    color: Colors.subText,
  },
});
