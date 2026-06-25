import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { formatLevel, getRemainingXp, getXpProgress } from '@/data/levelData';
import type { User } from '@/types';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function XpProgressBar({ xp, nextLevelXp }: { xp: number; nextLevelXp: number }) {
  const progress = getXpProgress(xp, nextLevelXp);
  return (
    <View className="h-3 overflow-hidden rounded-full bg-soft">
      <View style={{ width: `${progress}%` }} className="h-full rounded-full bg-berry" />
    </View>
  );
}

export function LevelPill({ label, icon = 'sparkles-outline' }: { label: string; icon?: IconName }) {
  return (
    <View className="flex-row items-center self-start rounded-full bg-blush px-3 py-2">
      <Ionicons name={icon} size={13} color={colors.berry} />
      <Text className="ml-1 text-[10px] font-bold text-berry">{label}</Text>
    </View>
  );
}

export function UserLevelCard({ user, compact = false }: { user: User; compact?: boolean }) {
  const remainingXp = getRemainingXp(user.xp, user.nextLevelXp);

  return (
    <View className={`${compact ? 'p-4' : 'p-5'} rounded-[24px] bg-white shadow-sm`}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[10px] font-bold text-berry">MY LEVEL</Text>
          <Text className={`${compact ? 'text-[18px]' : 'text-[24px]'} mt-1 font-bold text-ink`}>
            {formatLevel(user.level, user.levelName)}
          </Text>
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-[17px] bg-blush">
          <Ionicons name="ribbon-outline" size={22} color={colors.berry} />
        </View>
      </View>

      <View className="mt-5">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[10px] font-bold text-muted">{user.xp} / {user.nextLevelXp} XP</Text>
          <Text className="text-[10px] font-bold text-berry">{getXpProgress(user.xp, user.nextLevelXp)}%</Text>
        </View>
        <XpProgressBar xp={user.xp} nextLevelXp={user.nextLevelXp} />
      </View>

      <Text className="mt-3 text-[11px] leading-5 text-muted">다음 레벨까지 {remainingXp} XP 남았어요</Text>
    </View>
  );
}
