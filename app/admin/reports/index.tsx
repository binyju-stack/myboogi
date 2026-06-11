import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { reports, type ReportStatus } from '@/data/reportData';

const statusStyle: Record<ReportStatus, string> = { 대기: 'bg-cream text-[#B6751A]', 처리완료: 'bg-mint text-moss', 반려: 'bg-[#FFF1F1] text-[#E45B5B]' };

export default function ReportAdminScreen() {
  const waiting = reports.filter((item) => item.status === '대기').length;
  return (
    <Page>
      <TopBar title="신고 관리" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">REPORT ADMIN</Text><Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">접수된 신고를 확인해요</Text><Text className="mt-2 text-[11px] text-muted">처리가 필요한 신고가 {waiting}건 있어요.</Text>
      </View>
      <View className="px-5 pb-5 pt-6">
        {reports.map((item, index) => (
          <FadeInView key={item.id} delay={index * 50}>
            <View className="mb-3 rounded-[24px] bg-white p-5 shadow-sm">
              <View className="flex-row items-center"><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-[#FFF1F1]"><Ionicons name="flag-outline" size={19} color="#E45B5B" /></View><View className="ml-3 flex-1"><Text className="text-[10px] font-black text-berry">{item.targetType}</Text><Text className="mt-1 text-[13px] font-black text-ink" numberOfLines={1}>{item.targetName}</Text></View><Text className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusStyle[item.status]}`}>{item.status}</Text></View>
              <View className="mt-4 rounded-[18px] bg-soft px-4 py-3"><Text className="text-[10px] text-muted">신고 사유  <Text className="font-black text-ink">{item.reason}</Text></Text><Text className="mt-2 text-[10px] text-muted">신고자  <Text className="font-black text-ink">{item.reporter}</Text> · {item.reportedAt}</Text></View>
              <View className="mt-4"><AnimatedPressable onPress={() => router.push(`/admin/reports/${item.id}`)} className="items-center rounded-[16px] bg-ink py-3.5"><Text className="text-[11px] font-black text-white">상세보기</Text></AnimatedPressable></View>
            </View>
          </FadeInView>
        ))}
      </View>
    </Page>
  );
}
