import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { shadows } from '@/constants/theme';

export function Page({ children, backgroundColor }: { children: ReactNode; backgroundColor?: string }) {
  const backgroundStyle = backgroundColor ? { backgroundColor } : undefined;

  return (
    <SafeAreaView className="flex-1 bg-page" style={backgroundStyle} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
        contentContainerStyle={backgroundStyle}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View style={shadows.card} className={`rounded-[14px] bg-white p-5 ${className}`}>{children}</View>;
}
