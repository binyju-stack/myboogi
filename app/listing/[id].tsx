import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Stat, TopBar, VerifiedBadge } from '@/components/common';
import { colors } from '@/constants/theme';
import { breeders, listings } from '@/data/mockData';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = listings.find((listing) => listing.id === id) ?? listings[0];
  const breeder = breeders.find((entry) => entry.id === item.breederId) ?? breeders[0];
  const ready = () => Alert.alert('알림', '채팅 기능 준비중입니다.');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar title="분양 상세" right="share-social-outline" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-28">
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>{item.images.map((image) => <Image key={image} source={{ uri: image }} className="h-80 w-screen bg-shell" resizeMode="cover" />)}</ScrollView>
        <View className="border-b-8 border-[#F7F5F7] p-4">
          <View className="flex-row items-start justify-between"><View className="flex-1 pr-4">{item.verified ? <VerifiedBadge /> : null}<Text className="mt-2 text-xl font-black text-ink">{item.title}</Text><Text className="mt-2 text-xs text-muted">{item.location} · {item.stage} · {item.sex}</Text></View><Ionicons name="heart-outline" size={25} color={colors.berry} /></View>
          <Text className="mt-4 text-2xl font-black text-berry">{item.price.toLocaleString()}원</Text>
          <View className="mt-3 flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon="heart-outline" value={item.likes} /></View>
        </View>
        <Pressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="flex-row items-center border-b-8 border-[#F7F5F7] p-4"><Avatar uri={breeder.avatar} size={48} /><View className="ml-3 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-1.5 font-black text-ink">{breeder.name}</Text><Text className="mt-1 text-[11px] text-muted">{breeder.location} · 평점 {breeder.rating}</Text></View><Ionicons name="chevron-forward" size={19} color={colors.muted} /></Pressable>
        <View className="border-b-8 border-[#F7F5F7] p-4"><Text className="text-base font-black text-ink">개체 정보</Text><View className="mt-4 flex-row flex-wrap">{[['품종', item.species], ['성별', item.sex], ['사이즈', item.size], ['부화일', item.hatchDate]].map(([label, value]) => <View key={label} className="mb-4 w-1/2"><Text className="text-[11px] text-muted">{label}</Text><Text className="mt-1 text-sm font-bold text-ink">{value}</Text></View>)}</View></View>
        <View className="border-b-8 border-[#F7F5F7] p-4"><Text className="text-base font-black text-ink">브리더에게 문의하기</Text><View className="mt-3 flex-row gap-2"><Pressable className="flex-1 flex-row items-center justify-center rounded-xl border border-line py-3"><Ionicons name="call-outline" size={17} color={colors.ink} /><Text className="ml-1.5 text-xs font-black text-ink">전화하기</Text></Pressable><Pressable className="flex-1 flex-row items-center justify-center rounded-xl bg-[#FEE500] py-3"><Ionicons name="chatbubble" size={17} color={colors.ink} /><Text className="ml-1.5 text-xs font-black text-ink">카카오톡 문의</Text></Pressable></View></View>
        <View className="border-b-8 border-[#F7F5F7] p-4"><Text className="text-base font-black text-ink">분양 설명</Text><Text className="mt-3 text-sm leading-6 text-muted">{item.description}</Text></View>
        <View className="p-4"><Text className="text-base font-black text-ink">부모 개체</Text><View className="mt-3 flex-row gap-3">{item.images.slice(1).map((image, index) => <View key={image} className="flex-1"><Image source={{ uri: image }} className="h-28 w-full rounded-xl bg-shell" /><Text className="mt-2 text-xs font-bold text-ink">{index === 0 ? '부 개체' : '모 개체'}</Text></View>)}</View></View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 flex-row border-t border-line bg-white px-4 py-3"><Pressable className="mr-2 h-12 w-12 items-center justify-center rounded-xl border border-line"><Ionicons name="heart-outline" size={22} color={colors.berry} /></Pressable><Pressable onPress={ready} className="mr-2 flex-1 items-center justify-center rounded-xl bg-berry"><Text className="font-black text-white">채팅하기</Text></Pressable><Pressable className="h-12 w-12 items-center justify-center rounded-xl bg-mint"><Ionicons name="call-outline" size={20} color={colors.moss} /></Pressable></View>
    </SafeAreaView>
  );
}
