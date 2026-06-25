import type { ComponentProps, ReactNode } from 'react';
import { Animated, Pressable } from 'react-native';
import { useEffect, useRef } from 'react';

import { Motion } from '@/theme';

type PressableProps = ComponentProps<typeof Pressable>;

export function AnimatedPressable({ children, style, ...props }: PressableProps & { children: ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const animate = (pressed: boolean) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: pressed ? Motion.scale.pressed : 1, useNativeDriver: true, speed: 32, bounciness: 3 }),
      Animated.timing(opacity, { toValue: pressed ? 0.86 : 1, duration: Motion.duration.fast, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Pressable {...props} style={style} onPressIn={(event) => { animate(true); props.onPressIn?.(event); }} onPressOut={(event) => { animate(false); props.onPressOut?.(event); }}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

export function FadeInView({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: Motion.duration.slow, delay, useNativeDriver: true }).start();
  }, [delay, progress]);
  return <Animated.View style={{ opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }}>{children}</Animated.View>;
}
