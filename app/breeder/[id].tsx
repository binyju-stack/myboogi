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
      <View className="bg-white">
        <Image source={{ uri: breeder.banner }} className="aspect-[4/3] w-full bg-shell" resizeMode="cover" />
        <View className="px-5 pb-6 pt-5">
          <View className="flex-row items-start">
            <Avatar uri={breeder.avatar} size={70} />
            <View className="ml-4 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-2 text-[21px] font-black tracking-[-0.5px] text-ink">{breeder.name}</Text><Text className="mt-1 text-[11px] text-muted">{breeder.location}</Text></View>
            <Pressable className="rounded-full bg-berry px-5 py-3"><Text className="text-[11px] font-black text-white">팔로우</Text></Pressable>
          </View>
          <Text className="mt-5 text-[13px] leading-6 text-muted">{breeder.intro}</Text>
        </View>
      </View>

      <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
        <Text className="text-[10px] font-black text-berry">SHOP AT A GLANCE</Text>
        <View className="mt-4 flex-row">{[[breeder.followers, '팔로워'], [breeder.reviews, '후기'], [breeder.trades, '거래'], [breeder.rating, '평점']].map(([value, label], index) => <View key={label} className={`flex-1 items-center ${index ? 'border-l border-line' : ''}`}><Text className="text-[16px] font-black text-ink">{value}</Text><Text className="mt-1 text-[9px] text-muted">{label}</Text></View>)}</View>
      </View>

      <View className="mx-5 mt-3 flex-row gap-2">
        <Pressable className="flex-1 flex-row items-center justify-center rounded-[18px] border border-line bg-white py-4"><Ionicons name="call-outline" size={17} color={colors.ink} /><Text className="ml-2 text-[11px] font-black text-ink">전화 문의</Text></Pressable>
        <Pressable className="flex-1 flex-row items-center justify-center rounded-[18px] bg-[#FEE500] py-4"><Ionicons name="chatbubble" size={16} color={colors.ink} /><Text className="ml-2 text-[11px] font-black text-ink">카카오톡 문의</Text></Pressable>
      </View>

      <View className="mb-4 mt-8 flex-row items-end justify-between px-5"><View><Text className="text-[10px] font-black text-berry">AVAILABLE NOW</Text><Text className="mt-1 text-[20px] font-black text-ink">판매 중 개체</Text></View><Text className="text-[10px] font-bold text-muted">{breederListings.length || 2}마리</Text></View>
      <View className="px-5">{(breederListings.length ? breederListings : listings.slice(0, 2)).map((item) => <ListingCard key={item.id} item={item} list />)}</View>
    </Page>
  );
}
