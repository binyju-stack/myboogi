import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar, Stat, TopBar } from '@/components/common';
import { colors } from '@/constants/theme';
import { postComments, posts } from '@/data/communityData';
import { xpMessages } from '@/data/levelData';

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [liked, setLiked] = useState(false);
  const post = posts.find((item) => item.id === id) ?? posts[0];
  const comments = useMemo(() => postComments.filter((comment) => comment.postId === post.id), [post.id]);
  const likeCount = post.likes + (liked ? 1 : 0);
  const commentCount = post.commentsCount ?? post.comments;
  const images = post.images?.length ? post.images : post.image ? [post.image] : [];

  const showCommentReady = () => Alert.alert(`댓글 등록 기능은 준비중입니다.\n${xpMessages.comment}`);

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="커뮤니티" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 112 + insets.bottom }}
        >
          <FadeInView>
            <View className="bg-white px-5 pb-7 pt-5">
              <View className="flex-row items-center justify-between">
                <Text className="self-start rounded-full bg-blush px-3 py-2 text-[10px] font-black text-berry">{post.category}</Text>
                <AnimatedPressable onPress={() => router.push('/report')} className="flex-row items-center rounded-full bg-soft px-3 py-2">
                  <Ionicons name="flag-outline" size={13} color={colors.muted} />
                  <Text className="ml-1 text-[10px] font-bold text-muted">신고하기</Text>
                </AnimatedPressable>
              </View>

              <Text className="mt-4 text-[24px] font-black leading-9 text-ink">{post.title}</Text>

              <View className="mt-5 flex-row items-center">
                <Avatar uri={post.authorAvatar ?? post.avatar} size={42} />
                <View className="ml-3 flex-1">
                  <Text className="text-[12px] font-black text-ink">{post.author}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{post.createdAt}</Text>
                </View>
              </View>

              <View className="mt-5 flex-row rounded-[18px] bg-soft px-4 py-3">
                <Stat icon="eye-outline" value={post.views} />
                <Stat icon="heart-outline" value={likeCount} />
                <Stat icon="chatbubble-outline" value={commentCount} />
              </View>

              <View className="mt-7 h-px bg-line" />
              <Text className="mt-7 text-[14px] leading-8 text-ink">{post.content}</Text>

              <View className="mt-6">
                {images.length ? (
                  images.map((uri, index) => (
                    <Image
                      key={`${uri}-${index}`}
                      source={{ uri }}
                      className={`${index ? 'mt-3' : ''} aspect-[4/3] w-full rounded-[24px] bg-shell`}
                      resizeMode="cover"
                    />
                  ))
                ) : (
                  <View className="aspect-[4/3] w-full items-center justify-center rounded-[24px] bg-blush">
                    <Ionicons name="image-outline" size={30} color={colors.berry} />
                    <Text className="mt-2 text-[11px] font-bold text-berry">이미지 준비중</Text>
                  </View>
                )}
              </View>

              <AnimatedPressable
                onPress={() => setLiked((current) => !current)}
                className={`mt-6 flex-row items-center justify-center rounded-[18px] py-4 ${liked ? 'bg-berry' : 'bg-blush'}`}
              >
                <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? colors.white : colors.berry} />
                <Text className={`ml-2 text-[12px] font-black ${liked ? 'text-white' : 'text-berry'}`}>좋아요 {likeCount}</Text>
              </AnimatedPressable>
            </View>
          </FadeInView>

          <View className="px-5 pb-3 pt-8">
            <Text className="text-[10px] font-black text-berry">COMMENTS</Text>
            <Text className="mt-1 text-[20px] font-black text-ink">댓글 {commentCount}</Text>
          </View>

          <View className="px-5 pt-3">
            {comments.map((comment, index) => (
              <FadeInView key={comment.id} delay={index * 60}>
                <View className="mb-3 rounded-[24px] bg-white p-4 shadow-sm">
                  <View className="flex-row items-center">
                    <Avatar uri={comment.avatar} size={34} />
                    <View className="ml-3 flex-1">
                      <Text className="text-[11px] font-black text-ink">{comment.author}</Text>
                      <Text className="mt-1 text-[9px] text-muted">{comment.createdAt}</Text>
                    </View>
                    <Ionicons name="heart-outline" size={14} color={colors.muted} />
                    <Text className="ml-1 text-[9px] text-muted">{comment.likes}</Text>
                  </View>
                  <Text className="mt-3 text-[12px] leading-6 text-ink">{comment.content}</Text>
                </View>
              </FadeInView>
            ))}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 flex-row items-center border-t border-line bg-white px-4 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
          <TextInput placeholder="댓글을 입력해주세요" placeholderTextColor={colors.subtle} className="mr-2 flex-1 rounded-[18px] bg-soft px-4 py-3.5 text-[12px] text-ink" />
          <View className="w-[64px]">
            <AnimatedPressable onPress={showCommentReady} className="items-center rounded-[16px] bg-berry py-3.5">
              <Text className="text-[11px] font-black text-white">등록</Text>
            </AnimatedPressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
