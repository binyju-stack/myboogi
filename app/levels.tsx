import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { LevelPill, UserLevelCard } from '@/components/LevelProgress';
import { colors } from '@/constants/theme';
import { levelSteps, xpActivities } from '@/data/levelData';
import { users } from '@/data/mockData';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function LevelsScreen() {
  const user = users[0];

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="레벨과 경험치" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-28 pt-5">
        <FadeInView>
          <UserLevelCard user={user} />
        </FadeInView>

        <FadeInView delay={60}>
          <View className="mt-4 rounded-[26px] bg-ink p-5 shadow-sm">
            <Text className="text-[10px] font-black text-petal">LEVEL SYSTEM</Text>
            <Text className="mt-1 text-[20px] font-black text-white">마이부기 성장 단계</Text>
            <Text className="mt-2 text-[11px] leading-5 text-white/55">활동을 쌓으면 레벨이 올라가고, 브리더 활동과 거래 신뢰도는 별도로 표시돼요.</Text>
            <View className="mt-5">
              {levelSteps.map((step, index) => (
                <View key={step.level} className={`flex-row items-center py-3 ${index ? 'border-t border-white/10' : ''}`}>
                  <View className={`h-9 w-9 items-center justify-center rounded-full ${user.level >= step.level ? 'bg-berry' : 'bg-white/10'}`}>
                    <Text className="text-[11px] font-black text-white">{step.level}</Text>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-[13px] font-black text-white">Lv.{step.level} {step.name}</Text>
                    <Text className="mt-1 text-[9px] text-white/45">{step.minXp} XP부터</Text>
                  </View>
                  {user.level === step.level ? <LevelPill label="현재" icon="checkmark-circle-outline" /> : null}
                </View>
              ))}
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={120}>
          <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
            <Text className="text-[10px] font-black text-berry">XP GUIDE</Text>
            <Text className="mt-1 text-[20px] font-black text-ink">활동별 경험치</Text>
            <View className="mt-4">
              {xpActivities.map((activity, index) => (
                <View key={activity.id} className={`flex-row items-center py-3.5 ${index ? 'border-t border-line' : ''}`}>
                  <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-blush">
                    <Ionicons name={activity.icon as IconName} size={18} color={colors.berry} />
                  </View>
                  <Text className="ml-3 flex-1 text-[13px] font-black text-ink">{activity.label}</Text>
                  <Text className="rounded-full bg-soft px-3 py-2 text-[11px] font-black text-berry">+{activity.xp} XP</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}
