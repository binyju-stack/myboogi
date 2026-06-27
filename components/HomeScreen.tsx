import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ChevronRight, Star, Zap } from 'lucide-react-native';

import { homeBanners } from '@/data/homeScreenData';
import { breederReviews, breeders, listings, posts } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import { homeColumns } from '@/mockData/homeColumns';
import { getHotListings } from '@/mockData/hotListings';
import { Colors, Radius, Spacing, Typography } from '@/theme';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { AppHeader } from './AppHeader';
import { Avatar } from './common';
import { ListingGridCard } from './ListingGridCard';
import { HomeHotListingCard } from './HomeHotListingCard';
import { BillboardTicker } from './BillboardTicker';
import { AppDivider } from './ui/AppDivider';
import { Page } from './screen';
import { AnimatedSectionIcon, type AnimatedSectionIconType } from './ui/AnimatedSectionIcon';

const middleDot = '\u00B7';

const copy = {
  appTitle: '\uB9C8\uC774\uBD80\uAE30',
  more: '\uB354\uBCF4\uAE30',
  bannerTitle: '\uBBFF\uC744 \uC218 \uC788\uB294 \uAC70\uBD81\uC774 \uBD84\uC591',
  bannerSubtitle: '\uC778\uC99D \uBE0C\uB9AC\uB354\uC758 \uC0C8 \uBD84\uC591\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694.',
  hotPrefix: '\uC9C0\uAE08 \uD56B\uD55C ',
  hotHighlight: '\uBD80\uAE30\uB4E4',
  popularBreeders: '\uC624\uB298\uC758 \uC778\uAE30 \uBE0C\uB9AC\uB354',
  community: '\uC2E4\uC2DC\uAC04 \uCEE4\uBBA4\uB2C8\uD2F0',
  comments: '\uB313\uAE00',
  likes: '\uC88B\uC544\uC694',
  rating: '\uD3C9\uC810',
  reviewCount: '\uD6C4\uAE30',
  reviews: '\uCD5C\uADFC \uD6C4\uAE30',
  breeder: '\uBE0C\uB9AC\uB354',
  verified: '\uC778\uC99D',
  columns: '\uBD80\uAE30 \uCE7C\uB7FC',
  newListings: '\uC2E0\uADDC \uBD84\uC591',
  listingMore: '\uBD84\uC591\uAE00 \uB354\uBCF4\uAE30',
};

function HomeHeader() {
  return <AppHeader title={copy.appTitle} subtitle="오늘 신규분양 12건 · 인증브리더 4명" showSearch showHeart showBell />;
}

function SectionHeader({
  title,
  animationType,
  onPress,
}: {
  title: string;
  animationType: AnimatedSectionIconType;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <AnimatedSectionIcon type={animationType} animationType={animationType} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {onPress ? (
        <Pressable onPress={onPress} style={styles.sectionMoreButton}>
          <Text style={styles.sectionMoreText}>{copy.more}</Text>
          <ChevronRight size={14} strokeWidth={1.8} color={Colors.comment} />
        </Pressable>
      ) : null}
    </View>
  );
}

function Section({
  title,
  animationType,
  onPress,
  children,
  topSpacing = Spacing.xl,
}: {
  title: string;
  animationType: AnimatedSectionIconType;
  onPress?: () => void;
  children: ReactNode;
  topSpacing?: number;
}) {
  return (
    <View style={{ marginTop: topSpacing }}>
      <SectionHeader title={title} animationType={animationType} onPress={onPress} />
      {children}
    </View>
  );
}

function MainBanner() {
  const banner = homeBanners[0];

  if (!banner) return null;

  return (
    <AnimatedPressable onPress={() => router.push('/marketplace')} style={styles.mainBanner}>
      <Image source={{ uri: banner.image }} style={styles.mainBannerImage} resizeMode="cover" />
      <View style={styles.mainBannerOverlay} />
      <View style={styles.mainBannerText}>
        <Text style={styles.mainBannerTitle} numberOfLines={2}>{copy.bannerTitle}</Text>
        <Text style={styles.mainBannerSubtitle} numberOfLines={2}>{copy.bannerSubtitle}</Text>
      </View>
    </AnimatedPressable>
  );
}

