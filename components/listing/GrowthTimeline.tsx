import { Image, StyleSheet, Text, View } from 'react-native';

import type { GrowthTimelineItem } from '@/mockData/breederTrust';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const growthText = {
  title: '성장 타임라인',
  weight: '몸무게',
  shell: '등갑',
} as const;

function TimelinePill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={styles.pillValue}>{value}</Text>
    </View>
  );
}

export function GrowthTimeline({ items }: { items: GrowthTimelineItem[] }) {
  if (!items.length) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>GROWTH LOG</Text>
      <Text style={styles.title}>{growthText.title}</Text>

      <View style={styles.timeline}>
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <View key={item.id} style={styles.item}>
              <View style={styles.markerColumn}>
                <View style={styles.marker} />
                {!last ? <View style={styles.line} /> : null}
              </View>

              <View style={styles.content}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleGroup}>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.age}>{item.ageLabel}</Text>
                  </View>
                  {item.imageSource ? <Image source={item.imageSource} style={styles.thumbnail} resizeMode="cover" /> : null}
                </View>

                <View style={styles.metaRow}>
                  <TimelinePill label={growthText.weight} value={item.weight} />
                  <TimelinePill label={growthText.shell} value={item.shellLength} />
                </View>

                <Text style={styles.note}>{item.note}</Text>
              </View>
            </View>
          );
        })}
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
  eyebrow: {
    ...Typography.small,
    color: Colors.primary,
  },
  title: {
    ...Typography.title,
    marginTop: Spacing.xs,
    color: Colors.text,
  },
  timeline: {
    marginTop: Spacing.lg,
  },
  item: {
    flexDirection: 'row',
  },
  markerColumn: {
    width: Spacing.xl,
    alignItems: 'center',
  },
  marker: {
    width: Spacing.md,
    height: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
  line: {
    flex: 1,
    width: StyleSheet.hairlineWidth,
    marginTop: Spacing.xs,
    backgroundColor: Colors.border,
  },
  content: {
    flex: 1,
    paddingBottom: Spacing.lg,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  itemTitleGroup: {
    flex: 1,
  },
  date: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  age: {
    ...Typography.caption,
    marginTop: Spacing.xxs,
    color: Colors.subText,
  },
  thumbnail: {
    width: Spacing.xxl + Spacing.xl,
    height: Spacing.xxl + Spacing.xl,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  metaRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
  },
  pillLabel: {
    ...Typography.small,
    color: Colors.subText,
  },
  pillValue: {
    ...Typography.captionBold,
    color: Colors.text,
  },
  note: {
    ...Typography.caption,
    marginTop: Spacing.sm,
    color: Colors.subText,
  },
});
