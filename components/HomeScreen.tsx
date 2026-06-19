import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { homeBanners } from '@/data/homeScreenData';
import { breederReviews, breeders, listings, posts } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { Avatar, BrandHeader } from './common';
import { ListingCard } from './ListingCard';
import { ListingGridCard } from './ListingGridCard';
import { Page } from './screen';
import { StarRating } from './StarRating';

type IconName = ComponentProps<typeof Ionicons>['name'];
type SectionIconVariant = 'flame' | 'community' | 'trophy' | 'review' | 'listing';

const sectionIcons: Record<SectionIconVariant, { name: IconName; color: string; backgroundColor: string }> = {
  flame: { name: 'flame', color: '#FF7A1A', backgroundColor: '#FFF3E8' },
  community: { name: 'chatbubble-ellipses', color: '#4593D6', backgroundColor: '#EAF5FF' },
  trophy: { name: 'trophy', color: '#E9A008', backgroundColor: '#FFF7D6' },
  review: { name: 'star', color: '#FFC83D', backgroundColor: '#FFF7D6' },
  listing: { name: 'storefront', color: '#FF4F8B', backgroundColor: '#FFF0F6' },
};

function SectionHeader({ title, icon, onPress }: { title: string; icon: SectionIconVariant; onPress?: () => void }) {
  const meta = sectionIcons[icon];

  return (
    <View className="mb-5 flex-row items-center justify-between px-5">
      <View className="flex-1 flex-row items-center">
        <View className="mr-2 h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: meta.backgroundColor }}>
          <Ionicons name={meta.name} size={17} color={meta.color} />
        </View>
        <Text className="flex-1 text-[20px] font-bold leading-7 text-[#222222]" numberOfLines={1}>
          {title}
        </Text>
      </View>
      {onPress ? (
        <Pressable onPress={onPress} className="flex-row items-center">
          <Text className="text-[12px] font-medium text-[#A0A5AD]">더보기</Text>
          <Ionicons name="chevron-forward" size={14} color="#A0A5AD" />
        </Pressable>
      ) : null}
    </View>
  );
}

function Section({ title, icon, onPress, children }: { title: string; icon: SectionIconVariant; onPress?: () => void; children: ReactNode }) {
  return (
    <View className="mt-7">
      <SectionHeader title={title} icon={icon} onPress={onPress} />
      {children}
    </View>
  );
}

function NoticeBar() {
  return (
    <View className="mx-5 mt-4 h-9 flex-row items-center rounded-[18px] bg-[#222222] px-4">
      <Ionicons name="megaphone-outline" size={15} color="#FFFFFF" />
      <Text className="ml-2 flex-1 text-[12px] font-medium text-white" numberOfLines={1}>
        마이부기 신규 분양글과 커뮤니티 소식을 확인해보세요.
      </Text>
    </View>
  );
}

function SearchBar() {
  return (
    <AnimatedPressable onPress={() => router.push('/search')} className="mx-5 mt-4 h-12 flex-row items-center rounded-full border border-[#E5E7EB] bg-white px-4 shadow-sm">
      <Ionicons name="search" size={18} color="#9CA3AF" />
      <Text className="ml-2 flex-1 text-[15px] font-medium text-[#666666]">어떤 거북이를 찾고 계신가요?</Text>
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </AnimatedPressable>
  );
}

function PromotionBanner() {
  const banner = homeBanners[0];

  return (
    <AnimatedPressable onPress={() => router.push('/marketplace')} className="mx-5 mt-4 h-[188px] overflow-hidden rounded-[26px] bg-ink shadow-sm">
      <Image source={{ uri: banner?.image }} className="absolute h-full w-full" resizeMode="cover" />
      <View className="absolute inset-0 bg-black/45" />
      <View className="absolute bottom-5 left-5 right-5">
        <Text className="text-[21px] font-bold leading-7 text-white" numberOfLines={2}>
          건강한 거북이 분양을 한눈에
        </Text>
        <Text className="mt-2 text-[14px] font-medium leading-5 text-white/85" numberOfLines={2}>
          인증 브리더의 새 분양 개체를 빠르게 확인해보세요.
        </Text>
      </View>
    </AnimatedPressable>
  );
}