function HotTitle() {
  return (
    <View style={styles.hotTitleRow}>
      <Text style={styles.hotTitle}>{copy.hotPrefix}</Text>
      <Text style={styles.hotTitleHighlight}>{copy.hotHighlight}</Text>
      <Zap size={18} strokeWidth={2.1} color={Colors.rating} style={styles.hotZap} />
    </View>
  );
}

function HotSectionHeader({ onPress }: { onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <HotTitle />
      {onPress ? (
        <Pressable onPress={onPress} style={styles.sectionMoreButton}>
          <Text style={styles.sectionMoreText}>{copy.more}</Text>
          <ChevronRight size={14} strokeWidth={1.8} color={Colors.comment} />
        </Pressable>
      ) : null}
    </View>
  );
}

function HotListingsSection() {
  const hotListings = getHotListings(listings);

  return (
    <View style={styles.hotSection}>
      <HotSectionHeader onPress={() => router.push('/marketplace')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {hotListings.map((listing, index) => (
          <FadeInView key={listing.id} delay={index * 45}>
            <View style={styles.hotCardWrap}>
              <HomeHotListingCard item={listing} width={214} />
            </View>
          </FadeInView>
        ))}
      </ScrollView>
    </View>
  );
}

function PopularBreedersSection() {
  return (
    <Section title={copy.popularBreeders} animationType="award" onPress={() => router.push('/marketplace')} topSpacing={0}>
      <View style={styles.plainSectionBody}>
        {breeders.slice(0, 3).map((breeder, index) => {
          const summary = getReviewSummary(breeder.id);
          return (
            <AnimatedPressable
              key={breeder.id}
              onPress={() => router.push(`/breeder/${breeder.id}` as never)}
              style={[styles.breederItem, index ? styles.lightTopBorder : null]}
            >
              <Avatar uri={breeder.logo ?? breeder.avatar} size={54} />
              <View style={styles.breederInfo}>
                <View style={styles.breederNameRow}>
                  <Text style={styles.breederName} numberOfLines={1}>{breeder.name}</Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>{copy.verified}</Text>
                  </View>
                </View>
                <Text style={styles.breederMeta} numberOfLines={1}>{breeder.specialty ?? breeder.location}</Text>
                <View style={styles.breederRatingRow}>
                  <Star size={13} strokeWidth={1.9} color={Colors.rating} fill={Colors.rating} />
                  <Text style={styles.breederRatingText}>{summary.averageRating.toFixed(1)}</Text>
                  <Text style={styles.breederReviewText}>{middleDot} {copy.reviewCount} {summary.totalReviews.toLocaleString()}</Text>
                </View>
              </View>
              <ChevronRight size={17} color={Colors.subText} />
            </AnimatedPressable>
          );
        })}
      </View>
    </Section>
  );
}

function CommunitySection() {
  return (
    <Section title={copy.community} animationType="community" onPress={() => router.push('/community')} topSpacing={0}>
      <View style={styles.plainSectionBody}>
        {posts.slice(0, 4).map((post, index) => (
          <AnimatedPressable
            key={post.id}
            onPress={() => router.push(`/community/${post.id}` as never)}
            style={[styles.communityItem, index ? styles.communityDivider : null]}
          >
            <View style={styles.communityTopRow}>
              <Text style={styles.categoryBadge}>{post.category}</Text>
              <Text style={styles.communityAuthor} numberOfLines={1}>@{post.author}</Text>
            </View>
            <Text style={styles.communityTitle} numberOfLines={2}>{post.title}</Text>
            <View style={styles.communityMetaRow}>
              <Text style={styles.communityMeta} numberOfLines={1}>{post.createdAt}</Text>
              <Text style={styles.communityMeta}>{middleDot}</Text>
              <Text style={styles.communityMeta}>{copy.comments} {post.comments.toLocaleString()}</Text>
              <Text style={styles.communityMeta}>{middleDot}</Text>
              <Text style={styles.communityMeta}>{copy.likes} {post.likes.toLocaleString()}</Text>
            </View>
          </AnimatedPressable>
        ))}
      </View>
    </Section>
  );
}

function RecentReviewsSection() {
  return (
    <Section title={copy.reviews} animationType="review" onPress={() => router.push('/mypage/reviews')} topSpacing={0}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {breederReviews.slice(0, 4).map((review, index) => {
          const breeder = breeders.find((item) => item.id === review.breederId);
          return (
            <FadeInView key={review.id} delay={index * 45}>
              <AnimatedPressable
                onPress={() => router.push(`/breeder/${review.breederId}` as never)}
                style={styles.reviewCard}
              >
                <View style={styles.reviewHeader}>
                  <Avatar uri={breeder?.logo ?? breeder?.avatar ?? review.avatar} size={36} />
                  <View style={styles.reviewBreederInfo}>
                    <Text style={styles.reviewBreederName} numberOfLines={1}>{breeder?.name ?? copy.breeder}</Text>
                    <Text style={styles.reviewSpecies} numberOfLines={1}>{review.species}</Text>
                  </View>
                </View>
                <Text style={styles.reviewContent} numberOfLines={2}>{review.content}</Text>
                <View style={styles.reviewFooter}>
                  <View style={styles.ratingRow}>
                    <View style={styles.starRow}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={11}
                          strokeWidth={1.8}
                          color={Colors.rating}
                          fill={starIndex < Math.round(review.rating) ? Colors.rating : 'transparent'}
                        />
                      ))}
                    </View>
                    <Text style={styles.ratingText}>{review.rating.toFixed(1)}</Text>
                  </View>
                  <Text style={styles.reviewDate}>{review.createdAt}</Text>
                </View>
              </AnimatedPressable>
            </FadeInView>
          );
        })}
      </ScrollView>
    </Section>
  );
}

