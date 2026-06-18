import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Text, View, type ColorValue } from 'react-native';
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

function TabIcon({
  focused,
  color,
  icon,
  activeIcon,
  badgeCount = 0,
}: {
  focused: boolean;
  color: ColorValue;
  icon: IconName;
  activeIcon: IconName;
  badgeCount?: number;
}) {
  const scale = useRef(new Animated.Value(focused ? 1.06 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: focused ? 1.06 : 1, useNativeDriver: true, speed: 24, bounciness: 3 }).start();
  }, [focused, scale]);

  return (
    <Animated.View className="relative h-7 w-9 items-center justify-center" style={{ transform: [{ scale }] }}>
      <Ionicons name={focused ? activeIcon : icon} color={color} size={23} />
      {badgeCount ? (
        <View
          className="absolute items-center justify-center rounded-full"
          style={{ top: -4, right: -8, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: '#FF4F8B' }}
        >
          <Text className="text-[10px] font-bold leading-[14px] text-white">{badgeCount}</Text>
        </View>
      ) : null}
    </Animated.View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

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
          options={{
            title: tab.title,
            tabBarLabel: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                focused={focused}
                color={color}
                icon={tab.icon}
                activeIcon={tab.activeIcon}
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
