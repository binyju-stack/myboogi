import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar, Stat, TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { postComments, posts } from '@/data/mockData';

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [readyVisible, setReadyVisible] = useState(false);
  const post = posts.find((item) => item.id === id) ?? posts[0];
  const comments = postComments.filter((comment) => comment.postId === post.id);

  return (
    <SafeAreaView className="flex-1 bg-page">
      <TopBar title="커뮤니티" right="ellipsis-horizontal" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-28">
          <FadeInView>
            <View className="bg-white px-5 pb-6 pt-5">
              <Text className="self-start rounded-full bg-blush px-3 py-2 text-[10px] font-black text-berry">{post.category}</Text>
              <Text className="mt-4 text-[24px] font-black leading-9 tracking-[-0.8px] text-ink">{post.title}</Text>
              <View className="mt-5 flex-row items-center"><Avatar uri={post.avatar} size={42} /><View className="ml-3 flex-1"><Text className="text-[12px] font-black text-ink">{post.author}</Text><Text className="mt-1 text-[9px] text-muted">{post.createdAt}</Text></View><Stat icon="eye-outline" value={post.views} /><Stat icon="heart-outline" value={post.likes} /><Stat icon="chatbubble-outline" value={post.comments} /></View>
              <Text className="mt-7 text-[14px] leading-8 text-ink">{post.content}{'\n\n'}거북이 집사님들의 경험과 조언도 궁금해요. 서로에게 도움이 되는 이야기를 편하게 나눠주세요.</Text>
              {post.image ? <Image source={{ uri: post.image }} className="mt-6 aspect-[4/3] w-full rounded-[24px] bg-shell" resizeMode="cover" /> : null}
              <AnimatedPressable onPress={() => setReadyVisible(true)} className="mt-6 flex-row items-center justify-center rounded-[18px] bg-blush py-4"><Ionicons name="heart-outline" size={18} color={colors.berry} /><Text className="ml-2 text-[12px] font-black text-berry">좋아요 {post.likes}</Text></AnimatedPressable>
            </View>
          </FadeInView>

          <View className="px-5 pt-7"><Text className="text-[9px] font-black text-berry">COMMENTS</Text><Text className="mt-1 text-[19px] font-black text-ink">댓글 {comments.length}</Text></View>
          <View className="px-5 pt-4">{comments.map((comment, index) => <FadeInView key={comment.id} delay={index * 60}><View className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm"><View className="flex-row items-center"><Avatar uri={comment.avatar} size={34} /><View className="ml-3 flex-1"><Text className="text-[11px] font-black text-ink">{comment.author}</Text><Text className="mt-1 text-[9px] text-muted">{comment.createdAt}</Text></View><Ionicons name="heart-outline" size={14} color={colors.muted} /><Text className="ml-1 text-[9px] text-muted">{comment.likes}</Text></View><Text className="mt-3 text-[12px] leading-6 text-ink">{comment.content}</Text></View></FadeInView>)}</View>
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 flex-row items-center border-t border-line bg-white px-4 py-3"><TextInput placeholder="따뜻한 댓글을 남겨주세요" placeholderTextColor={colors.subtle} className="mr-2 flex-1 rounded-[18px] bg-soft px-4 py-3 text-[12px] text-ink" /><Pressable onPress={() => setReadyVisible(true)} className="rounded-[16px] bg-berry px-4 py-3.5"><Text className="text-[11px] font-black text-white">등록</Text></Pressable></View>
      </KeyboardAvoidingView>
      <ReadyModal visible={readyVisible} title="댓글 등록 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}