function BoogiColumnsSection() {
  return (
    <Section title={copy.columns} animationType="book" onPress={() => router.push('/community')} topSpacing={0}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {homeColumns.map((column, index) => (
          <FadeInView key={column.id} delay={index * 45}>
            <AnimatedPressable onPress={() => router.push(column.route as never)} style={styles.columnCard}>
              <Image source={{ uri: column.thumbnail }} style={styles.columnImage} resizeMode="cover" />
              <View style={styles.columnBody}>
                <Text style={styles.columnCategory}>{column.category}</Text>
                <Text style={styles.columnTitle} numberOfLines={2}>{column.title}</Text>
                <Text style={styles.columnDescription} numberOfLines={2}>{column.description}</Text>
              </View>
            </AnimatedPressable>
          </FadeInView>
        ))}
      </ScrollView>
    </Section>
  );
}

function NewListingsSection() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - Spacing.lg * 2 - Spacing.md) / 2);
  const recentListings = [...listings]
    .sort((a, b) => (b.listedAt ?? '').localeCompare(a.listedAt ?? ''))
    .slice(0, 4);

  return (
    <Section title={copy.newListings} animationType="new" onPress={() => router.push('/marketplace')} topSpacing={0}>
      <View style={styles.newListingGrid}>
        {recentListings.map((listing, index) => (
          <ListingGridCard key={listing.id} item={listing} index={index} width={cardWidth} />
        ))}
      </View>
      <Pressable onPress={() => router.push('/marketplace')} style={styles.moreListingsButton}>
        <Text style={styles.moreListingsText}>{copy.listingMore}</Text>
      </Pressable>
    </Section>
  );
}

