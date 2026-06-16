import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { colors } from '@/constants/theme';
import { posts as communityPosts } from '@/data/communityData';
import { followActivities } from '@/data/followData';
import { homeBanners, homeBreederStories, homeListings, homeReviews } from '@/data/homeScreenData';

import { BrandHeader } from './common';
import { AnimatedPressable, FadeInView } from './AnimatedPressable';
import { Page } from './screen';
import { useMockUserState } from './MockUserState';

type IconName = ComponentProps<typeof Ionicons>['name'];

const bannerStyles: Record<string, { background: string; accent: string }> = {
  'banner-1': { background: '#FFF5F8', accent: colors.berry },
  'banner-2': { background: '#FFF7E8', accent: '#F59E0B' },
  'banner-3': { background: '#EAF5FF', accent: '#4593D6' },
  'banner-4': { background: '#E9F7EF', accent: colors.moss },
};

function Section({ eyebrow, title, action, children }: { eyebrow: string; title: string; action?: () => void; children: ReactNode }) {
  return (
    <View className="mt-7">
      <View className="mb-4 flex-row items-end justify-between px-5">
        <View>
          <Text className="text-[10px] font-black text-berry">{eyebrow}</Text>
          <Text className="mt-1 text-[20px] font-black text-ink">{title}</Text>
        </View>
        {action ? <Pressable onPress={action} className="rounded-full bg-soft px-3 py-2"><Text className="text-[10px] font-bold text-muted">전체보기</Text></Pressable> : null}
      </View>
      {children}
    </View>
  );
}

