import { Ionicons } from '@expo/vector-icons';
import { Crown, Egg, Medal, PenLine, Store, type LucideIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { AppHeader } from '@/components/AppHeader';
import { BillboardTicker } from '@/components/BillboardTicker';
import { Colors, Motion, Radius, Shadows, Spacing, Typography } from '@/theme';
import { communityCategories, posts } from '@/data/communityData';
import { getWeeklyPopularPosts } from '@/utils/communityRanking';

type Post = (typeof posts)[number];
type IconName = keyof typeof Ionicons.glyphMap;
const currencyUnit = '원';
const likeLabel = '좋아요';
const commentLabel = '댓글';
const viewLabel = '조회';
const middleDot = '·';

function CategoryPill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.categoryPill, selected ? styles.categoryPillSelected : styles.categoryPillDefault]}
    >
      <Text style={[styles.categoryPillText, selected ? styles.categoryPillTextSelected : styles.categoryPillTextDefault]}>{label}</Text>
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

function getPostInfoTags(post: Post) {
  const petTags = post.petInfo ? post.petInfo.split(middleDot).map((tag) => tag.trim()).filter(Boolean) : [];
  return [post.category, ...petTags].slice(0, 4);
}

function PostInfoTags({ post }: { post: Post }) {
  const infoTags = getPostInfoTags(post);

  if (!infoTags.length) {
    return null;
  }

  return (
    <View style={styles.postInfoTagRow}>
      {infoTags.map((tag) => (
        <View key={`${post.id}-${tag}`} style={styles.postInfoTag}>
          <Text style={styles.postInfoTagText} numberOfLines={1}>{tag}</Text>
        </View>
      ))}
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
        <Text className="mt-0.5 text-[13px] font-semibold leading-[18px] text-[#FF2E6F]">{listing.price.toLocaleString()}{currencyUnit}</Text>
      </View>
      <Text className="text-[12px] font-semibold leading-[18px] text-[#94A3B8]">{listing.actionLabel}</Text>
      <Ionicons name="chevron-forward" size={15} color="#94A3B8" />
    </AnimatedPressable>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const isTop = rank === 1;
  const Icon = isTop ? Crown : Medal;
  const color = isTop ? Colors.rating : Colors.subText;

  return (
    <View style={[styles.rankBadge, isTop ? styles.rankBadgeTop : styles.rankBadgeSub]}>
      <Icon size={17} strokeWidth={2} color={color} />
      <Text style={[styles.rankBadgeText, isTop ? styles.rankBadgeTextTop : styles.rankBadgeTextSub]}>{rank}</Text>
    </View>
  );
}
function WeeklyPopularSection({ items }: { items: Post[] }) {
  return (
    <View className="mx-5 mb-4 overflow-hidden rounded-[16px] bg-white p-4">
      <View className="mb-2 flex-row items-center">
        <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-[#FFF7D6]">
          <Ionicons name="trophy" size={17} color="#E9A008" />
        </View>
        <Text className="text-[18px] font-bold leading-6 text-[#111827]">{'이번 주 인기글'}</Text>
      </View>

      {items.slice(0, 3).map((post, index) => {
        const commentCount = post.commentsCount ?? post.comments;
        return (
          <AnimatedPressable
            key={post.id}
            onPress={() => router.push(`/community/${post.id}` as never)}
            className={`flex-row items-center py-3 ${index ? 'border-t border-[#EEF2F6]' : ''}`}
          >
            <RankBadge rank={index + 1} />
            <View className="flex-1" style={{ minWidth: 0 }}>
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
        <Text className="text-[13px] font-semibold leading-[18px] text-[#94A3B8]">{'인기글 더보기'}</Text>
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
        <PostInfoTags post={post} />

        <ImageGrid images={images} />

        {post.relatedListing ? <RelatedListingCard listing={post.relatedListing} /> : null}

        {post.tags?.length ? (
          <View className="mt-4 flex-row flex-wrap">
            {post.tags.map((tag) => <Tag key={tag} label={tag} />)}
          </View>
        ) : null}

        <View className="mt-3 flex-row items-center justify-between border-t border-[#EEF2F6] pt-3">
          <View className="flex-1 flex-row flex-wrap items-center pr-2">
            <FeedMeta icon="heart-outline" label={`${likeLabel} ${post.likes}`} />
            <FeedMeta icon="chatbubble-outline" label={`${commentLabel} ${commentCount}`} />
            <FeedMeta icon="eye-outline" label={`${viewLabel} ${post.views}`} />
          </View>
          <AnimatedPressable className="h-9 w-9 items-center justify-center rounded-full bg-[#FFFFFF]">
            <Ionicons name="share-social-outline" size={18} color="#94A3B8" />
          </AnimatedPressable>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  categoryPill: {
    marginRight: Spacing.sm,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm - Spacing.xxs,
    borderWidth: StyleSheet.hairlineWidth,
  },
  categoryPillSelected: {
    borderColor: Colors.badge,
    backgroundColor: Colors.badge,
    ...Shadows.card,
  },
  categoryPillDefault: {
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  categoryPillText: {
    fontSize: Typography.caption.fontSize + 1,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  categoryPillTextSelected: {
    color: Colors.primary,
  },
  categoryPillTextDefault: {
    color: Colors.subText,
  },
  postInfoTagRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  postInfoTag: {
    maxWidth: 96,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  postInfoTagText: {
    color: Colors.primary,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  fabBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9,
  },
  fabMenu: {
    position: 'absolute',
    right: Spacing.lg,
    zIndex: 11,
    minWidth: Spacing.xxl * 5,
    overflow: 'hidden',
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    ...Shadows.floating,
  },
  fabMenuItem: {
    minHeight: Spacing.xxl + Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  fabMenuIcon: {
    width: Spacing.xl,
    alignItems: 'center',
  },
  fabMenuText: {
    marginLeft: Spacing.sm,
    color: Colors.text,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
  rankBadge: {
    width: Spacing.xxl + Spacing.md,
    height: Spacing.xxl,
    marginRight: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs,
    borderRadius: Radius.pill,
  },
  rankBadgeTop: {
    backgroundColor: Colors.badge,
  },
  rankBadgeSub: {
    backgroundColor: Colors.surface,
  },
  rankBadgeText: {
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  rankBadgeTextTop: {
    color: Colors.rating,
  },
  rankBadgeTextSub: {
    color: Colors.subText,
  },
});

type FabMenuAction = {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
};

function CommunityFabMenu({ visible, bottom, onClose }: { visible: boolean; bottom: number; onClose: () => void }) {
  const scale = useRef(new Animated.Value(Motion.scale.modal)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: visible ? 1 : Motion.scale.modal,
        duration: Motion.duration.normal,
        easing: Motion.easing.standard,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: Motion.duration.normal,
        easing: Motion.easing.standard,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, visible]);

  if (!visible) {
    return null;
  }

  const runAction = (action: () => void) => {
    onClose();
    action();
  };

  const actions: FabMenuAction[] = [
    { label: '글쓰기', icon: PenLine, onPress: () => router.push('/community/create') },
    { label: '분양등록', icon: Store, onPress: () => router.push('/listing/create') },
    { label: '산란기록', icon: Egg, onPress: () => router.push('/my/turtles/breeding' as never) },
  ];

  return (
    <>
      <Pressable style={styles.fabBackdrop} onPress={onClose} />
      <Animated.View style={[styles.fabMenu, { bottom }, { opacity, transform: [{ scale }] }]}>
        {actions.map(({ label, icon: Icon, onPress }) => (
          <Pressable key={label} style={styles.fabMenuItem} onPress={() => runAction(onPress)}>
            <View style={styles.fabMenuIcon}>
              <Icon size={17} strokeWidth={2} color={Colors.primary} />
            </View>
            <Text style={styles.fabMenuText}>{label}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </>
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
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const fabBottom = insets.bottom + Spacing.xxl * 3 - Spacing.xs;

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]" edges={['top']}>
      <AppHeader title="커뮤니티" subtitle="오늘 올라온 사육 이야기와 질문" showSearch showBell />
      <BillboardTicker category="community" />

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

      <CommunityFabMenu
        visible={fabMenuOpen}
        bottom={fabBottom + Spacing.xxl + Spacing.xl + Spacing.md}
        onClose={() => setFabMenuOpen(false)}
      />

      <AnimatedPressable
        onPress={() => {
          if (fabMenuOpen) {
            setFabMenuOpen(false);
            return;
          }
          router.push('/community/create');
        }}
        onLongPress={() => setFabMenuOpen(true)}
        delayLongPress={Motion.duration.slow}
        className="absolute right-5 h-[60px] w-[60px] items-center justify-center rounded-full shadow-lg"
        style={{ bottom: fabBottom, backgroundColor: Colors.primary, zIndex: 12 }}
      >
        <Ionicons name="create-outline" size={27} color={Colors.card} />
      </AnimatedPressable>
    </SafeAreaView>
  );
}













