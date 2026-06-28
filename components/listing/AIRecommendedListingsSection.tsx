import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Eye, Heart, MessageCircle, Sparkles } from 'lucide-react-native';

import type { AIRecommendedListing } from '@/mockData/aiRecommendations';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const sectionText = {
  title: 'AI 추천 개체',
  subtitle: '최근 관심사와 인기 반응을 바탕으로 골랐어요',
  badge: 'AI 추천',
  match: '매칭',
} as const;

const currencyUnit = '원';
const separator = ' · ';

function RecommendationCard({ item, width }: { item: AIRecommendedListing; width: number }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(('/listing/' + item.targetListingId) as never)}
      style={[styles.card, { width }]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.aiBadge}>
          <Sparkles size={Spacing.lg} strokeWidth={2} color={Colors.primary} />
          <Text style={styles.aiBadgeText}>{sectionText.badge}</Text>
        </View>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{sectionText.match} {item.matchScore}%</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.species} numberOfLines={1}>{item.species}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

        <View style={styles.tagRow}>
          {[item.gender, item.age].map((label) => (
            <View key={label} style={styles.tag}>
              <Text style={styles.tagText}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.price} numberOfLines={1}>{item.price.toLocaleString()}{currencyUnit}</Text>
        <Text style={styles.breederMeta} numberOfLines={1}>{item.breederName}{separator}{item.location}</Text>
        <Text style={styles.reason} numberOfLines={2}>{item.recommendationReason}</Text>

        <View style={styles.metricRow}>
          <View style={styles.metricItem}>
            <Eye size={Spacing.lg} strokeWidth={1.9} color={Colors.subText} />
            <Text style={styles.metricText}>{item.views.toLocaleString()}</Text>
          </View>
          <View style={styles.metricItem}>
            <Heart size={Spacing.lg} strokeWidth={1.9} color={Colors.subText} />
            <Text style={styles.metricText}>{item.likes.toLocaleString()}</Text>
          </View>
          <View style={styles.metricItem}>
            <MessageCircle size={Spacing.lg} strokeWidth={1.9} color={Colors.subText} />
            <Text style={styles.metricText}>{item.comments.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function AIRecommendedListingsSection({ items, compact = false }: { items: AIRecommendedListing[]; compact?: boolean }) {
  if (!items.length) return null;

  const cardWidth = compact ? Spacing.xxl * 6 : Spacing.xxl * 7;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Sparkles size={Spacing.lg} strokeWidth={2} color={Colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.sectionTitle}>{sectionText.title}</Text>
          <Text style={styles.sectionSubtitle}>{sectionText.subtitle}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {items.map((item) => (
          <RecommendationCard key={item.id} item={item} width={cardWidth} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.xl,
  },
  header: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: Spacing.xxl,
    height: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    marginLeft: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.text,
  },
  sectionSubtitle: {
    ...Typography.small,
    marginTop: Spacing.xxs,
    color: Colors.subText,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xs,
    gap: Spacing.md,
  },
  card: {
    overflow: 'hidden',
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    ...Shadows.card,
  },
  imageWrap: {
    aspectRatio: 1,
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  aiBadge: {
    position: 'absolute',
    left: Spacing.sm,
    top: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderRadius: Radius.pill,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  aiBadgeText: {
    ...Typography.captionBold,
    color: Colors.primary,
  },
  matchBadge: {
    position: 'absolute',
    right: Spacing.sm,
    bottom: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.overlay,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  matchText: {
    ...Typography.captionBold,
    color: Colors.card,
  },
  body: {
    padding: Spacing.lg,
  },
  species: {
    ...Typography.small,
    color: Colors.subText,
  },
  title: {
    ...Typography.description,
    marginTop: Spacing.xs,
    color: Colors.text,
  },
  tagRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  tag: {
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  tagText: {
    ...Typography.small,
    color: Colors.subText,
  },
  price: {
    ...Typography.price,
    marginTop: Spacing.sm,
    color: Colors.text,
  },
  breederMeta: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    color: Colors.subText,
  },
  reason: {
    ...Typography.caption,
    marginTop: Spacing.sm,
    color: Colors.subText,
  },
  metricRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  metricText: {
    ...Typography.small,
    color: Colors.subText,
  },
});