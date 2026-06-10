import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
const tabs: { name: string; title: string; icon: IconName; activeIcon: IconName }[] = [
  { name: 'index', title: '홈', icon: 'home-outline', activeIcon: 'home' },
  { name: 'marketplace', title: '분양', icon: 'storefront-outline', activeIcon: 'storefront' },
  { name: 'community', title: '커뮤니티', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
  { name: 'ai', title: 'AI상담', icon: 'sparkles-outline', activeIcon: 'sparkles' },
  { name: 'mypage', title: '마이', icon: 'person-outline', activeIcon: 'person' },
];

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarActiveTintColor: colors.berry, tabBarInactiveTintColor: '#AAA4AA',
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 1 },
      tabBarStyle: { height: 66, paddingTop: 7, paddingBottom: 7, borderTopColor: colors.line, backgroundColor: 'white' },
    }}>
      {tabs.map((tab) => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? tab.activeIcon : tab.icon} color={color} size={21} /> }} />)}
      <Tabs.Screen name="growth" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
