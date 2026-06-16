import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const slides: {
  title: string;
  description: string;
  icon: IconName;
  tint: string;
  chips: string[];
}[] = [
  {
    title: '거북이를 키우는 모든 사람을 위한 앱',
    description: '분양, 브리더, 커뮤니티, 성장기록을 한곳에서 확인하세요.',
    icon: 'home-outline',
    tint: colors.blush,
    chips: ['분양', '브리더', '성장기록'],
  },
  {
    title: '믿을 수 있는 브리더 미니샵',
    description: '인증 브리더, 후기, 분양중 개체를 한눈에 볼 수 있어요.',
    icon: 'shield-checkmark-outline',
    tint: colors.blue,
    chips: ['인증 브리더', '후기', '미니샵'],
  },
  {
    title: '내 거북이 성장기록',
    description: '몸무게, 등갑 길이, 사진을 기록하며 성장 과정을 관리하세요.',
    icon: 'analytics-outline',
    tint: colors.mint,
    chips: ['몸무게', '등갑 길이', '사진'],
  },
  {
    title: '거북이 커뮤니티',
    description: '사육정보, 질병상담, 합사정보를 함께 나눠보세요.',
    icon: 'chatbubbles-outline',
    tint: colors.cream,
    chips: ['사육정보', '질병상담', '합사정보'],
  },
];

function Illustration({ slide, index }: { slide: (typeof slides)[number]; index: number }) {
  return (
    <View className="mx-5 mt-10 h-[310px] items-center justify-center overflow-hidden rounded-[32px] bg-white shadow-sm">
      <View style={{ backgroundColor: slide.tint }} className="absolute h-56 w-56 rounded-full" />
      <View className="absolute left-8 top-10 h-16 w-16 rounded-[22px] bg-soft" />
      <View className="absolute bottom-12 right-8 h-20 w-20 rounded-[28px] bg-blush" />
      <View className="h-32 w-32 items-center justify-center rounded-[42px] bg-ink shadow-sm">
        <Ionicons name={slide.icon} size={52} color={colors.petal} />
      </View>
      <View className="mt-7 flex-row">
        {slide.chips.map((chip) => (
          <View key={chip} className="mx-1 rounded-full bg-white px-3 py-2 shadow-sm">
            <Text className="text-[10px] font-black text-berry">{chip}</Text>
          </View>
        ))}
      </View>
      <Text className="absolute left-6 top-6 text-[11px] font-black text-berry">0{index + 1}</Text>
    </View>
  );
}

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const isLast = index === slides.length - 1;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: index,
      useNativeDriver: true,
      speed: 28,
      bounciness: 4,
    }).start();
  }, [index, progress]);

  const goHome = () => router.replace('/' as never);
  const goNext = () => {
    if (isLast) {
      goHome();
      return;
    }
    setIndex((current) => Math.min(current + 1, slides.length - 1));
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top', 'bottom']}>
      <View className="flex-1">
        <View className="flex-row items-center justify-between px-5 pt-3">
          <Text className="text-[22px] font-black tracking-[-0.8px] text-ink">마이부기</Text>
          <AnimatedPressable onPress={goHome} className="rounded-full bg-white px-4 py-2.5 shadow-sm">
            <Text className="text-[11px] font-black text-muted">건너뛰기</Text>
          </AnimatedPressable>
        </View>

        <View className="flex-1 overflow-hidden">
          <Animated.View
            className="flex-1 flex-row"
            style={{ width: width * slides.length, transform: [{ translateX: progress.interpolate({ inputRange: [0, slides.length - 1], outputRange: [0, -width * (slides.length - 1)] }) }] }}
          >
            {slides.map((slide, slideIndex) => (
              <View key={slide.title} style={{ width }} className="flex-1">
                <Illustration slide={slide} index={slideIndex} />
                <View className="px-7 pt-10">
                  <Text className="text-[28px] font-black leading-9 tracking-[-0.8px] text-ink">{slide.title}</Text>
                  <Text className="mt-4 text-[14px] leading-7 text-muted">{slide.description}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        </View>

        <View className="px-5 pb-5">
          <View className="mb-6 flex-row justify-center">
            {slides.map((slide, dotIndex) => (
              <View
                key={slide.title}
                className={`mx-1 h-2 rounded-full ${dotIndex === index ? 'w-7 bg-berry' : 'w-2 bg-line'}`}
              />
            ))}
          </View>
          <AnimatedPressable onPress={goNext} className="h-[60px] items-center justify-center rounded-[22px] bg-berry py-4 shadow-sm">
            <Text className="text-[14px] font-black text-white">{isLast ? '마이부기 시작하기' : '다음'}</Text>
          </AnimatedPressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
