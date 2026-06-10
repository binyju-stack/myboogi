import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Stat, TopBar, VerifiedBadge } from '@/components/common';
import { ChatReadyModal } from '@/components/ChatReadyModal';
import { colors } from '@/constants/theme';
import { breeders, listingDetails, listings } from '@/data/mockData';

function ActionButton({ icon, label, accent = false, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; accent?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className={`flex-1 items-center justify-center rounded-[15px] py-2.5 ${accent ? 'bg-berry' : 'bg-soft'}`}>
      <Ionicons name={icon} size={17} color={accent ? 'white' : colors.ink} />
      <Text className={`mt-1 text-[8px] font-black ${accent ? 'text-white' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const [imageIndex, setImageIndex] = useState(0);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const item = listings.find((listing) => listing.id === id) ?? listings[0];
  const breeder = breeders.find((entry) => entry.id === item.breederId) ?? breeders[0];
  const detail = listingDetails[item.id] ?? listingDetails.l1;
  const mockContact = (label: string) => Alert.alert(label, '브리더 연락처 연결은 다음 단계에서 제공됩니다.');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar title="분양 상세" right="share-social-outline" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="bg-page pb-32">
        <View className="bg-white">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => setImageIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
          >
            {item.images.map((image) => <Image key={image} source={{ uri: image }} style={{ width, height: width }} className="bg-shell" resizeMode="cover" />)}
          </ScrollView>
          <View className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1.5"><Text className="text-[10px] font-bold text-white">{imageIndex + 1} / {item.images.length}</Text></View>
        </View>

        <View className="bg-white px-5 pb-6 pt-5">
          <View className="flex-row items-center"><VerifiedBadge /><Text className="ml-2 text-[10px] font-bold text-muted">{item.status}</Text></View>
          <Text className="mt-3 text-[22px] font-black tracking-[-0.6px] text-ink">{item.species}</Text>
          <Text className="mt-4 text-[26px] font-black text-ink">{item.price.toLocaleString()}원</Text>
          <View className="mt-4 flex-row items-center"><Text className="text-[11px] text-muted">{item.location} · {item.sex} · {item.stage}</Text><View className="ml-auto flex-row"><Stat icon="eye-outline" value={item.views} /><Stat icon="heart-outline" value={item.likes} /></View></View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <View className="flex-row items-center">
            <Avatar uri={breeder.avatar} size={52} />
            <View className="ml-3 flex-1"><VerifiedBadge label={breeder.badge} /><Text className="mt-1.5 text-[14px] font-black text-ink">{breeder.name}</Text><View className="mt-1 flex-row items-center"><Ionicons name="star" size={11} color="#FFB443" /><Text className="ml-1 text-[10px] font-bold text-muted">후기 평점 {breeder.rating}</Text></View></View>
          </View>
          <Pressable onPress={() => router.push(`/breeder/${breeder.id}`)} className="mt-4 items-center rounded-[16px] bg-soft py-3.5"><Text className="text-[11px] font-black text-ink">미니샵 가기</Text></Pressable>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-black text-berry">TURTLE PROFILE</Text>
          <Text className="mt-1 text-[18px] font-black text-ink">개체 상세 정보</Text>
          <View className="mt-5">
            {[
              ['부화일', item.hatchDate],
              ['사이즈', item.size],
              ['부모 개체', detail.parentInfo],
              ['먹이 반응', detail.foodResponse],
              ['건강 상태', detail.healthStatus],
              ['특이사항', detail.notes],
            ].map(([label, value], index) => (
              <View key={label} className={`flex-row py-3 ${index ? 'border-t border-line' : ''}`}><Text className="w-20 text-[11px] font-bold text-muted">{label}</Text><Text className="flex-1 text-[12px] font-bold leading-5 text-ink">{value}</Text></View>
            ))}
          </View>
        </View>

        <View className="mx-5 mt-4 rounded-[24px] border border-line bg-white p-5 shadow-sm"><Text className="text-[18px] font-black text-ink">분양자 소개글</Text><Text className="mt-3 text-[13px] leading-7 text-muted">{item.description}</Text></View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row gap-2 border-t border-line bg-white px-4 py-3">
        <ActionButton icon="heart-outline" label="관심등록" />
        <ActionButton icon="call-outline" label="전화문의" onPress={() => mockContact('전화문의')} />
        <ActionButton icon="chatbubble-outline" label="카카오톡" onPress={() => mockContact('카카오톡 문의')} />
        <ActionButton icon="chatbubbles" label="채팅하기" accent onPress={() => setChatModalVisible(true)} />
      </View>
      <ChatReadyModal visible={chatModalVisible} onClose={() => setChatModalVisible(false)} />
    </SafeAreaView>
  );
}
