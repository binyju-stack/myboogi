import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
type FeedPost = {
  id: string;
  category: string;
  categoryColor: string;
  author: string;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  imageColors: readonly string[];
};

export function PinkTurtle({ size = 100, dark = false }: { size?: number; dark?: boolean }) {
  const shell = dark ? '#FF9A75' : '#FFF1F6';
  const line = dark ? '#FFFFFF' : colors.berry;
  return (
    <View style={{ width: size, height: size * 0.68 }} className="items-center justify-center">
      <View style={{ width: size * 0.62, height: size * 0.48, borderRadius: size, borderColor: line }} className="z-10 items-center justify-center border-2" >
        <View style={{ width: size * 0.34, height: size * 0.34, borderColor: line }} className="rotate-45 rounded-xl border" />
      </View>
      <View style={{ width: size * 0.25, height: size * 0.25, right: size * 0.01, borderColor: line, backgroundColor: shell }} className="absolute rounded-full border-2">
        <View style={{ backgroundColor: line }} className="absolute left-2 top-2 h-1 w-1 rounded-full" />
        <View style={{ borderColor: line }} className="absolute bottom-1 left-2 h-1.5 w-2 rounded-b-full border-b" />
      </View>
      {[
        { left: size * 0.08, top: size * 0.05, rotate: '-18deg' },
        { left: size * 0.08, bottom: size * 0.05, rotate: '18deg' },
        { right: size * 0.18, top: 0, rotate: '18deg' },
        { right: size * 0.18, bottom: 0, rotate: '-18deg' },
      ].map((position, index) => <View key={index} style={{ width: size * 0.18, height: size * 0.11, backgroundColor: shell, borderColor: line, transform: [{ rotate: position.rotate }], ...position }} className="absolute rounded-full border-2" />)}
    </View>
  );
}

export function TurtleImagePlaceholder({ color, compact = false }: { color: string; compact?: boolean }) {
  return (
    <View style={{ backgroundColor: color }} className="h-full w-full items-center justify-center overflow-hidden">
      <View className="absolute -bottom-7 -left-5 h-20 w-20 rounded-full bg-white/20" />
      <View className="absolute -right-5 -top-6 h-16 w-16 rounded-full bg-white/20" />
      <PinkTurtle size={compact ? 54 : 88} dark />
    </View>
  );
}

export function HomeFeedCard({ post }: { post: FeedPost }) {
  const images = post.imageColors;
  return (
    <View className="border-b-8 border-[#F7F5F7] bg-white px-4 pb-5 pt-4">
      <View className="flex-row items-center">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-shell"><PinkTurtle size={27} /></View>
        <View className="ml-2 flex-1"><Text className="text-xs font-bold text-ink">{post.author}</Text><Text className="mt-0.5 text-[9px] text-muted">{post.time}</Text></View>
        <Ionicons name="ellipsis-horizontal" size={17} color={colors.muted} />
      </View>
      <View style={{ backgroundColor: post.categoryColor }} className="mt-3 self-start rounded px-2 py-1"><Text className="text-[9px] font-bold text-muted">{post.category}</Text></View>
      <Text className="mt-2 text-[14px] font-bold leading-5 text-ink">{post.title}</Text>
      <Text className="mt-1 text-[11px] leading-[18px] text-muted">{post.content}</Text>
      {images.length === 1 ? (
        <View className="mt-3 h-48 overflow-hidden rounded-lg"><TurtleImagePlaceholder color={images[0]} /></View>
      ) : images.length === 2 ? (
        <View className="mt-3 flex-row gap-1.5">{images.map((color) => <View key={color} className="h-40 flex-1 overflow-hidden rounded-lg"><TurtleImagePlaceholder color={color} compact /></View>)}</View>
      ) : (
        <View className="mt-3"><View className="h-44 overflow-hidden rounded-lg"><TurtleImagePlaceholder color={images[0]} /></View><View className="mt-1.5 flex-row gap-1.5">{images.slice(1).map((color) => <View key={color} className="h-24 flex-1 overflow-hidden rounded-lg"><TurtleImagePlaceholder color={color} compact /></View>)}</View></View>
      )}
      <View className="mt-3 flex-row items-center"><Ionicons name="heart-outline" size={15} color={colors.ink} /><Text className="ml-1 mr-4 text-[10px] text-muted">{post.likes}</Text><Ionicons name="chatbubble-outline" size={14} color={colors.ink} /><Text className="ml-1 text-[10px] text-muted">{post.comments}</Text></View>
    </View>
  );
}

export function RankingList({ title, items }: { title: string; items: readonly (readonly [string, string, string])[] }) {
  return (
    <View className="border-b-8 border-[#F7F5F7] bg-white px-4 pb-5 pt-5">
      <Text className="mb-3 text-[15px] font-bold text-ink">{title} <Text className="text-berry">›</Text></Text>
      {items.map(([postTitle, category, stat], index) => (
        <Pressable key={postTitle} className="flex-row items-center border-b border-line py-2.5">
          <Text className="w-7 text-center text-sm font-bold text-berry">{index + 1}</Text>
          <View className="ml-2 flex-1"><View className="flex-row items-center"><View className="mr-2 rounded bg-blue px-1.5 py-0.5"><Text className="text-[8px] font-bold text-muted">{category}</Text></View><Text className="text-[9px] text-muted">{stat}</Text></View><Text className="mt-1 text-[11px] font-bold text-ink" numberOfLines={1}>{postTitle}</Text></View>
        </Pressable>
      ))}
    </View>
  );
}

export function CommunityMenuIcon({ label, icon }: { label: string; icon: IconName }) {
  return (
    <View className="mb-4 w-1/4 items-center">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-shell"><Ionicons name={icon} size={22} color={colors.berry} /></View>
      <Text className="mt-2 text-[10px] font-bold text-ink">{label}</Text>
    </View>
  );
}
