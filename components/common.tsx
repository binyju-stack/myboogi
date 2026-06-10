import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function TurtleMark({ size = 50 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size * 0.72 }} className="items-center justify-center">
      <View style={{ width: size * 0.62, height: size * 0.5, borderRadius: size }} className="z-10 border-2 border-white bg-petal" />
      <View style={{ width: size * 0.25, height: size * 0.25, right: 0 }} className="absolute rounded-full border-2 border-white bg-petal">
        <View className="absolute left-1.5 top-2 h-1 w-1 rounded-full bg-berry" />
      </View>
      <View className="absolute left-1 top-1 h-3 w-4 -rotate-12 rounded-full bg-petal" />
      <View className="absolute bottom-1 left-1 h-3 w-4 rotate-12 rounded-full bg-petal" />
    </View>
  );
}

export function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <View className={`bg-white px-4 ${compact ? 'pb-3 pt-3' : 'pb-5 pt-3'}`}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[21px] font-black tracking-tight text-ink">마이부기</Text>
          {!compact ? <Text className="mt-1 text-[11px] font-semibold text-muted">거북이 전용 커뮤니티 & 분양 플랫폼</Text> : null}
        </View>
        <View className="flex-row gap-3">
          <Ionicons name="notifications-outline" color={colors.ink} size={21} />
          <Ionicons name="person-circle-outline" color={colors.ink} size={22} />
        </View>
      </View>
      {!compact ? (
        <Pressable className="mt-5 flex-row items-center rounded-2xl bg-[#F7F5F7] px-4 py-3">
          <Ionicons name="search" color={colors.muted} size={18} />
          <Text className="ml-2 text-sm text-muted">품종, 브리더, 게시글을 검색해보세요</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function TopBar({ title, right }: { title: string; right?: IconName }) {
  return (
    <View className="flex-row items-center border-b border-line bg-white px-4 py-3">
      <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center">
        <Ionicons name="chevron-back" size={24} color={colors.ink} />
      </Pressable>
      <Text className="flex-1 text-center text-base font-black text-ink">{title}</Text>
      <View className="h-10 w-10 items-center justify-center">{right ? <Ionicons name={right} size={22} color={colors.ink} /> : null}</View>
    </View>
  );
}

export function SectionHeader({ title, action = '전체보기', onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between px-4">
      <Text className="text-[17px] font-black text-ink">{title}</Text>
      <Pressable onPress={onPress}><Text className="text-xs font-bold text-berry">{action} ›</Text></Pressable>
    </View>
  );
}

export function Chip({ label, selected = false, icon }: { label: string; selected?: boolean; icon?: IconName }) {
  return (
    <View className={`mr-2 flex-row items-center rounded-full px-3 py-2 ${selected ? 'bg-berry' : 'border border-line bg-white'}`}>
      {icon ? <Ionicons name={icon} size={13} color={selected ? 'white' : colors.berry} /> : null}
      <Text className={`text-xs font-bold ${icon ? 'ml-1' : ''} ${selected ? 'text-white' : 'text-muted'}`}>{label}</Text>
    </View>
  );
}

export function HorizontalRow({ children }: { children: ReactNode }) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4">{children}</ScrollView>;
}

export function VerifiedBadge({ label = '인증 브리더' }: { label?: string }) {
  return <View className="self-start rounded bg-mint px-1.5 py-1"><Text className="text-[10px] font-black text-moss">✓ {label}</Text></View>;
}

export function EmptyImage({ icon = 'image-outline' }: { icon?: IconName }) {
  return <View className="h-full w-full items-center justify-center bg-shell"><Ionicons name={icon} size={28} color={colors.berry} /></View>;
}

export function Stat({ icon, value }: { icon: IconName; value: number | string }) {
  return <View className="mr-3 flex-row items-center"><Ionicons name={icon} size={13} color={colors.muted} /><Text className="ml-1 text-[10px] text-muted">{value}</Text></View>;
}

export function Avatar({ uri, size = 38 }: { uri: string; size?: number }) {
  return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
}
