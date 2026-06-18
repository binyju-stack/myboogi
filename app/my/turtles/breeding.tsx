import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breedingClutches, breedingStatusLabels, breedingTargetSexLabels } from '@/mockData/breeding';
import type { BreedingClutch, BreedingEventType, BreedingStatus } from '@/types/breeding';

type TabKey = 'calendar' | 'records';
type CalendarEvent = { date: string; icon: string; label: string; type: BreedingEventType; clutch: BreedingClutch };

const statusFilters: ('all' | BreedingStatus)[] = ['all', 'incubating', 'hatched', 'failed'];

function parseDate(date: string) {
  const [year, month, day] = date.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function getDday(date: string) {
  const today = new Date(2026, 5, 22);
  const target = parseDate(date);
  const diff = Math.ceil((target.getTime() - today.getTime()) / 86400000);
  return diff >= 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
}

function getStatusStyle(status: BreedingStatus) {
  const styles: Record<BreedingStatus, { bg: string; text: string }> = {
    incubating: { bg: '#FFF1E6', text: '#FF9B4A' },
    hatched: { bg: '#EAF8EE', text: '#22A06B' },
    failed: { bg: '#F5F6F8', text: '#8A8F98' },
  };
  return styles[status];
}

function SummaryCard() {
  const activeCount = breedingClutches.filter((clutch) => clutch.status === 'incubating').length;
  const eggCount = breedingClutches.reduce((total, clutch) => total + clutch.eggCount, 0);
  const nearest = breedingClutches
    .filter((clutch) => clutch.status === 'incubating')
    .map((clutch) => clutch.expectedHatchDate)
    .sort()[0];

  return (
    <View className="mx-5 mt-5 rounded-[24px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row gap-2">
        <View className="flex-1 rounded-[16px] bg-[#FFF8FB] p-3">
          <Text className="text-[11px] font-semibold text-[#8A8F98]">현재 인큐베이팅</Text>
          <Text className="mt-1 text-[18px] font-black text-[#111827]">{activeCount}건</Text>
        </View>
        <View className="flex-1 rounded-[16px] bg-[#FFF8FB] p-3">
          <Text className="text-[11px] font-semibold text-[#8A8F98]">총 알 개수</Text>
          <Text className="mt-1 text-[18px] font-black text-[#111827]">{eggCount}개</Text>
        </View>
      </View>
      <View className="mt-2 rounded-[16px] bg-[#FFF1E6] p-3">
        <Text className="text-[11px] font-semibold text-[#8A8F98]">가장 가까운 부화 예정</Text>
        <Text className="mt-1 text-[18px] font-black text-[#111827]">{nearest ? getDday(nearest) : '-'}</Text>
      </View>
    </View>
  );
}

function TabBar({ activeTab, onChange }: { activeTab: TabKey; onChange: (tab: TabKey) => void }) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'calendar', label: '캘린더' },
    { key: 'records', label: '통합 기록' },
  ];

  return (
    <View className="mx-5 mt-5 flex-row rounded-[16px] bg-[#F5F6F8] p-1">
      {tabs.map((tab) => (
        <Pressable key={tab.key} onPress={() => onChange(tab.key)} className={`h-10 flex-1 items-center justify-center rounded-[13px] ${activeTab === tab.key ? 'bg-white shadow-sm' : ''}`}>
          <Text className={`text-[14px] font-bold ${activeTab === tab.key ? 'text-[#FF4F8B]' : 'text-[#8A8F98]'}`}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function buildEvents(clutches: BreedingClutch[]) {
  const eventsByDate: Record<string, CalendarEvent[]> = {};
  clutches.forEach((clutch) => {
    clutch.events.forEach((event) => {
      const icon = event.type === 'laid' ? '🥚' : event.type === 'candling' ? '🔍' : event.type === 'hatch' ? '🐣' : '🌡';
      const item: CalendarEvent = { date: event.date, icon, label: event.label, type: event.type, clutch };
      eventsByDate[event.date] = [...(eventsByDate[event.date] ?? []), item];
    });
  });
  return eventsByDate;
}

function CalendarTab({ onSelect }: { onSelect: (event: CalendarEvent) => void }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date(2026, 5 + monthOffset, 1);
  const year = base.getFullYear();
  const month = base.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? 0 : index - firstDay + 1);
  const paddedCells = [...cells, ...Array.from({ length: (7 - (cells.length % 7)) % 7 }, () => 0)];
  const eventsByDate = buildEvents(breedingClutches);
  const monthLabel = `${year}년 ${month + 1}월`;

  return (
    <FadeInView>
      <View className="mx-5 mt-5 rounded-[24px] border border-line bg-white p-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => setMonthOffset((value) => value - 1)} className="h-9 w-9 items-center justify-center rounded-full bg-[#F7F8FA]">
            <Ionicons name="chevron-back" size={18} color="#111827" />
          </Pressable>
          <Text className="text-[18px] font-black text-[#111827]">{monthLabel}</Text>
          <Pressable onPress={() => setMonthOffset((value) => value + 1)} className="h-9 w-9 items-center justify-center rounded-full bg-[#F7F8FA]">
            <Ionicons name="chevron-forward" size={18} color="#111827" />
          </Pressable>
        </View>
        <View className="mt-4 flex-row flex-wrap gap-x-2 gap-y-1">
          <Text className="text-[11px] font-bold text-[#8A8F98]">🥚 산란일</Text>
          <Text className="text-[11px] font-bold text-[#8A8F98]">🔍 검란일</Text>
          <Text className="text-[11px] font-bold text-[#8A8F98]">🐣 부화 예정일</Text>
          <Text className="text-[11px] font-bold text-[#8A8F98]">🌡 온도 체크 필요</Text>
        </View>
        <View className="mt-4 flex-row">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <View key={day} className="items-center py-2" style={{ width: '14.2857%' }}>
              <Text className="text-[11px] font-bold text-[#9CA3AF]">{day}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row flex-wrap overflow-hidden rounded-[18px] border border-line">
          {paddedCells.map((day, index) => {
            const date = day ? `${year}.${`${month + 1}`.padStart(2, '0')}.${`${day}`.padStart(2, '0')}` : '';
            const events = date ? eventsByDate[date] ?? [] : [];
            return (
              <Pressable
                key={`${date}-${index}`}
                disabled={!events.length}
                onPress={() => events[0] ? onSelect(events[0]) : undefined}
                className={`h-[58px] items-center justify-start border-b border-r border-line pt-1.5 ${events.length ? 'bg-[#FFF8FB]' : 'bg-white'}`}
                style={{ width: '14.2857%' }}
              >
                {day ? <Text className="text-[12px] font-bold leading-4 text-[#111827]">{day}</Text> : null}
                {events.length ? <Text className="mt-1 text-[14px] leading-4">{events.slice(0, 2).map((event) => event.icon).join('')}</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </View>
    </FadeInView>
  );
}

function EventSheet({ event, onClose }: { event?: CalendarEvent; onClose: () => void }) {
  if (!event) {
    return null;
  }
  const clutch = event.clutch;
  const statusStyle = getStatusStyle(clutch.status);
  return (
    <Modal visible={Boolean(event)} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/35" onPress={onClose}>
        <Pressable className="rounded-t-[28px] bg-white px-5 pb-8 pt-4" onPress={(e) => e.stopPropagation()}>
          <View className="self-center h-1 w-10 rounded-full bg-[#D1D5DB]" />
          <Text className="mt-5 text-[21px] font-black text-[#111827]">{event.date}</Text>
          <Text className="mt-1 text-[14px] font-bold text-[#FF4F8B]">클러치 #{clutch.clutchNumber}</Text>
          <View className="mt-4 rounded-[18px] bg-[#FFF8FB] px-4 py-3">
            {[
              ['산란일', clutch.layDate],
              ['알 개수', `${clutch.eggCount}개`],
              ['인큐베이터', clutch.incubatorName],
              ['세팅온도', `${clutch.targetTemperature.toFixed(1)}℃`],
              ['현재온도', `${clutch.currentTemperature.toFixed(1)}℃`],
              ['습도', `${clutch.humidity}%`],
              ['목표 성별', breedingTargetSexLabels[clutch.targetSex]],
              ['예상 부화일', clutch.expectedHatchDate],
            ].map(([label, value]) => (
              <View key={label} className="flex-row items-center justify-between border-b border-line py-2.5">
                <Text className="text-[13px] font-semibold text-[#8A8F98]">{label}</Text>
                <Text className="text-[14px] font-bold text-[#111827]">{value}</Text>
              </View>
            ))}
            <View className="flex-row items-center justify-between py-2.5">
              <Text className="text-[13px] font-semibold text-[#8A8F98]">상태</Text>
              <View className="rounded-full px-3 py-1" style={{ backgroundColor: statusStyle.bg }}>
                <Text className="text-[12px] font-bold" style={{ color: statusStyle.text }}>{breedingStatusLabels[clutch.status]}</Text>
              </View>
            </View>
          </View>
          <AnimatedPressable onPress={() => router.push(`/my/turtles/breeding/${clutch.id}` as never)} className="mt-4 items-center rounded-[16px] bg-[#FF4F8B] py-3.5">
            <Text className="text-[14px] font-bold text-white">클러치 상세 보기</Text>
          </AnimatedPressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className={`mr-2 rounded-full px-3.5 py-2 ${active ? 'bg-[#FF4F8B]' : 'bg-[#F5F6F8]'}`}>
      <Text className={`text-[12px] font-bold ${active ? 'text-white' : 'text-[#8A8F98]'}`}>{label}</Text>
    </Pressable>
  );
}

function RecordCard({ clutch }: { clutch: BreedingClutch }) {
  const statusStyle = getStatusStyle(clutch.status);
  return (
    <AnimatedPressable onPress={() => router.push(`/my/turtles/breeding/${clutch.id}` as never)} className="mb-3 rounded-[20px] border border-line bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[17px] font-black leading-6 text-[#111827]">클러치 #{clutch.clutchNumber}</Text>
          <Text className="mt-1 text-[13px] font-semibold leading-5 text-[#666666]">{clutch.turtleName}</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]">{clutch.layDate} 산란</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
      </View>
      <Text className="mt-3 text-[13px] font-bold leading-5 text-[#111827]">알 {clutch.eggCount}개 · {breedingTargetSexLabels[clutch.targetSex]} · {clutch.targetTemperature.toFixed(1)}℃</Text>
      <View className="mt-3 flex-row items-center justify-between">
        <View className="rounded-full px-3 py-1" style={{ backgroundColor: statusStyle.bg }}>
          <Text className="text-[12px] font-bold" style={{ color: statusStyle.text }}>상태: {breedingStatusLabels[clutch.status]}</Text>
        </View>
        <Text className="text-[12px] font-bold text-[#FF4F8B]">예상 부화 {getDday(clutch.expectedHatchDate)}</Text>
      </View>
    </AnimatedPressable>
  );
}

function RecordsTab() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | BreedingStatus>('all');
  const filtered = breedingClutches
    .filter((clutch) => filter === 'all' || clutch.status === filter)
    .filter((clutch) => `${clutch.turtleName} ${clutch.species} ${clutch.clutchNumber}`.includes(query.trim()))
    .sort((a, b) => b.layDate.localeCompare(a.layDate));

  return (
    <FadeInView>
      <View className="mx-5 mt-5">
        <View className="flex-row items-center rounded-[16px] bg-white px-4 py-3 shadow-sm">
          <Ionicons name="search" size={18} color="#8A8F98" />
          <TextInput value={query} onChangeText={setQuery} placeholder="산란 기록 검색" placeholderTextColor="#A0A5AD" className="ml-2 flex-1 text-[14px] font-medium text-[#111827]" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 14 }}>
          {statusFilters.map((item) => (
            <FilterChip key={item} label={item === 'all' ? '전체' : breedingStatusLabels[item]} active={filter === item} onPress={() => setFilter(item)} />
          ))}
        </ScrollView>
        {filtered.map((clutch) => <RecordCard key={clutch.id} clutch={clutch} />)}
      </View>
    </FadeInView>
  );
}

export default function BreedingManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();

  return (
    <Page>
      <TopBar title="산란 관리" right="add" onRightPress={() => {}} />
      <SummaryCard />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'calendar' ? <CalendarTab onSelect={setSelectedEvent} /> : <RecordsTab />}
      <EventSheet event={selectedEvent} onClose={() => setSelectedEvent(undefined)} />
    </Page>
  );
}
