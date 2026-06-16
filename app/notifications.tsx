import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { notifications, type NotificationFilter, type NotificationItem, type NotificationType } from '@/data/notificationData';

type IconName = ComponentProps<typeof Ionicons>['name'];

const filters: { key: NotificationFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'activity', label: '활동' },
  { key: 'trade', label: '거래' },
  { key: 'system', label: '시스템' },
];

const notificationStyles: Record<NotificationType, { icon: IconName; background: string; color: string }> = {
  comment: { icon: 'chatbubble-ellipses-outline', background: colors.blush, color: colors.berry },
  like: { icon: 'heart-outline', background: colors.blush, color: colors.berry },
  follow: { icon: 'people-outline', background: colors.mint, color: colors.moss },
  review: { icon: 'star-outline', background: colors.cream, color: '#F59E0B' },
  breederApproved: { icon: 'shield-checkmark-outline', background: colors.blue, color: '#4593D6' },
  notice: { icon: 'megaphone-outline', background: colors.blue, color: '#4593D6' },
  system: { icon: 'settings-outline', background: colors.soft, color: colors.muted },
};

function getNotificationPath(item: NotificationItem) {
  if (item.targetType === 'post') return `/community/${item.targetId}`;
  if (item.targetType === 'breeder') return `/breeder/${item.targetId}`;
  if (item.targetType === 'notice') return `/notices/${item.targetId}`;
  if (item.targetType === 'listing') return `/listing/${item.targetId}`;
  return '/notifications';
}

function EmptyState() {
  return (
    <View className="mt-10 items-center rounded-[28px] bg-white px-5 py-14 shadow-sm">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-blush">
        <Ionicons name="notifications-outline" size={28} color={colors.berry} />
      </View>
      <Text className="mt-5 text-[15px] font-black text-ink">아직 도착한 알림이 없습니다.</Text>
      <Text className="mt-2 text-center text-[11px] leading-5 text-muted">댓글, 좋아요, 거래 소식이 생기면 이곳에서 모아볼 수 있어요.</Text>
    </View>
  );
}

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [readIds, setReadIds] = useState(() => new Set(notifications.filter((item) => item.isRead).map((item) => item.id)));

  const unreadCount = notifications.filter((item) => !readIds.has(item.id)).length;
  const filteredNotifications = useMemo(
    () => notifications.filter((item) => activeFilter === 'all' || item.group === activeFilter),
    [activeFilter],
  );

  const markAllAsRead = () => setReadIds(new Set(notifications.map((item) => item.id)));

  const openNotification = (item: NotificationItem) => {
    setReadIds((prev) => new Set(prev).add(item.id));
    router.push(getNotificationPath(item) as never);
  };

  return (
    <Page>
      <TopBar title="알림" />

      <View className="bg-white px-5 pb-6 pt-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-[10px] font-black text-berry">NOTIFICATION CENTER</Text>
            <Text className="mt-1 text-[26px] font-black tracking-[-0.8px] text-ink">알림</Text>
            <Text className="mt-2 text-[11px] leading-5 text-muted">읽지 않은 알림 {unreadCount}개</Text>
          </View>
          <AnimatedPressable onPress={markAllAsRead} className="rounded-full bg-blush px-3.5 py-2.5">
            <Text className="text-[10px] font-black text-berry">전체 읽음</Text>
          </AnimatedPressable>
        </View>
      </View>

      <View className="px-5 pt-5">
        <View className="flex-row rounded-full bg-soft p-1">
          {filters.map((filter) => {
            const selected = activeFilter === filter.key;
            return (
              <AnimatedPressable
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                className={`flex-1 rounded-full py-2.5 ${selected ? 'bg-white shadow-sm' : ''}`}
              >
                <Text className={`text-center text-[11px] font-black ${selected ? 'text-berry' : 'text-muted'}`}>{filter.label}</Text>
              </AnimatedPressable>
            );
          })}
        </View>
      </View>

      <View className="px-5 pb-5 pt-5">
        {filteredNotifications.length ? (
          filteredNotifications.map((item, index) => {
            const style = notificationStyles[item.type];
            const unread = !readIds.has(item.id);
            return (
              <FadeInView key={item.id} delay={index * 45}>
                <AnimatedPressable
                  onPress={() => openNotification(item)}
                  className={`mb-3 flex-row rounded-[24px] border p-4 shadow-sm ${unread ? 'border-petal bg-blush' : 'border-transparent bg-white'}`}
                >
                  <View style={{ backgroundColor: style.background }} className="h-12 w-12 items-center justify-center rounded-[17px]">
                    <Ionicons name={style.icon} size={21} color={style.color} />
                  </View>
                  <View className="ml-3 flex-1">
                    <View className="flex-row items-center">
                      <Text className="flex-1 text-[13px] font-black text-ink">{item.title}</Text>
                      {unread ? <View className="ml-2 h-2.5 w-2.5 rounded-full bg-berry" /> : null}
                    </View>
                    <Text className="mt-2 text-[11px] leading-5 text-muted">{item.message}</Text>
                    <Text className="mt-2 text-[9px] font-bold text-subtle">{item.createdAt}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.subtle} style={{ alignSelf: 'center', marginLeft: 8 }} />
                </AnimatedPressable>
              </FadeInView>
            );
          })
        ) : (
          <EmptyState />
        )}
      </View>
    </Page>
  );
}
