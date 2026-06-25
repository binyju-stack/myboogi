import { useState } from 'react';
import { Switch, Text, View } from 'react-native';

import { FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { settings as mockSettings } from '@/data/mockData';
import type { AppSettings } from '@/types';

const notificationRows: { key: keyof AppSettings; label: string; description: string }[] = [
  { key: 'notificationEnabled', label: '전체 알림', description: '마이부기의 모든 알림을 받아요' },
  { key: 'commentNotification', label: '댓글 알림', description: '내 글에 댓글이 달리면 알려드려요' },
  { key: 'likeNotification', label: '좋아요 알림', description: '좋아요 반응을 받을 때 알려드려요' },
  { key: 'followNotification', label: '팔로우 알림', description: '새 팔로워가 생기면 알려드려요' },
  { key: 'listingNotification', label: '분양글 알림', description: '관심 분양글 상태 변경을 알려드려요' },
  { key: 'breederNotification', label: '브리더 새 글 알림', description: '팔로우한 브리더의 새 소식을 받아요' },
  { key: 'noticeNotification', label: '공지사항 알림', description: '중요 공지를 놓치지 않게 알려드려요' },
];

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>(mockSettings);

  const toggle = (key: keyof AppSettings) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <Page>
      <TopBar title="알림 설정" />

      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-bold text-berry">NOTIFICATIONS</Text>
        <Text className="mt-1 text-[24px] font-bold text-ink">필요한 알림만 받아요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">현재는 화면 안에서만 상태가 변경되는 Mock 설정입니다.</Text>
      </View>

      <View className="px-5 pt-5">
        <FadeInView>
          <View className="rounded-[26px] bg-white px-5 py-2 shadow-sm">
            {notificationRows.map((item, index) => (
              <View key={item.key} className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}>
                <View className="flex-1 pr-4">
                  <Text className="text-[13px] font-bold text-ink">{item.label}</Text>
                  <Text className="mt-1 text-[9px] leading-4 text-muted">{item.description}</Text>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={() => toggle(item.key)}
                  trackColor={{ false: colors.line, true: colors.petal }}
                  thumbColor={settings[item.key] ? colors.berry : colors.white}
                />
              </View>
            ))}
          </View>
        </FadeInView>
      </View>
    </Page>
  );
}
