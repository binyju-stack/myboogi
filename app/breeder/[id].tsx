import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar, TopBar, VerifiedBadge } from '@/components/common';
import { LevelPill } from '@/components/LevelProgress';
import { ListingCard } from '@/components/ListingCard';
import { ChatReadyModal } from '@/components/ChatReadyModal';
import { ReadyModal } from '@/components/ReadyModal';
import { ReportActionMenu } from '@/components/ReportActionMenu';
import { Page } from '@/components/screen';
import { ReviewTypeBadge, StarRating } from '@/components/StarRating';
import { colors } from '@/constants/theme';
import { formatLevel } from '@/data/levelData';
import { getListingStatus } from '@/data/listingStatusData';
import { breederReviews, breeders, listings } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import type { BreederReview } from '@/types';
import { useMockUserState } from '@/components/MockUserState';

type ShopTab = 'selling' | 'completed' | 'reviews';

const tabs: { key: ShopTab; label: string }[] = [
  { key: 'selling', label: '분양중' },
  { key: 'completed', label: '분양완료' },
  { key: 'reviews', label: '후기' },
];

const linkButtons = [
  { key: 'instagramUrl', icon: 'logo-instagram', label: '인스타그램' },
  { key: 'blogUrl', icon: 'newspaper-outline', label: '블로그' },
  { key: 'youtubeUrl', icon: 'logo-youtube', label: '유튜브' },
  { key: 'kakaoChannelUrl', icon: 'chatbubble-ellipses-outline', label: '카카오채널' },
  { key: 'websiteUrl', icon: 'globe-outline', label: '홈페이지' },
] as const;

function LegacyReviewCard({ review }: { review: BreederReview }) {
  return (
    <View className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Avatar uri={review.avatar} size={38} />
        <View className="ml-3 flex-1">
          <Text className="text-[12px] font-black text-ink">{review.author}</Text>
          <Text className="mt-1 text-[9px] text-muted">{review.species} · {review.createdAt}</Text>
        </View>
        <View className="flex-row items-center rounded-full bg-cream px-2.5 py-1.5">
          <Ionicons name="star" size={11} color="#FFB443" />
          <Text className="ml-1 text-[10px] font-black text-ink">{review.rating}</Text>
        </View>
      </View>
      <Text className="mt-3 text-[12px] leading-6 text-ink">{review.content}</Text>
    </View>
  );
}

function ReviewCard({ review }: { review: BreederReview }) {
  return (
    <View className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Avatar uri={review.avatar} size={38} />
        <View className="ml-3 flex-1">
          <Text className="text-[12px] font-black text-ink" numberOfLines={1}>{review.author}</Text>
          <Text className="mt-1 text-[9px] text-muted">{review.species} · {review.createdAt}</Text>
        </View>
        <StarRating rating={review.rating} size={12} />
      </View>
      <View className="mt-3 flex-row items-center justify-between">
        <ReviewTypeBadge type={review.reviewType} />
        {review.reportCount ? <Text className="text-[9px] font-bold text-muted">신고 {review.reportCount}</Text> : null}
      </View>
      <Text className="mt-3 text-[12px] leading-6 text-ink">{review.content}</Text>
    </View>
  );
}

