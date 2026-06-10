import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Page({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-28">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-[24px] border border-line bg-white p-5 shadow-sm ${className}`}>{children}</View>;
}
