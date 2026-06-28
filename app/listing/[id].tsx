import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { BreederNoticeCard } from '@/components/breeder/BreederNoticeCard';
import { AIRecommendedListingsSection } from '@/components/listing/AIRecommendedListingsSection';
import { MarketPriceCard } from '@/components/listing/MarketPriceCard';
import { BreederTrustCard } from '@/components/breeder/BreederTrustCard';
import { OnlineStatusBadge } from '@/components/ui/OnlineStatusBadge';
import { Avatar, TopBar, VerifiedBadge } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { GrowthTimeline } from '@/components/listing/GrowthTimeline';
import { ReadyModal } from '@/components/ReadyModal';
import { ReportActionMenu } from '@/components/ReportActionMenu';
import { ReviewRatingSummary, ReviewTypeBadge, StarRating } from '@/components/StarRating';
import { colors } from '@/constants/theme';
import { getChatRoomIdForListing } from '@/data/chat';
import { getListingStatus, listingStatusMeta } from '@/data/listingStatusData';
import { breederReviews, breeders, listings } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import { getAIRecommendedListings } from '@/mockData/aiRecommendations';
import { getMarketPriceReference } from '@/mockData/marketPrice';
import { getBreederNotice } from '@/mockData/breederNotice';
import { getBreederOnlineStatus } from '@/mockData/onlineStatus';
import { getBreederTrust, getGrowthTimeline } from '@/mockData/breederTrust';
import { useMockUserState } from '@/components/MockUserState';
import type { BreederReview, Listing, ParentTurtleInfo } from '@/types';

function InfoTile({ label, value }: { label: string; value?: string }) {
  return (
    <View className="mb-2 w-[48%] rounded-[18px] bg-soft px-4 py-3.5">
      <Text className="text-[9px] font-bold text-muted">{label}</Text>
      <Text className="mt-1 text-[12px] font-semibold leading-5 text-ink">{value || '-'}</Text>
    </View>
  );
}

function MetricTile({ label, value }: { label: string; value: string | number }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-[15px] font-bold text-ink">{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text className="mt-1 text-[9px] text-muted">{label}</Text>
    </View>
  );
}

function getStableCurrentViewers(listingId: string, views: number, currentViewers?: number) {
  if (typeof currentViewers === 'number') return Math.min(10, Math.max(2, currentViewers));

  const min = views >= 300 ? 6 : 2;
  const max = views >= 300 ? 10 : 5;
  let hash = 0;

  for (let index = 0; index < listingId.length; index += 1) {
    hash = (hash * 31 + listingId.charCodeAt(index)) >>> 0;
  }

  return min + (hash % (max - min + 1));
}

function CurrentViewersPill({ listingId, views, currentViewers }: { listingId: string; views: number; currentViewers?: number }) {
  const viewerCount = getStableCurrentViewers(listingId, views, currentViewers);

  return (
    <View className="self-start rounded-full bg-[#FFF1E6] px-2 py-1">
      <Text className="text-[12px] font-semibold leading-4 text-[#FF9B4A]">현재 {viewerCount}명이 보고 있어요</Text>
    </View>
  );
}

function ParentCard({ title, parent }: { title: string; parent?: ParentTurtleInfo }) {
  return (
    <View className="w-[48%] overflow-hidden rounded-[20px] border border-line bg-white">
      <Image source={{ uri: parent?.image }} className="h-28 w-full bg-shell" resizeMode="cover" />
      <View className="p-3">
        <Text className="text-[10px] font-semibold text-berry">{title}</Text>
        <Text className="mt-1 text-[13px] font-semibold text-ink">{parent?.name ?? '-'}</Text>
        <Text className="mt-1 text-[10px] leading-4 text-muted" numberOfLines={2}>{parent?.feature ?? '-'}</Text>
        <Text className="mt-2 rounded-full bg-soft px-2.5 py-1.5 text-[8px] font-bold text-muted" numberOfLines={1}>{parent?.lineage ?? '-'}</Text>
      </View>
    </View>
  );
}

function ListingReviewPreview({ review, divider = false }: { review: BreederReview; divider?: boolean }) {
  const summary = getReviewSummary(review.breederId);

  return (
    <View className={`py-3 ${divider ? 'border-t border-line' : ''}`}>
      <View className="flex-row items-center">
        <Avatar uri={review.avatar} size={34} />
        <View className="ml-3 flex-1">
          <Text className="text-[12px] font-semibold text-ink" numberOfLines={1}>{review.author}</Text>
          <Text className="mt-1 text-[9px] text-muted">{review.species} · {review.createdAt}</Text>
        </View>
        <ReviewRatingSummary rating={review.rating} reviewCount={summary.totalReviews} size={13} />
      </View>
      <View className="mt-2">
        <ReviewTypeBadge type={review.reviewType} />
      </View>
      <Text className="mt-2 text-[11px] leading-5 text-muted" numberOfLines={2}>{review.content}</Text>
    </View>
  );
}

