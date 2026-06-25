import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { reports } from '@/data/reportData';

function InfoRow({ label, value }: { label: string; value: string }) {
  return <View className="flex-row border-b border-line py-3"><Text className="w-24 text-[10px] font-bold text-muted">{label}</Text><Text className="flex-1 text-[11px] font-bold leading-5 text-ink">{value}</Text></View>;
}

export default function ReportDetailAdminScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [readyVisible, setReadyVisible] = useState(false);
  const report = reports.find((item) => item.id === id) ?? reports[0];
  return (
    <Page>
      <TopBar title="신고 상세" />
      <FadeInView><View className="mx-5 mt-5 rounded-[26px] bg-ink p-5 shadow-sm"><View className="h-11 w-11 items-center justify-center rounded-[15px] bg-[#E45B5B]"><Ionicons name="flag" size={20} color="white" /></View><Text className="mt-4 text-[10px] font-bold text-petal">{report.targetType}</Text><Text className="mt-2 text-[20px] font-bold leading-7 text-white">{report.targetName}</Text><Text className="mt-2 text-[10px] text-white/50">접수일 {report.reportedAt} · 상태 {report.status}</Text></View></FadeInView>
      <View className="px-5">
        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[10px] font-bold text-berry">REPORT INFO</Text><Text className="mt-1 text-[18px] font-bold text-ink">신고 정보</Text><View className="mt-3"><InfoRow label="신고 대상" value={report.targetName} /><InfoRow label="신고 사유" value={report.reason} /><InfoRow label="신고자" value={report.reporter} /></View></View>
        <View className="mt-4 rounded-[26px] bg-white p-5 shadow-sm"><Text className="text-[10px] font-bold text-berry">REPORT DETAIL</Text><Text className="mt-1 text-[18px] font-bold text-ink">신고 내용</Text><Text className="mt-4 text-[12px] leading-7 text-ink">{report.detail}</Text></View>
        <View className="mt-4 flex-row gap-3"><View className="flex-1"><AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-soft py-4"><Text className="text-[13px] font-bold text-[#E45B5B]">반려</Text></AnimatedPressable></View><View className="flex-1"><AnimatedPressable onPress={() => setReadyVisible(true)} className="items-center rounded-[18px] bg-berry py-4"><Text className="text-[13px] font-bold text-white">처리 완료</Text></AnimatedPressable></View></View>
      </View>
      <ReadyModal visible={readyVisible} title="신고 처리 기능은 준비중입니다." onClose={() => setReadyVisible(false)} />
    </Page>
  );
}
