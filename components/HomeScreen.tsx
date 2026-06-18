import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Image, Pressable, ScrollView, Text, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { colors } from '@/constants/theme';
import { homeBanners } from '@/data/homeScreenData';
import { breederReviews, breeders, listings } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';

import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { BrandHeader, Avatar } from './common';
import { ListingCard } from './ListingCard';
import { Page } from './screen';
import { StarRating } from './StarRating';

type IconName = ComponentProps<typeof Ionicons>['name'];
type SectionIconVariant = 'flame' | 'community' | 'trophy' | 'review';

const promoBanners = [
  {
    id: 'home-promo-1',
    title: '건강한 거북이 분양은\n신뢰할 수 있는 브리더부터',
    description: '인증 브리더의 분양 개체를 확인해보세요.',
    actionLabel: '바로가기 >',
    image: homeBanners[0]?.image,
    href: '/marketplace',
  },
  {
    id: 'home-promo-2',
    title: '처음 키우는 거북이\n무엇부터 준비해야 할까요?',
    description: '커뮤니티에서 사육 정보를 확인해보세요.',
    actionLabel: '바로가기 >',
    image: homeBanners[1]?.image ?? homeBanners[0]?.image,
    href: '/community',
  },
  {
    id: 'home-promo-3',
    title: '마이부기 브리더 인증\n지금 신청할 수 있어요.',
    description: '분양 신뢰도를 높이는 첫 단계입니다.',
    actionLabel: '신청하기 >',
    image: homeBanners[2]?.image ?? homeBanners[0]?.image,
    href: '/breeder/verification/apply',
  },
];

const hotPosts = [
  { id: 'p1', badge: '베스트글', category: '사육상담', title: '헤르만 육지거북 온욕 주기 궁금합니다.', views: 3652, comments: 76, likes: 126 },
  { id: 'p3', badge: '새글', category: '질병상담', title: '눈을 자꾸 감고 있는데 병원 가야 할까요?', views: 842, comments: 14, likes: 32 },
  { id: 'p2', badge: '베스트글', category: '산란정보', title: '초산 테라핀 산란장 세팅 공유합니다.', views: 1208, comments: 33, likes: 91 },
];

const breederSpecialties: Record<string, string> = {
  b1: '레오파드 육지거북 · 별거북',
  b2: '설가타 · 헤르만 · 육지거북',
  b3: '테라핀 · 뉴블러드 · 하이퀄리티',
};

const sectionIcons: Record<SectionIconVariant, { name: IconName; color: string; backgroundColor: string }> = {
  flame: { name: 'flame', color: '#FF7A1A', backgroundColor: '#FFF3E8' },
  community: { name: 'chatbubble-ellipses', color: '#4593D6', backgroundColor: '#EAF5FF' },
  trophy: { name: 'trophy', color: '#E9A008', backgroundColor: '#FFF7D6' },
  review: { name: 'star', color: '#FFC83D', backgroundColor: '#FFF7D6' },
};

function SectionIcon({ variant }: { variant: SectionIconVariant }) {
  const progress = useRef(new Animated.Value(0)).current;
  const meta = sectionIcons[variant];

  useEffect(() => {
    if (variant === 'review') return;

    const duration = variant === 'flame' ? 1000 : variant === 'community' ? 2000 : 3000;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [progress, variant]);

  const animatedStyle =
    variant === 'flame'
      ? {
          opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }),
          transform: [
            { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) },
            { rotate: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['-3deg', '3deg', '-2deg'] }) },
          ],
        }
      : variant === 'community'
        ? {
            opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }),
            transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) }],
          }
        : variant === 'trophy'
          ? {
              opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }),
              transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] }) }],
            }
          : {};

  return (
    <Animated.View
      className="mr-2 h-8 w-8 items-center justify-center rounded-full"
      style={[animatedStyle, { backgroundColor: meta.backgroundColor }]}
    >
      <Ionicons name={meta.name} size={17} color={meta.color} />
    </Animated.View>
  );
}

