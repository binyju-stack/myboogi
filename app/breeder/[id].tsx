import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { Avatar, TopBar, VerifiedBadge } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breeders, listings } from '@/data/mockData';

export default function BreederShopScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const breeder = breeders.find((entry) => entry.id === id) ?? breeders[0];
  const breederListings = listings.filter((item) => item.breederId === breeder.id);
  return (
    <Page>
      <TopBar title="브리더 미니샵" right="share-social-outline" />
      <View className="px-4 pt-4"><Image source={{ uri: breeder.banner }} className="h-36 w-full rounded-2xl bg-shell" resizeMode="cover" /></View>
      <View className="px-4 pb-5 pt-4">
        <View className="flex-row items-center"><Avatar uri={breeder.avatar} size={68} /><View className="ml-3 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-1.5 text-lg font-black text-ink">{breeder.name}</Text><Text className="mt-1 text-xs text-muted">{breeder.location}</Text></View><Pressable className="rounded-full bg-berry px-5 py-2.5"><Text className="text-xs font-black text-white">팔로우</Text></Pressable></View>
        <Text className="mt-4 text-sm leading-6 text-muted">{breeder.intro}</Text>
        <View className="mt-4 flex-row rounded-2xl bg-[#F7F5F7] py-4">{[[breeder.followers, '팔로워'], [breeder.reviews, '후기'], [breeder.trades, '거래'], [breeder.rating, '평점']].map(([v, l], i) => <View key={l} className={`flex-1 items-center ${i ? 'border-l border-line' : ''}`}><Text className="font-black text-ink">{v}</Text><Text className="mt-1 text-[10px] text-muted">{l}</Text></View>)}</View>
        <View className="mt-3 flex-row gap-2"><Pressable className="flex-1 flex-row items-center justify-center rounded-xl bg-[#F7F5F7] py-3"><Ionicons name="call-outline" size={17} color={colors.ink} /><Text className="ml-1.5 text-xs font-black text-ink">전화문의</Text></Pressable><Pressable className="flex-1 flex-row items-center justify-center rounded-xl bg-[#FEE500] py-3"><Ionicons name="chatbubble" size={17} color={colors.ink} /><Text className="ml-1.5 text-xs font-black text-ink">카카오톡 문의</Text></Pressable></View>
      </View>
      <View className="mx-4 flex-row rounded-2xl bg-[#F7F5F7]">{['판매중', '분양완료', '후기', '대표 개체'].map((label, index) => <View key={label} className={`flex-1 items-center rounded-2xl py-3 ${index === 0 ? 'bg-white shadow-sm' : ''}`}><Text className={`text-xs font-bold ${index === 0 ? 'text-berry' : 'text-muted'}`}>{label}</Text></View>)}</View>
      <View className="flex-row flex-wrap justify-between px-4 pt-5">{(breederListings.length ? breederListings : listings.slice(0, 2)).map((item) => <ListingCard key={item.id} item={item} />)}</View>
    </Page>
  );
}
