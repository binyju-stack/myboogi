import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { chatRooms } from '@/data/chat';
import type { Message, MessageImage } from '@/types/chat';

function ListingMiniCard({ room }: { room: (typeof chatRooms)[number] }) {
  return (
    <AnimatedPressable onPress={() => room.listingId ? router.push(`/listing/${room.listingId}`) : undefined} className="mx-5 mt-3 flex-row items-center rounded-[22px] border border-line bg-white p-3 shadow-sm">
      {room.listingImage ? <Image source={{ uri: room.listingImage }} className="h-16 w-16 rounded-[16px] bg-shell" /> : null}
      <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
        <Text className="text-[14px] font-bold text-[#111827]" numberOfLines={1}>{room.listingTitle ?? '일반 상담'}</Text>
        <Text className="mt-1 text-[13px] font-bold text-ink">{room.listingPrice ? `${room.listingPrice.toLocaleString()}원` : '상담중'}</Text>
        <Text className="mt-1 text-[10px] font-bold text-berry">{room.listingStatus ?? '문의중'}</Text>
      </View>
      <Text className="text-[11px] font-bold text-[#94A3B8]">상세보기 &gt;</Text>
    </AnimatedPressable>
  );
}

function SafetyNotice() {
  return (
    <View className="mx-5 mt-4 rounded-[18px] bg-cream px-4 py-3">
      <Text className="text-[11px] font-bold leading-5 text-[#94A3B8]">안전한 분양 문의를 위해 대화 내용은 마이부기 운영정책에 따라 보관될 수 있습니다.</Text>
      <Text className="mt-1 text-[10px] font-medium leading-5 text-[#8B95A1]">상처나 질병 상담은 정확한 진단이 아니며, 상태가 심각하면 파충류 진료 가능 병원 방문을 권장합니다.</Text>
    </View>
  );
}

function ImageGrid({ images }: { images: MessageImage[] }) {
  if (!images.length) return null;

  return (
    <View className="mt-2 flex-row flex-wrap">
      {images.map((image) => (
        <Pressable key={image.id} onPress={() => Alert.alert('이미지 전체보기 기능은 준비중입니다.')} className="mb-2 mr-2 overflow-hidden rounded-[16px] bg-shell">
          <Image source={{ uri: image.uri }} className="h-36 w-36" resizeMode="cover" />
        </Pressable>
      ))}
    </View>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const mine = message.senderType === 'me';

  return (
    <View className={`mb-4 px-5 ${mine ? 'items-end' : 'items-start'}`}>
      <View className={`${mine ? 'bg-berry' : 'bg-white'} max-w-[78%] rounded-[22px] px-4 py-3 shadow-sm`}>
        <ImageGrid images={message.images ?? []} />
        {message.text ? <Text className={`text-[13px] font-medium leading-6 ${mine ? 'text-white' : 'text-[#111827]'}`}>{message.text}</Text> : null}
      </View>
      <Text className="mt-1.5 text-[10px] font-medium text-[#94A3B8]">{message.createdAt}{mine ? ` · ${message.isRead ? '읽음' : '전송됨'}` : ''}</Text>
    </View>
  );
}

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const room = chatRooms.find((item) => item.id === id) ?? chatRooms[0];
  const [messages, setMessages] = useState<Message[]>(room.messages ?? []);
  const [input, setInput] = useState('');
  const [readyVisible, setReadyVisible] = useState(false);

  const sendText = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { id: `local-${Date.now()}`, roomId: room.id, senderType: 'me', text, images: [], createdAt: '방금 전', isRead: false },
    ]);
    setInput('');
  };

  const addMockImage = () => {
    setMessages((current) => [
      ...current,
      { id: `image-${Date.now()}`, roomId: room.id, senderType: 'me', text: '사진 첨부했습니다. 상태 확인 부탁드려요.', images: [{ id: `image-${Date.now()}`, uri: room.listingImage ?? room.participantAvatar }], createdAt: '방금 전', isRead: false },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="border-b border-line bg-white px-4 py-3">
          <View className="flex-row items-center">
            <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-soft">
              <Ionicons name="chevron-back" size={22} color={colors.ink} />
            </Pressable>
            <Image source={{ uri: room.participantAvatar }} className="ml-2 h-11 w-11 rounded-full bg-shell" />
            <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold text-[#111827]" numberOfLines={1}>{room.participantName}</Text>
                {room.isVerified ? <Text className="ml-1.5 text-[11px] font-bold text-berry">✓</Text> : null}
              </View>
              <Text className="mt-1 text-[10px] font-bold text-[#94A3B8]" numberOfLines={1}>{room.listingTitle ?? '사육 상담'} 문의중</Text>
            </View>
            <Pressable onPress={() => setReadyVisible(true)} className="h-10 w-10 items-center justify-center rounded-full bg-soft">
              <Ionicons name="ellipsis-horizontal" size={20} color={colors.ink} />
            </Pressable>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <ListingMiniCard room={room} />
          <SafetyNotice />
          <View className="pt-5">
            {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
          </View>
        </ScrollView>

        <View style={{ paddingBottom: Math.max(insets.bottom, 12) }} className="border-t border-line bg-white px-4 pt-3">
          <View className="flex-row items-end">
            <Pressable onPress={addMockImage} className="mr-2 h-11 w-11 items-center justify-center rounded-full bg-soft">
              <Ionicons name="image-outline" size={21} color={colors.berry} />
            </Pressable>
            <TextInput
              value={input}
              onChangeText={setInput}
              multiline
              placeholder="메시지를 입력하세요"
              placeholderTextColor={colors.subtle}
              className="max-h-28 flex-1 rounded-[22px] bg-soft px-4 py-3 text-[13px] font-medium leading-5 text-ink"
            />
            <Pressable onPress={sendText} className="ml-2 h-11 w-11 items-center justify-center rounded-full bg-berry">
              <Ionicons name="arrow-up" size={20} color="white" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>

      <ReadyModal visible={readyVisible} title="채팅방 메뉴 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
