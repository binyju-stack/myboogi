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
  title: '마이부기',
  editProfile: '프로필 수정',
  normalMember: '일반 회원',
  breeder: '브리더',
  verifiedBreeder: '인증 브리더',
  businessVerified: '사업자 인증',
  statusActive: '활동중',
  commonlyUsed: '자주 사용',
  myActivity: '나의 활동',
  myTrade: '나의 거래',
  breederManage: '브리더 관리',
  settings: '설정',
  readySuffix: '기능은 준비중입니다.',
  turtleCount: '등록 거북이',
  postCount: '게시글',
  commentCount: '댓글',
};

const menuGroups: MenuGroup[] = [
  {
    title: copy.commonlyUsed,
    items: [
      { label: '내 거북이 관리', icon: PawPrint, href: '/my/turtles' },
      { label: '산란 관리', icon: Egg, href: '/my/turtles/breeding' },
    ],
  },
  {
    title: copy.myActivity,
    items: [
      { label: '찜한 분양', icon: Heart, href: '/mypage/favorites' },
      { label: '내가 쓴 글', icon: FileText, href: '/mypage/posts' },
      { label: '댓글 단 글', icon: MessageCircle, readyMessage: '댓글 단 글 기능은 준비중입니다.' },
      { label: '최근 본 분양', icon: Clock, readyMessage: '최근 본 분양 기능은 준비중입니다.' },
    ],
  },
  {
    title: copy.myTrade,
    items: [
      { label: '분양 문의', icon: Send, readyMessage: '분양 문의 기능은 준비중입니다.' },
      { label: '채팅', icon: MessageSquare, href: '/chat' },
      { label: '예약/구매 내역', icon: CalendarCheck, readyMessage: '예약/구매 내역 기능은 준비중입니다.' },
      { label: '안전결제 내역', icon: CreditCard, readyMessage: '안전결제 내역 기능은 준비중입니다.' },
    ],
  },
  {
    title: copy.breederManage,
    breederOnly: true,
    items: [
      { label: '분양글 관리', icon: Store, href: '/mypage/listings' },
      { label: '브리더 프로필 관리', icon: IdCard, href: '/breeder/edit' },
      { label: '후기 관리', icon: Star, href: '/mypage/reviews' },
      { label: '전광판 광고 관리', icon: Megaphone, href: '/billboard/create', badge: 'AD' },
    ],
  },
  {
    title: copy.settings,
    items: [
      { label: '알림 설정', icon: Bell, href: '/settings/notifications' },
      { label: '고객센터', icon: HelpCircle, href: '/settings/contact' },
      { label: '공지사항', icon: Megaphone, href: '/notices' },
      { label: '약관 및 정책', icon: ClipboardList, href: '/settings/terms' },
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

