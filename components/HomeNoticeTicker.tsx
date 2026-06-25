import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/theme';

const tickerItems = [
  '마이부기 공지 꼭 확인해주세요',
  '#오늘핫한부기',
  '#신규분양',
  '#인증브리더',
  '#산란관리팁',
];

export function HomeNoticeTicker() {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateX.setValue(0);
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();
    return () => animation.stop();
  }, [translateX]);

  const animatedStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -260],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.track, animatedStyle]}>
        {[...tickerItems, ...tickerItems].map((item, index) => {
          const isTag = item.startsWith('#');
          return (
            <Text key={`${item}-${index}`} style={[styles.text, isTag ? styles.pointText : null]} numberOfLines={1}>
              {item}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: Colors.text,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 760,
  },
  text: {
    marginRight: Spacing.xl + Spacing.xs,
    color: Colors.card,
    fontSize: 13,
    fontWeight: Typography.subtitle.fontWeight,
    lineHeight: 18,
  },
  pointText: {
    color: Colors.primary,
    fontWeight: Typography.captionBold.fontWeight,
  },
});