function SectionHeader({ title, icon, onPress }: { title: string; icon: SectionIconVariant; onPress?: () => void }) {
  return (
    <View className="mb-3 flex-row items-center justify-between px-5">
      <View className="flex-1 flex-row items-center">
        <SectionIcon variant={icon} />
        <Text className="flex-1 text-[20px] font-bold leading-7 text-[#222222]" numberOfLines={1}>{title}</Text>
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

function Meta({ icon, value }: { icon: IconName; value: number }) {
  return (
    <View className="ml-2 flex-row items-center">
      <Ionicons name={icon} size={12} color="#A0A5AD" />
      <Text className="ml-1 text-[12px] font-medium text-[#A0A5AD]">{value.toLocaleString()}</Text>
    </View>
  );
}

function NoticeBar() {
  return (
    <View className="mx-5 mt-4 h-9 flex-row items-center rounded-[18px] bg-[#222222] px-4">
      <Ionicons name="megaphone-outline" size={15} color="white" />
      <Text className="ml-2 flex-1 text-[12px] font-medium text-white" numberOfLines={1}>공지사항  마이부기 브리더 인증 기능이 추가되었습니다.</Text>
      <Ionicons name="close" size={14} color="white" />
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

function BannerIndicator({ active }: { active: boolean }) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, { toValue: active ? 1 : 0, useNativeDriver: false, speed: 18, bounciness: 5 }).start();
  }, [active, progress]);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: [6, 22] });
  const backgroundColor = progress.interpolate({ inputRange: [0, 1], outputRange: ['#E5E7EB', colors.berry] });

  return <Animated.View style={{ width, backgroundColor }} className="h-1.5 rounded-full" />;
}