function SectionCard({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <FadeInView>
      <View className="mx-5 mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
        {eyebrow ? <Text className="text-[10px] font-semibold text-berry">{eyebrow}</Text> : null}
        <Text className={`${eyebrow ? 'mt-1' : ''} text-[20px] font-bold leading-7 text-ink`}>{title}</Text>
        {children}
      </View>
    </FadeInView>
  );
}

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [actionVisible, setActionVisible] = useState(false);
  const { isFavorite, isFollowing, toggleFavorite } = useMockUserState();
  const item = listings.find((listing) => listing.id === id) ?? listings[0];
  const breeder = breeders.find((entry) => entry.id === item.breederId) ?? breeders[0];
  const breederTrust = getBreederTrust(breeder.id);
  const breederNotice = getBreederNotice(breeder.id);
  const onlineStatus = getBreederOnlineStatus(breeder.id);
  const growthTimeline = getGrowthTimeline(item.id);
  const summary = getReviewSummary(breeder.id);
  const reviews = breederReviews.filter((review) => review.breederId === breeder.id && review.status !== 'hidden').slice(0, 2);
  const favorite = isFavorite(item.id);
  const followerCount = breeder.followers + (isFollowing(breeder.id) ? 1 : 0);
  const likeCount = item.likes + (favorite ? 1 : 0);
  const listingStatus = getListingStatus(item);
  const statusMeta = listingStatusMeta[listingStatus];
  const completed = listingStatus === 'completed';
  const aiRecommendations = getAIRecommendedListings(item.id);
  const marketPrice = getMarketPriceReference(item.id);
  const relatedListings = useMemo(() => {
    const explicitIds = item.relatedListingIds ?? [];
    const explicit = explicitIds.map((listingId) => listings.find((listing) => listing.id === listingId)).filter(Boolean) as Listing[];
    const sameBreeder = listings.filter((listing) => listing.breederId === breeder.id && listing.id !== item.id && !explicitIds.includes(listing.id));
    return [...explicit, ...sameBreeder].slice(0, 5);
  }, [breeder.id, item.id, item.relatedListingIds]);

  const showModal = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const openChatRoom = () => {
    router.push(`/chat/${getChatRoomIdForListing(item.id)}`);
  };

  const showContactAlert = () => {
    Alert.alert('문의 연결 기록이 저장되었습니다. 거래가 진행되었다면 나중에 후기를 남길 수 있어요.');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar title="분양 상세" right="ellipsis-horizontal" onRightPress={() => setActionVisible(true)} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 128 + insets.bottom }} className="bg-page">
        <View className="bg-white">
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={(event) => setImageIndex(Math.round(event.nativeEvent.contentOffset.x / width))}>
            {item.images.map((image) => <Image key={image} source={{ uri: image }} style={{ width, height: Math.min(width, 430) }} className="bg-shell" resizeMode="cover" />)}
          </ScrollView>
          <View className="absolute bottom-0 left-0 right-0 h-32 bg-black/20" />
          <View className="absolute bottom-0 left-0 right-0 h-16 bg-black/25" />
          <View className={`absolute left-5 top-5 rounded-full px-3.5 py-2 ${statusMeta.badgeClass}`}>
            <Text className={`text-[10px] font-semibold ${statusMeta.textClass}`}>{statusMeta.label}</Text>
          </View>
          <View className="absolute bottom-4 right-5 rounded-full bg-black/55 px-3 py-1.5">
            <Text className="text-[10px] font-bold text-white">{imageIndex + 1} / {item.images.length}</Text>
          </View>
          <View className="absolute bottom-4 left-5 flex-row">
            <AnimatedPressable onPress={() => showModal('공유 기능은 준비중입니다.')} className="mr-2 h-11 w-11 items-center justify-center rounded-full bg-white/90">
              <Ionicons name="share-outline" size={19} color={colors.ink} />
            </AnimatedPressable>
            <AnimatedPressable onPress={() => toggleFavorite(item.id)} className="h-11 w-11 items-center justify-center rounded-full bg-white/90">
              <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={20} color={colors.berry} />
            </AnimatedPressable>
          </View>
        </View>

        <View className="bg-white px-5 pb-6 pt-5">
          <View className="flex-row items-center">
            <VerifiedBadge />
            <View className={`ml-2 rounded-full px-2 py-1 ${statusMeta.softClass}`}>
              <Text className="text-[11px] font-semibold leading-4 text-ink">{statusMeta.label}</Text>
            </View>
          </View>
          <Text className="mt-3 text-[22px] font-bold leading-7 text-ink">{item.species}</Text>
          <View className="mt-3">
            <CurrentViewersPill listingId={item.id} views={item.views} currentViewers={item.currentViewers} />
          </View>
          <Text className="mt-3 text-[28px] font-bold text-ink">{item.price.toLocaleString()}원</Text>
          <View className="mt-4 flex-row rounded-[20px] bg-soft px-3 py-3">
            <MetricTile label="지역" value={item.location} />
            <View className="w-px bg-line" />
            <MetricTile label="성별" value={item.sex} />
            <View className="w-px bg-line" />
            <MetricTile label="단계" value={item.stage} />
          </View>
          <View className="mt-3 flex-row rounded-[20px] bg-white">
            <View className="flex-row items-center rounded-full bg-soft px-3 py-2">
              <Ionicons name="eye-outline" size={14} color={colors.muted} />
              <Text className="ml-1.5 text-[10px] font-bold text-muted">조회 {item.views.toLocaleString()}</Text>
            </View>
            <View className="ml-2 flex-row items-center rounded-full bg-blush px-3 py-2">
              <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={14} color={colors.berry} />
              <Text className="ml-1.5 text-[10px] font-bold text-berry">찜 {likeCount.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <SectionCard eyebrow="TURTLE PROFILE" title="개체 정보">
          <View className="mt-4 flex-row flex-wrap justify-between">
            <InfoTile label="부화일" value={item.hatchDate} />
            <InfoTile label="등갑 길이" value={item.shellLength ?? item.size} />
            <InfoTile label="몸무게" value={item.weight} />
            <InfoTile label="먹이 반응" value={item.feedingResponse} />
            <InfoTile label="건강 상태" value={item.healthStatus} />
            <InfoTile label="특이사항" value={item.specialNotes} />
          </View>
        </SectionCard>

        <SectionCard eyebrow="PARENT LINE" title="부모 개체">
          <View className="mt-4 flex-row justify-between">
            <ParentCard title="부 개체" parent={item.fatherInfo} />
            <ParentCard title="모 개체" parent={item.motherInfo} />
          </View>
        </SectionCard>

        <GrowthTimeline items={growthTimeline} />

        <SectionCard eyebrow="BREEDER TRUST" title="브리더 신뢰 정보">
          <View className="mt-4 flex-row items-center">
            <Image source={{ uri: breeder.logo ?? breeder.avatar }} className="h-16 w-16 rounded-[20px] bg-shell" />
            <View className="ml-3 flex-1">
              <VerifiedBadge label={breeder.badge} />
              <Text className="mt-2 text-[17px] font-bold text-ink">{breeder.name}</Text>
              <View className="mt-1">
                <OnlineStatusBadge status={onlineStatus.status} text={onlineStatus.lastActiveText} />
              </View>
              <Text className="mt-1 text-[10px] font-bold text-muted">{breeder.breederType === 'business' ? '사업자 브리더' : '개인 브리더'} · {breeder.location}</Text>
            </View>
          </View>
          <View className="mt-4">
            <StarRating rating={summary.averageRating} size={15} />
          </View>
          <View className="mt-4 flex-row rounded-[20px] bg-soft py-3.5">
            <MetricTile label="팔로워" value={followerCount} />
            <View className="w-px bg-line" />
            <MetricTile label="분양완료" value={summary.completedTrades} />
            <View className="w-px bg-line" />
            <MetricTile label="문의 후기" value={summary.contactBasedCount} />
            <View className="w-px bg-line" />
            <MetricTile label="평균 평점" value={summary.averageRating.toFixed(1)} />
          </View>
          <View className="mt-4 flex-row">
            <View className="mr-2 flex-1">
              <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="items-center rounded-[18px] bg-blush py-3.5">
                <Text className="text-[12px] font-semibold text-berry">미니샵 가기</Text>
              </AnimatedPressable>
            </View>
            <View className="flex-1">
              <AnimatedPressable onPress={() => showModal(isFollowing(breeder.id) ? '이미 팔로우 중인 브리더입니다.' : '팔로우 기능은 준비중입니다.')} className="items-center rounded-[18px] bg-ink py-3.5">
                <Text className="text-[12px] font-semibold text-white">{isFollowing(breeder.id) ? '팔로잉' : '팔로우'}</Text>
              </AnimatedPressable>
            </View>
          </View>
        </SectionCard>

        <BreederNoticeCard notice={breederNotice} />
        <BreederTrustCard trust={breederTrust} />

        <SectionCard eyebrow="REAL REVIEW" title="최근 후기 미리보기">
          <View className="mt-4">
            {reviews.map((review, index) => <ListingReviewPreview key={review.id} review={review} divider={Boolean(index)} />)}
          </View>
          <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className={`${completed ? 'bg-berry' : 'bg-soft'} mt-3 items-center rounded-[18px] py-3.5`}>
            <Text className={`text-[12px] font-semibold ${completed ? 'text-white' : 'text-ink'}`}>전체 후기 보기</Text>
          </AnimatedPressable>
        </SectionCard>

        <MarketPriceCard marketPrice={marketPrice} />

        <SectionCard eyebrow="ABOUT TURTLE" title="분양 설명">
          <Text className="mt-4 text-[13px] leading-7 text-muted">{item.description}</Text>
          <View className="mt-4 rounded-[18px] bg-cream px-4 py-3">
            <Text className="text-[10px] font-bold leading-5 text-ink">{item.specialNotes}</Text>
          </View>
        </SectionCard>

        <AIRecommendedListingsSection items={aiRecommendations} compact />

        {relatedListings.length ? (
          <View className="mt-4">
            <View className="mb-4 px-5">
              <Text className="text-[10px] font-semibold text-berry">MORE FROM SHOP</Text>
              <Text className="mt-1 text-[20px] font-bold leading-7 text-ink">같은 브리더의 다른 개체</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-2">
              {relatedListings.map((listing) => <ListingCard key={listing.id} item={listing} wide />)}
            </ScrollView>
          </View>
        ) : null}

        <View className="mx-5 mt-4 rounded-[24px] bg-soft px-4 py-4">
          <View className="flex-row">
            <Ionicons name="information-circle-outline" size={18} color={colors.muted} />
            <Text className="ml-2 flex-1 text-[11px] font-bold leading-5 text-muted">
              마이부기는 분양 정보를 연결하는 플랫폼입니다. 실제 거래 전 개체 상태, 브리더 정보, 분양 조건을 반드시 확인하세요.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 12) }} className="absolute bottom-0 left-0 right-0 w-full flex-row items-center border-t border-line bg-white px-5 pt-3 shadow-sm">
        <AnimatedPressable onPress={() => toggleFavorite(item.id)} className={`h-14 w-16 items-center justify-center rounded-[20px] ${favorite ? 'bg-blush' : 'bg-soft'}`}>
          <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={20} color={colors.berry} />
          <Text className="mt-1 text-[10px] font-semibold text-berry">{favorite ? '찜완료' : '찜'}</Text>
        </AnimatedPressable>
        {completed ? (
          <>
            <View className="ml-3 h-14 flex-1 flex-row items-center justify-center rounded-[20px] bg-soft">
              <Ionicons name="checkmark-circle-outline" size={17} color={colors.muted} />
              <Text className="ml-2 text-[12px] font-semibold text-muted">분양완료</Text>
            </View>
            <View className="ml-3 flex-1">
              <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="h-14 flex-row items-center justify-center rounded-[20px] bg-berry">
                <Ionicons name="star" size={16} color={colors.white} />
                <Text className="ml-2 text-[12px] font-semibold text-white">후기 보기</Text>
              </AnimatedPressable>
            </View>
          </>
        ) : (
          <>
            <View className="ml-3 flex-1">
              <AnimatedPressable onPress={openChatRoom} className="h-14 flex-row items-center justify-center rounded-[20px] bg-berry">
                <Ionicons name="chatbubble-ellipses" size={17} color={colors.white} />
                <Text className="ml-2 text-[12px] font-semibold text-white">문의하기</Text>
              </AnimatedPressable>
            </View>
            <View className="ml-2 w-20">
              <AnimatedPressable onPress={showContactAlert} className="h-14 flex-row items-center justify-center rounded-[20px] bg-[#FEE500]">
                <Text className="text-[11px] font-semibold text-ink">카카오</Text>
              </AnimatedPressable>
            </View>
            <View className="ml-2 w-20">
              <AnimatedPressable onPress={showContactAlert} className="h-14 flex-row items-center justify-center rounded-[20px] bg-ink">
                <Text className="text-[11px] font-semibold text-white">전화</Text>
              </AnimatedPressable>
            </View>
          </>
        )}
      </View>
      <ReadyModal visible={modalVisible} title={modalTitle} onClose={() => setModalVisible(false)} />
      <ReportActionMenu
        visible={actionVisible}
        onClose={() => setActionVisible(false)}
        onReport={() => {
          setActionVisible(false);
          router.push({ pathname: '/report', params: { targetType: '분양글', targetName: item.species } });
        }}
        onBlock={() => {
          setActionVisible(false);
          showModal('해당 사용자를 차단했습니다.');
        }}
      />
    </SafeAreaView>
  );
}
