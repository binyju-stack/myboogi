import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breedingClutches, breedingStatusLabels, breedingTargetSexLabels } from '@/mockData/breeding';
import type { BreedingClutch } from '@/types/breeding';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mx-5 mt-5 rounded-[22px] border border-[#ECECEC] bg-white p-5">
      <Text className="text-[22px] font-bold leading-7 text-[#111827]">{title}</Text>
      <View className="mt-4">{children}</View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-line py-3">
      <Text className="text-[13px] font-medium text-[#8A8F98]">{label}</Text>
      <Text className="ml-3 flex-1 text-right text-[14px] font-semibold text-[#111827]" numberOfLines={1}>{value}</Text>
    </View>
  );
}

function StatusBadge({ clutch }: { clutch: BreedingClutch }) {
  const styleMap = {
    incubating: { bg: '#FFF1E6', text: '#FF9B4A' },
    hatched: { bg: '#EAF8EE', text: '#22A06B' },
    failed: { bg: '#F5F6F8', text: '#8A8F98' },
  }[clutch.status];

  return (
    <View className="self-start rounded-full px-3 py-1.5" style={{ backgroundColor: styleMap.bg }}>
      <Text className="text-[12px] font-semibold" style={{ color: styleMap.text }}>{breedingStatusLabels[clutch.status]}</Text>
    </View>
  );
}

export default function BreedingClutchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const clutch = breedingClutches.find((item) => item.id === id) ?? breedingClutches[0];

  return (
    <Page>
      <TopBar title={`클러치 #${clutch.clutchNumber}`} />

      <View className="mx-5 mt-5 rounded-[22px] bg-[#FFF8FB] p-5">
        <Text className="text-[11px] font-semibold leading-4 text-[#FF4F8B]">BREEDING CLUTCH</Text>
        <Text className="mt-1 text-[22px] font-bold leading-7 text-[#111827]">{clutch.turtleName}</Text>
        <Text className="mt-1 text-[13px] font-semibold leading-5 text-[#8A8F98]">{clutch.species} · {clutch.layDate} 산란</Text>
        <View className="mt-4">
          <StatusBadge clutch={clutch} />
        </View>
      </View>

      <Section title="산란 정보">
        <DetailRow label="산란일" value={clutch.layDate} />
        <DetailRow label="알 개수" value={`${clutch.eggCount}개`} />
        <DetailRow label="예상 부화일" value={clutch.expectedHatchDate} />
      </Section>

      <Section title="알 정보">
        <DetailRow label="목표 성별" value={breedingTargetSexLabels[clutch.targetSex]} />
        <DetailRow label="상태" value={breedingStatusLabels[clutch.status]} />
      </Section>

      <Section title="인큐베이터 정보">
        <DetailRow label="인큐베이터" value={clutch.incubatorName} />
        <DetailRow label="세팅온도" value={`${clutch.targetTemperature.toFixed(1)}℃`} />
        <DetailRow label="현재온도" value={`${clutch.currentTemperature.toFixed(1)}℃`} />
        <DetailRow label="습도" value={`${clutch.humidity}%`} />
      </Section>

      <Section title="온도/습도 기록">
        {clutch.temperatureLogs.map((log) => (
          <View key={log.id} className="flex-row items-center border-b border-line py-3">
            <View className="h-9 w-9 items-center justify-center rounded-[13px] bg-blush">
              <Ionicons name="thermometer-outline" size={18} color={colors.berry} />
            </View>
            <Text className="ml-3 flex-1 text-[14px] font-semibold text-[#111827]">{log.date}</Text>
            <Text className="text-[13px] font-medium text-[#8A8F98]">{log.temperature.toFixed(1)}℃ / 습도 {log.humidity}%</Text>
          </View>
        ))}
      </Section>

      <Section title="타임라인">
        {clutch.events.map((event, index) => (
          <View key={event.id} className="flex-row">
            <View className="items-center">
              <View className="h-3 w-3 rounded-full bg-[#FF4F8B]" />
              {index < clutch.events.length - 1 ? <View className="h-12 w-px bg-[#FFD6E4]" /> : null}
            </View>
            <View className="ml-3 flex-1 pb-4">
              <Text className="text-[14px] font-semibold leading-5 text-[#111827]">{event.date} {event.title}</Text>
              <Text className="mt-1 text-[12px] font-medium leading-4 text-[#8A8F98]">{event.description}</Text>
            </View>
          </View>
        ))}
      </Section>
    </Page>
  );
}
