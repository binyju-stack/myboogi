import { useEffect, useRef } from 'react';
import {
  BookOpen,
  Flame,
  MessageCircle,
  MessageSquareMore,
  Sparkles,
  Trophy,
  type LucideIcon,
} from 'lucide-react-native';
import { Animated } from 'react-native';

import { Colors, Motion } from '@/theme';

export type AnimatedSectionIconType = 'flame' | 'award' | 'community' | 'review' | 'book' | 'new';

type AnimatedSectionIconProps = {
  type: AnimatedSectionIconType;
  animationType?: AnimatedSectionIconType;
  size?: number;
  color?: string;
};

const icons: Record<AnimatedSectionIconType, LucideIcon> = {
  flame: Flame,
  award: Trophy,
  community: MessageCircle,
  review: MessageSquareMore,
  book: BookOpen,
  new: Sparkles,
};

const iconColors: Record<AnimatedSectionIconType, string> = {
  flame: Colors.primary,
  award: Colors.primary,
  community: Colors.primary,
  review: Colors.primary,
  book: Colors.primary,
  new: Colors.primary,
};

const timing = (value: Animated.Value, toValue: number, duration: number) =>
  Animated.timing(value, {
    toValue,
    duration,
    easing: Motion.easing.standard,
    useNativeDriver: true,
  });

export function AnimatedSectionIcon({
  type,
  animationType = type,
  size = 20,
  color,
}: AnimatedSectionIconProps) {
  const Icon = icons[type];
  const iconColor = iconColors[type];
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    scale.setValue(1);
    translateY.setValue(0);
    rotate.setValue(0);
    opacity.setValue(1);

    let animation: Animated.CompositeAnimation;

    switch (animationType) {
      case 'flame':
        scale.setValue(0.94);
        translateY.setValue(1);
        rotate.setValue(-4);
        opacity.setValue(0.85);
        animation = Animated.loop(
          Animated.parallel([
            Animated.sequence([timing(scale, 1.08, 500), timing(scale, 0.94, 500)]),
            Animated.sequence([timing(rotate, 4, 500), timing(rotate, -4, 500)]),
            Animated.sequence([timing(translateY, -3, 500), timing(translateY, 1, 500)]),
            Animated.sequence([timing(opacity, 1, 500), timing(opacity, 0.85, 500)]),
          ]),
        );
        break;
      case 'award':
        animation = Animated.loop(Animated.sequence([timing(scale, 0.96, 400), timing(scale, 1.06, 600), timing(scale, 1, 400)]));
        break;
      case 'community':
        animation = Animated.loop(Animated.sequence([timing(translateY, -4, 600), timing(translateY, 0, 600)]));
        break;
      case 'review':
        opacity.setValue(0.65);
        scale.setValue(0.94);
        animation = Animated.loop(
          Animated.parallel([
            Animated.sequence([timing(opacity, 1, 700), timing(opacity, 0.65, 700)]),
            Animated.sequence([timing(scale, 1.08, 700), timing(scale, 0.94, 700)]),
          ]),
        );
        break;
      case 'book':
        animation = Animated.loop(Animated.sequence([timing(rotate, -4, 500), timing(rotate, 4, 700), timing(rotate, 0, 500)]));
        break;
      case 'new':
        opacity.setValue(0.6);
        animation = Animated.loop(Animated.sequence([timing(opacity, 1, 650), timing(opacity, 0.6, 650)]));
        break;
    }

    animation.start();
    return () => animation.stop();
  }, [animationType, opacity, rotate, scale, translateY]);

  const rotateValue = rotate.interpolate({
    inputRange: [-4, 4],
    outputRange: ['-4deg', '4deg'],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: [{ translateY }, { scale }, { rotate: rotateValue }],
      }}
    >
      <Icon size={size} strokeWidth={1.9} color={color ?? iconColor} />
    </Animated.View>
  );
}
