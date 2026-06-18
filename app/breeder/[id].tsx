import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Alert, Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { useMockUserState } from '@/components/MockUserState';
import { ReadyModal } from '@/components/ReadyModal';
import { ReportActionMenu } from '@/components/ReportActionMenu';
import { ReviewTypeBadge, StarRating } from '@/components/StarRating';
import { colors } from '@/constants/theme';
import { getChatRoomIdForBreeder } from '@/data/chat';
import { getListingStatus } from '@/data/listingStatusData';
import { breederReviews, breeders, listings } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import type { Breeder, BreederReview, Listing, RepresentativeTurtle } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];
type ShopTab = 'selling' | 'completed' | 'reviews' | 'growth';

const tabs: { key: ShopTab; label: string }[] = [
  { key: 'selling', label: '분양중' },
  { key: 'completed', label: '분양완료' },
  { key: 'reviews', label: '후기' },
  { key: 'growth', label: '성장기록' },
];

function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return (
    <View className="mb-4 flex-row items-end justify-between">
      <View>
        {eyebrow ? <Text className="text-[10px] font-semibold text-berry">{eyebrow}</Text> : null}
        <Text className="mt-1 text-[20px] font-bold leading-7 text-[#222222]">{title}</Text>
      </View>
      {action ? <Text className="text-[11px] font-bold text-[#9CA3AF]">{action}</Text> : null}
    </View>
  );
}

function MiniMetric({ value, label }: { value: string | number; label: string }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[18px] font-bold text-[#222222]" numberOfLines={1}>{value}</Text>
      <Text className="mt-1 text-[12px] font-medium text-[#A0A5AD]">{label}</Text>
    </View>
  );
}

function BrandHero({
  breeder,
  followerCount,
  following,
  onFollow,
  onMenu,
}: {
  breeder: Breeder;
  followerCount: number;
  following: boolean;
  onFollow: () => void;
  onMenu: () => void;
}) {
  const summary = getReviewSummary(breeder.id);
  const coverImage = breeder.bannerImage ?? breeder.banner;
  const profileImage = breeder.logo ?? breeder.avatar;
  const badgeLabel = breeder.verificationBadgeLabel ?? breeder.badge;

  return (
    <View className="bg-white pb-6 shadow-sm">
      <View className="h-[222px] overflow-hidden rounded-b-[30px]">
        <ImageBackground source={{ uri: coverImage }} className="h-full w-full" resizeMode="cover">
          <View className="absolute inset-0 bg-black/25" />
          <View className="absolute left-5 right-5 top-4 flex-row items-center justify-between">
            <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white/90">
              <Ionicons name="chevron-back" size={22} color={colors.ink} />
            </Pressable>
            <View className="flex-row">
              <AnimatedPressable onPress={onFollow} className={`mr-2 rounded-full px-4 py-2.5 ${following ? 'bg-white' : 'bg-berry'}`}>
                <Text className={`text-[12px] font-semibold ${following ? 'text-berry' : 'text-white'}`}>{following ? '팔로잉' : '팔로우'}</Text>
              </AnimatedPressable>
              <Pressable onPress={onMenu} className="h-10 w-10 items-center justify-center rounded-full bg-white/90">
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.ink} />
              </Pressable>
            </View>
          </View>
          <View className="absolute bottom-5 left-5 right-5">
            <Text className="text-[10px] font-semibold text-white/70">{breeder.breederType === 'business' ? 'BREEDER BRAND' : 'PERSONAL BREEDER'}</Text>
            <Text className="mt-1 text-[24px] font-bold leading-8 text-white" numberOfLines={2}>{breeder.name}</Text>
          </View>
        </ImageBackground>
      </View>

      <View className="-mt-12 px-5">
        <View className="flex-row items-end">
          <Image source={{ uri: profileImage }} className="h-[88px] w-[88px] rounded-full border-4 border-white bg-shell shadow-sm" />
          <View className="ml-3 flex-1 pb-1">
            <View className="self-start rounded-full bg-blush px-3 py-1.5">
              <Text className="text-[10px] font-semibold text-berry">✓ {badgeLabel}</Text>
            </View>
            <View className="mt-2">
              <StarRating rating={summary.averageRating} size={15} />
            </View>
          </View>
        </View>

        <Text className="mt-4 text-[14px] font-medium leading-6 text-[#666666]">{breeder.shortBio ?? breeder.intro}</Text>

        <View className="mt-5 flex-row rounded-[24px] border border-line bg-white py-4 shadow-sm">
          <MiniMetric value={summary.averageRating.toFixed(1)} label="평점" />
          <View className="w-px bg-line" />
          <MiniMetric value={summary.totalReviews} label="후기" />
          <View className="w-px bg-line" />
          <MiniMetric value={followerCount.toLocaleString()} label="팔로워" />
        </View>
      </View>
    </View>
  );
}

