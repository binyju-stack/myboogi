import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { notifications, type NotificationType } from '@/data/notificationData';

type IconName = ComponentProps<typeof Ionicons>['name'];

const notificationStyles: Record<NotificationType, { icon: IconName; background: string; color: string }> = {
  comment: { icon: 'chatbubble-ellipses-outline', background: colors.blush, color: colors.berry },
  listing: { icon: 'storefront-outline', background: colors.mint, color: colors.moss },
  favorite: { icon: 'heart-outline', background: colors.blush, color: colors.berry },
  popular: { icon: 'flame-outline', background: colors.cream, color: '#F59B32' },
  notice: { icon: 'megaphone-outline', background: colors.blue, color: '#4593D6' },
  growth: { icon: 'analytics-outline', background: colors.mint, color: colors.moss },
};

export default function NotificationsScreen() {
  const [readyVisible, setReadyVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <Page>
      <TopBar title="알림" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">MYBOOGI NEWS</Text>
        <Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">새로운 소식을 확인해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">읽지 않은 알림이 {unreadCount}개 있어요.</Text>
      </View>

      <View className="px-5 pb-5 pt-6">
        {notifications.map((item, index) => {
          const style = notificationStyles[item.type];
          return (
            <FadeInView key={item.id} delay={index * 45}>
              <AnimatedPressable
                onPress={() => {
                  setSelectedTitle(item.title);
                  setReadyVisible(true);
                }}
                className={`mb-3 flex-row rounded-[24px] bg-white p-4 shadow-sm ${item.unread ? 'bg-blush' : ''}`}
              >
                <View style={{ backgroundColor: style.background }} className="h-12 w-12 items-center justify-center rounded-[17px]">
                  <Ionicons name={style.icon} size={21} color={style.color} />
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center">
                    <Text className="flex-1 text-[13px] font-black text-ink">{item.title}</Text>
                    {item.unread ? <View className="ml-2 h-2 w-2 rounded-full bg-berry" /> : null}
                  </View>
                  <Text className="mt-2 text-[11px] leading-5 text-muted">{item.content}</Text>
                  <Text className="mt-2 text-[9px] font-bold text-subtle">{item.time}</Text>
                </View>
              </AnimatedPressable>
            </FadeInView>
          );
        })}
      </View>

      <ReadyModal
        visible={readyVisible}
        title="해당 알림 상세 기능은 준비중입니다."
        description={selectedTitle}
        onClose={() => setReadyVisible(false)}
      />
    </Page>
  );
}
