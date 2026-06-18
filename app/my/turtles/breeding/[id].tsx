import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breedingClutches, breedingStatusLabels, breedingTargetSexLabels } from '@/mockData/breeding';
import type { BreedingClutch, BreedingEgg, CandlingRecord, EggStatus } from '@/types/breeding';
import { getEggStatusSummary } from '@/utils/breedingStats';

const eggStatusLabels: Record<EggStatus, string> = {
  unknown: '미확인',
  developing: '발달중',
  infertile: '무정란',
  stopped: '중지란',
  hatched: '부화',
  discarded: '폐기',
};

const eggStatusStyles: Record<EggStatus, { bg: string; text: string }> = {
  unknown: { bg: '#F5F6F8', text: '#8A8F98' },
  developing: { bg: '#EAF8EE', text: '#22A06B' },
  infertile: { bg: '#FFF1E6', text: '#FF9B4A' },
  stopped: { bg: '#FFF0F0', text: '#F04438' },
  hatched: { bg: '#EAF2FF', text: '#4A8DFF' },
  discarded: { bg: '#F1F3F5', text: '#6B7280' },
};

const eggStatusOptions: EggStatus[] = ['unknown', 'developing', 'infertile', 'stopped', 'hatched', 'discarded'];

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

function EggStatusBadge({ status }: { status: EggStatus }) {
  const style = eggStatusStyles[status];
  return (
    <View className="rounded-full px-3 py-1" style={{ backgroundColor: style.bg }}>
      <Text className="text-[12px] font-semibold" style={{ color: style.text }}>{eggStatusLabels[status]}</Text>
    </View>
  );
}

function EggStatusSection({
  eggs,
  onSelect,
}: {
  eggs: BreedingEgg[];
  onSelect: (egg: BreedingEgg) => void;
}) {
  const summary = getEggStatusSummary(eggs);
  const summaryItems = [
    { label: '총 알 개수', value: `${summary.total}개` },
    { label: '발달중', value: `${summary.developing}` },
    { label: '무정란', value: `${summary.infertile}` },
    { label: '중지란', value: `${summary.stopped}` },
    { label: '부화', value: `${summary.hatched}` },
    { label: '폐기', value: `${summary.discarded}` },
  ];

  return (
    <Section title="알 상태">
      <View className="flex-row flex-wrap">
        {summaryItems.map((item) => (
          <View key={item.label} className="mb-2 mr-2 rounded-[14px] bg-[#F8F9FA] px-3 py-2">
            <Text className="text-[12px] font-medium text-[#8A8F98]">{item.label}</Text>
            <Text className="mt-0.5 text-[15px] font-semibold text-[#111827]">{item.value}</Text>
          </View>
        ))}
      </View>
      <View className="mt-3">
        {eggs.map((egg) => (
          <Pressable key={egg.id} onPress={() => onSelect(egg)} className="mb-2 flex-row items-center rounded-[16px] border border-[#ECECEC] px-4 py-3">
            <Text className="flex-1 text-[15px] font-semibold text-[#111827]">Egg {egg.eggNumber}</Text>
            <EggStatusBadge status={egg.status} />
          </Pressable>
        ))}
      </View>
    </Section>
  );
}

