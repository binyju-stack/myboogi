import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  BadgeCheck,
  Bell,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Clock,
  CreditCard,
  Edit3,
  Egg,
  FileText,
  Heart,
  HelpCircle,
  IdCard,
  Megaphone,
  MessageCircle,
  MessageSquare,
  PawPrint,
  Send,
  Star,
  Store,
  type LucideIcon,
} from 'lucide-react-native';

import { AppHeader } from '@/components/AppHeader';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { userProfile } from '@/data/mockData';
import { managedTurtles } from '@/mockData/turtles';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';
import type { UserProfile } from '@/types';

type MenuItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  readyMessage?: string;
  badge?: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
  breederOnly?: boolean;
};

const copy = {
  title: '\uB9C8\uC774\uBD80\uAE30',
  editProfile: '\uD504\uB85C\uD544 \uC218\uC815',
  normalMember: '\uC77C\uBC18 \uD68C\uC6D0',
  breeder: '\uBE0C\uB9AC\uB354',
  verifiedBreeder: '\uC778\uC99D \uBE0C\uB9AC\uB354',
  businessVerified: '\uC0AC\uC5C5\uC790 \uC778\uC99D',
  statusActive: '\uD65C\uB3D9\uC911',
  commonlyUsed: '\uC790\uC8FC \uC0AC\uC6A9',
  myActivity: '\uB098\uC758 \uD65C\uB3D9',
  myTrade: '\uB098\uC758 \uAC70\uB798',
  breederManage: '\uBE0C\uB9AC\uB354 \uAD00\uB9AC',
  settings: '\uC124\uC815',
  readySuffix: '\uAE30\uB2A5\uC740 \uC900\uBE44\uC911\uC785\uB2C8\uB2E4.',
  turtleCount: '\uB4F1\uB85D \uAC70\uBD81\uC774',
  postCount: '\uAC8C\uC2DC\uAE00',
  commentCount: '\uB313\uAE00',
};

const menuGroups: MenuGroup[] = [
  {
    title: copy.commonlyUsed,
    items: [
      { label: '\uB0B4 \uAC70\uBD81\uC774 \uAD00\uB9AC', icon: PawPrint, href: '/my/turtles' },
      { label: '\uC0B0\uB780 \uAD00\uB9AC', icon: Egg, href: '/my/turtles/breeding' },
    ],
  },
  {
    title: copy.myActivity,
    items: [
      { label: '\uCC1C\uD55C \uBD84\uC591', icon: Heart, href: '/mypage/favorites' },
      { label: '\uB0B4\uAC00 \uC4F4 \uAE00', icon: FileText, href: '/mypage/posts' },
      { label: '\uB313\uAE00 \uB2E8 \uAE00', icon: MessageCircle, readyMessage: '\uB313\uAE00 \uB2E8 \uAE00 \uAE30\uB2A5\uC740 \uC900\uBE44\uC911\uC785\uB2C8\uB2E4.' },
      { label: '\uCD5C\uADFC \uBCF8 \uBD84\uC591', icon: Clock, readyMessage: '\uCD5C\uADFC \uBCF8 \uBD84\uC591 \uAE30\uB2A5\uC740 \uC900\uBE44\uC911\uC785\uB2C8\uB2E4.' },
    ],
  },
  {
    title: copy.myTrade,
    items: [
      { label: '\uBD84\uC591 \uBB38\uC758', icon: Send, readyMessage: '\uBD84\uC591 \uBB38\uC758 \uAE30\uB2A5\uC740 \uC900\uBE44\uC911\uC785\uB2C8\uB2E4.' },
      { label: '\uCC44\uD305', icon: MessageSquare, href: '/chat' },
      { label: '\uC608\uC57D/\uAD6C\uB9E4 \uB0B4\uC5ED', icon: CalendarCheck, readyMessage: '\uC608\uC57D/\uAD6C\uB9E4 \uB0B4\uC5ED \uAE30\uB2A5\uC740 \uC900\uBE44\uC911\uC785\uB2C8\uB2E4.' },
      { label: '\uC548\uC804\uACB0\uC81C \uB0B4\uC5ED', icon: CreditCard, readyMessage: '\uC548\uC804\uACB0\uC81C \uB0B4\uC5ED \uAE30\uB2A5\uC740 \uC900\uBE44\uC911\uC785\uB2C8\uB2E4.' },
    ],
  },
  {
    title: copy.breederManage,
    breederOnly: true,
    items: [
      { label: '\uBD84\uC591\uAE00 \uAD00\uB9AC', icon: Store, href: '/mypage/listings' },
      { label: '\uBE0C\uB9AC\uB354 \uD504\uB85C\uD544 \uAD00\uB9AC', icon: IdCard, href: '/breeder/edit' },
      { label: '\uD6C4\uAE30 \uAD00\uB9AC', icon: Star, href: '/mypage/reviews' },
      { label: '\uC804\uAD11\uD310 \uAD11\uACE0 \uAD00\uB9AC', icon: Megaphone, href: '/billboard/create', badge: 'AD' },
    ],
  },
  {
    title: copy.settings,
    items: [
      { label: '\uC54C\uB9BC \uC124\uC815', icon: Bell, href: '/settings/notifications' },
      { label: '\uACE0\uAC1D\uC13C\uD130', icon: HelpCircle, href: '/settings/contact' },
      { label: '\uACF5\uC9C0\uC0AC\uD56D', icon: Megaphone, href: '/notices' },
      { label: '\uC57D\uAD00 \uBC0F \uC815\uCC45', icon: ClipboardList, href: '/settings/terms' },
    ],
  },
];