function SnsButton({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <AnimatedPressable onPress={onPress} className="mr-2 flex-1 items-center rounded-[18px] bg-soft px-2 py-3">
      <Ionicons name={icon} size={19} color={colors.berry} />
      <Text className="mt-1.5 text-[11px] font-semibold text-[#666666]" numberOfLines={1}>{label}</Text>
    </AnimatedPressable>
  );
}

function SnsSection({ breeder, onContact }: { breeder: Breeder; onContact: () => void }) {
  const showReady = (label: string) => Alert.alert(`${label} 이동 기능은 준비중입니다.`);

  return (
    <FadeInView delay={40}>
      <View className="mx-5 mt-5 rounded-[26px] border border-line bg-white p-5 shadow-sm">
        <SectionTitle eyebrow="CONNECT" title="브랜드 채널" />
        <View className="flex-row">
          <SnsButton icon="logo-instagram" label="인스타그램" onPress={() => showReady('인스타그램')} />
          <SnsButton icon="newspaper-outline" label="블로그" onPress={() => showReady('블로그')} />
          <SnsButton icon="chatbubble-outline" label="오픈채팅" onPress={() => showReady('오픈채팅')} />
          <SnsButton icon="chatbubbles-outline" label="카카오 문의" onPress={onContact} />
        </View>
        <Text className="mt-4 text-[11px] font-medium leading-5 text-[#9CA3AF]" numberOfLines={2}>
          {breeder.kakaoChannelUrl ?? breeder.instagramUrl ?? 'SNS 링크는 실제 서비스 연결 시 활성화됩니다.'}
        </Text>
      </View>
    </FadeInView>
  );
}

function AboutSection({ breeder }: { breeder: Breeder }) {
  const chips = [
    breeder.specialty ?? '전문 품종 준비중',
    breeder.region ?? breeder.location,
    `${breeder.careerYears ?? 3}년 경력`,
  ];

  return (
    <FadeInView delay={80}>
      <View className="mx-5 mt-5 rounded-[26px] border border-line bg-white p-5 shadow-sm">
        <SectionTitle eyebrow="ABOUT" title="브리더 소개" />
        <Text className="text-[15px] font-medium leading-7 text-[#666666]">{breeder.fullBio ?? breeder.intro}</Text>
        <View className="mt-4 flex-row flex-wrap">
          {chips.map((chip) => (
            <View key={chip} className="mb-2 mr-2 rounded-full bg-blush px-3 py-2">
              <Text className="text-[12px] font-semibold text-berry">{chip}</Text>
            </View>
          ))}
        </View>
      </View>
    </FadeInView>
  );
}

