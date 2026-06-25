import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { AdminListLayout } from '@/components/AdminListLayout';
import { FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { adminUsers, type AdminStatus } from '@/data/adminData';

const statusStyle: Record<AdminStatus, string> = { 정상: 'bg-mint text-moss', 주의: 'bg-cream text-[#B6751A]', 정지: 'bg-[#FFF1F1] text-[#E45B5B]' };

export default function AdminUsersScreen() {
  return (
    <AdminListLayout title="회원 관리" description="회원 유형과 가입일, 현재 이용 상태를 확인해요." count={adminUsers.length}>
      {adminUsers.map((user, index) => (
        <FadeInView key={user.id} delay={index * 45}>
          <View className="mb-3 flex-row items-center rounded-[22px] bg-white p-4 shadow-sm">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-blush"><Ionicons name="person-outline" size={20} color={colors.berry} /></View>
            <View className="ml-3 flex-1"><Text className="text-[13px] font-bold text-ink">{user.nickname}</Text><Text className="mt-1 text-[9px] text-muted">{user.memberType} · 가입 {user.joinedAt}</Text></View>
            <Text className={`rounded-full px-2.5 py-1.5 text-[9px] font-bold ${statusStyle[user.status]}`}>{user.status}</Text>
          </View>
        </FadeInView>
      ))}
    </AdminListLayout>
  );
}
