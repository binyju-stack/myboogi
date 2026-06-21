import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import {
  Award,
  Bell,
  BookOpen,
  ChevronRight,
  Egg,
  Flame,
  Gift,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Turtle,
  type LucideIcon,
} from 'lucide-react-native';

import { homeBanners } from '@/data/homeScreenData';
import { breederReviews, breeders, listings, posts } from '@/data/mockData';
import { unreadNotificationCount } from '@/data/notificationData';
import { getReviewSummary } from '@/data/reviewData';
import { homeColumns } from '@/mockData/homeColumns';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { Avatar } from './common';
import { ListingGridCard } from './ListingGridCard';
import { Page } from './screen';
import { StarRating } from './StarRating';

const shortcuts: { label: string; icon: LucideIcon; route: string }[] = [
  { label: '분양', icon: Turtle, route: '/marketplace' },
  { label: '브리더', icon: Award, route: '/marketplace' },
  { label: '커뮤니티', icon: MessageCircle, route: '/community' },
  { label: '산란관리', icon: Egg, route: '/my/turtles/breeding' },
  { label: '성장기록', icon: TrendingUp, route: '/growth' },
  { label: '후기', icon: Star, route: '/mypage/reviews' },
  { label: '부기 칼럼', icon: BookOpen, route: '/community' },
  { label: '이벤트', icon: Gift, route: '/notifications' },
];