function HotListingsSection() {
  const hotListings = [...listings].sort((a, b) => b.views + b.likes - (a.views + a.likes)).slice(0, 5);

  return (
    <Section title="오늘 핫한 분양 개체" icon="flame" onPress={() => router.push('/marketplace')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
        {hotListings.map((listing, index) => (
          <ListingCard key={listing.id} item={listing} wide index={index} />
        ))}
      </ScrollView>
    </Section>
  );
}

function CommunitySection() {
  return (
    <Section title="오늘의 커뮤니티" icon="community" onPress={() => router.push('/community')}>
      <View className="bg-white px-5">
        {posts.slice(0, 4).map((post, index) => (
          <AnimatedPressable key={post.id} onPress={() => router.push(`/community/${post.id}` as never)} className={`py-5 ${index ? 'border-t border-[#ECECEC]' : ''}`}>
            <View className="flex-row items-center">
              <Text className="rounded-full bg-[#FFF0F6] px-2.5 py-1 text-[12px] font-semibold leading-[18px] text-[#FF4F8B]">
                {post.category}
              </Text>
              <Text className="ml-2 text-[12px] font-medium leading-[18px] text-[#9CA3AF]" numberOfLines={1}>
                {post.createdAt}
              </Text>
            </View>
            <Text className="mt-3 text-[17px] font-bold leading-6 text-[#222222]" numberOfLines={1}>
              {post.title}
            </Text>
            <Text className="mt-2 text-[14px] font-medium leading-[22px] text-[#8A8F98]" numberOfLines={2}>
              {post.content}
            </Text>
            <View className="mt-3 flex-row items-center">
              <Text className="text-[13px] font-semibold leading-[18px] text-[#FF4F8B]" numberOfLines={1}>
                {post.author}
              </Text>
              <Text className="ml-2 text-[12px] font-medium leading-[18px] text-[#9CA3AF]">
                댓글 {post.comments.toLocaleString()} · 좋아요 {post.likes.toLocaleString()}
              </Text>
            </View>
          </AnimatedPressable>
        ))}
      </View>
    </Section>
  );
}

function PopularBreedersSection() {
  return (
    <Section title="오늘의 인기 브리더" icon="trophy" onPress={() => router.push('/marketplace')}>
      <View className="bg-white px-5">
        {breeders.slice(0, 3).map((breeder, index) => {
          const summary = getReviewSummary(breeder.id);
          return (
            <AnimatedPressable key={breeder.id} onPress={() => router.push(`/breeder/${breeder.id}` as never)} className={`flex-row items-center py-5 ${index ? 'border-t border-[#ECECEC]' : ''}`}>
              <Avatar uri={breeder.logo ?? breeder.avatar} size={64} />
              <View className="ml-4 flex-1" style={{ minWidth: 0 }}>
                <Text className="text-[17px] font-bold leading-6 text-[#222222]" numberOfLines={1}>
                  {breeder.name}
                </Text>
                <Text className="mt-1.5 text-[13px] font-medium leading-[18px] text-[#8A8F98]" numberOfLines={1}>
                  {breeder.specialty ?? breeder.location}
                </Text>
                <View className="mt-2 flex-row items-center">
                  <Ionicons name="star" size={15} color="#FFC83D" />
                  <Text className="ml-1 text-[12px] font-semibold leading-[18px] text-[#222222]">
                    {summary.averageRating.toFixed(1)} · 후기 {summary.totalReviews.toLocaleString()}개
                  </Text>
                  <Text className="ml-2 rounded-full bg-[#FFF0F6] px-2 py-0.5 text-[10px] font-semibold text-[#FF4F8B]">인증</Text>
                </View>
              </View>
            </AnimatedPressable>
          );
        })}
      </View>
    </Section>
  );
}

function RecentReviewsSection() {
  return (
    <Section title="최근 후기" icon="review">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
        {breederReviews.slice(0, 4).map((review, index) => {
          const breeder = breeders.find((item) => item.id === review.breederId);
          return (
            <FadeInView key={review.id} delay={index * 45}>
              <AnimatedPressable onPress={() => router.push(`/breeder/${review.breederId}` as never)} className="mr-4 w-[286px] rounded-[22px] border border-[#ECECEC] bg-white p-5 shadow-sm">
                <View className="flex-row items-center">
                  <Avatar uri={breeder?.logo ?? breeder?.avatar ?? review.avatar} size={38} />
                  <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                    <Text className="text-[17px] font-bold leading-6 text-[#222222]" numberOfLines={1}>
                      {breeder?.name ?? '브리더'}
                    </Text>
                    <Text className="mt-1 text-[12px] font-medium leading-[18px] text-[#9CA3AF]" numberOfLines={1}>
                      {review.species}
                    </Text>
                  </View>
                </View>
                <Text className="mt-3 text-[14px] font-medium leading-[22px] text-[#8A8F98]" numberOfLines={2}>
                  {review.content}
                </Text>
                <View className="mt-3 flex-row items-center justify-between">
                  <StarRating rating={review.rating} size={14} showValue={false} />
                  <Text className="text-[12px] font-medium leading-[18px] text-[#9CA3AF]" numberOfLines={1}>
                    {review.createdAt}
                  </Text>
                </View>
              </AnimatedPressable>
            </FadeInView>
          );
        })}
      </ScrollView>
    </Section>
  );
}

function NewListingsSection() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - 40 - 12) / 2);
  const recentListings = [...listings]
    .sort((a, b) => (b.listedAt ?? '').localeCompare(a.listedAt ?? ''))
    .slice(0, 4);

  return (
    <Section title="새로 올라온 분양" icon="listing">
      <View className="mx-5 flex-row flex-wrap justify-between">
        {recentListings.map((listing, index) => (
          <ListingGridCard key={listing.id} item={listing} index={index} width={cardWidth} />
        ))}
      </View>
      <Pressable onPress={() => router.push('/marketplace')} className="mx-5 mt-1 h-12 items-center justify-center rounded-[14px] border border-[#ECECEC] bg-white">
        <Text className="text-[15px] font-semibold text-[#222222]">분양글 더보기</Text>
      </Pressable>
    </Section>
  );
}

export function HomeScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <NoticeBar />
      <PromotionBanner />
      <SearchBar />
      <HotListingsSection />
      <CommunitySection />
      <PopularBreedersSection />
      <RecentReviewsSection />
      <NewListingsSection />
    </Page>
  );
}
