import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { AppHeader } from '@/components/AppHeader';
import { communityCategories, posts } from '@/data/communityData';
import { getWeeklyPopularPosts } from '@/utils/communityRanking';

type Post = (typeof posts)[number];
type IconName = keyof typeof Ionicons.glyphMap;

function CategoryPill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      className={`mr-2 rounded-full px-3 py-1.5 ${selected ? 'bg-[#FFF5F7]' : 'bg-white'}`}
    >
      <Text className={`text-[13px] font-semibold leading-[18px] ${selected ? 'text-[#FF2E6F]' : 'text-[#94A3B8]'}`}>{label}</Text>
    </AnimatedPressable>
  );
}
function Avatar({ uri }: { uri: string }) {
  return <Image source={{ uri }} className="h-10 w-10 rounded-full bg-[#F2F4F6]" resizeMode="cover" />;
}

function Tag({ label }: { label: string }) {
  return (
    <View className="mb-2 mr-2 rounded-full bg-[#FFF5F7] px-3 py-1.5">
      <Text className="text-[13px] font-medium leading-[18px] text-[#FF2E6F]">#{label}</Text>
    </View>
  );
}

function FeedMeta({ icon, label }: { icon: IconName; label: string }) {
  const isLike = icon === 'heart-outline';
  const color = isLike ? '#FF2E6F' : '#94A3B8';

  return (
    <View className="mr-4 flex-row items-center">
      <Ionicons name={icon} size={15} color={color} />
      <Text className="ml-1.5 text-[12px] font-normal leading-[18px]" style={{ color }}>{label}</Text>
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
    <AnimatedPressable onPress={() => router.push('/marketplace')} className="mt-4 flex-row items-center rounded-[14px] border border-[#EEF2F6] bg-white px-4 py-3">
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-white">
        <Ionicons name="storefront-outline" size={19} color="#FF2E6F" />
      </View>
      <View className="ml-3 flex-1" style={{ minWidth: 0 }}>
        <Text className="text-[13px] font-bold leading-[18px] text-[#111827]" numberOfLines={1}>{listing.title}</Text>
        <Text className="mt-0.5 text-[13px] font-semibold leading-[18px] text-[#FF2E6F]">{listing.price.toLocaleString()}원</Text>
      </View>
      <Text className="text-[12px] font-semibold leading-[18px] text-[#94A3B8]">{listing.actionLabel}</Text>
      <Ionicons name="chevron-forward" size={15} color="#94A3B8" />
    </AnimatedPressable>
  );
}

function WeeklyPopularSection({ items }: { items: Post[] }) {
  return (
    <View className="mx-5 mb-4 overflow-hidden rounded-[16px] bg-white p-4">
      <View className="mb-2 flex-row items-center">
        <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-[#FFF7D6]">
          <Ionicons name="trophy" size={17} color="#E9A008" />
        </View>
        <Text className="text-[18px] font-bold leading-6 text-[#111827]">이번 주 인기글</Text>
      </View>

      {items.slice(0, 3).map((post, index) => {
        const commentCount = post.commentsCount ?? post.comments;
        return (
          <AnimatedPressable
            key={post.id}
            onPress={() => router.push(`/community/${post.id}` as never)}
            className={`flex-row items-center py-3 ${index ? 'border-t border-[#EEF2F6]' : ''}`}
          >
            <Text className="w-8 text-center text-[18px] font-bold leading-6 text-[#FF2E6F]">{index + 1}</Text>
            <View className="ml-2 flex-1" style={{ minWidth: 0 }}>
              <Text className="text-[14px] font-semibold leading-5 text-[#111827]" numberOfLines={1}>
                {post.title}
              </Text>
              <View className="mt-1 flex-row items-center">
                <Ionicons name="eye-outline" size={13} color="#94A3B8" />
                <Text className="ml-1 text-[11px] font-normal leading-4 text-[#94A3B8]">{post.views.toLocaleString()}</Text>
                <Ionicons name="chatbubble-outline" size={12} color="#94A3B8" style={{ marginLeft: 10 }} />
                <Text className="ml-1 text-[11px] font-normal leading-4 text-[#94A3B8]">{commentCount.toLocaleString()}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C4C8CF" />
          </AnimatedPressable>
        );
      })}

      <AnimatedPressable
        onPress={() => router.push('/community/popular')}
        className="mt-1 flex-row items-center justify-center border-t border-[#EEF2F6] pt-3"
      >
        <Text className="text-[13px] font-semibold leading-[18px] text-[#94A3B8]">전체보기</Text>
        <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
      </AnimatedPressable>
    </View>
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
              <Text className="text-[14px] font-semibold leading-5 text-[#FF2E6F]" numberOfLines={1}>{post.author}</Text>
              {post.badge ? (
                <View className="ml-2 rounded-full bg-[#FF2E6F] px-2 py-0.5">
                  <Text className="text-[10px] font-bold leading-[14px] text-white">{post.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text className="mt-0.5 text-[12px] font-normal leading-[18px] text-[#94A3B8]" numberOfLines={1}>{post.createdAt}</Text>
            {post.petInfo ? (
              <Text className="mt-1 text-[12px] font-medium leading-[18px] text-[#94A3B8]" numberOfLines={1}>{post.petInfo}</Text>
            ) : null}
          </View>
          <Ionicons name="ellipsis-horizontal" size={21} color="#94A3B8" />
        </View>

        <Text className="mt-4 text-[18px] font-bold leading-[26px] text-[#111827]" numberOfLines={2}>{post.title}</Text>
        <Text className="mt-2 text-[14px] font-medium leading-[22px] text-[#94A3B8]" numberOfLines={3}>{post.content}</Text>
        <Text className="mt-1 text-[13px] font-semibold leading-[18px] text-[#FF2E6F]">더보기</Text>

        <ImageGrid images={images} />

        {post.relatedListing ? <RelatedListingCard listing={post.relatedListing} /> : null}

        {post.tags?.length ? (
          <View className="mt-4 flex-row flex-wrap">
            {post.tags.map((tag) => <Tag key={tag} label={tag} />)}
          </View>
        ) : null}

        <View className="mt-3 flex-row items-center justify-between border-t border-[#EEF2F6] pt-3">
          <View className="flex-1 flex-row flex-wrap items-center pr-2">
            <FeedMeta icon="heart-outline" label={`좋아요 ${post.likes}`} />
            <FeedMeta icon="chatbubble-outline" label={`댓글 ${commentCount}`} />
            <FeedMeta icon="eye-outline" label={`조회수 ${post.views}`} />
          </View>
          <AnimatedPressable className="h-9 w-9 items-center justify-center rounded-full bg-[#FFFFFF]">
            <Ionicons name="share-social-outline" size={18} color="#94A3B8" />
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
  const weeklyPopularPosts = useMemo(() => getWeeklyPopularPosts(posts).slice(0, 3), []);

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]" edges={['top']}>
      <AppHeader title="커뮤니티" showSearch showBell />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 + insets.bottom }}>
        <WeeklyPopularSection items={weeklyPopularPosts} />

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

    </SafeAreaView>
  );
}
