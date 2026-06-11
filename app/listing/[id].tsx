import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar, Stat, TopBar, VerifiedBadge } from '@/components/common';
import { useMockUserState } from '@/components/MockUserState';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { breederReviews, breeders, listingDetails, listings } from '@/data/mockData';

function InfoRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <View className={`flex-row py-3.5 ${last ? '' : 'border-b border-line'}`}><Text className="w-24 text-[11px] font-bold text-muted">{label}</Text><Text className="flex-1 text-[12px] font-black leading-5 text-ink">{value}</Text></View>;
}

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const { isFavorite, isFollowing, toggleFavorite } = useMockUserState();
  const item = listings.find((listing) => listing.id === id) ?? listings[0];
  const breeder = breeders.find((entry) => entry.id === item.breederId) ?? breeders[0];
  const detail = listingDetails[item.id] ?? listingDetails.l1;
  const reviews = breederReviews.filter((review) => review.breederId === breeder.id).slice(0, 2);
  const favorite = isFavorite(item.id);
  const followerCount = breeder.followers + (isFollowing(breeder.id) ? 1 : 0);
  const likeCount = item.likes + (favorite ? 1 : 0);

  const showModal = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar title="분양 상세" right="share-social-outline" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 92 + insets.bottom }} className="bg-page">
        <View className="bg-white">
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={(event) => setImageIndex(Math.round(event.nativeEvent.contentOffset.x / width))}>
            {item.images.map((image) => <Image key={image} source={{ uri: image }} style={{ width, height: width }} className="bg-shell" resizeMode="cover" />)}
          </ScrollView>
          <View className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1.5"><Text className="text-[10px] font-bold text-white">{imageIndex + 1} / {item.images.length}</Text></View>
        </View>

        <View className="bg-white px-5 pb-6 pt-5">
          <View className="flex-row items-center"><VerifiedBadge /><Text className="ml-2 text-[10px] font-bold text-muted">{item.status}</Text></View>
          <Text className="mt-3 text-[22px] font-black tracking-[-0.6px] text-ink">{item.species}</Text>
          <Text className="mt-3 text-[26px] font-black text-ink">{item.price.toLocaleString()}원</Text>
          <View className="mt-4 flex-row items-center"><Text className="text-[11px] text-muted">{item.location} · {item.stage}</Text><View className="ml-auto flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon={favorite ? 'heart' : 'heart-outline'} value={likeCount} /></View></View>
        </View>

        <FadeInView>
          <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
            <View className="flex-row items-center"><Avatar uri={breeder.avatar} size={54} /><View className="ml-3 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-1.5 text-[14px] font-black text-ink">{breeder.name}</Text><Text className="mt-1 text-[9px] text-muted">{breeder.location} · 후기 평점 {breeder.rating}</Text></View><Ionicons name="chevron-forward" size={18} color={colors.subtle} /></View>
            <View className="mt-4 flex-row rounded-[18px] bg-soft py-3.5"><View className="flex-1 items-center"><Text className="text-[15px] font-black text-ink">{followerCount.toLocaleString()}</Text><Text className="mt-1 text-[9px] text-muted">팔로워</Text></View><View className="flex-1 items-center border-l border-line"><Text className="text-[15px] font-black text-ink">{breeder.trades}</Text><Text className="mt-1 text-[9px] text-muted">분양완료</Text></View></View>
            <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mt-3 items-center rounded-[16px] bg-blush py-3.5"><Text className="text-[11px] font-black text-berry">브리더 미니샵 보기</Text></AnimatedPressable>
          </View>
        </FadeInView>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[9px] font-black text-berry">TURTLE PROFILE</Text><Text className="mt-1 text-[18px] font-black text-ink">개체 정보</Text>
          <View className="mt-4"><InfoRow label="성별" value={item.sex} /><InfoRow label="부화일" value={item.hatchDate} /><InfoRow label="사이즈" value={item.size} /><InfoRow label="먹이 반응" value={detail.foodResponse} /><InfoRow label="건강 상태" value={detail.healthStatus} last /></View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[9px] font-black text-berry">PARENTS</Text><Text className="mt-1 text-[18px] font-black text-ink">부모 개체</Text>
          <View className="mt-4 flex-row gap-3">{[['부 개체', `${detail.parentInfo} · 활발한 체형`], ['모 개체', `${detail.parentInfo} · 안정적인 먹이 반응`]].map(([label, value], index) => <View key={label} className="flex-1 rounded-[18px] bg-soft p-4"><View className="h-9 w-9 items-center justify-center rounded-[13px] bg-white"><Ionicons name={index ? 'female-outline' : 'male-outline'} size={17} color={colors.berry} /></View><Text className="mt-3 text-[11px] font-black text-ink">{label}</Text><Text className="mt-2 text-[9px] leading-4 text-muted">{value}</Text></View>)}</View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm"><Text className="text-[9px] font-black text-berry">ABOUT TURTLE</Text><Text className="mt-1 text-[18px] font-black text-ink">분양 설명</Text><Text className="mt-4 text-[13px] leading-7 text-muted">{item.description}</Text><View className="mt-4 rounded-[16px] bg-cream px-4 py-3"><Text className="text-[10px] font-bold leading-5 text-ink">특이사항 · {detail.notes}</Text></View></View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <View className="flex-row items-end justify-between"><View><Text className="text-[9px] font-black text-berry">REAL REVIEW</Text><Text className="mt-1 text-[18px] font-black text-ink">후기 미리보기</Text></View><Text className="text-[10px] font-bold text-muted">전체 {breeder.reviews}</Text></View>
          <View className="mt-4">{reviews.map((review, index) => <View key={review.id} className={`py-3 ${index ? 'border-t border-line' : ''}`}><View className="flex-row items-center"><Avatar uri={review.avatar} size={32} /><View className="ml-2 flex-1"><Text className="text-[10px] font-black text-ink">{review.author}</Text><Text className="mt-1 text-[8px] text-muted">{review.createdAt}</Text></View><Ionicons name="star" size={11} color="#FFB443" /><Text className="ml-1 text-[9px] font-black text-ink">{review.rating}</Text></View><Text className="mt-2 text-[10px] leading-5 text-muted" numberOfLines={2}>{review.content}</Text></View>)}</View>
          <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mt-2 items-center rounded-[16px] bg-soft py-3.5"><Text className="text-[10px] font-black text-ink">후기 더보기</Text></AnimatedPressable>
        </View>
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 12) }} className="absolute bottom-0 left-0 right-0 w-full flex-row items-center border-t border-line bg-white px-5 pt-3 shadow-sm">
        <View style={{ width: 96 }}>
          <AnimatedPressable onPress={() => { const added = toggleFavorite(item.id); showModal(added ? '찜 목록에 추가되었습니다.' : '찜 목록에서 삭제되었습니다.'); }} className={`h-14 w-full flex-row items-center justify-center rounded-[20px] ${favorite ? 'bg-blush' : 'bg-soft'}`}><Ionicons name={favorite ? 'heart' : 'heart-outline'} size={18} color={colors.berry} /><Text className="ml-2 text-[11px] font-black text-berry">{favorite ? '찜 완료' : '찜하기'}</Text></AnimatedPressable>
        </View>
        <View className="ml-3 flex-1">
          <AnimatedPressable onPress={() => showModal('카카오 문의 연결 기능은 준비중입니다.')} className="h-14 w-full flex-row items-center justify-center rounded-[20px] bg-[#FEE500]"><Ionicons name="chatbubble" size={17} color={colors.ink} /><Text className="ml-2 text-[12px] font-black text-ink">카카오 문의</Text></AnimatedPressable>
        </View>
      </View>
      <ReadyModal visible={modalVisible} title={modalTitle} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}
