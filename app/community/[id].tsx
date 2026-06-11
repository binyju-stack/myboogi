import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { Avatar, Stat, TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { ReportActionMenu } from '@/components/ReportActionMenu';
import { colors } from '@/constants/theme';
import { postComments, posts } from '@/data/mockData';

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [liked, setLiked] = useState(false);
  const [readyVisible, setReadyVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [actionTarget, setActionTarget] = useState({ type: '커뮤니티 게시글', name: '' });
  const [blockVisible, setBlockVisible] = useState(false);
  const post = posts.find((item) => item.id === id) ?? posts[0];
  const comments = postComments.filter((comment) => comment.postId === post.id);

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="커뮤니티" right="ellipsis-horizontal" onRightPress={() => { setActionTarget({ type: '커뮤니티 게시글', name: post.title }); setActionVisible(true); }} />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 104 + insets.bottom }}
        >
          <FadeInView>
            <View className="bg-white px-5 pb-7 pt-5">
              <Text className="self-start rounded-full bg-blush px-3 py-2 text-[10px] font-black text-berry">{post.category}</Text>
              <Text className="mt-4 text-[24px] font-black leading-9 tracking-[-0.8px] text-ink">{post.title}</Text>
              <View className="mt-5 flex-row items-center">
                <Avatar uri={post.avatar} size={42} />
                <View className="ml-3 flex-1">
                  <Text className="text-[12px] font-black text-ink">{post.author}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{post.createdAt}</Text>
                </View>
                <Stat icon="eye-outline" value={post.views} />
                <Stat icon="heart-outline" value={post.likes + (liked ? 1 : 0)} />
                <Stat icon="chatbubble-outline" value={post.comments} />
              </View>
              <View className="mt-7 h-px bg-line" />
              <Text className="mt-7 text-[14px] leading-8 text-ink">{post.content}</Text>
              <Text className="mt-4 text-[14px] leading-8 text-ink">
                거북이를 키우며 알게 된 경험과 팁을 함께 나눠주세요. 서로에게 도움이 되는 따뜻한 댓글을 기다리고 있어요.
              </Text>
              {post.image ? (
                <Image source={{ uri: post.image }} className="mt-6 aspect-[4/3] w-full rounded-[24px] bg-shell" resizeMode="cover" />
              ) : (
                <View className="mt-6 aspect-[4/3] w-full items-center justify-center rounded-[24px] bg-blush">
                  <Ionicons name="image-outline" size={30} color={colors.berry} />
                  <Text className="mt-2 text-[11px] font-bold text-berry">거북이 이야기 이미지</Text>
                </View>
              )}
              <View className="mt-6">
                <AnimatedPressable onPress={() => setLiked((current) => !current)} className={`flex-row items-center justify-center rounded-[18px] py-4 ${liked ? 'bg-berry' : 'bg-blush'}`}>
                  <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? colors.white : colors.berry} />
                  <Text className={`ml-2 text-[12px] font-black ${liked ? 'text-white' : 'text-berry'}`}>
                    {liked ? '좋아요 완료' : '좋아요'} · {post.likes + (liked ? 1 : 0)}
                  </Text>
                </AnimatedPressable>
              </View>
            </View>
          </FadeInView>

          <View className="px-5 pb-3 pt-8">
            <Text className="text-[10px] font-black text-berry">COMMENTS</Text>
            <Text className="mt-1 text-[20px] font-black text-ink">댓글 {comments.length}</Text>
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
                    <AnimatedPressable onPress={() => { setActionTarget({ type: '댓글', name: comment.content }); setActionVisible(true); }} className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-soft"><Ionicons name="ellipsis-horizontal" size={15} color={colors.muted} /></AnimatedPressable>
                  </View>
                  <Text className="mt-3 text-[12px] leading-6 text-ink">{comment.content}</Text>
                </View>
              </FadeInView>
            ))}
          </View>
        </ScrollView>

        <View
          className="absolute bottom-0 left-0 right-0 flex-row items-center border-t border-line bg-white px-4 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom, 12) }}
        >
          <TextInput placeholder="따뜻한 댓글을 남겨주세요" placeholderTextColor={colors.subtle} className="mr-2 flex-1 rounded-[18px] bg-soft px-4 py-3.5 text-[12px] text-ink" />
          <View className="w-[64px]">
            <AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[16px] bg-berry py-3.5">
              <Text className="text-[11px] font-black text-white">등록</Text>
            </AnimatedPressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ReadyModal visible={readyVisible} title="댓글 등록 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
      <ReadyModal visible={blockVisible} title="해당 사용자를 차단했습니다." onClose={() => setBlockVisible(false)} />
      <ReportActionMenu
        visible={actionVisible}
        onClose={() => setActionVisible(false)}
        onReport={() => {
          setActionVisible(false);
          router.push({ pathname: '/report', params: { targetType: actionTarget.type, targetName: actionTarget.name } });
        }}
        onBlock={() => {
          setActionVisible(false);
          setBlockVisible(true);
        }}
      />
    </SafeAreaView>
  );
}
