import { useEffect } from 'react';
import {
  Award,
  BookOpen,
  Flame,
  MessageCircle,
  Sparkles,
  Star,
  type LucideIcon,
} from 'lucide-react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export type AnimatedSectionIconType = 'flame' | 'award' | 'community' | 'star' | 'book' | 'new';

type AnimatedSectionIconProps = {
  type: AnimatedSectionIconType;
  size?: number;
  color?: string;
};

const smooth = Easing.inOut(Easing.sin);
const icons: Record<AnimatedSectionIconType, LucideIcon> = {
  flame: Flame,
  award: Award,
  community: MessageCircle,
  star: Star,
  book: BookOpen,
  new: Sparkles,
};

export function AnimatedSectionIcon({ type, size = 20, color = '#374151' }: AnimatedSectionIconProps) {
  const Icon = icons[type];
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = 1;
    rotate.value = 0;
    translateY.value = 0;
    opacity.value = 1;

    switch (type) {
      case 'flame':
        scale.value = withRepeat(
          withSequence(
            withTiming(1.08, { duration: 1250, easing: smooth }),
            withTiming(1, { duration: 1250, easing: smooth }),
          ),
          -1,
        );
        break;
      case 'award':
        rotate.value = withRepeat(
          withSequence(
            withTiming(-5, { duration: 750, easing: smooth }),
            withTiming(5, { duration: 1500, easing: smooth }),
            withTiming(0, { duration: 750, easing: smooth }),
          ),
          -1,
        );
        break;
      case 'community':
        translateY.value = withRepeat(
          withSequence(
            withTiming(-2, { duration: 1400, easing: smooth }),
            withTiming(0, { duration: 1400, easing: smooth }),
          ),
          -1,
        );
        break;
      case 'star':
        opacity.value = 0.7;
        opacity.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1250, easing: smooth }),
            withTiming(0.7, { duration: 1250, easing: smooth }),
          ),
          -1,
        );
        break;
      case 'book':
        scale.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 1500, easing: smooth }),
            withTiming(1, { duration: 1500, easing: smooth }),
          ),
          -1,
        );
        break;
      case 'new':
        opacity.value = 0.7;
        opacity.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1000, easing: smooth }),
            withTiming(0.7, { duration: 1000, easing: smooth }),
          ),
          -1,
        );
        break;
    }

    return () => {
      cancelAnimation(scale);
      cancelAnimation(rotate);
      cancelAnimation(translateY);
      cancelAnimation(opacity);
    };
  }, [opacity, rotate, scale, translateY, type]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, animatedStyle]}>
      <Icon size={size} strokeWidth={2} color={color} />
    </Animated.View>
  );
}