function PromotionBannerCarousel() {
  const listRef = useRef<FlatList<(typeof promoBanners)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(280, width - 40);
  const bannerGap = 12;
  const snapInterval = bannerWidth + bannerGap;

  const goToIndex = useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % promoBanners.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const syncActiveIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / snapInterval);
    setActiveIndex(Math.min(promoBanners.length - 1, Math.max(0, nextIndex)));
  };

  return (
    <View className="mt-4">
      <FlatList
        ref={listRef}
        data={promoBanners}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={syncActiveIndex}
        scrollEventThrottle={16}
        onMomentumScrollEnd={syncActiveIndex}
        contentContainerClassName="px-5"
        ItemSeparatorComponent={() => <View style={{ width: bannerGap }} />}
        getItemLayout={(_, index) => ({ length: snapInterval, offset: snapInterval * index, index })}
        onScrollToIndexFailed={({ index }) => listRef.current?.scrollToOffset({ offset: snapInterval * index, animated: true })}
        renderItem={({ item }) => (
          <AnimatedPressable onPress={() => router.push(item.href as never)} style={{ width: bannerWidth }} className="h-[188px] overflow-hidden rounded-[26px] bg-ink shadow-sm">
            <Image source={{ uri: item.image }} className="absolute h-full w-full" resizeMode="cover" />
            <View className="absolute inset-0 bg-black/45" />
            <View className="absolute right-4 top-4">
              <Text className="text-[12px] font-bold text-white">{item.actionLabel}</Text>
            </View>
            <View className="absolute bottom-5 left-5 right-5">
              <Text className="text-[21px] font-bold leading-7 text-white" numberOfLines={2}>{item.title}</Text>
              <Text className="mt-2 text-[14px] font-medium leading-5 text-white/85" numberOfLines={2}>{item.description}</Text>
            </View>
          </AnimatedPressable>
        )}
      />
      <View className="mt-3 flex-row justify-center">
        {promoBanners.map((banner, index) => (
          <Pressable key={banner.id} onPress={() => goToIndex(index)} className="px-1 py-1">
            <BannerIndicator active={index === activeIndex} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function CommunityHotSection() {
  return (
    <View className="mt-7">
      <SectionHeader title="오늘의 커뮤니티" icon="community" onPress={() => router.push('/community')} />
      <View className="bg-white px-5">
        {hotPosts.map((post, index) => (
          <AnimatedPressable key={post.id} onPress={() => router.push(`/community/${post.id}` as never)} className={`py-4 ${index ? 'border-t border-[#E5E7EB]' : ''}`}>
            <View className="flex-row items-center">
              <Text className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${post.badge === '새글' ? 'bg-[#E8F1FF] text-[#4A8DFF]' : 'bg-[#FFE4EC] text-[#FF4F8B]'}`}>{post.badge}</Text>
              <Text className="ml-2 rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[12px] font-semibold text-[#7D8592]">{post.category}</Text>
              <View className="flex-1" />
              <Meta icon="eye-outline" value={post.views} />
              <Meta icon="chatbubble-outline" value={post.comments} />
              <Meta icon="heart-outline" value={post.likes} />
            </View>
            <Text className="mt-2.5 text-[17px] font-bold leading-[26px] text-[#222222]" numberOfLines={1}>{post.title}</Text>
          </AnimatedPressable>
        ))}
      </View>
    </View>
  );
}

function PopularBreedersSection() {
  return (
    <View className="mt-7">
      <SectionHeader title="많이 찾는 브리더" icon="trophy" onPress={() => router.push('/marketplace')} />
      <View className="bg-white px-5">
        {breeders.slice(0, 3).map((breeder, index) => {
          const summary = getReviewSummary(breeder.id);
          return (
            <AnimatedPressable key={breeder.id} onPress={() => router.push(`/breeder/${breeder.id}` as never)} className={`flex-row items-center py-4 ${index ? 'border-t border-[#E5E7EB]' : ''}`}>
              <Avatar uri={breeder.logo ?? breeder.avatar} size={72} />
              <View className="ml-4 flex-1" style={{ minWidth: 0 }}>
                <View className="flex-row items-center">
                  <Text className="flex-1 text-[17px] font-bold leading-6 text-[#222222]" numberOfLines={1}>{breeder.name}</Text>
                  <Text className="ml-2 rounded-full bg-blush px-2.5 py-1 text-[10px] font-semibold text-berry">✓ 인증 브리더</Text>
                </View>
                <View className="mt-1.5 flex-row items-center">
                  <Ionicons name="star" size={16} color="#FFC83D" />
                  <Text className="ml-1.5 text-[15px] font-semibold text-[#222222]">{summary.averageRating.toFixed(1)} · 후기 {summary.totalReviews.toLocaleString()}개</Text>
                </View>
                <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]" numberOfLines={1}>{breederSpecialties[breeder.id] ?? breeder.specialty}</Text>
              </View>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
}

function HotListingsSection() {
  const hotListings = [...listings].sort((a, b) => b.views + b.likes - (a.views + a.likes)).slice(0, 5);
  return (
    <View className="mt-7">
      <SectionHeader title="오늘 핫한 분양 개체" icon="flame" onPress={() => router.push('/marketplace')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
        {hotListings.map((listing, index) => <ListingCard key={listing.id} item={listing} wide index={index} />)}
      </ScrollView>
    </View>
  );
}

function RecentReviewsSection() {
  return (
    <View className="mt-7">
      <SectionHeader title="최근 후기" icon="review" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
        {breederReviews.slice(0, 4).map((review, index) => {
          const breeder = breeders.find((item) => item.id === review.breederId);
          return (
            <FadeInView key={review.id} delay={index * 45}>
              <AnimatedPressable onPress={() => router.push(`/breeder/${review.breederId}` as never)} className="mr-3 w-[286px] rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <View className="flex-row items-center">
                  <Avatar uri={breeder?.logo ?? breeder?.avatar ?? review.avatar} size={38} />
                  <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                    <Text className="text-[15px] font-bold text-[#222222]" numberOfLines={1}>{breeder?.name ?? '브리더'}</Text>
                    <Text className="mt-0.5 text-[12px] font-medium text-[#A0A5AD]" numberOfLines={1}>{review.species}</Text>
                  </View>
                  <StarRating rating={review.rating} size={14} showValue={false} />
                </View>
                <Text className="mt-3 text-[15px] font-medium leading-6 text-[#666666]" numberOfLines={3}>{review.content}</Text>
              </AnimatedPressable>
            </FadeInView>
          );
        })}
      </ScrollView>
    </View>
  );
}

export function HomeScreen() {
  return (
    <Page>
      <BrandHeader compact />
      <NoticeBar />
      <PromotionBannerCarousel />
      <SearchBar />
      <HotListingsSection />
      <CommunityHotSection />
      <PopularBreedersSection />
      <RecentReviewsSection />
    </Page>
  );
}
