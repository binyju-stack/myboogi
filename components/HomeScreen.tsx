import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

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
    <View className="mt-8">
      <View className="mb-4 flex-row items-end justify-between px-5">
        <View>
          <Text className="text-[10px] font-black text-berry">{eyebrow}</Text>
          <Text className="mt-1 text-[20px] font-black tracking-[-0.7px] text-ink">{title}</Text>
        </View>
        {action ? <Pressable onPress={action} className="rounded-full bg-soft px-3 py-2"><Text className="text-[10px] font-bold text-muted">전체보기</Text></Pressable> : null}
      </View>
      {children}
    </View>
  );
}

function PromotionBannerCarousel() {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const bannerWidth = Math.max(280, width - 40);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % homeBanners.length;
      scrollRef.current?.scrollTo({ x: nextIndex * bannerWidth, animated: true });
      setActiveIndex(nextIndex);
    }, 3600);

    return () => clearInterval(timer);
  }, [activeIndex, bannerWidth]);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
    setActiveIndex(Math.min(homeBanners.length - 1, Math.max(0, nextIndex)));
  };

  return (
    <View className="pt-5">
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={bannerWidth}
        decelerationRate="fast"
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerClassName="px-5"
      >
        {homeBanners.map((banner) => {
          const style = bannerStyles[banner.id] ?? bannerStyles['banner-1'];
          return (
            <AnimatedPressable
              key={banner.id}
              onPress={() => router.push(banner.linkUrl as never)}
              style={{ width: bannerWidth, backgroundColor: style.background }}
              className="h-[200px] overflow-hidden rounded-[24px] p-5 shadow-sm"
            >
              <Image source={{ uri: banner.image }} className="absolute bottom-0 right-0 h-full w-[52%]" resizeMode="cover" />
              <View className="absolute bottom-0 right-0 h-full w-[52%] bg-white/20" />
              {banner.isAd ? (
                <View className="absolute right-4 top-4 rounded-full bg-black/55 px-2.5 py-1">
                  <Text className="text-[9px] font-black text-white">광고</Text>
                </View>
              ) : null}
              <View className="max-w-[58%] flex-1 justify-between">
                <View>
                  <Text style={{ color: style.accent }} className="text-[10px] font-black">MYBOOGI PICK</Text>
                  <Text className="mt-2 text-[24px] font-black leading-8 tracking-[-0.8px] text-ink">{banner.title}</Text>
                  <Text className="mt-2 text-[12px] leading-5 text-muted">{banner.description}</Text>
                </View>
                <View className="self-start rounded-full bg-white px-4 py-2.5 shadow-sm">
                  <Text style={{ color: style.accent }} className="text-[11px] font-black">{banner.actionLabel}</Text>
                </View>
              </View>
            </AnimatedPressable>
          );
        })}
      </ScrollView>

      <View className="mt-3 flex-row justify-center">
        {homeBanners.map((banner, index) => (
          <View key={banner.id} className={`mx-1 h-2 rounded-full ${index === activeIndex ? 'w-6 bg-berry' : 'w-2 bg-line'}`} />
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
    <Pressable onPress={() => router.push(`/listing/${item.id}`)} className="mr-3 w-[274px] rounded-[24px] border border-line bg-white p-3 shadow-sm">
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
    <Pressable onPress={() => router.push(`/breeder/${item.id}`)} className="mr-3 w-52 rounded-[22px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="h-14 w-14 overflow-hidden rounded-full"><TurtleArt color={item.color} height={56} /></View>
        <View className="ml-3 flex-1"><Text className="text-[9px] font-black text-berry">✓ {item.badge} 브리더</Text><Text className="mt-1 text-[14px] font-black text-ink">{item.name}</Text><Text className="mt-1 text-[9px] text-muted">팔로워 {item.followers}</Text></View>
      </View>
      <View className={`mt-4 rounded-[14px] py-2.5 ${following ? 'bg-blush' : 'bg-soft'}`}><Text className={`text-center text-[10px] font-black ${following ? 'text-berry' : 'text-ink'}`}>{following ? '팔로잉 · 상점 방문' : '상점 방문'}</Text></View>
    </Pressable>
  );
}

function FollowActivityCard({ item }: { item: (typeof followActivities)[number] }) {
  return (
    <AnimatedPressable
      onPress={() => router.push(item.targetType === 'listing' ? `/listing/${item.targetId}` as never : `/breeder/${item.targetId}` as never)}
      className="mr-3 w-[260px] rounded-[24px] border border-line bg-white p-4 shadow-sm"
    >
      <View className="flex-row items-center">
        <Image source={{ uri: item.breederLogo }} className="h-12 w-12 rounded-[16px] bg-shell" />
        <View className="ml-3 flex-1">
          <Text className="text-[13px] font-black text-ink">{item.breederName}</Text>
          <Text className="mt-1 text-[9px] text-muted">{item.createdAt}</Text>
        </View>
        <Text className="rounded-full bg-blush px-2.5 py-1.5 text-[9px] font-black text-berry">NEW</Text>
      </View>
      <Text className="mt-4 text-[14px] font-black text-ink">{item.title}</Text>
      <Text className="mt-1 text-[11px] text-muted">{item.description}</Text>
      {item.listingStatus ? <Text className="mt-3 self-start rounded-full bg-berry px-2.5 py-1.5 text-[9px] font-black text-white">{item.listingStatus}</Text> : null}
    </AnimatedPressable>
  );
}

function ReviewCard({ item }: { item: (typeof homeReviews)[number] }) {
  return (
    <Pressable onPress={() => router.push(`/breeder/${item.breederId}`)} className="mr-3 w-[285px] flex-row rounded-[22px] border border-line bg-white p-3 shadow-sm">
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
  const followedActivities = followActivities.filter((item) => followedBreederIds.includes(item.breederId));

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
            {followedActivities.map((item) => <FollowActivityCard key={item.id} item={item} />)}
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
