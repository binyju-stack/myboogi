import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { notices } from '@/data/notificationData';

export default function NoticesScreen() {
  return (
    <Page>
      <TopBar title="공지사항" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">MYBOOGI NOTICE</Text>
        <Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">마이부기의 소식이에요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">서비스 이용에 필요한 중요 소식을 알려드려요.</Text>
      </View>

      <View className="px-5 pb-5 pt-6">
        {notices.map((notice, index) => (
          <FadeInView key={notice.id} delay={index * 50}>
            <AnimatedPressable onPress={() => router.push(`/notices/${notice.id}`)} className="mb-3 rounded-[24px] bg-white p-5 shadow-sm">
              <View className="flex-row items-center">
                {notice.important ? <Text className="rounded-full bg-blush px-2.5 py-1.5 text-[9px] font-black text-berry">중요 공지</Text> : <Text className="rounded-full bg-soft px-2.5 py-1.5 text-[9px] font-black text-muted">공지</Text>}
                <Text className="ml-auto text-[9px] text-subtle">{notice.date}</Text>
              </View>
              <Text className="mt-4 text-[14px] font-black leading-6 text-ink">{notice.title}</Text>
              <View className="mt-4 flex-row items-center">
                <Ionicons name="eye-outline" size={13} color={colors.muted} />
                <Text className="ml-1 text-[9px] text-muted">{notice.views.toLocaleString()}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.subtle} style={{ marginLeft: 'auto' }} />
              </View>
            </AnimatedPressable>
          </FadeInView>
        ))}
      </View>
    </Page>
  );
}
