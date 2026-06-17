import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, type ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, shadows } from '@/constants/theme';
import { unreadChatCount } from '@/data/chat';

type IconName = ComponentProps<typeof Ionicons>['name'];
const tabs: { name: string; title: string; icon: IconName; activeIcon: IconName }[] = [
  { name: 'index', title: '홈', icon: 'home-outline', activeIcon: 'home' },
  { name: 'marketplace', title: '분양', icon: 'storefront-outline', activeIcon: 'storefront' },
  { name: 'community', title: '커뮤니티', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
  { name: 'chat', title: '채팅', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses' },
  { name: 'mypage', title: '마이', icon: 'person-outline', activeIcon: 'person' },
];

function TabIcon({ focused, color, icon, activeIcon, badgeCount = 0 }: { focused: boolean; color: ColorValue; icon: IconName; activeIcon: IconName; badgeCount?: number }) {
  const scale = useRef(new Animated.Value(focused ? 1.08 : 1)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: focused ? 1.1 : 1, useNativeDriver: true, speed: 26, bounciness: 3 }).start();
  }, [focused, scale]);
  return (
    <Animated.View className="h-7 w-7 items-center justify-center" style={{ transform: [{ scale }] }}>
      <Ionicons name={focused ? activeIcon : icon} color={color} size={21} />
      {badgeCount ? (
        <Animated.View className="absolute -right-2 -top-2 min-w-5 items-center justify-center rounded-full bg-berry px-1.5 py-0.5">
          <Animated.Text className="text-[9px] font-black text-white">{badgeCount}</Animated.Text>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'fade', transitionSpec: { animation: 'timing', config: { duration: 160 } }, tabBarActiveTintColor: colors.berry, tabBarInactiveTintColor: colors.subtle, tabBarLabelPosition: 'below-icon', tabBarLabelStyle: { width: '100%', textAlign: 'center', fontSize: 12, fontWeight: '500', lineHeight: 16, marginTop: 2, includeFontPadding: false }, tabBarIconStyle: { marginTop: 0, alignItems: 'center', justifyContent: 'center' }, tabBarItemStyle: { height: 50, alignItems: 'center', justifyContent: 'center', paddingVertical: 3, borderRadius: 18 }, tabBarStyle: { height: 66 + bottomInset, paddingTop: 7, paddingBottom: bottomInset, borderTopWidth: 0, backgroundColor: colors.white, ...shadows.bar } }}>
      {tabs.map((tab) => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title, tabBarIcon: ({ color, focused }) => <TabIcon focused={focused} color={color} icon={tab.icon} activeIcon={tab.activeIcon} badgeCount={tab.name === 'chat' ? unreadChatCount : 0} /> }} />)}
      <Tabs.Screen name="ai" options={{ href: null }} />
    </Tabs>
  );
}
