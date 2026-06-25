import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar } from '@/components/common';
import { ReportActionMenu } from '@/components/ReportActionMenu';
import { colors } from '@/constants/theme';
import { postComments, posts } from '@/data/communityData';
import { xpMessages } from '@/data/levelData';
import type { PostComment } from '@/types';

const bestLabels = ['BEST 댓글', 'BEST 댓글', 'BEST 댓글'];

function getReplyCount(comment: PostComment) {
  return Math.floor(comment.likes / 6);
}

function Header({ onMenuPress }: { onMenuPress: () => void }) {
  return (
    <View className="flex-row items-center justify-between border-b border-[#EEF2F6] bg-white px-4 py-3">
      <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
        <Ionicons name="chevron-back" size={24} color="#111827" />
      </Pressable>
      <View className="flex-row items-center">
        <Pressable className="h-10 w-10 items-center justify-center rounded-full">
          <Ionicons name="bookmark-outline" size={21} color="#111827" />
        </Pressable>
        <Pressable onPress={onMenuPress} className="ml-1 h-10 w-10 items-center justify-center rounded-full">
          <Ionicons name="ellipsis-horizontal" size={22} color="#111827" />
        </Pressable>
      </View>
    </View>
  );
}

function ActionButton({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="flex-1 flex-row items-center justify-center py-4">
      <Ionicons name={icon} size={18} color={active ? colors.berry : '#94A3B8'} />
      <Text className={`ml-2 text-[14px] font-semibold ${active ? 'text-berry' : 'text-[#94A3B8]'}`}>{label}</Text>
    </Pressable>
  );
}

