import { Tabs } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AnimatedTabIcon,
  type TabAnimationKind,
  type TabIconName,
} from '@/components/navigation/AnimatedTabIcon';
import { colors, shadows } from '@/constants/theme';
import { unreadChatCount } from '@/data/chat';

const tabs: {
  name: string;
  title: string;
  icon: TabIconName;
  activeIcon: TabIconName;
  animation: TabAnimationKind;
}[] = [
  { name: 'index', title: '홈', icon: 'home-outline', activeIcon: 'home', animation: 'home' },
  {
    name: 'marketplace',
    title: '분양',
    icon: 'storefront-outline',
    activeIcon: 'storefront',
    animation: 'marketplace',
  },
  {
    name: 'community',
    title: '커뮤니티',
    icon: 'chatbubbles-outline',
    activeIcon: 'chatbubbles',
    animation: 'community',
  },
  {
    name: 'chat',
    title: '채팅',
    icon: 'chatbubble-ellipses-outline',
    activeIcon: 'chatbubble-ellipses',
    animation: 'chat',
  },
  { name: 'mypage', title: '마이', icon: 'person-outline', activeIcon: 'person', animation: 'mypage' },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);
  const [pressTriggers, setPressTriggers] = useState<Record<string, number>>({});

  const triggerTabAnimation = (tabName: string) => {
    setPressTriggers((current) => ({
      ...current,
      [tabName]: (current[tabName] ?? 0) + 1,
    }));
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        transitionSpec: { animation: 'timing', config: { duration: 160 } },
        tabBarActiveTintColor: colors.berry,
        tabBarInactiveTintColor: colors.subtle,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          width: '100%',
          textAlign: 'center',
          fontSize: 11,
          fontWeight: '500',
          lineHeight: 14,
          marginTop: 4,
          marginBottom: 0,
          paddingBottom: 0,
          includeFontPadding: false,
        },
        tabBarIconStyle: {
          width: '100%',
          height: 28,
          marginTop: 0,
          marginBottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          flex: 1,
          height: 64,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 6,
          paddingBottom: 4,
          marginHorizontal: 0,
        },
        tabBarStyle: {
          height: 80 + bottomInset,
          minHeight: 80 + bottomInset,
          paddingTop: 8,
          paddingBottom: bottomInset,
          paddingHorizontal: 0,
          borderTopWidth: 1,
          borderTopColor: '#F1F3F5',
          backgroundColor: colors.white,
          overflow: 'visible',
          ...shadows.bar,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          listeners={{
            tabPress: () => triggerTabAnimation(tab.name),
          }}
          options={{
            title: tab.title,
            tabBarLabel: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                focused={focused}
                color={color}
                icon={tab.icon}
                activeIcon={tab.activeIcon}
                animation={tab.animation}
                pressTrigger={pressTriggers[tab.name] ?? 0}
                badgeCount={tab.name === 'chat' ? unreadChatCount : 0}
              />
            ),
          }}
        />
      ))}
      <Tabs.Screen name="ai" options={{ href: null }} />
    </Tabs>
  );
}
