import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { AdminListLayout } from '@/components/AdminListLayout';
import { FadeInView } from '@/components/AnimatedPressable';
import { colors } from '@/constants/theme';
import { adminListings } from '@/data/adminData';

export default function AdminListingsScreen() {
  return (
    <AdminListLayout title="분양글 관리" description="등록된 분양글의 상태와 신고 현황을 확인해요." count={adminListings.length}>
      {adminListings.map((item, index) => (
        <FadeInView key={item.id} delay={index * 45}>
          <View className="mb-3 rounded-[22px] bg-white p-4 shadow-sm">
            <View className="flex-row items-center"><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush"><Ionicons name="storefront-outline" size={19} color={colors.berry} /></View><View className="ml-3 flex-1"><Text className="text-[13px] font-black text-ink">{item.species}</Text><Text className="mt-1 text-[9px] text-muted">{item.breeder} · {item.price.toLocaleString()}원</Text></View><Text className="rounded-full bg-soft px-2.5 py-1.5 text-[9px] font-black text-muted">{item.status}</Text></View>
            <View className="mt-3 flex-row items-center rounded-[16px] bg-soft px-4 py-3"><Text className="text-[10px] font-bold text-muted">신고 수</Text><Text className={`ml-auto text-[11px] font-black ${item.reports ? 'text-[#E45B5B]' : 'text-ink'}`}>{item.reports}</Text></View>
          </View>
        </FadeInView>
      ))}
    </AdminListLayout>
  );
}
