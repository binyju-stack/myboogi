import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { AdminListLayout } from '@/components/AdminListLayout';
import { FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { adminPosts } from '@/data/adminData';

export default function AdminPostsScreen() {
  return (
    <AdminListLayout title="게시글 관리" description="커뮤니티 게시글과 신고 현황을 확인해요." count={adminPosts.length}>
      {adminPosts.map((item, index) => (
        <FadeInView key={item.id} delay={index * 45}>
          <View className="mb-3 rounded-[22px] bg-white p-4 shadow-sm">
            <View className="flex-row items-start"><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush"><Ionicons name="document-text-outline" size={19} color={colors.berry} /></View><View className="ml-3 flex-1"><Text className="text-[13px] font-bold leading-5 text-ink">{item.title}</Text><Text className="mt-1 text-[9px] text-muted">{item.category} · {item.author}</Text></View></View>
            <View className="mt-3 flex-row items-center rounded-[16px] bg-soft px-4 py-3"><Text className="text-[10px] font-bold text-muted">상태 <Text className="font-bold text-ink">{item.status}</Text></Text><Text className={`ml-auto text-[10px] font-bold ${item.reports ? 'text-[#E45B5B]' : 'text-muted'}`}>신고 {item.reports}</Text></View>
          </View>
        </FadeInView>
      ))}
    </AdminListLayout>
  );
}