export function HomeScreen() {
  return (
    <Page backgroundColor={Colors.background}>
      <HomeHeader />
      <BillboardTicker category="home" />
      <MainBanner />
      <HotListingsSection />
      <AppDivider />
      <PopularBreedersSection />
      <AppDivider />
      <CommunitySection />
      <AppDivider />
      <RecentReviewsSection />
      <AppDivider />
      <BoogiColumnsSection />
      <AppDivider />
      <NewListingsSection />
    </Page>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginLeft: Spacing.sm,
    color: Colors.text,
    fontSize: Typography.title.fontSize,
    lineHeight: Typography.title.lineHeight,
    fontWeight: Typography.title.fontWeight,
  },
  sectionMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingLeft: Spacing.md,
  },
  sectionMoreText: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  mainBanner: {
    height: 180,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    overflow: 'hidden',
    borderRadius: Radius.lg,
    backgroundColor: Colors.text,
  },
  mainBannerImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  mainBannerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.overlay,
  },
  mainBannerText: {
    position: 'absolute',
    left: Spacing.xl,
    right: Spacing.xl,
    top: '50%',
    transform: [{ translateY: -34 }],
  },
  mainBannerTitle: {
    color: Colors.card,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: Typography.title.fontWeight,
  },
  mainBannerSubtitle: {
    marginTop: Spacing.sm,
    color: Colors.card,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
  hotSection: {
    marginTop: Spacing.xl,
  },
  hotTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotTitle: {
    color: Colors.text,
    fontSize: Typography.title.fontSize + 1,
    lineHeight: Typography.title.lineHeight,
    fontWeight: Typography.title.fontWeight,
  },
  hotTitleHighlight: {
    color: Colors.primary,
    fontSize: Typography.title.fontSize + 1,
    lineHeight: Typography.title.lineHeight,
    fontWeight: Typography.title.fontWeight,
  },
  hotZap: {
    marginLeft: Spacing.xs + Spacing.xxs,
  },
  horizontalList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  hotCardWrap: {
    marginRight: Spacing.md,
  },
  plainSectionBody: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
  },
  breederItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  lightTopBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  breederInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: Spacing.md,
  },
  breederNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breederName: {
    flexShrink: 1,
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize + 1,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  verifiedBadge: {
    marginLeft: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  verifiedText: {
    color: Colors.primary,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: Typography.captionBold.fontWeight,
  },
  breederMeta: {
    marginTop: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize + 1,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: '400',
  },
  breederRatingRow: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  breederRatingText: {
    marginLeft: Spacing.xs,
    color: Colors.rating,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  breederReviewText: {
    marginLeft: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  communityItem: {
    paddingVertical: Spacing.lg + Spacing.xs,
  },
  communityDivider: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  communityTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    overflow: 'hidden',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
    color: Colors.delivery,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + Spacing.xxs,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  communityAuthor: {
    marginLeft: Spacing.sm,
    color: Colors.primary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  communityTitle: {
    marginTop: Spacing.sm,
    color: Colors.text,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '600',
  },
  communityMetaRow: {
    marginTop: Spacing.sm + Spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityMeta: {
    marginRight: Spacing.sm,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: '400',
  },
  reviewCard: {
    width: 276,
    marginRight: Spacing.md,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewBreederInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: Spacing.md,
  },
  reviewBreederName: {
    color: Colors.primary,
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.body.lineHeight,
    fontWeight: '600',
  },
  reviewSpecies: {
    marginTop: Spacing.xxs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: '400',
  },
  reviewContent: {
    marginTop: Spacing.md,
    color: Colors.text,
    fontSize: Typography.caption.fontSize + 1,
    lineHeight: Typography.button.lineHeight,
    fontWeight: '400',
  },
  reviewFooter: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: Spacing.xs + Spacing.xxs,
    color: Colors.rating,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  reviewDate: {
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: '400',
  },
  columnCard: {
    width: 250,
    marginRight: Spacing.md,
    backgroundColor: Colors.card,
  },
  columnImage: {
    width: '100%',
    height: 116,
    borderRadius: Radius.md,
  },
  columnBody: {
    padding: Spacing.lg,
  },
  columnCategory: {
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  columnTitle: {
    marginTop: Spacing.xs + Spacing.xxs,
    color: Colors.text,
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: '600',
  },
  columnDescription: {
    marginTop: Spacing.sm,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: '400',
  },
  newListingGrid: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moreListingsButton: {
    height: Spacing.xxl + Spacing.lg,
    marginHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  moreListingsText: {
    color: Colors.text,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
});

