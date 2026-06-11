import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { colors } from '@/constants/theme';
import { notices } from '@/data/notificationData';

export default function NoticeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notice = notices.find((item) => item.id === id) ?? notices[0];

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="공지사항" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-16">
        <FadeInView>
          <View className="bg-white px-5 pb-7 pt-5">
            {notice.important ? <Text className="self-start rounded-full bg-blush px-3 py-2 text-[10px] font-black text-berry">중요 공지</Text> : null}
            <Text className="mt-4 text-[24px] font-black leading-9 tracking-[-0.8px] text-ink">{notice.title}</Text>
            <View className="mt-5 flex-row items-center">
              <Text className="text-[10px] font-bold text-muted">{notice.date}</Text>
              <View className="mx-2 h-1 w-1 rounded-full bg-subtle" />
              <Ionicons name="eye-outline" size={13} color={colors.muted} />
              <Text className="ml-1 text-[10px] text-muted">{notice.views.toLocaleString()}</Text>
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={70}>
          <View className="mx-5 mt-5 rounded-[26px] bg-white px-5 py-7 shadow-sm">
            {notice.content.map((paragraph, index) => <Text key={paragraph} className={`${index ? 'mt-5' : ''} text-[13px] leading-7 text-ink`}>{paragraph}</Text>)}
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}
