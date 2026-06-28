import { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import type { OnlineStatus } from '@/mockData/onlineStatus';
import { Colors, Radius, Spacing, Typography } from '@/theme';

interface OnlineStatusBadgeProps {
  status: OnlineStatus;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const statusColors: Record<OnlineStatus, string> = {
  online: Colors.success,
  recent: Colors.warning,
  offline: Colors.border,
};

export function OnlineStatusBadge({ status, text, style }: OnlineStatusBadgeProps) {
  const pulse = useRef(new Animated.Value(1)).current;
  const dotColor = statusColors[status];

  useEffect(() => {
    if (status !== 'online') {
      pulse.setValue(1);
      return undefined;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.45,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
      pulse.setValue(1);
    };
  }, [pulse, status]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.dotWrap}>
        {status === 'online' ? <Animated.View style={[styles.pulse, { backgroundColor: dotColor, transform: [{ scale: pulse }] }]} /> : null}
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
      </View>
      <Text style={styles.text} numberOfLines={1}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  dotWrap: {
    width: Spacing.md,
    height: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  pulse: {
    position: 'absolute',
    width: Spacing.sm,
    height: Spacing.sm,
    borderRadius: Radius.pill,
    opacity: 0.22,
  },
  dot: {
    width: Spacing.sm,
    height: Spacing.sm,
    borderRadius: Radius.pill,
  },
  text: {
    ...Typography.caption,
    flexShrink: 1,
    color: Colors.subText,
  },
});
