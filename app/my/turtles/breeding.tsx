import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { breedingClutches, breedingStatusLabels, breedingTargetSexLabels } from '@/mockData/breeding';
import type { BreedingClutch, BreedingEvent, BreedingEventType, BreedingStatus } from '@/types/breeding';
import { getCalendarDayMeta } from '@/utils/holiday';

type TabKey = 'calendar' | 'records';
type FilterKey = 'all' | BreedingStatus;
type CalendarItem = { date: string; icon: string; event: BreedingEvent; clutch: BreedingClutch };

const statusFilters: FilterKey[] = ['all', 'incubating', 'hatched', 'failed'];
const eventIcons: Record<BreedingEventType, string> = {
  laid: '🥚',
  candling: '🔍',
  hatch: '🐣',
  temperature: '🌡',
};
const today = new Date(2026, 5, 18);

function parseDate(date: string) {
  const [year, month, day] = date.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function getDday(date: string) {
  const diff = Math.ceil((parseDate(date).getTime() - today.getTime()) / 86400000);
  return diff >= 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
}

function getDdayRange(startDate: string, endDate: string) {
  return `${getDday(startDate)} ~ ${getDday(endDate)}`;
}

function getStatusStyle(status: BreedingStatus) {
  return {
    incubating: { bg: '#FFF1E6', text: '#FF9B4A' },
    hatched: { bg: '#EAF8EE', text: '#22A06B' },
    failed: { bg: '#F5F6F8', text: '#8A8F98' },
  }[status];
}

function SummaryCard() {
  const active = breedingClutches.filter((clutch) => clutch.status === 'incubating');
  const totalEggs = breedingClutches.reduce((total, clutch) => total + clutch.eggCount, 0);
  const nearest = active.map((clutch) => clutch.expectedHatchStartDate).sort()[0];
  const items = [
    { label: '현재 인큐베이팅', value: `${active.length}건` },
    { label: '총 알 개수', value: `${totalEggs}개` },
    { label: '가장 가까운 부화', value: nearest ? getDday(nearest) : '-' },
  ];

  return (
    <View className="mx-5 mt-5 flex-row rounded-[22px] border border-[#ECECEC] bg-white px-2 py-4">
      {items.map((item, index) => (
        <View key={item.label} className={`flex-1 items-center justify-center ${index ? 'border-l border-[#ECECEC]' : ''}`}>
          <Text className="text-center text-[13px] font-medium leading-5 text-[#8A8F98]" numberOfLines={1}>{item.label}</Text>
          <Text className="mt-1 text-center text-[20px] font-bold leading-7 text-[#111827]" numberOfLines={1}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

function TabBar({ activeTab, onChange }: { activeTab: TabKey; onChange: (tab: TabKey) => void }) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'calendar', label: '캘린더' },
    { key: 'records', label: '통합 기록' },
  ];

  return (
    <View className="mx-5 mt-4 flex-row rounded-[16px] bg-[#F5F6F8] p-1">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <Pressable key={tab.key} onPress={() => onChange(tab.key)} className={`h-10 flex-1 items-center justify-center rounded-[13px] ${active ? 'bg-[#FFF0F6]' : ''}`}>
            <Text className={`text-[14px] font-semibold ${active ? 'text-[#FF4F8B]' : 'text-[#8A8F98]'}`}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function buildEvents() {
  const eventsByDate: Record<string, CalendarItem[]> = {};
  breedingClutches.forEach((clutch) => {
    clutch.events.forEach((event) => {
      const item = { date: event.date, icon: eventIcons[event.type], event, clutch };
      eventsByDate[event.date] = [...(eventsByDate[event.date] ?? []), item];
    });
  });
  return eventsByDate;
}

function CalendarTab({ selected, onSelect }: { selected?: CalendarItem; onSelect: (item: CalendarItem) => void }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const eventsByDate = useMemo(buildEvents, []);
  const monthDate = new Date(2026, 5 + monthOffset, 1);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstDay }, () => 0),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const paddedCells = [...cells, ...Array.from({ length: (7 - (cells.length % 7)) % 7 }, () => 0)];

  return (
    <FadeInView>
      <View className="mx-5 mt-5 rounded-[22px] border border-[#ECECEC] bg-white p-4">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => setMonthOffset((value) => value - 1)} className="h-9 w-9 items-center justify-center rounded-full bg-[#F7F8FA]">
            <Ionicons name="chevron-back" size={18} color="#111827" />
          </Pressable>
          <Text className="text-[20px] font-bold leading-7 text-[#111827]">{year}년 {month + 1}월</Text>
          <Pressable onPress={() => setMonthOffset((value) => value + 1)} className="h-9 w-9 items-center justify-center rounded-full bg-[#F7F8FA]">
            <Ionicons name="chevron-forward" size={18} color="#111827" />
          </Pressable>
        </View>

        <View className="mt-4 flex-row flex-wrap gap-x-2 gap-y-1">
          <Text className="text-[11px] font-medium text-[#8A8F98]">🥚 산란일</Text>
          <Text className="text-[11px] font-medium text-[#8A8F98]">🔍 검란일</Text>
          <Text className="text-[11px] font-medium text-[#8A8F98]">🐣 부화 예정일</Text>
          <Text className="text-[11px] font-medium text-[#8A8F98]">🌡 온도 체크</Text>
        </View>

        <View className="mt-4 flex-row">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <View key={day} className="items-center py-2" style={{ width: '14.2857%' }}>
              <Text className="text-[11px] font-medium text-[#9CA3AF]">{day}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row flex-wrap overflow-hidden rounded-[18px] border border-[#ECECEC]">
          {paddedCells.map((day, index) => {
            const date = day ? `${year}.${`${month + 1}`.padStart(2, '0')}.${`${day}`.padStart(2, '0')}` : '';
            const events = date ? eventsByDate[date] ?? [] : [];
            const isSelected = Boolean(selected && selected.date === date);
            const meta = day ? getCalendarDayMeta(new Date(year, month, day)) : undefined;
            const isRedDay = Boolean(meta?.isSunday || meta?.isHoliday);
            return (
              <Pressable
                key={`${date}-${index}`}
                disabled={!events.length}
                onPress={() => events[0] ? onSelect(events[0]) : undefined}
                className={`h-[58px] items-center justify-start border-b border-r border-[#ECECEC] pt-1.5 ${isSelected ? 'bg-[#FFF0F6]' : events.length ? 'bg-[#FFF8FB]' : 'bg-white'}`}
                style={{ width: '14.2857%' }}
              >
                {day ? (
                  <>
                    <Text className={`text-[12px] font-semibold leading-4 ${isRedDay ? 'text-[#EF4444]' : 'text-[#111827]'}`}>{day}</Text>
                    {meta?.isHoliday ? <View className="mt-0.5 h-1 w-1 rounded-full bg-[#EF4444]" /> : null}
                  </>
                ) : null}
                {events.length ? <Text className="mt-1 text-[14px] leading-4">{events.slice(0, 2).map((event) => event.icon).join('')}</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      {selected ? <SelectedDateCard item={selected} /> : null}
    </FadeInView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-[#ECECEC] py-2.5">
      <Text className="text-[13px] font-medium text-[#8A8F98]">{label}</Text>
      <Text className="ml-3 flex-1 text-right text-[14px] font-semibold text-[#111827]" numberOfLines={1}>{value}</Text>
    </View>
  );
}

function SelectedDateCard({ item }: { item: CalendarItem }) {
  const clutch = item.clutch;
  const statusStyle = getStatusStyle(clutch.status);

  return (
    <View className="mx-5 mt-4 rounded-[22px] border border-[#ECECEC] bg-white p-4">
      <Text className="text-[18px] font-bold leading-6 text-[#111827]">{item.date}</Text>
      {getCalendarDayMeta(parseDate(item.date)).holidayName ? (
        <Text className="mt-1 text-[12px] font-semibold leading-4 text-[#EF4444]">{getCalendarDayMeta(parseDate(item.date)).holidayName}</Text>
      ) : null}
      <Text className="mt-1 text-[14px] font-semibold leading-5 text-[#FF4F8B]">클러치 #{clutch.clutchNumber}</Text>
      <View className="mt-3">
        <InfoRow label="산란일" value={clutch.layDate} />
        <InfoRow label="알 개수" value={`${clutch.eggCount}개`} />
        <InfoRow label="인큐베이터" value={clutch.incubatorName} />
        <InfoRow label="세팅온도" value={`${clutch.targetTemperature.toFixed(1)}℃`} />
        <InfoRow label="현재온도" value={`${clutch.currentTemperature.toFixed(1)}℃`} />
        <InfoRow label="습도" value={`${clutch.humidity}%`} />
        <InfoRow label="목표 성별" value={breedingTargetSexLabels[clutch.targetSex]} />
        <InfoRow label="예상 부화 범위" value={`${clutch.expectedHatchStartDate} ~ ${clutch.expectedHatchEndDate}`} />
        <View className="flex-row items-center justify-between border-b border-[#ECECEC] py-2.5">
          <Text className="text-[13px] font-medium text-[#8A8F98]">상태</Text>
          <View className="rounded-full px-3 py-1" style={{ backgroundColor: statusStyle.bg }}>
            <Text className="text-[12px] font-semibold" style={{ color: statusStyle.text }}>{breedingStatusLabels[clutch.status]}</Text>
          </View>
        </View>
      </View>
      <AnimatedPressable onPress={() => router.push(`/my/turtles/breeding/${clutch.id}` as never)} className="mt-3 flex-row items-center justify-end">
        <Text className="text-[13px] font-semibold text-[#FF4F8B]">상세보기</Text>
        <Ionicons name="chevron-forward" size={15} color="#FF4F8B" />
      </AnimatedPressable>
    </View>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className={`mr-2 rounded-full px-3.5 py-2 ${active ? 'bg-[#FF4F8B]' : 'bg-[#F5F6F8]'}`}>
      <Text className={`text-[12px] font-semibold ${active ? 'text-white' : 'text-[#8A8F98]'}`}>{label}</Text>
    </Pressable>
  );
}

function RecordCard({ clutch }: { clutch: BreedingClutch }) {
  const statusStyle = getStatusStyle(clutch.status);

  return (
    <AnimatedPressable onPress={() => router.push(`/my/turtles/breeding/${clutch.id}` as never)} className="mb-3 rounded-[20px] border border-[#ECECEC] bg-white p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[18px] font-bold leading-6 text-[#111827]">클러치 #{clutch.clutchNumber}</Text>
          <Text className="mt-1 text-[13px] font-semibold leading-5 text-[#666666]">{clutch.turtleName}</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]">{clutch.layDate} 산란</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
      </View>
      <Text className="mt-3 text-[13px] font-semibold leading-5 text-[#111827]">
        알 {clutch.eggCount}개 · {breedingTargetSexLabels[clutch.targetSex]} 목표 · {clutch.targetTemperature.toFixed(1)}℃
      </Text>
      <View className="mt-3 flex-row items-center justify-between">
        <View className="rounded-full px-3 py-1" style={{ backgroundColor: statusStyle.bg }}>
          <Text className="text-[12px] font-semibold" style={{ color: statusStyle.text }}>상태: {breedingStatusLabels[clutch.status]}</Text>
        </View>
        <Text className="text-[12px] font-semibold text-[#FF4F8B]">부화 예상: {getDdayRange(clutch.expectedHatchStartDate, clutch.expectedHatchEndDate)}</Text>
      </View>
    </AnimatedPressable>
  );
}

function RecordsTab() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = breedingClutches
    .filter((clutch) => filter === 'all' || clutch.status === filter)
    .filter((clutch) => {
      const source = `${clutch.turtleName} ${clutch.species} ${clutch.clutchNumber} ${clutch.incubatorName}`.toLowerCase();
      return !normalizedQuery || source.includes(normalizedQuery);
    })
    .sort((a, b) => b.layDate.localeCompare(a.layDate));

  return (
    <FadeInView>
      <View className="mx-5 mt-5">
        <View className="flex-row items-center rounded-[16px] border border-[#ECECEC] bg-white px-4 py-3">
          <Ionicons name="search" size={18} color="#8A8F98" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="산란 기록 검색"
            placeholderTextColor="#A0A5AD"
            className="ml-2 flex-1 text-[14px] font-medium text-[#111827]"
          />
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
  const [selectedEvent, setSelectedEvent] = useState<CalendarItem | undefined>();

  return (
    <Page>
      <TopBar title="산란 관리" right="add" onRightPress={() => router.push('/my/turtles/breeding/new' as never)} />
      <SummaryCard />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'calendar' ? <CalendarTab selected={selectedEvent} onSelect={setSelectedEvent} /> : <RecordsTab />}
    </Page>
  );
}
