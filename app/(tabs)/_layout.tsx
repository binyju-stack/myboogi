import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, type ColorValue } from 'react-native';

import { colors, shadows } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
const tabs: { name: string; title: string; icon: IconName; activeIcon: IconName }[] = [
  { name: 'index', title: '홈', icon: 'home-outline', activeIcon: 'home' },
  { name: 'marketplace', title: '분양', icon: 'storefront-outline', activeIcon: 'storefront' },
  { name: 'community', title: '커뮤니티', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
  { name: 'ai', title: 'AI상담', icon: 'sparkles-outline', activeIcon: 'sparkles' },
  { name: 'mypage', title: '마이', icon: 'person-outline', activeIcon: 'person' },
];

function TabIcon({ focused, color, icon, activeIcon }: { focused: boolean; color: ColorValue; icon: IconName; activeIcon: IconName }) {
  const scale = useRef(new Animated.Value(focused ? 1.08 : 1)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: focused ? 1.1 : 1, useNativeDriver: true, speed: 26, bounciness: 3 }).start();
  }, [focused, scale]);
  return <Animated.View style={{ transform: [{ scale }] }}><Ionicons name={focused ? activeIcon : icon} color={color} size={21} /></Animated.View>;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'fade', transitionSpec: { animation: 'timing', config: { duration: 160 } }, tabBarActiveTintColor: colors.berry, tabBarInactiveTintColor: colors.subtle, tabBarLabelStyle: { fontSize: 10, fontWeight: '800', marginTop: 2 }, tabBarItemStyle: { paddingVertical: 6, borderRadius: 18 }, tabBarStyle: { height: 78, paddingTop: 9, paddingBottom: 10, borderTopWidth: 0, backgroundColor: colors.white, ...shadows.bar } }}>
      {tabs.map((tab) => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title, tabBarIcon: ({ color, focused }) => <TabIcon focused={focused} color={color} icon={tab.icon} activeIcon={tab.activeIcon} /> }} />)}
    </Tabs>
  );
}