function ReviewSummaryCard({ breederId }: { breederId: string }) {
  const summary = getReviewSummary(breederId);
  const items = [
    { label: '후기', value: `${summary.totalReviews}개` },
    { label: '문의 기반', value: `${summary.contactBasedCount}개` },
    { label: '실거래 인증', value: `${summary.verifiedTradeCount}개` },
    { label: '분양완료', value: `${summary.completedTrades}건` },
  ];

  return (
    <View className="mb-4 rounded-[24px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[10px] font-black text-berry">REVIEW TRUST</Text>
          <Text className="mt-1 text-[17px] font-black text-ink">후기 신뢰도 요약</Text>
        </View>
        <StarRating rating={summary.averageRating} size={14} />
      </View>
      <View className="mt-4 flex-row flex-wrap justify-between">
        {items.map((item) => (
          <View key={item.label} className="mb-2 w-[48%] rounded-[16px] bg-soft px-3.5 py-3">
            <Text className="text-[9px] font-bold text-muted">{item.label}</Text>
            <Text className="mt-1 text-[14px] font-black text-ink">{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function EmptyState({ completed = false }: { completed?: boolean }) {
  return (
    <View className="items-center rounded-[24px] border border-line bg-white px-5 py-12">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-soft">
        <Ionicons name={completed ? 'checkmark-circle-outline' : 'storefront-outline'} size={22} color={colors.muted} />
      </View>
      <Text className="mt-4 text-[13px] font-black text-ink">{completed ? '아직 분양 완료 개체가 없어요' : '등록된 개체가 없어요'}</Text>
      <Text className="mt-2 text-[10px] text-muted">새로운 소식이 올라오면 알려드릴게요.</Text>
    </View>
  );
}

function InfoBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <View className="mb-2 mr-2 rounded-[16px] bg-soft px-3.5 py-3">
      <Text className="text-[9px] font-bold text-muted">{label}</Text>
      <Text className="mt-1 text-[12px] font-black text-ink">{value}</Text>
    </View>
  );
}

function BreederTypeBadge({ type, label }: { type?: string; label?: string }) {
  const business = type === 'business';
  return (
    <View className={`mt-2 self-start rounded-full px-3 py-2 ${business ? 'bg-ink' : 'bg-blush'}`}>
      <Text className={`text-[10px] font-black ${business ? 'text-white' : 'text-berry'}`}>{label ?? (business ? '사업자 인증 브리더' : '개인 인증 브리더')}</Text>
    </View>
  );
}

export default function BreederShopScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ShopTab>('selling');
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);
  const { isFollowing, toggleFollow } = useMockUserState();
  const breeder = breeders.find((entry) => entry.id === id) ?? breeders[0];
  const selling = listings.filter((item) => item.breederId === breeder.id && getListingStatus(item) !== 'completed');
  const completed = listings.filter((item) => item.breederId === breeder.id && getListingStatus(item) === 'completed');
  const reviews = breederReviews.filter((review) => review.breederId === breeder.id && review.status !== 'hidden');
  const activeListings = activeTab === 'selling' ? selling : completed;
  const following = isFollowing(breeder.id);
  const followerCount = breeder.followers + (following ? 1 : 0);
  const showExternalReady = () => Alert.alert('외부 링크 이동 기능은 준비중입니다.');
  const showTurtleReady = () => Alert.alert('대표 개체 상세 기능은 준비중입니다.');

  return (
    <Page>
      <TopBar title="브리더 미니샵" right="ellipsis-horizontal" onRightPress={() => setActionVisible(true)} />

      <View className="bg-white pb-6">
        <Image source={{ uri: breeder.bannerImage ?? breeder.banner }} className="h-48 w-full bg-shell" resizeMode="cover" />
        <View className="-mt-12 px-5">
          <View className="flex-row items-end justify-between">
            <View className="h-24 w-24 overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-sm">
              <Image source={{ uri: breeder.logo ?? breeder.avatar }} className="h-full w-full" resizeMode="cover" />
            </View>
            <AnimatedPressable onPress={() => toggleFollow(breeder.id)} className={`mb-1 rounded-full px-6 py-3 ${following ? 'bg-blush' : 'bg-berry'}`}>
              <Text className={`text-[11px] font-black ${following ? 'text-berry' : 'text-white'}`}>{following ? '팔로잉' : '팔로우'}</Text>
            </AnimatedPressable>
          </View>

          <View className="mt-4 flex-row items-center">
            <Text className="text-[22px] font-black text-ink">{breeder.name}</Text>
            <View className="ml-2"><VerifiedBadge label={breeder.badge} /></View>
          </View>
          <BreederTypeBadge type={breeder.breederType} label={breeder.verificationBadgeLabel} />
          <Text className="mt-2 text-[13px] font-bold leading-6 text-ink">{breeder.shortBio ?? breeder.intro}</Text>

          <View className="mt-3 flex-row flex-wrap gap-2">
            <LevelPill label={formatLevel(breeder.level ?? 6, breeder.levelName ?? '브리더')} icon="ribbon-outline" />
            <View className="flex-row items-center self-start rounded-full bg-soft px-3 py-2">
              <Ionicons name="shield-checkmark-outline" size={13} color={colors.muted} />
              <Text className="ml-1 text-[10px] font-black text-muted">거래 신뢰도 {breeder.trustScore ?? 90}</Text>
            </View>
          </View>

          <View className="mt-5 flex-row justify-between">
            {linkButtons.map((button) => (
              <AnimatedPressable key={button.key} onPress={showExternalReady} className="h-11 w-11 items-center justify-center rounded-full bg-soft">
                <Ionicons name={button.icon} size={19} color={colors.berry} />
              </AnimatedPressable>
            ))}
          </View>

          <View className="mt-5 flex-row rounded-[20px] bg-soft py-4">
            {[
              [followerCount.toLocaleString(), '팔로워'],
              [breeder.trades, '분양완료'],
              [breeder.reviews, '문의 후기'],
              [breeder.rating, '평균 평점'],
            ].map(([value, label], index) => (
              <View key={label} className={`flex-1 items-center ${index ? 'border-l border-line' : ''}`}>
                <Text className="text-[15px] font-black text-ink">{value}</Text>
                <Text className="mt-1 text-[9px] text-muted">{label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-4 flex-row flex-wrap">
            <InfoBadge label="활동 지역" value={breeder.region ?? breeder.location} />
            <InfoBadge label="사육 경력" value={`${breeder.careerYears ?? 3}년`} />
            <InfoBadge label="가입일" value={breeder.joinedAt ?? '2024.01'} />
            <InfoBadge label="전문 품종" value={breeder.specialty ?? '육지거북'} />
          </View>
        </View>
      </View>

      <FadeInView>
        <View className="mx-5 mt-4 rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-black text-berry">ABOUT BREEDER</Text>
          <Text className="mt-1 text-[20px] font-black text-ink">브리더 소개</Text>
          <Text className="mt-4 text-[13px] leading-7 text-ink">{breeder.fullBio ?? breeder.intro}</Text>
          <View className="mt-4 rounded-[18px] bg-cream px-4 py-3">
            <Text className="text-[10px] font-black text-muted">대표 혈통/라인</Text>
            <Text className="mt-1 text-[12px] font-bold leading-5 text-ink">{breeder.specialty ?? '건강한 개체 선별 라인'} 중심으로 안정적인 성장과 먹이 반응을 확인한 개체를 소개합니다.</Text>
          </View>
        </View>
      </FadeInView>

      <FadeInView delay={60}>
        <View className="mt-6">
          <View className="mb-4 px-5">
            <Text className="text-[10px] font-black text-berry">SIGNATURE TURTLES</Text>
            <Text className="mt-1 text-[20px] font-black text-ink">대표 개체</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
            {(breeder.representativeTurtles ?? []).map((turtle) => (
              <AnimatedPressable key={turtle.id} onPress={showTurtleReady} className="mr-3 w-56 overflow-hidden rounded-[24px] border border-line bg-white shadow-sm">
                <Image source={{ uri: turtle.image }} className="h-36 w-full bg-shell" resizeMode="cover" />
                <View className="p-4">
                  <Text className="text-[15px] font-black text-ink">{turtle.name}</Text>
                  <Text className="mt-1 text-[10px] font-bold text-berry">{turtle.species}</Text>
                  <Text className="mt-2 text-[11px] leading-5 text-muted" numberOfLines={2}>{turtle.feature}</Text>
                </View>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </View>
      </FadeInView>

      <View className="mt-3 bg-white px-5 pt-2">
        <View className="flex-row">
          {tabs.map((tab) => (
            <Pressable key={tab.key} onPress={() => setActiveTab(tab.key)} className={`flex-1 items-center border-b-2 py-4 ${activeTab === tab.key ? 'border-berry' : 'border-transparent'}`}>
              <Text className={`text-[12px] font-black ${activeTab === tab.key ? 'text-berry' : 'text-muted'}`}>{tab.label} {tab.key === 'selling' ? selling.length : tab.key === 'completed' ? completed.length : reviews.length}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="px-5 pt-6">
        <View className="mb-4 flex-row items-end justify-between">
          <View>
            <Text className="text-[10px] font-black text-berry">{activeTab === 'reviews' ? 'REAL REVIEW' : activeTab === 'selling' ? 'AVAILABLE NOW' : 'NEW FAMILY'}</Text>
            <Text className="mt-1 text-[19px] font-black text-ink">{activeTab === 'reviews' ? '집사들의 솔직한 후기' : activeTab === 'selling' ? '현재 분양중 개체' : '분양 완료 개체'}</Text>
          </View>
          {activeTab === 'reviews' ? <Text className="text-[10px] font-bold text-muted">평점 {breeder.rating}</Text> : null}
        </View>

        {activeTab === 'reviews'
          ? (
            <>
              <ReviewSummaryCard breederId={breeder.id} />
              {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
            </>
          )
          : activeListings.length
            ? activeListings.map((item) => <ListingCard key={item.id} item={item} list />)
            : <EmptyState completed={activeTab === 'completed'} />}
      </View>

      <View className="px-5 pt-3">
        <Pressable onPress={() => setChatModalVisible(true)} className="flex-row items-center justify-center rounded-[18px] bg-berry py-4">
          <Ionicons name="chatbubbles-outline" size={16} color="white" />
          <Text className="ml-2 text-[12px] font-black text-white">브리더에게 문의하기</Text>
        </Pressable>
      </View>

      <ChatReadyModal visible={chatModalVisible} onClose={() => setChatModalVisible(false)} />
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
    </Page>
  );
}
