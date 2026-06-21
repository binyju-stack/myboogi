import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View, type ColorValue } from 'react-native';
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
  pressTrigger,
  badgeCount = 0,
}: {
  focused: boolean;
  color: ColorValue;
  icon: IconName;
  activeIcon: IconName;
  pressTrigger: number;
  badgeCount?: number;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!pressTrigger) return;

    scale.stopAnimation();
    translateY.stopAnimation();
    scale.setValue(1);
    translateY.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.18,
          duration: 90,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -3,
          duration: 90,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 100,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [pressTrigger, scale, translateY]);

  return (
    <View className="relative h-7 w-9 items-center justify-center">
      <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
        <Ionicons name={focused ? activeIcon : icon} color={color} size={23} />
      </Animated.View>
      {badgeCount ? (
        <View
          className="absolute items-center justify-center rounded-full"
          style={{ top: -4, right: -8, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: '#FF4F8B' }}
        >
          <Text className="text-[10px] font-bold leading-[14px] text-white">{badgeCount}</Text>
        </View>
      ) : null}
    </View>
  );
}

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
              <TabIcon
                focused={focused}
                color={color}
                icon={tab.icon}
                activeIcon={tab.activeIcon}
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
