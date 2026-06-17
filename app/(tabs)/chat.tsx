import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { chatRooms } from '@/data/chat';
import type { ChatRoom } from '@/types/chat';

function ChatRoomCard({ room, index }: { room: ChatRoom; index: number }) {
  return (
    <FadeInView delay={index * 35}>
      <AnimatedPressable onPress={() => router.push(`/chat/${room.id}`)} className="mx-5 mb-3 flex-row rounded-[24px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <View>
          <Image source={{ uri: room.participantAvatar }} className="h-16 w-16 rounded-full bg-shell" />
          {room.isVerified ? (
            <View className="absolute -bottom-1 -right-1 h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-berry">
              <Ionicons name="checkmark" size={13} color="white" />
            </View>
          ) : null}
        </View>

        <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
          <View className="flex-row items-center">
            <Text className="flex-1 text-[16px] font-black text-[#111827]" numberOfLines={1}>{room.participantName}</Text>
            <Text className="ml-2 text-[11px] font-medium text-[#9CA3AF]">{room.lastMessageAt}</Text>
          </View>
          <Text className="mt-1.5 text-[13px] font-medium leading-5 text-[#6B7280]" numberOfLines={1}>{room.lastMessage}</Text>
          <View className="mt-3 flex-row items-center">
            {room.listingImage ? <Image source={{ uri: room.listingImage }} className="h-9 w-9 rounded-[10px] bg-shell" /> : null}
            <View className="ml-2 flex-1" style={{ minWidth: 0 }}>
              <Text className="text-[10px] font-bold text-[#9CA3AF]">관련 개체</Text>
              <Text className="mt-0.5 text-[12px] font-black text-[#374151]" numberOfLines={1}>{room.listingTitle ?? '일반 상담'}</Text>
            </View>
            {room.unreadCount ? (
              <View className="ml-2 min-w-7 items-center rounded-full bg-berry px-2 py-1.5">
                <Text className="text-[10px] font-black text-white">{room.unreadCount}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

export default function ChatListScreen() {
  return (
    <Page>
      <View className="border-b border-line bg-white px-5 pb-5 pt-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] font-black text-berry">MYBOOGI CHAT</Text>
            <Text className="mt-1 text-[26px] font-black text-[#111827]">채팅</Text>
          </View>
          <AnimatedPressable onPress={() => router.push('/search')} className="h-11 w-11 items-center justify-center rounded-full bg-soft">
            <Ionicons name="search" size={20} color={colors.ink} />
          </AnimatedPressable>
        </View>
        <Text className="mt-3 text-[12px] font-medium leading-5 text-[#9CA3AF]">분양 문의, 사육 상담, 사진 상담을 한곳에서 확인해요.</Text>
      </View>

      <View className="pt-4">
        {chatRooms.map((room, index) => <ChatRoomCard key={room.id} room={room} index={index} />)}
      </View>
    </Page>
  );
}
