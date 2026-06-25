import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { TopBar } from './common';
import { Page } from './screen';

export function AdminListLayout({ title, description, count, action, children }: { title: string; description: string; count: number; action?: ReactNode; children: ReactNode }) {
  return (
    <Page>
      <TopBar title={title} />
      <View className="border-b border-line bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-bold text-berry">MYBOOGI ADMIN</Text>
        <Text className="mt-1 text-[24px] font-bold text-ink">{title}</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">{description}</Text>
      </View>
      <View className="flex-row items-center justify-between px-5 pb-4 pt-6">
        <Text className="text-[16px] font-bold text-ink">전체 {count}</Text>
        {action}
      </View>
      <View className="px-5 pb-6">{children}</View>
    </Page>
  );
}
