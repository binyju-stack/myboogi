import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar, Stat, TopBar, VerifiedBadge } from '@/components/common';
import { LevelPill } from '@/components/LevelProgress';
import { ReadyModal } from '@/components/ReadyModal';
import { ReportActionMenu } from '@/components/ReportActionMenu';
import { ReviewRatingSummary, ReviewTypeBadge, StarRating } from '@/components/StarRating';
import { colors } from '@/constants/theme';
import { formatLevel } from '@/data/levelData';
import { getListingStatus, listingStatusMeta } from '@/data/listingStatusData';
import { breederReviews, breeders, listingDetails, listings } from '@/data/mockData';
import { getReviewSummary } from '@/data/reviewData';
import { useMockUserState } from '@/components/MockUserState';
import type { BreederReview } from '@/types';

function InfoRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <View className={`flex-row py-3.5 ${last ? '' : 'border-b border-line'}`}><Text className="w-24 text-[11px] font-bold text-muted">{label}</Text><Text className="flex-1 text-[12px] font-black leading-5 text-ink">{value}</Text></View>;
}

function ListingReviewPreview({ review, divider = false }: { review: BreederReview; divider?: boolean }) {
  const summary = getReviewSummary(review.breederId);

  return (
    <View className={`py-3 ${divider ? 'border-t border-line' : ''}`}>
      <View className="flex-row items-center">
        <Avatar uri={review.avatar} size={32} />
        <View className="ml-2 flex-1">
          <Text className="text-[10px] font-black text-ink" numberOfLines={1}>{review.author}</Text>
          <Text className="mt-1 text-[8px] text-muted">{review.createdAt}</Text>
        </View>
        <ReviewRatingSummary rating={review.rating} reviewCount={summary.totalReviews} size={13} />
      </View>
      <View className="mt-2">
        <ReviewTypeBadge type={review.reviewType} />
      </View>
      <Text className="mt-2 text-[10px] leading-5 text-muted" numberOfLines={2}>{review.content}</Text>
    </View>
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
  const detail = listingDetails[item.id] ?? listingDetails.l1;
  const reviews = breederReviews.filter((review) => review.breederId === breeder.id).slice(0, 2);
  const favorite = isFavorite(item.id);
  const followerCount = breeder.followers + (isFollowing(breeder.id) ? 1 : 0);
  const likeCount = item.likes + (favorite ? 1 : 0);
  const listingStatus = getListingStatus(item);
  const statusMeta = listingStatusMeta[listingStatus];
  const completed = listingStatus === 'completed';

  const showModal = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar title="분양 상세" right="ellipsis-horizontal" onRightPress={() => setActionVisible(true)} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 104 + insets.bottom }} className="bg-page">
        <View className="bg-white">
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={(event) => setImageIndex(Math.round(event.nativeEvent.contentOffset.x / width))}>
            {item.images.map((image) => <Image key={image} source={{ uri: image }} style={{ width, height: width }} className="bg-shell" resizeMode="cover" />)}
          </ScrollView>
          <View className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1.5"><Text className="text-[10px] font-bold text-white">{imageIndex + 1} / {item.images.length}</Text></View>
          {completed ? (
            <View className="absolute left-4 top-4 rounded-[18px] bg-black/60 px-4 py-3">
              <Text className="text-[12px] font-black text-white">분양완료된 개체입니다</Text>
            </View>
          ) : null}
        </View>

        <View className="bg-white px-5 pb-6 pt-5">
          <View className="flex-row items-center"><VerifiedBadge /><Text className="ml-2 text-[10px] font-bold text-muted">{item.stage}</Text></View>
          <Text className="mt-3 text-[22px] font-black text-ink">{item.species}</Text>
          <Text className="mt-3 text-[26px] font-black text-ink">{item.price.toLocaleString()}원</Text>
          <View className={`mt-4 self-start rounded-full px-4 py-2.5 ${statusMeta.badgeClass}`}>
            <Text className={`text-[13px] font-black ${statusMeta.textClass}`}>현재 상태 · {statusMeta.label}</Text>
          </View>
          {completed ? (
            <View className="mt-4 rounded-[18px] bg-soft px-4 py-3">
              <Text className="text-[12px] font-black text-ink">후기 작성 가능 상태</Text>
              <Text className="mt-1 text-[10px] text-muted">reviewEligible: {item.reviewEligible ? 'true' : 'false'}</Text>
              <AnimatedPressable onPress={() => router.push('/reviews/create' as never)} className="mt-3 items-center rounded-[14px] bg-white py-3">
                <Text className="text-[10px] font-black text-berry">후기 작성하기</Text>
              </AnimatedPressable>
            </View>
          ) : null}
          <View className="mt-4 flex-row items-center"><Text className="text-[11px] text-muted">{item.location} · {item.stage}</Text><View className="ml-auto flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon={favorite ? 'heart' : 'heart-outline'} value={likeCount} /></View></View>
        </View>

        <FadeInView>
          <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
            <View className="flex-row items-center"><Avatar uri={breeder.avatar} size={54} /><View className="ml-3 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-1.5 text-[14px] font-black text-ink">{breeder.name}</Text><Text className="mt-1 text-[9px] text-muted">{breeder.location} · 후기 평점 {breeder.rating}</Text></View><Ionicons name="chevron-forward" size={18} color={colors.subtle} /></View>
            <View className="mt-3">
              <StarRating rating={breeder.rating} size={13} />
            </View>
            <View className="mt-3 flex-row flex-wrap gap-2">
              <LevelPill label={formatLevel(breeder.level ?? 6, breeder.levelName ?? '브리더')} icon="ribbon-outline" />
              <View className="flex-row items-center self-start rounded-full bg-soft px-3 py-2">
                <Ionicons name="shield-checkmark-outline" size={13} color={colors.muted} />
                <Text className="ml-1 text-[10px] font-black text-muted">거래 신뢰도 {breeder.trustScore ?? 90}</Text>
              </View>
            </View>
            <View className="mt-4 flex-row rounded-[18px] bg-soft py-3.5"><View className="flex-1 items-center"><Text className="text-[15px] font-black text-ink">{followerCount.toLocaleString()}</Text><Text className="mt-1 text-[9px] text-muted">팔로워</Text></View><View className="flex-1 items-center border-l border-line"><Text className="text-[15px] font-black text-ink">{breeder.trades}</Text><Text className="mt-1 text-[9px] text-muted">분양완료</Text></View></View>
            <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mt-3 items-center rounded-[16px] bg-blush py-3.5"><Text className="text-[11px] font-black text-berry">브리더 미니샵 보기</Text></AnimatedPressable>
          </View>
        </FadeInView>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[9px] font-black text-berry">TURTLE PROFILE</Text><Text className="mt-1 text-[18px] font-black text-ink">개체 정보</Text>
          <View className="mt-4"><InfoRow label="성별" value={item.sex} /><InfoRow label="부화일" value={item.hatchDate} /><InfoRow label="사이즈" value={item.size} /><InfoRow label="먹이 반응" value={detail.foodResponse} /><InfoRow label="건강 상태" value={detail.healthStatus} last /></View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[9px] font-black text-berry">ABOUT TURTLE</Text><Text className="mt-1 text-[18px] font-black text-ink">분양 설명</Text><Text className="mt-4 text-[13px] leading-7 text-muted">{item.description}</Text><View className="mt-4 rounded-[16px] bg-cream px-4 py-3"><Text className="text-[10px] font-bold leading-5 text-ink">특이사항 · {detail.notes}</Text></View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <View className="flex-row items-end justify-between"><View><Text className="text-[9px] font-black text-berry">REAL REVIEW</Text><Text className="mt-1 text-[18px] font-black text-ink">후기 미리보기</Text></View><Text className="text-[10px] font-bold text-muted">전체 {breeder.reviews}</Text></View>
          <View className="mt-4">{reviews.map((review, index) => <ListingReviewPreview key={review.id} review={review} divider={Boolean(index)} />)}</View>
          <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mt-2 items-center rounded-[16px] bg-soft py-3.5"><Text className="text-[10px] font-black text-ink">후기 더보기</Text></AnimatedPressable>
        </View>
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 12) }} className="absolute bottom-0 left-0 right-0 w-full flex-row items-center border-t border-line bg-white px-5 pt-3 shadow-sm">
        <View style={{ width: 96 }}>
          <AnimatedPressable onPress={() => { const added = toggleFavorite(item.id); showModal(added ? '찜 목록에 추가되었습니다.' : '찜 목록에서 제거되었습니다.'); }} className={`h-14 w-full flex-row items-center justify-center rounded-[20px] ${favorite ? 'bg-blush' : 'bg-soft'}`}><Ionicons name={favorite ? 'heart' : 'heart-outline'} size={18} color={colors.berry} /><Text className="ml-2 text-[11px] font-black text-berry">{favorite ? '찜 완료' : '찜하기'}</Text></AnimatedPressable>
        </View>
        <View className="ml-3 flex-1">
          {completed ? (
            <View className="h-14 w-full flex-row items-center justify-center rounded-[20px] bg-soft"><Ionicons name="checkmark-circle-outline" size={17} color={colors.muted} /><Text className="ml-2 text-[12px] font-black text-muted">분양완료</Text></View>
          ) : (
            <AnimatedPressable onPress={() => showModal('카카오 문의 연결 기능은 준비중입니다.')} className="h-14 w-full flex-row items-center justify-center rounded-[20px] bg-[#FEE500]"><Ionicons name="chatbubble" size={17} color={colors.ink} /><Text className="ml-2 text-[12px] font-black text-ink">카카오 문의</Text></AnimatedPressable>
          )}
        </View>
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
