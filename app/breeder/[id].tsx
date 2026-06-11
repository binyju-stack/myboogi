import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Avatar, TopBar, VerifiedBadge } from '@/components/common';
import { AnimatedPressable } from '@/components/AnimatedPressable';
import { ChatReadyModal } from '@/components/ChatReadyModal';
import { ListingCard } from '@/components/ListingCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breederReviews, breeders, listings } from '@/data/mockData';
import type { BreederReview } from '@/types';
import { useMockUserState } from '@/components/MockUserState';

type ShopTab = 'selling' | 'completed' | 'reviews';

const tabs: { key: ShopTab; label: string }[] = [
  { key: 'selling', label: '분양중' },
  { key: 'completed', label: '분양완료' },
  { key: 'reviews', label: '후기' },
];

function ReviewCard({ review }: { review: BreederReview }) {
  return (
    <View className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Avatar uri={review.avatar} size={38} />
        <View className="ml-3 flex-1"><Text className="text-[12px] font-black text-ink">{review.author}</Text><Text className="mt-1 text-[9px] text-muted">{review.species} · {review.createdAt}</Text></View>
        <View className="flex-row items-center rounded-full bg-cream px-2.5 py-1.5"><Ionicons name="star" size={11} color="#FFB443" /><Text className="ml-1 text-[10px] font-black text-ink">{review.rating}</Text></View>
      </View>
      <Text className="mt-3 text-[12px] leading-6 text-ink">{review.content}</Text>
    </View>
  );
}

function EmptyState({ completed = false }: { completed?: boolean }) {
  return (
    <View className="items-center rounded-[24px] border border-line bg-white px-5 py-12">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-soft"><Ionicons name={completed ? 'checkmark-circle-outline' : 'storefront-outline'} size={22} color={colors.muted} /></View>
      <Text className="mt-4 text-[13px] font-black text-ink">{completed ? '아직 분양 완료 개체가 없어요' : '등록된 개체가 없어요'}</Text>
      <Text className="mt-2 text-[10px] text-muted">새로운 소식이 올라오면 알려드릴게요.</Text>
    </View>
  );
}

export default function BreederShopScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ShopTab>('selling');
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const { isFollowing, toggleFollow } = useMockUserState();
  const breeder = breeders.find((entry) => entry.id === id) ?? breeders[0];
  const selling = listings.filter((item) => item.breederId === breeder.id && item.status === '분양중');
  const completed = listings.filter((item) => item.breederId === breeder.id && item.status === '분양완료');
  const reviews = breederReviews.filter((review) => review.breederId === breeder.id);
  const activeListings = activeTab === 'selling' ? selling : completed;
  const following = isFollowing(breeder.id);
  const followerCount = breeder.followers + (following ? 1 : 0);

  return (
    <Page>
      <TopBar title="브리더 미니샵" right="share-social-outline" />

      <View className="bg-white pb-6">
        <Image source={{ uri: breeder.banner }} className="h-44 w-full bg-shell" resizeMode="cover" />
        <View className="-mt-10 px-5">
          <View className="flex-row items-end justify-between">
            <View className="rounded-full border-4 border-white bg-white"><Avatar uri={breeder.avatar} size={82} /></View>
            <AnimatedPressable onPress={() => toggleFollow(breeder.id)} className={`mb-1 rounded-full px-6 py-3 ${following ? 'bg-blush' : 'bg-berry'}`}><Text className={`text-[11px] font-black ${following ? 'text-berry' : 'text-white'}`}>{following ? '팔로잉' : '팔로우'}</Text></AnimatedPressable>
          </View>

          <View className="mt-4 flex-row items-center"><Text className="text-[22px] font-black tracking-[-0.6px] text-ink">{breeder.name}</Text><View className="ml-2"><VerifiedBadge label={breeder.badge} /></View></View>
          <Text className="mt-1.5 text-[10px] text-muted">{breeder.location} · 응답이 빨라요</Text>
          <Text className="mt-4 text-[13px] leading-6 text-ink">{breeder.intro}</Text>

          <View className="mt-5 flex-row rounded-[20px] bg-soft py-4">
            {[[followerCount.toLocaleString(), '팔로워'], [breeder.trades, '분양 완료'], [breeder.rating, '후기 평점']].map(([value, label], index) => (
              <View key={label} className={`flex-1 items-center ${index ? 'border-l border-line' : ''}`}><Text className="text-[17px] font-black text-ink">{value}</Text><Text className="mt-1 text-[9px] text-muted">{label}</Text></View>
            ))}
          </View>

          <View className="mt-3 flex-row gap-2">
            <Pressable className="flex-1 flex-row items-center justify-center rounded-[17px] border border-line py-3.5"><Ionicons name="call-outline" size={16} color={colors.ink} /><Text className="ml-2 text-[11px] font-black text-ink">전화 문의</Text></Pressable>
            <Pressable className="flex-1 flex-row items-center justify-center rounded-[17px] bg-[#FEE500] py-3.5"><Ionicons name="chatbubble" size={15} color={colors.ink} /><Text className="ml-2 text-[11px] font-black text-ink">카카오톡 문의</Text></Pressable>
          </View>
          <Pressable onPress={() => setChatModalVisible(true)} className="mt-2 flex-row items-center justify-center rounded-[17px] bg-berry py-3.5"><Ionicons name="chatbubbles-outline" size={16} color="white" /><Text className="ml-2 text-[11px] font-black text-white">채팅하기</Text></Pressable>
        </View>
      </View>

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
          <View><Text className="text-[10px] font-black text-berry">{activeTab === 'reviews' ? 'REAL REVIEW' : activeTab === 'selling' ? 'AVAILABLE NOW' : 'NEW FAMILY'}</Text><Text className="mt-1 text-[19px] font-black text-ink">{activeTab === 'reviews' ? '집사들의 솔직한 후기' : activeTab === 'selling' ? '현재 분양중 개체' : '분양 완료 개체'}</Text></View>
          {activeTab === 'reviews' ? <Text className="text-[10px] font-bold text-muted">평점 {breeder.rating}</Text> : null}
        </View>

        {activeTab === 'reviews'
          ? reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          : activeListings.length
            ? activeListings.map((item) => <ListingCard key={item.id} item={item} list />)
            : <EmptyState completed={activeTab === 'completed'} />}
      </View>
      <ChatReadyModal visible={chatModalVisible} onClose={() => setChatModalVisible(false)} />
    </Page>
  );
}
