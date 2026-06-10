import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Stat, TopBar, VerifiedBadge } from '@/components/common';
import { colors } from '@/constants/theme';
import { breeders, listings } from '@/data/mockData';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = listings.find((listing) => listing.id === id) ?? listings[0];
  const breeder = breeders.find((entry) => entry.id === item.breederId) ?? breeders[0];
  const ready = () => Alert.alert('마이부기', '채팅 기능 준비중입니다.');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar title="분양 상세" right="share-social-outline" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-28">
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {item.images.map((image) => <Image key={image} source={{ uri: image }} className="aspect-square w-screen bg-shell" resizeMode="cover" />)}
        </ScrollView>

        <View className="bg-white px-5 pb-6 pt-5">
          <View className="flex-row items-center"><VerifiedBadge /><Text className="ml-2 text-[10px] font-bold text-muted">{item.status}</Text></View>
          <Text className="mt-3 text-[22px] font-black tracking-[-0.6px] text-ink">{item.species}</Text>
          <Text className="mt-2 text-[12px] text-muted">{item.location} · {item.stage} · {item.sex}</Text>
          <Text className="mt-5 text-[26px] font-black text-ink">{item.price.toLocaleString()}원</Text>
          <View className="mt-3 flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon="heart-outline" value={item.likes} /></View>
        </View>

        <Pressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mx-5 mt-4 flex-row items-center rounded-[22px] border border-line bg-white p-4 shadow-sm">
          <Avatar uri={breeder.avatar} size={50} />
          <View className="ml-3 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-1.5 text-[14px] font-black text-ink">{breeder.name}</Text><Text className="mt-1 text-[10px] text-muted">{breeder.location} · 평점 {breeder.rating}</Text></View>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-black text-berry">TURTLE PROFILE</Text>
          <Text className="mt-1 text-[18px] font-black text-ink">개체 정보</Text>
          <View className="mt-5 flex-row flex-wrap">{[['품종', item.species], ['성별', item.sex], ['사이즈', item.size], ['부화일', item.hatchDate]].map(([label, value]) => <View key={label} className="mb-5 w-1/2"><Text className="text-[10px] text-muted">{label}</Text><Text className="mt-1.5 text-[13px] font-black text-ink">{value}</Text></View>)}</View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">분양 설명</Text><Text className="mt-3 text-[13px] leading-6 text-muted">{item.description}</Text></View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row border-t border-line bg-white px-5 py-3">
        <Pressable className="mr-2 h-12 w-12 items-center justify-center rounded-[16px] bg-soft"><Ionicons name="heart-outline" size={22} color={colors.berry} /></Pressable>
        <Pressable onPress={ready} className="flex-1 items-center justify-center rounded-[16px] bg-berry"><Text className="font-black text-white">채팅하기</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}