function PromotionBannerCarousel() {
  const listRef = useRef<FlatList<(typeof homeBanners)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(280, width - 40);
  const bannerGap = 12;
  const snapInterval = bannerWidth + bannerGap;

  const goToIndex = useCallback((index: number, animated = true) => {
    if (!homeBanners.length) return;
    listRef.current?.scrollToIndex({ index, animated });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (homeBanners.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % homeBanners.length;
        listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / snapInterval);
    setActiveIndex(Math.min(homeBanners.length - 1, Math.max(0, nextIndex)));
  };

  const renderBanner = ({ item: banner }: { item: (typeof homeBanners)[number] }) => {
    const style = bannerStyles[banner.id] ?? bannerStyles['banner-1'];

    return (
      <AnimatedPressable
        onPress={() => router.push(banner.linkUrl as never)}
        style={{ width: bannerWidth, backgroundColor: style.background }}
        className="h-[184px] overflow-hidden rounded-[26px] p-4 shadow-sm"
      >
        <Image source={{ uri: banner.image }} className="absolute bottom-0 right-0 h-full w-[48%]" resizeMode="cover" />
        <View className="absolute bottom-0 right-0 h-full w-[52%] bg-white/30" />
        <View className="absolute bottom-0 left-0 right-0 h-20 bg-white/20" />
        {banner.isAd ? (
          <View className="absolute right-4 top-4 rounded-full bg-black/55 px-2.5 py-1">
            <Text className="text-[9px] font-black text-white">광고</Text>
          </View>
        ) : null}
        <View className="max-w-[57%] flex-1 justify-between">
          <View>
            <Text style={{ color: style.accent }} className="text-[10px] font-black">MYBOOGI PICK</Text>
            <Text className="mt-2 text-[21px] font-black leading-7 text-ink" numberOfLines={2}>{banner.title}</Text>
            <Text className="mt-2 text-[11px] font-bold leading-5 text-muted" numberOfLines={2}>{banner.description}</Text>
          </View>
          <View className="self-start rounded-full bg-white px-3.5 py-2 shadow-sm">
            <Text style={{ color: style.accent }} className="text-[10px] font-black">{banner.actionLabel}</Text>
          </View>
        </View>
      </AnimatedPressable>
    );
  };

  return (
    <View className="pt-5">
      <FlatList
        ref={listRef}
        data={homeBanners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerClassName="px-5"
        ItemSeparatorComponent={() => <View style={{ width: bannerGap }} />}
        getItemLayout={(_, index) => ({ length: snapInterval, offset: snapInterval * index, index })}
        onScrollToIndexFailed={({ index }) => listRef.current?.scrollToOffset({ offset: snapInterval * index, animated: true })}
      />

      <View className="mt-3 flex-row justify-center">
        {homeBanners.map((banner, index) => (
          <Pressable key={banner.id} onPress={() => goToIndex(index)} className="px-1 py-1">
            <View className={`h-1.5 rounded-full ${index === activeIndex ? 'w-6 bg-berry' : 'w-1.5 bg-line'}`} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function TurtleArt({ color, height = 154 }: { color: string; height?: number }) {
  return (
    <View style={{ height, backgroundColor: color }} className="w-full items-center justify-center overflow-hidden rounded-[20px]">
      <View className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/25" />
      <View className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/20" />
      <View className="h-20 w-28 items-center justify-center rounded-[50px] bg-[#758C70]">
        <View className="h-10 w-10 rotate-45 rounded-xl border-2 border-white/50" />
      </View>
      <View className="absolute right-[22%] h-10 w-10 rounded-full bg-[#758C70]">
        <View className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-ink" />
      </View>
    </View>
  );
}

function ListingCard({ item }: { item: (typeof homeListings)[number] }) {
  const { isFavorite, toggleFavorite } = useMockUserState();
  const favorite = isFavorite(item.id);
  return (
    <Pressable onPress={() => router.push(`/listing/${item.id}`)} className="mr-3 w-[260px] rounded-[24px] border border-line bg-white p-3 shadow-sm">
      <View><TurtleArt color={item.color} /><Pressable onPress={(event) => { event.stopPropagation(); toggleFavorite(item.id); }} className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-white/90"><Ionicons name={favorite ? 'heart' : 'heart-outline'} size={18} color={colors.berry} /></Pressable></View>
      <View className="px-1 pb-1 pt-3">
        <View className="flex-row items-center"><Text className="rounded-full bg-blush px-2 py-1 text-[9px] font-black text-berry">오늘의 추천</Text><Text className="ml-2 text-[10px] text-muted">{item.breeder}</Text></View>
        <Text className="mt-2 text-[15px] font-black text-ink" numberOfLines={1}>{item.species}</Text>
        <Text className="mt-1 text-[17px] font-black text-ink">{item.price.toLocaleString()}원</Text>
      </View>
    </Pressable>
  );
}

function BreederCard({ item }: { item: (typeof homeBreederStories)[number] }) {
  const { isFollowing } = useMockUserState();
  const following = isFollowing(item.id);
  return (
    <Pressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-3 w-[212px] rounded-[24px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="h-14 w-14 overflow-hidden rounded-full"><TurtleArt color={item.color} height={56} /></View>
        <View className="ml-3 flex-1"><Text className="text-[9px] font-black text-berry">✓ {item.badge} 브리더</Text><Text className="mt-1 text-[14px] font-black text-ink">{item.name}</Text><Text className="mt-1 text-[9px] text-muted">팔로워 {item.followers}</Text></View>
      </View>
      <View className={`mt-4 rounded-[14px] py-2.5 ${following ? 'bg-blush' : 'bg-soft'}`}><Text className={`text-center text-[10px] font-black ${following ? 'text-berry' : 'text-ink'}`}>{following ? '팔로잉 · 상점 방문' : '상점 방문'}</Text></View>
    </Pressable>
  );
}

function FollowActivityCard({ item, width }: { item: (typeof followActivities)[number]; width: number }) {
  return (
    <AnimatedPressable
      onPress={() => router.push(item.targetType === 'listing' ? `/listing/${item.targetId}` as never : `/breeder/${item.targetId}` as never)}
      style={{ width }}
      className="mr-2.5 min-h-[136px] rounded-[20px] border border-line bg-white p-3 shadow-sm"
    >
      <View className="flex-row items-start">
        <Image source={{ uri: item.breederLogo }} className="h-10 w-10 rounded-[14px] bg-shell" />
        <View className="ml-2.5 flex-1">
          <Text className="text-[12px] font-black text-ink" numberOfLines={1}>{item.breederName}</Text>
          <Text className="mt-1 text-[9px] text-muted">{item.createdAt}</Text>
        </View>
        <View className="rounded-full bg-blush px-2 py-1">
          <Text className="text-[8px] font-black text-berry">NEW</Text>
        </View>
      </View>
      <Text className="mt-3 text-[13px] font-black leading-5 text-ink" numberOfLines={2}>{item.title}</Text>
      <Text className="mt-1 text-[10px] leading-4 text-muted" numberOfLines={2}>{item.description}</Text>
      {item.listingStatus ? (
        <View className="mt-2 self-start rounded-full bg-ink px-2.5 py-1.5">
          <Text className="text-[8px] font-black text-white">{item.listingStatus}</Text>
        </View>
      ) : null}
    </AnimatedPressable>
  );
}

function ReviewCard({ item }: { item: (typeof homeReviews)[number] }) {
  return (
    <Pressable onPress={() => router.push(`/breeder/${item.breederId}`)} className="mr-3 w-[272px] flex-row rounded-[24px] border border-line bg-white p-3 shadow-sm">
      <View className="h-[86px] w-[86px] overflow-hidden rounded-[17px]"><TurtleArt color={item.color} height={86} /></View>
      <View className="ml-3 flex-1">
        <View className="flex-row items-center"><Ionicons name="star" size={12} color="#FFB443" /><Text className="ml-1 text-[10px] font-black text-ink">{item.rating}</Text><Text className="ml-2 text-[9px] text-muted">{item.author}</Text></View>
        <Text className="mt-2 text-[12px] font-bold leading-5 text-ink" numberOfLines={2}>{item.text}</Text>
        <Text className="mt-2 text-[9px] font-bold text-berry">{item.breeder}</Text>
      </View>
    </Pressable>
  );
}

function Metric({ icon, value }: { icon: IconName; value: number }) {
  return <View className="ml-3 flex-row items-center"><Ionicons name={icon} size={11} color={colors.muted} /><Text className="ml-1 text-[9px] text-muted">{value}</Text></View>;
}

export function HomeScreen() {
  const { followedBreederIds } = useMockUserState();
  const { width } = useWindowDimensions();
  const followedActivities = followActivities.filter((item) => followedBreederIds.includes(item.breederId));
  const followActivityCardWidth = Math.min(168, Math.max(142, (width - 50) / 2.35));

  return (
    <Page>
      <BrandHeader />
      <PromotionBannerCarousel />

      <Section eyebrow="CURATED FOR YOU" title="오늘의 추천 분양" action={() => router.push('/marketplace')}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
          {homeListings.map((item) => <ListingCard key={item.id} item={item} />)}
        </ScrollView>
      </Section>

      <Section eyebrow="VERIFIED SHOP" title="믿고 만나는 인증 브리더">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
          {homeBreederStories.slice(0, 3).map((item) => <BreederCard key={item.id} item={item} />)}
        </ScrollView>
      </Section>

      <Section eyebrow="FOLLOWING" title="팔로우 브리더 소식" action={() => router.push('/following-feed')}>
        {followedActivities.length ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
            {followedActivities.map((item) => <FollowActivityCard key={item.id} item={item} width={followActivityCardWidth} />)}
          </ScrollView>
        ) : (
          <View className="mx-5 rounded-[24px] bg-white px-5 py-10 shadow-sm">
            <Text className="text-center text-[13px] font-black text-ink">관심있는 브리더를 팔로우해보세요</Text>
            <Text className="mt-2 text-center text-[10px] text-muted">새 분양과 후기 소식을 홈에서 바로 볼 수 있어요.</Text>
          </View>
        )}
      </Section>

      <Section eyebrow="REAL REVIEW" title="최근 분양 후기">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
          {homeReviews.map((item) => <ReviewCard key={item.id} item={item} />)}
        </ScrollView>
      </Section>

      <Section eyebrow="COMMUNITY" title="오늘 많이 본 이야기" action={() => router.push('/community')}>
        <View className="mx-5 overflow-hidden rounded-[24px] border border-line bg-white px-4 shadow-sm">
          {communityPosts.slice(0, 3).map((post, index) => (
            <AnimatedPressable key={post.id} onPress={() => router.push(`/community/${post.id}`)} className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}>
              <Text className="mr-3 text-[16px] font-black text-berry">{index + 1}</Text>
              <View className="flex-1"><Text className="text-[10px] font-bold text-muted">{post.category} · {post.author}</Text><Text className="mt-1.5 text-[13px] font-black text-ink" numberOfLines={1}>{post.title}</Text></View>
              <Metric icon="heart-outline" value={post.likes} /><Metric icon="chatbubble-outline" value={post.commentsCount ?? post.comments} />
            </AnimatedPressable>
          ))}
        </View>
      </Section>

      <View className="px-5 pt-8">
        <FadeInView><AnimatedPressable onPress={() => router.push('/ai')} className="rounded-[24px] bg-ink p-5 shadow-sm">
          <View className="flex-row items-center"><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-berry"><Ionicons name="sparkles" size={19} color="white" /></View><View className="ml-3 flex-1"><Text className="text-[10px] font-black text-petal">BOOGI AI</Text><Text className="mt-1 text-[16px] font-black text-white">사육 고민, 바로 물어보세요</Text></View><Ionicons name="chevron-forward" size={18} color="white" /></View>
          <View className="mt-4 flex-row"><Text className="mr-2 rounded-full bg-white/10 px-3 py-2 text-[9px] font-bold text-white">눈이 부었어요</Text><Text className="rounded-full bg-white/10 px-3 py-2 text-[9px] font-bold text-white">합사 가능할까요?</Text></View>
        </AnimatedPressable></FadeInView>

        <FadeInView delay={70}><AnimatedPressable onPress={() => router.push('/growth')} className="mt-3 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <View className="flex-row items-center justify-between"><View><Text className="text-[10px] font-black text-berry">GROWTH NOTE</Text><Text className="mt-1 text-[17px] font-black text-ink">부기가 이번 달 17g 자랐어요</Text><Text className="mt-2 text-[11px] text-muted">현재 238g · 등갑 길이 10.8cm</Text></View><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush"><Ionicons name="analytics-outline" size={21} color={colors.berry} /></View></View>
          <View className="mt-5 h-12 flex-row items-end justify-between">{[18, 24, 29, 35, 41, 47].map((height) => <View key={height} style={{ height }} className="w-8 rounded-t-lg bg-petal" />)}</View>
        </AnimatedPressable></FadeInView>
      </View>
    </Page>
  );
}
