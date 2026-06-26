import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ChevronRight, MessageCircle, Star, Zap } from 'lucide-react-native';

import { homeBanners } from '@/data/homeScreenData';
import { breederReviews, breeders, listings, posts } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import { homeColumns } from '@/mockData/homeColumns';
import { Colors, Radius, Spacing, Typography } from '@/theme';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { AppHeader } from './AppHeader';
import { Avatar } from './common';
import { ListingGridCard } from './ListingGridCard';
import { HomeNoticeTicker } from './HomeNoticeTicker';
import { Page } from './screen';
import { AnimatedSectionIcon, type AnimatedSectionIconType } from './ui/AnimatedSectionIcon';

function HomeHeader() {
  return <AppHeader title="마이부기" showSearch showHeart showBell />;
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
    <View className="mb-4 flex-row items-center justify-between px-5">
      <View className="flex-row items-center">
        <AnimatedSectionIcon type={animationType} animationType={animationType} />
        <Text className="ml-2 text-[20px] font-bold leading-7 text-ink">{title}</Text>
      </View>
      {onPress ? (
        <Pressable onPress={onPress} className="flex-row items-center py-2 pl-3">
                    <Text className="text-[12px] font-medium text-muted">더보기</Text>
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
  topClassName = 'mt-8',
}: {
  title: string;
  animationType: AnimatedSectionIconType;
  onPress?: () => void;
  children: ReactNode;
  topClassName?: string;
}) {
  return (
    <View className={topClassName}>
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
        <Text className="text-[22px] font-bold leading-[30px] text-white" numberOfLines={2}>
          믿을 수 있는 거북이 분양
        </Text>
        <Text className="mt-2 text-[14px] font-semibold leading-5 text-white/90" numberOfLines={2}>
          인증 브리더의 새 분양을 확인해보세요.
        </Text>
      </View>
    </AnimatedPressable>
  );
}

function HotTitle() {
  return (
    <View className="flex-row items-center">
      <Text className="text-[21px] font-bold leading-7 text-ink">지금 핫한 </Text>
      <Text className="text-[21px] font-bold leading-7 text-berry">부기들</Text>
      <Zap size={18} strokeWidth={2.1} color={Colors.rating} style={{ marginLeft: Spacing.sm - 2 }} />
    </View>
  );
}

function HotSectionHeader({ onPress }: { onPress?: () => void }) {
  return (
    <View className="mb-4 flex-row items-center justify-between px-5">
      <HotTitle />
      {onPress ? (
        <Pressable onPress={onPress} className="flex-row items-center py-2 pl-3">
          <Text className="text-[12px] font-medium text-muted">더보기</Text>
          <ChevronRight size={14} strokeWidth={1.8} color={Colors.comment} />
        </Pressable>
      ) : null}
    </View>
  );
}
function HotListingsSection() {
  const hotListings = [...listings].sort((a, b) => b.views + b.likes - (a.views + a.likes)).slice(0, 5);

  return (
    <View className="mt-8">
      <HotSectionHeader onPress={() => router.push('/marketplace')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-1">
        {hotListings.map((listing, index) => (
          <FadeInView key={listing.id} delay={index * 45}>
            <View className="mr-3">
              <ListingGridCard item={listing} index={index} width={214} compact />
            </View>
          </FadeInView>
        ))}
      </ScrollView>
    </View>
  );
}

function PopularBreedersSection() {
  return (
    <Section title="오늘의 인기 브리더" animationType="award" onPress={() => router.push('/marketplace')} topClassName="mt-6">
      <View className="mx-5 bg-white">
        {breeders.slice(0, 3).map((breeder, index) => {
          const summary = getReviewSummary(breeder.id);
          return (
            <AnimatedPressable
              key={breeder.id}
              onPress={() => router.push(`/breeder/${breeder.id}` as never)}
              className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}
            >
              <Avatar uri={breeder.logo ?? breeder.avatar} size={54} />
              <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                <View className="flex-row items-center">
                  <Text className="flex-shrink text-[16px] font-semibold leading-6 text-ink" numberOfLines={1}>
                    {breeder.name}
                  </Text>
                  <View className="ml-2 rounded-full bg-blush px-2 py-0.5">
                                        <Text className="text-[10px] font-semibold text-berry">인증</Text>
                  </View>
                </View>
                <Text className="mt-1 text-[13px] font-normal leading-[18px] text-muted" numberOfLines={1}>
                  {breeder.specialty ?? breeder.location}
                </Text>
                <Text className="mt-1.5 text-[12px] font-medium text-muted">
                  평점 {summary.averageRating.toFixed(1)} · 후기 {summary.totalReviews.toLocaleString()}개
                </Text>
              </View>
              <ChevronRight size={17} color="#CBD5E1" />
            </AnimatedPressable>
          );
        })}
      </View>
    </Section>
  );
}

function CommunitySection() {
  return (
    <Section title="실시간 커뮤니티" animationType="community" onPress={() => router.push('/community')} topClassName="mt-6">
      <View className="mx-5 bg-white">
        {posts.slice(0, 4).map((post, index) => (
          <AnimatedPressable
            key={post.id}
            onPress={() => router.push(`/community/${post.id}` as never)}
            className={`${index ? 'border-t border-[#F3F4F6]' : ''} py-5`}
          >
            <View className="flex-row items-center">
              <Text className="rounded-full bg-[#FFF5F7] px-3 py-1.5 text-[11px] font-medium text-[#FF6B35]">
                {post.category}
              </Text>
              <Text className="ml-2 text-[12px] font-semibold text-berry" numberOfLines={1}>
                @{post.author}
              </Text>
            </View>

            <Text className="mt-2 text-[17px] font-semibold leading-7 text-ink" numberOfLines={2}>
              {post.title}
            </Text>

            <View className="mt-2.5 flex-row items-center">
              <Text className="text-[12px] font-normal text-muted" numberOfLines={1}>{post.createdAt}</Text>
              <Text className="ml-2 text-[12px] font-normal text-muted">·</Text>
              <Text className="ml-2 text-[12px] font-normal text-muted">댓글 {post.comments.toLocaleString()}</Text>
              <Text className="ml-2 text-[12px] font-normal text-muted">·</Text>
              <Text className="ml-2 text-[12px] font-normal text-muted">좋아요 {post.likes.toLocaleString()}</Text>
            </View>
          </AnimatedPressable>
        ))}
      </View>
    </Section>
  );
}

function RecentReviewsSection() {
  return (
        <Section title="최근 후기" animationType="review" onPress={() => router.push('/mypage/reviews')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-1">
        {breederReviews.slice(0, 4).map((review, index) => {
          const breeder = breeders.find((item) => item.id === review.breederId);
          return (
            <FadeInView key={review.id} delay={index * 45}>
              <AnimatedPressable
                onPress={() => router.push(`/breeder/${review.breederId}` as never)}
                className="mr-3 w-[276px] bg-white p-4"
              >
                <View className="flex-row items-center">
                  <Avatar uri={breeder?.logo ?? breeder?.avatar ?? review.avatar} size={36} />
                  <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                    <Text className="text-[15px] font-semibold text-berry" numberOfLines={1}>
                                            {breeder?.name ?? '브리더'}
                    </Text>
                    <Text className="mt-0.5 text-[11px] font-normal text-muted" numberOfLines={1}>
                      {review.species}
                    </Text>
                  </View>
                </View>
                <Text className="mt-3 text-[13px] font-normal leading-5 text-ink" numberOfLines={2}>
                  {review.content}
                </Text>
                <View className="mt-3 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="flex-row items-center">
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
                    <Text className="ml-1.5 text-[11px] font-bold" style={{ color: Colors.rating }}>
                      {review.rating.toFixed(1)}
                    </Text>
                  </View>
                  <Text className="text-[11px] font-normal text-muted">{review.createdAt}</Text>
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
        <Section title="부기 칼럼" animationType="book" onPress={() => router.push('/community')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-1">
        {homeColumns.map((column, index) => (
          <FadeInView key={column.id} delay={index * 45}>
            <AnimatedPressable onPress={() => router.push(column.route as never)} className="mr-3 w-[250px] bg-white">
              <Image source={{ uri: column.thumbnail }} className="h-[116px] w-full rounded-[12px]" resizeMode="cover" />
              <View className="p-4">
                <Text className="text-[11px] font-semibold text-muted">{column.category}</Text>
                <Text className="mt-1.5 text-[15px] font-semibold leading-5 text-ink" numberOfLines={2}>
                  {column.title}
                </Text>
                <Text className="mt-2 text-[12px] font-normal leading-[18px] text-muted" numberOfLines={2}>
                  {column.description}
                </Text>
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
  const cardWidth = Math.floor((width - 40 - 10) / 2);
  const recentListings = [...listings]
    .sort((a, b) => (b.listedAt ?? '').localeCompare(a.listedAt ?? ''))
    .slice(0, 4);

  return (
        <Section title="신규 분양" animationType="new" onPress={() => router.push('/marketplace')} topClassName="mt-6">
      <View className="mx-5 flex-row flex-wrap justify-between">
        {recentListings.map((listing, index) => (
          <ListingGridCard key={listing.id} item={listing} index={index} width={cardWidth} />
        ))}
      </View>
      <Pressable
        onPress={() => router.push('/marketplace')}
        className="mx-5 h-12 items-center justify-center rounded-[14px] border border-line bg-white"
      >
                <Text className="text-[14px] font-semibold text-ink">분양글 더보기</Text>
      </Pressable>
    </Section>
  );
}

export function HomeScreen() {
  return (
    <Page backgroundColor="#FFFFFF">
      <HomeHeader />
      <HomeNoticeTicker />
      <MainBanner />
      <HotListingsSection />
      <NewListingsSection />
      <PopularBreedersSection />
      <CommunitySection />
      <RecentReviewsSection />
      <BoogiColumnsSection />
    </Page>
  );
}
const styles = StyleSheet.create({
  mainBanner: {
    height: 180,
    marginHorizontal: 16,
    marginTop: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  mainBannerText: {
    position: 'absolute',
    left: Spacing.xl,
    right: Spacing.xl,
    top: '50%',
    transform: [{ translateY: -34 }],
  },
});