function EggStatusModal({
  egg,
  onClose,
  onSave,
}: {
  egg?: BreedingEgg;
  onClose: () => void;
  onSave: (eggNumber: number, status: EggStatus, memo: string) => void;
}) {
  const [status, setStatus] = useState<EggStatus>('unknown');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    if (egg) {
      setStatus(egg.status);
      setMemo(egg.memo ?? '');
    }
  }, [egg]);

  if (!egg) {
    return null;
  }

  return (
    <Modal visible={Boolean(egg)} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/35" onPress={onClose}>
        <Pressable
          className="rounded-t-[28px] bg-white px-5 pb-7 pt-4"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="self-center h-1 w-10 rounded-full bg-[#D1D5DB]" />
          <Text className="mt-5 text-[20px] font-bold leading-7 text-[#111827]">Egg {egg.eggNumber} 상태 변경</Text>
          <View className="mt-4 flex-row flex-wrap">
            {eggStatusOptions.map((option) => {
              const active = status === option;
              const style = eggStatusStyles[option];
              return (
                <Pressable
                  key={option}
                  onPress={() => setStatus(option)}
                  className="mb-2 mr-2 rounded-full px-3.5 py-2"
                  style={{ backgroundColor: active ? style.bg : '#F5F6F8' }}
                >
                  <Text className="text-[13px] font-semibold" style={{ color: active ? style.text : '#8A8F98' }}>{eggStatusLabels[option]}</Text>
                </Pressable>
              );
            })}
          </View>
          <Text className="mt-3 text-[13px] font-medium text-[#8A8F98]">메모</Text>
          <TextInput
            value={memo}
            onChangeText={setMemo}
            placeholder="혈관 확인됨, 색이 변함, 냄새 발생..."
            placeholderTextColor="#A0A5AD"
            multiline
            className="mt-2 min-h-[92px] rounded-[16px] border border-[#ECECEC] px-4 py-3 text-[14px] font-medium text-[#111827]"
            textAlignVertical="top"
          />
          <Pressable onPress={() => onSave(egg.eggNumber, status, memo)} className="mt-4 h-12 items-center justify-center rounded-[16px] bg-[#FF4F8B]">
            <Text className="text-[15px] font-bold text-white">저장</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function CandlingRecordSection({ records }: { records: CandlingRecord[] }) {
  return (
    <Section title="검란 기록">
      {records.length ? records.map((record) => (
        <View key={record.id} className="border-b border-[#ECECEC] py-3">
          <Text className="text-[14px] font-semibold leading-5 text-[#111827]">{record.date} 검란</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]">Egg {record.eggNumber} {eggStatusLabels[record.status]}</Text>
          <Text className="mt-0.5 text-[13px] font-medium leading-5 text-[#666666]">{record.memo}</Text>
        </View>
      )) : (
        <Text className="text-[13px] font-medium text-[#8A8F98]">아직 검란 기록이 없어요.</Text>
      )}
    </Section>
  );
}

export default function BreedingClutchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const clutch = breedingClutches.find((item) => item.id === id) ?? breedingClutches[0];
  const [eggs, setEggs] = useState<BreedingEgg[]>(() => clutch.eggs ?? []);
  const [candlingRecords, setCandlingRecords] = useState<CandlingRecord[]>(() => clutch.candlingRecords ?? []);
  const [selectedEgg, setSelectedEgg] = useState<BreedingEgg | undefined>();
  const selectedEggState = useMemo(() => eggs.find((egg) => egg.eggNumber === selectedEgg?.eggNumber), [eggs, selectedEgg]);
  const today = '2026.06.20';

  const handleSaveEgg = (eggNumber: number, status: EggStatus, memo: string) => {
    setEggs((prev) => prev.map((egg) => egg.eggNumber === eggNumber ? { ...egg, status, memo, lastCheckedAt: today } : egg));
    setCandlingRecords((prev) => [
      {
        id: `${clutch.id}-candling-local-${Date.now()}`,
        clutchId: clutch.id,
        date: today,
        eggNumber,
        status,
        memo: memo || `${eggStatusLabels[status]} 상태로 변경`,
      },
      ...prev,
    ]);
    setSelectedEgg(undefined);
  };

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
        <DetailRow label="검란 예정일" value={clutch.candlingDate} />
        <DetailRow label="예상 부화 범위" value={`${clutch.expectedHatchStartDate} ~ ${clutch.expectedHatchEndDate}`} />
        {clutch.temperatureWarning ? <DetailRow label="온도 경고" value={clutch.temperatureWarning} /> : null}
      </Section>

      <Section title="알 정보">
        <DetailRow label="목표 성별" value={breedingTargetSexLabels[clutch.targetSex]} />
        <DetailRow label="상태" value={breedingStatusLabels[clutch.status]} />
      </Section>

      <EggStatusSection eggs={eggs} onSelect={setSelectedEgg} />
      <CandlingRecordSection records={candlingRecords} />

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
      <EggStatusModal egg={selectedEggState} onClose={() => setSelectedEgg(undefined)} onSave={handleSaveEgg} />
    </Page>
  );
}