function getProfileBadge(profile: UserProfile) {
  if (profile.userType === 'business_breeder') {
    return profile.isVerified ? copy.businessVerified : copy.breeder;
  }
  if (profile.userType === 'personal_breeder') {
    return profile.isVerified ? copy.verifiedBreeder : copy.breeder;
  }
  return copy.normalMember;
}

function openItem(item: MenuItem, onReady: (message: string) => void) {
  if (item.href) {
    router.push(item.href as never);
    return;
  }
  onReady(item.readyMessage ?? item.label + ' ' + copy.readySuffix);
}

function ProfileCard({ profile }: { profile: UserProfile }) {
  const badge = getProfileBadge(profile);

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileTop}>
        <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.nickname} numberOfLines={1}>{profile.nickname}</Text>
            <View style={styles.verifiedPill}>
              <BadgeCheck size={13} strokeWidth={2} color={Colors.verified} />
              <Text style={styles.verifiedText} numberOfLines={1}>{badge}</Text>
            </View>
          </View>
          <Text style={styles.profileMeta} numberOfLines={1}>{copy.statusActive}</Text>
          <Text style={styles.profileBio} numberOfLines={2}>{profile.bio}</Text>
        </View>
      </View>

      <View style={styles.profileStats}>
        <View style={styles.profileStatItem}>
          <Text style={styles.profileStatValue}>{managedTurtles.length}</Text>
          <Text style={styles.profileStatLabel}>{copy.turtleCount}</Text>
        </View>
        <View style={styles.profileStatItem}>
          <Text style={styles.profileStatValue}>{profile.postCount}</Text>
          <Text style={styles.profileStatLabel}>{copy.postCount}</Text>
        </View>
        <View style={styles.profileStatItem}>
          <Text style={styles.profileStatValue}>{profile.commentCount}</Text>
          <Text style={styles.profileStatLabel}>{copy.commentCount}</Text>
        </View>
      </View>

      <Pressable onPress={() => router.push('/mypage/edit')} style={styles.editButton} accessibilityRole="button">
        <Edit3 size={16} strokeWidth={2} color={Colors.text} />
        <Text style={styles.editButtonText}>{copy.editProfile}</Text>
      </Pressable>
    </View>
  );
}

function MenuRow({ item, isLast, onReady }: { item: MenuItem; isLast: boolean; onReady: (message: string) => void }) {
  const Icon = item.icon;

  return (
    <Pressable onPress={() => openItem(item, onReady)} style={[styles.menuRow, isLast ? null : styles.menuDivider]} accessibilityRole="button">
      <View style={styles.menuIconBox}>
        <Icon size={20} strokeWidth={1.9} color={Colors.primary} />
      </View>
      <Text style={styles.menuLabel} numberOfLines={1}>{item.label}</Text>
      {item.badge ? (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>{item.badge}</Text>
        </View>
      ) : null}
      <ChevronRight size={18} strokeWidth={1.9} color={Colors.subText} />
    </Pressable>
  );
}

function MenuGroupCard({ group, onReady }: { group: MenuGroup; onReady: (message: string) => void }) {
  return (
    <View style={styles.groupCard}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      <View style={styles.groupRows}>
        {group.items.map((item, index) => (
          <MenuRow key={item.label} item={item} isLast={index === group.items.length - 1} onReady={onReady} />
        ))}
      </View>
    </View>
  );
}

export default function MyPageScreen() {
  const [readyTitle, setReadyTitle] = useState('');
  const profile = userProfile;
  const isBreeder = profile.userType !== 'normal';
  const visibleGroups = menuGroups.filter((group) => !group.breederOnly || isBreeder);

  return (
    <Page backgroundColor={Colors.surface}>
      <AppHeader title={copy.title} showSettings />
      <View style={styles.content}>
        <ProfileCard profile={profile} />
        {visibleGroups.map((group) => (
          <MenuGroupCard key={group.title} group={group} onReady={setReadyTitle} />
        ))}
      </View>

      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  profileCard: {
    borderRadius: Radius.xl,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: Spacing.xxl + Spacing.xxl,
    height: Spacing.xxl + Spacing.xxl,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
  },
  profileInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    flexShrink: 1,
    color: Colors.text,
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: Typography.subtitle.fontWeight,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  verifiedText: {
    marginLeft: Spacing.xxs,
    color: Colors.verified,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  profileMeta: {
    marginTop: Spacing.xs,
    color: Colors.primary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  profileBio: {
    marginTop: Spacing.xxs,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  profileStatItem: {
    flex: 1,
  },
  profileStatValue: {
    color: Colors.text,
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: Typography.subtitle.fontWeight,
  },
  profileStatLabel: {
    marginTop: Spacing.xxs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  editButton: {
    height: Spacing.xxl + Spacing.md,
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  editButtonText: {
    marginLeft: Spacing.xs,
    color: Colors.text,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
  groupCard: {
    marginTop: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    ...Shadows.card,
  },
  groupTitle: {
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  groupRows: {
    marginTop: Spacing.sm,
  },
  menuRow: {
    minHeight: Spacing.xxl + Spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIconBox: {
    width: Spacing.xxl,
    height: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.text,
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.body.lineHeight,
    fontWeight: Typography.body.fontWeight,
  },
  menuBadge: {
    marginRight: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  menuBadgeText: {
    color: Colors.primary,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
});

