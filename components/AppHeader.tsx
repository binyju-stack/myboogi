import { router } from 'expo-router';
import { Bell, Heart, Search, type LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/theme';
import { unreadNotificationCount } from '@/data/notificationData';

type HeaderIconName = 'search' | 'heart' | 'bell';

type AppHeaderProps = {
  title: string;
  showSearch?: boolean;
  showHeart?: boolean;
  showBell?: boolean;
  notificationCount?: number;
  onSearchPress?: () => void;
  onHeartPress?: () => void;
  onBellPress?: () => void;
};

const headerIcons: Record<HeaderIconName, LucideIcon> = {
  search: Search,
  heart: Heart,
  bell: Bell,
};

function HeaderIconButton({ icon, label, onPress, badgeCount }: { icon: HeaderIconName; label: string; onPress: () => void; badgeCount?: number }) {
  const Icon = headerIcons[icon];

  return (
    <Pressable onPress={onPress} style={styles.iconButton} accessibilityLabel={label}>
      <Icon size={21} strokeWidth={1.9} color={Colors.text} />
      {badgeCount ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function AppHeader({
  title,
  showSearch = false,
  showHeart = false,
  showBell = false,
  notificationCount,
  onSearchPress,
  onHeartPress,
  onBellPress,
}: AppHeaderProps) {
  const count = notificationCount ?? unreadNotificationCount;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          {showSearch ? <HeaderIconButton icon="search" label="검색" onPress={onSearchPress ?? (() => router.push('/search'))} /> : null}
          {showHeart ? <HeaderIconButton icon="heart" label="찜 목록" onPress={onHeartPress ?? (() => router.push('/mypage/favorites' as never))} /> : null}
          {showBell ? <HeaderIconButton icon="bell" label="알림" onPress={onBellPress ?? (() => router.push('/notifications'))} badgeCount={count} /> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl - Spacing.xs,
    paddingTop: Spacing.xl - Spacing.xs,
    paddingBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: Typography.title.fontWeight,
    lineHeight: 32,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.background,
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.notification,
    paddingHorizontal: Spacing.xs + 1,
  },
  badgeText: {
    color: Colors.card,
    fontSize: 9,
    fontWeight: Typography.captionBold.fontWeight,
    lineHeight: 12,
  },
});
