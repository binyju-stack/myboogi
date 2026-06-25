import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AdminListLayout } from '@/components/AdminListLayout';
import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { ReadyModal } from '@/components/ReadyModal';
import { colors } from '@/constants/theme';
import { adminNotices } from '@/data/adminData';

export default function AdminNoticesScreen() {
  const [readyVisible, setReadyVisible] = useState(false);
  const action = <AnimatedPressable onPress={() => setReadyVisible(true)} className="flex-row items-center rounded-full bg-berry px-3.5 py-2.5"><Ionicons name="add" size={14} color="white" /><Text className="ml-1 text-[10px] font-bold text-white">글쓰기</Text></AnimatedPressable>;

  return (
    <>
      <AdminListLayout title="공지사항 관리" description="서비스 공지사항을 작성하고 노출 상태를 관리해요." count={adminNotices.length} action={action}>
        {adminNotices.map((item, index) => (
          <FadeInView key={item.id} delay={index * 45}>
            <View className="mb-3 flex-row items-center rounded-[22px] bg-white p-4 shadow-sm">
              <View className="h-11 w-11 items-center justify-center rounded-[15px] bg-blush"><Ionicons name="megaphone-outline" size={19} color={colors.berry} /></View>
              <View className="ml-3 flex-1"><View className="flex-row items-center">{item.important ? <Text className="mr-2 rounded-full bg-blush px-2 py-1 text-[8px] font-bold text-berry">중요</Text> : null}<Text className="flex-1 text-[12px] font-bold text-ink" numberOfLines={1}>{item.title}</Text></View><Text className="mt-2 text-[9px] text-muted">{item.date}</Text></View>
            </View>
          </FadeInView>
        ))}
      </AdminListLayout>
      <ReadyModal visible={readyVisible} title="공지사항 작성 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </>
  );
}
