import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { Text, View, type ColorValue } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export type TabIconName = ComponentProps<typeof Ionicons>['name'];
export type TabAnimationKind = 'home' | 'marketplace' | 'community' | 'chat' | 'mypage';

type AnimatedTabIconProps = {
  focused: boolean;
  color: ColorValue;
  icon: TabIconName;
  activeIcon: TabIconName;
  animation: TabAnimationKind;
  pressTrigger: number;
  badgeCount?: number;
};

const easeOut = Easing.out(Easing.cubic);
const easeInOut = Easing.inOut(Easing.cubic);

export function AnimatedTabIcon({
  focused,
  color,
  icon,
  activeIcon,
  animation,
  pressTrigger,
  badgeCount = 0,
}: AnimatedTabIconProps) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!pressTrigger) return;

    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
    opacity.value = 1;

    switch (animation) {
      case 'home':
        scale.value = withSequence(
          withTiming(1.15, { duration: 95, easing: easeOut }),
          withTiming(1, { duration: 115, easing: easeInOut }),
        );
        translateY.value = withSequence(
          withTiming(-3, { duration: 95, easing: easeOut }),
          withTiming(0, { duration: 115, easing: easeInOut }),
        );
        break;
      case 'marketplace':
        scale.value = withSequence(
          withTiming(1.18, { duration: 100, easing: easeOut }),
          withTiming(1, { duration: 120, easing: easeInOut }),
        );
        rotate.value = withSequence(
          withTiming(-3, { duration: 55, easing: easeOut }),
          withTiming(3, { duration: 75, easing: easeInOut }),
          withTiming(0, { duration: 90, easing: easeInOut }),
        );
        break;
      case 'community':
        translateX.value = withSequence(
          withTiming(-2, { duration: 60, easing: easeOut }),
          withTiming(2, { duration: 75, easing: easeInOut }),
          withTiming(0, { duration: 75, easing: easeInOut }),
        );
        scale.value = withSequence(
          withTiming(1.08, { duration: 100, easing: easeOut }),
          withTiming(1, { duration: 110, easing: easeInOut }),
        );
        break;
      case 'chat':
        scale.value = withSequence(
          withTiming(1.12, { duration: 55, easing: easeOut }),
          withTiming(1, { duration: 55, easing: easeInOut }),
          withTiming(1.08, { duration: 55, easing: easeOut }),
          withTiming(1, { duration: 55, easing: easeInOut }),
        );
        break;
      case 'mypage':
        scale.value = withSequence(
          withTiming(1.16, { duration: 100, easing: easeOut }),
          withTiming(1, { duration: 120, easing: easeInOut }),
        );
        opacity.value = withSequence(
          withTiming(0.8, { duration: 55, easing: easeOut }),
          withTiming(1, { duration: 165, easing: easeInOut }),
        );
        break;
    }
  }, [animation, opacity, pressTrigger, rotate, scale, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <View className="relative h-7 w-9 items-center justify-center">
      <Animated.View style={animatedStyle}>
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
