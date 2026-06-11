import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { TopBar } from './common';
import { Page } from './screen';

export function MyListLayout({ title, eyebrow, description, count, children }: { title: string; eyebrow: string; description: string; count: number; children: ReactNode }) {
  return (
    <Page>
      <TopBar title={title} />
      <View className="bg-white px-5 pb-6 pt-4"><Text className="text-[9px] font-black text-berry">{eyebrow}</Text><Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">{title}</Text><Text className="mt-2 text-[11px] leading-5 text-muted">{description}</Text></View>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-6"><Text className="text-[16px] font-black text-ink">전체 {count}</Text><Text className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-muted">최신순</Text></View>
      <View className="px-5">{children}</View>
    </Page>
  );
}

export function EmptyList({ title, description }: { title: string; description: string }) {
  return <View className="items-center rounded-[24px] border border-line bg-white px-5 py-14 shadow-sm"><View className="h-12 w-12 items-center justify-center rounded-full bg-blush"><Ionicons name="heart-outline" size={22} color="#F0447D" /></View><Text className="mt-4 text-[13px] font-black text-ink">{title}</Text><Text className="mt-2 text-center text-[10px] leading-5 text-muted">{description}</Text></View>;
}