function HomeHeader() {
  return (
    <View className="px-5 pb-1 pt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-[22px] font-bold leading-8 text-[#111827]">마이부기</Text>
        <Pressable
          onPress={() => router.push('/notifications')}
          className="relative h-10 w-10 items-center justify-center"
          accessibilityLabel="알림"
        >
          <Bell size={21} strokeWidth={1.9} color="#111827" />
          {unreadNotificationCount ? (
            <View className="absolute right-0 top-0 min-w-[17px] items-center justify-center rounded-full bg-[#FF5C93] px-1 py-0.5">
              <Text className="text-[9px] font-bold leading-3 text-white">{unreadNotificationCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.push('/search')}
        className="mt-4 h-[52px] flex-row items-center rounded-[14px] border border-[#ECEFF3] bg-white px-4"
      >
        <Search size={19} strokeWidth={1.9} color="#9CA3AF" />
        <Text className="ml-3 text-[14px] font-normal text-[#9CA3AF]">어떤 거북이를 찾고 계신가요?</Text>
      </Pressable>
    </View>
  );
}

function ShortcutMenu() {
  return (
    <View className="mx-5 mt-5 rounded-2xl bg-white px-2 py-4">
      <View className="flex-row flex-wrap">
        {shortcuts.map(({ label, icon: Icon, route }) => (
          <Pressable
            key={label}
            onPress={() => router.push(route as never)}
            className="w-1/4 items-center py-2"
          >
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#FFF1F6]">
              <Icon size={22} strokeWidth={1.9} color="#FF5C93" />
            </View>
            <Text className="mt-2 text-[12px] font-medium leading-4 text-[#4B5563]" numberOfLines={1}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SectionHeader({ title, icon: Icon, onPress }: { title: string; icon: LucideIcon; onPress?: () => void }) {
  return (
    <View className="mb-4 flex-row items-center justify-between px-5">
      <View className="flex-row items-center">
        <Icon size={20} strokeWidth={2} color="#374151" />
        <Text className="ml-2 text-[20px] font-bold leading-7 text-[#111827]">{title}</Text>
      </View>
      {onPress ? (
        <Pressable onPress={onPress} className="flex-row items-center py-2 pl-3">
          <Text className="text-[12px] font-medium text-[#9CA3AF]">더보기</Text>
          <ChevronRight size={14} strokeWidth={1.8} color="#9CA3AF" />
        </Pressable>
      ) : null}
    </View>
  );
}

function Section({
  title,
  icon,
  onPress,
  children,
}: {
  title: string;
  icon: LucideIcon;
  onPress?: () => void;
  children: ReactNode;
}) {
  return (
    <View className="mt-8">
      <SectionHeader title={title} icon={icon} onPress={onPress} />
      {children}
    </View>
  );
}

function MainBanner() {
  const banner = homeBanners[0];

  return (
    <AnimatedPressable
      onPress={() => router.push('/marketplace')}
      className="mx-5 mt-5 h-[188px] overflow-hidden rounded-2xl bg-[#111827]"
    >
      <Image source={{ uri: banner?.image }} className="absolute h-full w-full" resizeMode="cover" />
      <View className="absolute inset-0 bg-black/45" />
      <View className="absolute bottom-5 left-5 right-5">
        <Text className="text-[20px] font-bold leading-7 text-white" numberOfLines={2}>
          건강한 거북이를 믿을 수 있는 분양으로
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
    <Section title="오늘 핫한 분양" icon={Flame} onPress={() => router.push('/marketplace')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-1">
        {hotListings.map((listing, index) => (
          <FadeInView key={listing.id} delay={index * 45}>
            <AnimatedPressable
              onPress={() => router.push(`/listing/${listing.id}` as never)}
              className="mr-3 w-[214px] overflow-hidden rounded-2xl bg-white"
            >
              <Image source={{ uri: listing.image }} className="h-[138px] w-full" resizeMode="cover" />
              <View className="p-4">
                <Text className="text-[12px] font-normal leading-4 text-[#9CA3AF]" numberOfLines={1}>
                  {listing.species}
                </Text>
                <Text className="mt-1 text-[15px] font-semibold leading-5 text-[#111827]" numberOfLines={2}>
                  {listing.title}
                </Text>
                <Text className="mt-2 text-[17px] font-bold leading-6 text-[#111827]">
                  {listing.price.toLocaleString()}원
                </Text>
              </View>
            </AnimatedPressable>
          </FadeInView>
        ))}
      </ScrollView>
    </Section>
  );
}

function PopularBreedersSection() {
  return (
    <Section title="오늘의 인기 브리더" icon={Award} onPress={() => router.push('/marketplace')}>
      <View className="mx-5 rounded-2xl bg-white px-4">
        {breeders.slice(0, 3).map((breeder, index) => {
          const summary = getReviewSummary(breeder.id);
          return (
            <AnimatedPressable
              key={breeder.id}
              onPress={() => router.push(`/breeder/${breeder.id}` as never)}
              className={`flex-row items-center py-4 ${index ? 'border-t border-[#ECECEC]' : ''}`}
            >
              <Avatar uri={breeder.logo ?? breeder.avatar} size={54} />
              <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                <View className="flex-row items-center">
                  <Text className="flex-shrink text-[16px] font-semibold leading-6 text-[#111827]" numberOfLines={1}>
                    {breeder.name}
                  </Text>
                  <View className="ml-2 rounded-full bg-[#FFF1F6] px-2 py-0.5">
                    <Text className="text-[10px] font-semibold text-[#FF5C93]">인증</Text>
                  </View>
                </View>
                <Text className="mt-1 text-[13px] font-normal leading-[18px] text-[#9CA3AF]" numberOfLines={1}>
                  {breeder.specialty ?? breeder.location}
                </Text>
                <View className="mt-1.5 flex-row items-center">
                  <Star size={13} fill="#FFC83D" color="#FFC83D" />
                  <Text className="ml-1 text-[12px] font-medium text-[#4B5563]">
                    {summary.averageRating.toFixed(1)} · 후기 {summary.totalReviews.toLocaleString()}개
                  </Text>
                </View>
              </View>
              <ChevronRight size={17} color="#C4C9D0" />
            </AnimatedPressable>
          );
        })}
      </View>
    </Section>
  );
}

function CommunitySection() {
  return (
    <Section title="오늘의 커뮤니티" icon={MessageCircle} onPress={() => router.push('/community')}>
      <View className="mx-5 rounded-2xl bg-white px-4">
        {posts.slice(0, 4).map((post, index) => (
          <AnimatedPressable
            key={post.id}
            onPress={() => router.push(`/community/${post.id}` as never)}
            className={`py-4 ${index ? 'border-t border-[#ECECEC]' : ''}`}
          >
            <View className="flex-row items-center">
              <Text className="rounded-full bg-[#F3F4F6] px-2 py-1 text-[11px] font-medium text-[#6B7280]">
                {post.category}
              </Text>
              <Text className="ml-2 text-[11px] font-normal text-[#9CA3AF]">{post.createdAt}</Text>
            </View>
            <Text className="mt-2 text-[15px] font-semibold leading-5 text-[#111827]" numberOfLines={1}>
              {post.title}
            </Text>
            <View className="mt-2 flex-row items-center">
              <MessageCircle size={13} color="#9CA3AF" />
              <Text className="ml-1 text-[12px] font-normal text-[#9CA3AF]">{post.comments.toLocaleString()}</Text>
              <Text className="ml-3 text-[12px] font-normal text-[#9CA3AF]">좋아요 {post.likes.toLocaleString()}</Text>
            </View>
          </AnimatedPressable>
        ))}
      </View>
    </Section>
  );
}

function RecentReviewsSection() {
  return (
    <Section title="최근 후기" icon={Star} onPress={() => router.push('/mypage/reviews')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-1">
        {breederReviews.slice(0, 4).map((review, index) => {
          const breeder = breeders.find((item) => item.id === review.breederId);
          return (
            <FadeInView key={review.id} delay={index * 45}>
              <AnimatedPressable
                onPress={() => router.push(`/breeder/${review.breederId}` as never)}
                className="mr-3 w-[276px] rounded-2xl bg-white p-4"
              >
                <View className="flex-row items-center">
                  <Avatar uri={breeder?.logo ?? breeder?.avatar ?? review.avatar} size={36} />
                  <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                    <Text className="text-[15px] font-semibold text-[#111827]" numberOfLines={1}>
                      {breeder?.name ?? '브리더'}
                    </Text>
                    <Text className="mt-0.5 text-[11px] font-normal text-[#9CA3AF]" numberOfLines={1}>
                      {review.species}
                    </Text>
                  </View>
                </View>
                <Text className="mt-3 text-[13px] font-normal leading-5 text-[#6B7280]" numberOfLines={2}>
                  {review.content}
                </Text>
                <View className="mt-3 flex-row items-center justify-between">
                  <StarRating rating={review.rating} size={13} showValue={false} />
                  <Text className="text-[11px] font-normal text-[#9CA3AF]">{review.createdAt}</Text>
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
    <Section title="부기 칼럼" icon={BookOpen} onPress={() => router.push('/community')}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-1">
        {homeColumns.map((column, index) => (
          <FadeInView key={column.id} delay={index * 45}>
            <AnimatedPressable
              onPress={() => router.push(column.route as never)}
              className="mr-3 w-[250px] overflow-hidden rounded-2xl bg-white"
            >
              <Image source={{ uri: column.thumbnail }} className="h-[116px] w-full" resizeMode="cover" />
              <View className="p-4">
                <Text className="text-[11px] font-semibold text-[#FF5C93]">{column.category}</Text>
                <Text className="mt-1.5 text-[15px] font-semibold leading-5 text-[#111827]" numberOfLines={2}>
                  {column.title}
                </Text>
                <Text className="mt-2 text-[12px] font-normal leading-[18px] text-[#9CA3AF]" numberOfLines={2}>
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
    <Section title="신규 분양" icon={Sparkles} onPress={() => router.push('/marketplace')}>
      <View className="mx-5 flex-row flex-wrap justify-between">
        {recentListings.map((listing, index) => (
          <ListingGridCard key={listing.id} item={listing} index={index} width={cardWidth} />
        ))}
      </View>
      <Pressable
        onPress={() => router.push('/marketplace')}
        className="mx-5 h-12 items-center justify-center rounded-[14px] border border-[#ECECEC] bg-white"
      >
        <Text className="text-[14px] font-semibold text-[#111827]">분양글 더보기</Text>
      </Pressable>
    </Section>
  );
}

export function HomeScreen() {
  return (
    <Page>
      <HomeHeader />
      <ShortcutMenu />
      <MainBanner />
      <HotListingsSection />
      <PopularBreedersSection />
      <CommunitySection />
      <RecentReviewsSection />
      <BoogiColumnsSection />
      <NewListingsSection />
    </Page>
  );
}
