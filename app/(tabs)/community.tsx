import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { communityCategories, posts } from '@/data/communityData';

type Post = (typeof posts)[number];
type IconName = keyof typeof Ionicons.glyphMap;

function HeaderAction({ icon, onPress }: { icon: IconName; onPress: () => void }) {
  return (
    <AnimatedPressable onPress={onPress} className="h-10 w-10 items-center justify-center rounded-full bg-[#F7F8FA]">
      <Ionicons name={icon} size={20} color="#222222" />
    </AnimatedPressable>
  );
}

function CategoryPill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      className={`mr-2 rounded-full border px-4 py-2.5 ${selected ? 'border-[#FF4F8B] bg-[#FFF0F6]' : 'border-[#EEF0F3] bg-white'}`}
    >
      <Text className={`text-[13px] font-semibold leading-[18px] ${selected ? 'text-[#FF4F8B]' : 'text-[#666666]'}`}>{label}</Text>
    </AnimatedPressable>
  );
}

function Avatar({ uri }: { uri: string }) {
  return <Image source={{ uri }} className="h-10 w-10 rounded-full bg-[#F2F4F6]" resizeMode="cover" />;
}

function Tag({ label }: { label: string }) {
  return (
    <View className="mb-2 mr-2 rounded-full bg-[#FFF0F6] px-3 py-1.5">
      <Text className="text-[13px] font-medium leading-[18px] text-[#FF4F8B]">#{label}</Text>
    </View>
  );
}

function FeedMeta({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View className="mr-4 flex-row items-center">
      <Ionicons name={icon} size={15} color="#9CA3AF" />
      <Text className="ml-1.5 text-[12px] font-normal leading-[18px] text-[#9CA3AF]">{label}</Text>
    </View>
  );
}

function ImageTile({ uri, overlayText, className = '' }: { uri: string; overlayText?: string; className?: string }) {
  return (
    <View className={`overflow-hidden rounded-[14px] bg-[#F2F4F6] ${className}`}>
      <Image source={{ uri }} className="h-full w-full" resizeMode="cover" />
      {overlayText ? (
        <View className="absolute inset-0 items-center justify-center bg-black/45">
          <Text className="text-[22px] font-bold leading-7 text-white">{overlayText}</Text>
        </View>
      ) : null}
    </View>
  );
}

function ImageGrid({ images }: { images: string[] }) {
  if (!images.length) {
    return null;
  }

  if (images.length === 1) {
    return <ImageTile uri={images[0]} className="mt-4 aspect-[4/3] w-full" />;
  }

  if (images.length === 2) {
    return (
      <View className="mt-4 flex-row gap-2">
        {images.map((uri, index) => (
          <ImageTile key={`${uri}-${index}`} uri={uri} className="aspect-square flex-1" />
        ))}
      </View>
    );
  }

  if (images.length === 3) {
    return (
      <View className="mt-4 gap-2">
        <ImageTile uri={images[0]} className="aspect-[16/9] w-full" />
        <View className="flex-row gap-2">
          {images.slice(1).map((uri, index) => (
            <ImageTile key={`${uri}-${index}`} uri={uri} className="aspect-[4/3] flex-1" />
          ))}
        </View>
      </View>
    );
  }

  const hiddenCount = images.length - 4;

  return (
    <View className="mt-4 gap-2">
      <View className="flex-row gap-2">
        {images.slice(0, 2).map((uri, index) => (
          <ImageTile key={`${uri}-${index}`} uri={uri} className="aspect-square flex-1" />
        ))}
      </View>
      <View className="flex-row gap-2">
        {images.slice(2, 4).map((uri, index) => (
          <ImageTile key={`${uri}-${index}`} uri={uri} overlayText={index === 1 && hiddenCount > 0 ? `+${hiddenCount}` : undefined} className="aspect-square flex-1" />
        ))}
      </View>
    </View>
  );
}

function RelatedListingCard({ listing }: { listing: NonNullable<Post['relatedListing']> }) {
  return (
    <AnimatedPressable onPress={() => router.push('/marketplace')} className="mt-4 flex-row items-center rounded-[14px] border border-[#F1F3F5] bg-[#FFF9FB] px-4 py-3">
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-white">
        <Ionicons name="storefront-outline" size={19} color="#FF4F8B" />
      </View>
      <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
        <Text className="text-[13px] font-bold leading-[18px] text-[#222222]" numberOfLines={1}>{listing.title}</Text>
        <Text className="mt-0.5 text-[13px] font-semibold leading-[18px] text-[#FF4F8B]">{listing.price.toLocaleString()}원</Text>
      </View>
      <Text className="text-[12px] font-semibold leading-[18px] text-[#9CA3AF]">{listing.actionLabel}</Text>
      <Ionicons name="chevron-forward" size={15} color="#9CA3AF" />
    </AnimatedPressable>
  );
}