function TabBar({
  activeTab,
  onChange,
  counts,
}: {
  activeTab: ShopTab;
  onChange: (tab: ShopTab) => void;
  counts: Record<ShopTab, number>;
}) {
  return (
    <View className="mx-5 mt-6 rounded-[22px] bg-white p-1 shadow-sm">
      <View className="flex-row">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <Pressable key={tab.key} onPress={() => onChange(tab.key)} className={`flex-1 items-center rounded-[18px] py-3 ${active ? 'bg-berry' : ''}`}>
              <Text className={`text-[12px] font-semibold ${active ? 'text-white' : 'text-[#A0A5AD]'}`}>{tab.label}</Text>
              <Text className={`mt-0.5 text-[10px] font-medium ${active ? 'text-white/80' : 'text-[#A0A5AD]'}`}>{counts[tab.key]}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function ReviewCard({ review }: { review: BreederReview }) {
  return (
    <View className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Avatar uri={review.avatar} size={40} />
        <View className="ml-3 flex-1">
          <Text className="text-[13px] font-semibold text-[#222222]" numberOfLines={1}>{review.author}</Text>
          <Text className="mt-1 text-[12px] font-medium text-[#A0A5AD]">{review.species} · {review.createdAt}</Text>
        </View>
        <StarRating rating={review.rating} size={13} showValue={false} />
      </View>
      <View className="mt-3">
        <ReviewTypeBadge type={review.reviewType} />
      </View>
      <Text className="mt-3 text-[14px] font-medium leading-6 text-[#666666]">{review.content}</Text>
    </View>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <View className="items-center rounded-[24px] border border-line bg-white px-5 py-12 shadow-sm">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-soft">
        <Ionicons name="leaf-outline" size={22} color={colors.muted} />
      </View>
      <Text className="mt-4 text-[14px] font-semibold text-[#222222]">{title}</Text>
      <Text className="mt-2 text-[12px] font-medium text-[#A0A5AD]">새로운 소식이 올라오면 알려드릴게요.</Text>
    </View>
  );
}

function GrowthCard({ turtle, index }: { turtle: RepresentativeTurtle; index: number }) {
  return (
    <FadeInView delay={index * 45}>
      <View className="mb-3 overflow-hidden rounded-[24px] border border-line bg-white shadow-sm">
        <Image source={{ uri: turtle.image }} className="h-40 w-full bg-shell" resizeMode="cover" />
        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[15px] font-bold text-[#222222]">{turtle.name}</Text>
              <Text className="mt-1 text-[12px] font-semibold text-berry">{turtle.species}</Text>
            </View>
            <View className="rounded-full bg-soft px-3 py-2">
              <Text className="text-[11px] font-semibold text-[#666666]">{index + 1}세대 기록</Text>
            </View>
          </View>
          <Text className="mt-3 text-[13px] font-medium leading-5 text-[#8A8F98]">{turtle.feature}</Text>
        </View>
      </View>
    </FadeInView>
  );
}

function ListingSection({ items, completed }: { items: Listing[]; completed?: boolean }) {
  if (!items.length) return <EmptyState title={completed ? '분양완료 개체가 아직 없어요' : '현재 분양중인 개체가 없어요'} />;
  return <>{items.map((item, index) => <ListingCard key={item.id} item={item} list index={index} />)}</>;
}

export default function BreederShopScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ShopTab>('selling');
  const [actionVisible, setActionVisible] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);
  const { isFollowing, toggleFollow } = useMockUserState();

  const breeder = breeders.find((entry) => entry.id === id) ?? breeders[0];
  const selling = listings.filter((item) => item.breederId === breeder.id && getListingStatus(item) !== 'completed');
  const completed = listings.filter((item) => item.breederId === breeder.id && getListingStatus(item) === 'completed');
  const reviews = breederReviews.filter((review) => review.breederId === breeder.id && review.status !== 'hidden');
  const growthItems = breeder.representativeTurtles ?? [];
  const following = isFollowing(breeder.id);
  const followerCount = breeder.followers + (following ? 1 : 0);
  const counts = {
    selling: selling.length,
    completed: completed.length,
    reviews: reviews.length,
    growth: growthItems.length,
  };
  const openChatRoom = () => router.push(`/chat/${getChatRoomIdForBreeder(breeder.name)}`);

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
        <BrandHero
          breeder={breeder}
          followerCount={followerCount}
          following={following}
          onFollow={() => toggleFollow(breeder.id)}
          onMenu={() => setActionVisible(true)}
        />

        <SnsSection breeder={breeder} onContact={openChatRoom} />
        <AboutSection breeder={breeder} />

        <TabBar activeTab={activeTab} onChange={setActiveTab} counts={counts} />

        <View className="px-5 pt-6">
          {activeTab === 'selling' ? (
            <>
              <SectionTitle eyebrow="AVAILABLE" title="현재 분양중" action={`${selling.length}개`} />
              <ListingSection items={selling} />
            </>
          ) : null}

          {activeTab === 'completed' ? (
            <>
              <SectionTitle eyebrow="SOLD OUT" title="분양완료" action={`${completed.length}개`} />
              <ListingSection items={completed} completed />
            </>
          ) : null}

          {activeTab === 'reviews' ? (
            <>
              <SectionTitle eyebrow="REVIEWS" title="브랜드 후기" action={`${reviews.length}개`} />
              {reviews.length ? reviews.map((review) => <ReviewCard key={review.id} review={review} />) : <EmptyState title="아직 등록된 후기가 없어요" />}
            </>
          ) : null}

          {activeTab === 'growth' ? (
            <>
              <SectionTitle eyebrow="GROWTH LOG" title="성장기록" action={`${growthItems.length}개`} />
              {growthItems.length ? growthItems.map((turtle, index) => <GrowthCard key={turtle.id} turtle={turtle} index={index} />) : <EmptyState title="대표 개체 성장기록이 준비중이에요" />}
            </>
          ) : null}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-line bg-white/95 px-5 pb-4 pt-3">
        <AnimatedPressable onPress={openChatRoom} className="h-14 flex-row items-center justify-center rounded-[20px] bg-berry shadow-sm">
          <Ionicons name="chatbubbles-outline" size={18} color="white" />
          <Text className="ml-2 text-[14px] font-semibold text-white">문의하기</Text>
        </AnimatedPressable>
      </View>

      <ReadyModal visible={blockVisible} title="해당 사용자를 차단했습니다." onClose={() => setBlockVisible(false)} />
      <ReportActionMenu
        visible={actionVisible}
        onClose={() => setActionVisible(false)}
        onReport={() => {
          setActionVisible(false);
          router.push({ pathname: '/report', params: { targetType: '브리더', targetName: breeder.name } });
        }}
        onBlock={() => {
          setActionVisible(false);
          setBlockVisible(true);
        }}
      />
    </SafeAreaView>
  );
}
