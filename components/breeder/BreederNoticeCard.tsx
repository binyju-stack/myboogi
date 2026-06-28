import { AlertCircle, Megaphone } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { BreederNotice } from '@/mockData/breederNotice';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const noticeText = {
  title: '브리더 공지',
  urgent: '긴급공지',
  normal: '운영안내',
} as const;

export function BreederNoticeCard({ notice }: { notice?: BreederNotice }) {
  if (!notice) return null;

  const Icon = notice.isUrgent ? AlertCircle : Megaphone;
  const badgeText = notice.isUrgent ? noticeText.urgent : noticeText.normal;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Megaphone size={Typography.cardTitle.fontSize} strokeWidth={2} color={Colors.primary} />
          <Text style={styles.cardTitle}>{noticeText.title}</Text>
        </View>
        <View style={styles.badge}>
          <Icon size={Typography.cardTitle.fontSize} strokeWidth={2} color={Colors.primary} />
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      </View>

      <Text style={styles.noticeTitle} numberOfLines={2}>{notice.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{notice.description}</Text>
      <Text style={styles.date}>{notice.createdAt}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  titleRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  cardTitle: {
    ...Typography.cardTitle,
    color: Colors.text,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  badgeText: {
    ...Typography.tag,
    color: Colors.primary,
  },
  noticeTitle: {
    ...Typography.bodyBold,
    marginTop: Spacing.md,
    color: Colors.text,
  },
  description: {
    ...Typography.small,
    marginTop: Spacing.xs,
    color: Colors.subText,
  },
  date: {
    ...Typography.caption,
    marginTop: Spacing.sm,
    color: Colors.subText,
  },
});