function CommunityFeedCard({ post, index }: { post: Post; index: number }) {
  const commentCount = post.commentsCount ?? post.comments;
  const images = post.images?.length ? post.images : post.image ? [post.image] : [];

  return (
    <FadeInView delay={index * 45}>
      <AnimatedPressable onPress={() => router.push(`/community/${post.id}` as never)} className="mb-3 bg-white px-5 py-5">
        <View className="flex-row items-start">
          <Avatar uri={post.authorAvatar ?? post.avatar} />
          <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
            <View className="flex-row items-center">
              <Text className="text-[14px] font-bold leading-5 text-[#222222]" numberOfLines={1}>{post.author}</Text>
              {post.badge ? (
                <View className="ml-2 rounded-full bg-[#FF4F8B] px-2 py-0.5">
                  <Text className="text-[10px] font-bold leading-[14px] text-white">{post.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text className="mt-0.5 text-[12px] font-normal leading-[18px] text-[#9CA3AF]" numberOfLines={1}>{post.createdAt}</Text>
            {post.petInfo ? (
              <Text className="mt-1 text-[12px] font-medium leading-[18px] text-[#666666]" numberOfLines={1}>{post.petInfo}</Text>
            ) : null}
          </View>
          <Ionicons name="ellipsis-horizontal" size={21} color="#9CA3AF" />
        </View>

        <Text className="mt-4 text-[18px] font-bold leading-[26px] text-[#222222]" numberOfLines={2}>{post.title}</Text>
        <Text className="mt-2 text-[14px] font-medium leading-[22px] text-[#666666]" numberOfLines={3}>{post.content}</Text>
        <Text className="mt-1 text-[13px] font-semibold leading-[18px] text-[#FF4F8B]">더보기</Text>

        <ImageGrid images={images} />

        {post.relatedListing ? <RelatedListingCard listing={post.relatedListing} /> : null}

        {post.tags?.length ? (
          <View className="mt-4 flex-row flex-wrap">
            {post.tags.map((tag) => <Tag key={tag} label={tag} />)}
          </View>
        ) : null}

        <View className="mt-3 flex-row items-center justify-between border-t border-[#F1F3F5] pt-3">
          <View className="flex-1 flex-row flex-wrap items-center pr-2">
            <FeedMeta icon="heart-outline" label={`좋아요 ${post.likes}`} />
            <FeedMeta icon="chatbubble-outline" label={`댓글 ${commentCount}`} />
            <FeedMeta icon="eye-outline" label={`조회수 ${post.views}`} />
          </View>
          <AnimatedPressable className="h-9 w-9 items-center justify-center rounded-full bg-[#F7F8FA]">
            <Ionicons name="share-social-outline" size={18} color="#9CA3AF" />
          </AnimatedPressable>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<(typeof communityCategories)[number]>('전체');
  const filteredPosts = useMemo(
    () => (selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory)),
    [selectedCategory],
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]" edges={['top']}>
      <View className="border-b border-[#ECECEC] bg-white px-5 pb-4 pt-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-[24px] font-bold leading-8 text-[#222222]">커뮤니티</Text>
          <View className="flex-row items-center gap-2">
            <HeaderAction icon="search" onPress={() => router.push('/search')} />
            <HeaderAction icon="notifications-outline" onPress={() => router.push('/notifications')} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 + insets.bottom }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12, paddingTop: 14 }}>
          {communityCategories.map((category) => (
            <CategoryPill
              key={category}
              label={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        <View>
          {filteredPosts.map((post, index) => (
            <CommunityFeedCard key={post.id} post={post} index={index} />
          ))}
        </View>
      </ScrollView>

      <View className="absolute left-5 right-5" style={{ bottom: 96 + insets.bottom }}>
        <AnimatedPressable onPress={() => router.push('/community/create')} className="flex-row items-center justify-center rounded-full bg-[#FF4F8B] px-5 py-4 shadow-lg">
          <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="chatbubble-ellipses" size={18} color="white" />
            <View className="absolute -bottom-1 -right-1 h-4 w-4 items-center justify-center rounded-full bg-white">
              <Ionicons name="pencil" size={10} color="#FF4F8B" />
            </View>
          </View>
          <Text className="text-[14px] font-bold leading-5 text-white" numberOfLines={1}>우리 부기 이야기 올리기</Text>
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}