function CommentItem({
  comment,
  isBest,
  bestIndex,
  onBlock,
}: {
  comment: PostComment;
  isBest: boolean;
  bestIndex: number;
  onBlock: () => void;
}) {
  const replyCount = getReplyCount(comment);

  return (
    <View className="border-b border-[#EEF2F6] py-5">
      {isBest ? (
        <View className="mb-3 self-start rounded-full bg-[#FFF1E6] px-2.5 py-1">
          <Text className="text-[12px] font-semibold text-[#FF9B4A]">{bestLabels[bestIndex]}</Text>
        </View>
      ) : null}
      <View className="flex-row">
        <Avatar uri={comment.avatar} size={36} />
        <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="text-[14px] font-semibold leading-5 text-[#111827]" numberOfLines={1}>{comment.author}</Text>
              <Text className="mt-0.5 text-[12px] font-normal leading-[18px] text-[#A0A5AD]">{comment.createdAt}</Text>
            </View>
            <Pressable onPress={onBlock} className="h-8 w-8 items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={18} color="#A0A5AD" />
            </Pressable>
          </View>

          <Text className="mt-3 text-[14px] font-medium leading-[22px] text-[#94A3B8]">{comment.content}</Text>

          <View className="mt-3 flex-row items-center">
            <Pressable className="mr-4 flex-row items-center">
              <Ionicons name="heart-outline" size={15} color="#A0A5AD" />
              <Text className="ml-1 text-[12px] font-medium text-[#A0A5AD]">{comment.likes}</Text>
            </Pressable>
            <Text className="mr-4 text-[12px] font-medium text-[#A0A5AD]">답글 {replyCount}</Text>
            <Text className="text-[12px] font-medium text-[#A0A5AD]">대댓글</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [liked, setLiked] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const post = posts.find((item) => item.id === id) ?? posts[0];
  const comments = useMemo(() => postComments.filter((comment) => comment.postId === post.id), [post.id]);
  const bestComments = useMemo(() => [...comments].filter((comment) => comment.likes >= 3).sort((a, b) => b.likes - a.likes).slice(0, 3), [comments]);
  const bestCommentIds = useMemo(() => new Set(bestComments.map((comment) => comment.id)), [bestComments]);
  const displayComments = useMemo(() => [...bestComments, ...comments.filter((comment) => !bestCommentIds.has(comment.id))], [bestCommentIds, bestComments, comments]);
  const likeCount = post.likes + (liked ? 1 : 0);
  const commentCount = post.commentsCount ?? post.comments;
  const images = post.images?.length ? post.images : post.image ? [post.image] : [];

  const showCommentReady = () => Alert.alert(`댓글 등록 기능은 준비중입니다.\n${xpMessages.comment}`);
  const showBlockDone = () => Alert.alert('해당 사용자를 차단했습니다.');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header onMenuPress={() => setActionVisible(true)} />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 104 + insets.bottom }}>
          <FadeInView>
            <View className="bg-white px-5 pb-7 pt-5">
              <Text className="text-[22px] font-bold leading-[30px] text-[#111827]">{post.title}</Text>

              <View className="mt-5 flex-row items-center">
                <Avatar uri={post.authorAvatar ?? post.avatar} size={42} />
                <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
                  <Text className="text-[14px] font-semibold leading-5 text-[#111827]" numberOfLines={1}>{post.author}</Text>
                  <Text className="mt-1 text-[13px] font-normal leading-[18px] text-[#A0A5AD]">{post.createdAt} · 조회수 {post.views.toLocaleString()}</Text>
                </View>
              </View>

              <View className="mt-7 h-px bg-[#EEF2F6]" />
              <Text className="mt-7 text-[15px] font-medium leading-6 text-[#94A3B8]">{post.content}</Text>

              {images.length ? (
                <View className="mt-6">
                  {images.map((uri, index) => (
                    <Image key={`${uri}-${index}`} source={{ uri }} className={`${index ? 'mt-3' : ''} aspect-[4/3] w-full rounded-[18px] bg-shell`} resizeMode="cover" />
                  ))}
                </View>
              ) : null}

              <View className="mt-8 flex-row border-y border-[#EEF2F6]">
                <ActionButton icon={liked ? 'heart' : 'heart-outline'} label={`좋아요 ${likeCount}`} active={liked} onPress={() => setLiked((current) => !current)} />
                <View className="my-3 w-px bg-[#EEF2F6]" />
                <ActionButton icon="chatbubble-outline" label={`댓글 ${commentCount}`} />
              </View>
            </View>
          </FadeInView>

          <View className="h-px bg-[#EEF2F6]" />

          <View className="bg-white px-5">
            <View className="flex-row items-center justify-between border-b border-[#EEF2F6] py-4">
              <Text className="text-[16px] font-bold text-[#111827]">댓글 {commentCount}</Text>
              <Pressable className="flex-row items-center">
                <Text className="text-[13px] font-medium text-[#94A3B8]">등록순</Text>
                <Ionicons name="chevron-down" size={15} color="#94A3B8" />
              </Pressable>
            </View>

            {displayComments.map((comment, index) => {
              const bestIndex = bestComments.findIndex((item) => item.id === comment.id);
              return (
                <FadeInView key={comment.id} delay={index * 45}>
                  <CommentItem comment={comment} isBest={bestIndex >= 0} bestIndex={bestIndex} onBlock={showBlockDone} />
                </FadeInView>
              );
            })}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 flex-row items-center border-t border-[#EEF2F6] bg-white px-4 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
          <TextInput placeholder="댓글을 입력해주세요" placeholderTextColor="#A0A5AD" className="mr-2 flex-1 rounded-[14px] bg-[#F5F6F8] px-4 py-3 text-[14px] font-medium text-[#111827]" />
          <AnimatedPressable onPress={showCommentReady} className="h-11 items-center justify-center rounded-[12px] bg-[#FFD85A] px-4">
            <Text className="text-[13px] font-bold text-[#111827]">등록</Text>
          </AnimatedPressable>
        </View>
      </KeyboardAvoidingView>
      <ReportActionMenu
        visible={actionVisible}
        onClose={() => setActionVisible(false)}
        onReport={() => {
          setActionVisible(false);
          router.push('/report');
        }}
        onBlock={() => {
          setActionVisible(false);
          showBlockDone();
        }}
      />
    </SafeAreaView>
  );
}
