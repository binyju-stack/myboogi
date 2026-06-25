import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { TopBar } from '@/components/common';
import { createBreedingClutch } from '@/mockData/breeding';
import { managedTurtles } from '@/mockData/turtles';
import type { BreedingTargetSex } from '@/types/breeding';
import { calculateBreedingSchedule } from '@/utils/breedingCalculator';
import { getCalendarDayMeta } from '@/utils/holiday';

type FieldKey = 'layDate' | 'eggCount' | 'incubatorName' | 'targetTemperature' | 'currentTemperature' | 'humidity' | 'memo';

const targetSexOptions: { value: BreedingTargetSex; label: string }[] = [
  { value: 'male', label: '숫컷' },
  { value: 'female', label: '암컷' },
  { value: 'mixed', label: '혼합' },
];

function parseDate(value: string) {
  const [year, month, day] = value.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function sameDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
}) {
  return (
    <View className="mt-4">
      <Text className="text-[13px] font-medium leading-5 text-[#94A3B8]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A5AD"
        keyboardType={keyboardType}
        multiline={multiline}
        className={`mt-2 rounded-[16px] border border-[#EEF2F6] bg-white px-4 text-[15px] font-medium text-[#111827] ${multiline ? 'min-h-[92px] py-3' : 'h-12'}`}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

function toNumber(value: string) {
  return Number(value.replace(/[^\d.]/g, ''));
}

function DateField({ value, onPress }: { value: string; onPress: () => void }) {
  return (
    <View className="mt-4">
      <Text className="text-[13px] font-medium leading-5 text-[#94A3B8]">산란일</Text>
      <Pressable onPress={onPress} className="mt-2 h-12 flex-row items-center justify-between rounded-[16px] border border-[#EEF2F6] bg-white px-4">
        <Text className="text-[15px] font-medium text-[#111827]">{value}</Text>
        <Ionicons name="calendar-outline" size={19} color="#FF2E6F" />
      </Pressable>
    </View>
  );
}

function DatePickerModal({
  visible,
  value,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  value: string;
  onCancel: () => void;
  onConfirm: (value: string) => void;
}) {
  const today = new Date(2026, 5, 18);
  const current = parseDate(value);
  const [viewDate, setViewDate] = useState(new Date(current.getFullYear(), current.getMonth(), 1));
  const [draftDate, setDraftDate] = useState(current);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const selectedHoliday = getCalendarDayMeta(draftDate).holidayName;
  const cells = [
    ...Array.from({ length: firstDay }, () => 0),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const paddedCells = [...cells, ...Array.from({ length: (7 - (cells.length % 7)) % 7 }, () => 0)];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable className="flex-1 justify-end bg-black/35" onPress={onCancel}>
        <Pressable className="rounded-t-[28px] bg-white px-5 pb-6 pt-4" onPress={(event) => event.stopPropagation()}>
          <View className="self-center h-1 w-10 rounded-full bg-[#EEF2F6]" />
          <View className="mt-5 flex-row items-center justify-between">
            <Pressable onPress={() => setViewDate(new Date(year, month - 1, 1))} className="h-10 w-10 items-center justify-center rounded-full bg-[#F5F6F8]">
              <Ionicons name="chevron-back" size={18} color="#111827" />
            </Pressable>
            <Text className="text-[20px] font-bold leading-7 text-[#111827]">{year}년 {month + 1}월</Text>
            <Pressable onPress={() => setViewDate(new Date(year, month + 1, 1))} className="h-10 w-10 items-center justify-center rounded-full bg-[#F5F6F8]">
              <Ionicons name="chevron-forward" size={18} color="#111827" />
            </Pressable>
          </View>

          <View className="mt-4 flex-row">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <View key={day} className="items-center py-2" style={{ width: '14.2857%' }}>
                <Text className="text-[11px] font-medium text-[#94A3B8]">{day}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row flex-wrap">
            {paddedCells.map((day, index) => {
              const date = day ? new Date(year, month, day) : undefined;
              const selected = Boolean(date && sameDate(date, draftDate));
              const isToday = Boolean(date && sameDate(date, today));
              const meta = date ? getCalendarDayMeta(date) : undefined;
              const isRedDay = Boolean(meta?.isSunday || meta?.isHoliday);
              return (
                <Pressable
                  key={`${year}-${month}-${day}-${index}`}
                  disabled={!date}
                  onPress={() => date ? setDraftDate(date) : undefined}
                  className="h-11 items-center justify-center"
                  style={{ width: '14.2857%' }}
                >
                  {date ? (
                    <View className={`h-9 w-9 items-center justify-center rounded-full ${selected ? 'bg-[#FF2E6F]' : isToday ? 'border border-[#FF2E6F] bg-white' : ''}`}>
                      <Text className={`text-[13px] font-semibold ${selected ? 'text-white' : isRedDay ? 'text-[#EF4444]' : isToday ? 'text-[#FF2E6F]' : 'text-[#111827]'}`}>{day}</Text>
                      {meta?.isHoliday ? <View className={`mt-0.5 h-1 w-1 rounded-full ${selected ? 'bg-white' : 'bg-[#EF4444]'}`} /> : null}
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
          {selectedHoliday ? (
            <View className="mt-3 rounded-[12px] bg-[#FEF2F2] px-3 py-2">
              <Text className="text-[12px] font-semibold text-[#EF4444]">{formatDate(draftDate)} {selectedHoliday}</Text>
            </View>
          ) : null}

          <View className="mt-5 flex-row">
            <Pressable onPress={onCancel} className="mr-2 h-12 flex-1 items-center justify-center rounded-[16px] bg-[#F5F6F8]">
              <Text className="text-[14px] font-semibold text-[#94A3B8]">취소</Text>
            </Pressable>
            <Pressable onPress={() => onConfirm(formatDate(draftDate))} className="ml-2 h-12 flex-1 items-center justify-center rounded-[16px] bg-[#FF2E6F]">
              <Text className="text-[14px] font-bold text-white">확인</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function BreedingCreateScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTurtleId, setSelectedTurtleId] = useState(managedTurtles[0]?.id ?? '');
  const [targetSex, setTargetSex] = useState<BreedingTargetSex>('female');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [form, setForm] = useState<Record<FieldKey, string>>({
    layDate: '2026.06.18',
    eggCount: '6',
    incubatorName: '부기룸 1호',
    targetTemperature: '31.5',
    currentTemperature: '31.4',
    humidity: '82',
    memo: '',
  });
  const selectedTurtle = useMemo(
    () => managedTurtles.find((turtle) => turtle.id === selectedTurtleId) ?? managedTurtles[0],
    [selectedTurtleId],
  );
  const schedule = useMemo(() => calculateBreedingSchedule({
    layDate: form.layDate,
    targetSex,
    targetTemperature: toNumber(form.targetTemperature),
  }), [form.layDate, form.targetTemperature, targetSex]);

  const update = (key: FieldKey) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!selectedTurtle) {
      Alert.alert('거북이를 선택해주세요.');
      return;
    }
    if (!form.layDate || !form.eggCount || !form.incubatorName) {
      Alert.alert('필수 항목을 입력해주세요.');
      return;
    }

    createBreedingClutch({
      turtleId: selectedTurtle.id,
      turtleName: selectedTurtle.name,
      species: selectedTurtle.species,
      layDate: form.layDate,
      eggCount: toNumber(form.eggCount),
      incubatorName: form.incubatorName,
      targetTemperature: toNumber(form.targetTemperature),
      currentTemperature: toNumber(form.currentTemperature),
      humidity: toNumber(form.humidity),
      targetSex,
      memo: form.memo,
    });

    router.replace('/my/turtles/breeding' as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      <TopBar title="산란 기록 추가" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 112 + insets.bottom }}>
        <View className="mx-5 mt-5 rounded-[22px] border border-[#EEF2F6] bg-white p-5">
          <Text className="text-[22px] font-bold leading-7 text-[#111827]">산란 정보</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#94A3B8]">저장하면 검란, 부화, 온도 체크 일정이 자동 생성돼요.</Text>

          <View className="mt-5">
            <Text className="text-[13px] font-medium leading-5 text-[#94A3B8]">거북이 선택</Text>
            <View className="mt-2">
              {managedTurtles.map((turtle) => {
                const active = selectedTurtleId === turtle.id;
                return (
                  <Pressable
                    key={turtle.id}
                    onPress={() => setSelectedTurtleId(turtle.id)}
                    className={`mb-2 flex-row items-center rounded-[16px] border px-4 py-3 ${active ? 'border-[#FF2E6F] bg-[#FFF2F6]' : 'border-[#EEF2F6] bg-white'}`}
                  >
                    <View className={`h-5 w-5 items-center justify-center rounded-full border ${active ? 'border-[#FF2E6F] bg-[#FF2E6F]' : 'border-[#EEF2F6]'}`}>
                      {active ? <Ionicons name="checkmark" size={13} color="#FFFFFF" /> : null}
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-[15px] font-semibold text-[#111827]">{turtle.name}</Text>
                      <Text className="mt-0.5 text-[12px] font-medium text-[#94A3B8]">{turtle.species}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <DateField value={form.layDate} onPress={() => setDatePickerVisible(true)} />
          <View className="mt-3 rounded-[16px] bg-[#FFF7F3] px-4 py-3">
            <Text className="text-[12px] font-medium leading-4 text-[#94A3B8]">자동 계산</Text>
            <Text className="mt-1 text-[13px] font-semibold leading-5 text-[#111827]">검란 예정일 {schedule.candlingDate}</Text>
            <Text className="mt-0.5 text-[13px] font-semibold leading-5 text-[#111827]">예상 부화 범위 {schedule.expectedHatchStartDate} ~ {schedule.expectedHatchEndDate}</Text>
            <Text className="mt-0.5 text-[12px] font-medium leading-4 text-[#94A3B8]">온도 체크 일정은 산란일 기준 주 1회 생성돼요.</Text>
            <Text className="mt-1 text-[12px] font-medium leading-4 text-[#94A3B8]">목표 성별 기준 예상값입니다. 실제 부화일은 종, 습도, 온도 편차에 따라 달라질 수 있습니다.</Text>
            {schedule.warningMessage ? (
              <View className="mt-2 rounded-[12px] bg-[#FFF1E6] px-3 py-2">
                <Text className="text-[12px] font-semibold leading-4 text-[#FF9B4A]">{schedule.warningMessage}</Text>
              </View>
            ) : null}
          </View>
          <Field label="알 개수" value={form.eggCount} onChangeText={update('eggCount')} placeholder="6" keyboardType="numeric" />
          <Field label="인큐베이터명" value={form.incubatorName} onChangeText={update('incubatorName')} placeholder="부기룸 1호" />
          <Field label="세팅 온도" value={form.targetTemperature} onChangeText={update('targetTemperature')} placeholder="31.5" keyboardType="decimal-pad" />
          <Field label="현재 온도" value={form.currentTemperature} onChangeText={update('currentTemperature')} placeholder="31.4" keyboardType="decimal-pad" />
          <Field label="습도" value={form.humidity} onChangeText={update('humidity')} placeholder="82" keyboardType="numeric" />

          <View className="mt-4">
            <Text className="text-[13px] font-medium leading-5 text-[#94A3B8]">목표 성별</Text>
            <View className="mt-2 flex-row">
              {targetSexOptions.map((option) => {
                const active = targetSex === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setTargetSex(option.value)}
                    className={`mr-2 flex-1 items-center rounded-full px-3 py-3 ${active ? 'bg-[#FF2E6F]' : 'bg-[#F5F6F8]'}`}
                  >
                    <Text className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-[#94A3B8]'}`}>{option.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Field label="메모" value={form.memo} onChangeText={update('memo')} placeholder="특이사항을 남겨주세요." multiline />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-[#EEF2F6] bg-white px-5 pt-3" style={{ paddingBottom: 12 + insets.bottom }}>
        <Pressable onPress={handleSave} className="h-14 items-center justify-center rounded-[18px] bg-[#FF2E6F]">
          <Text className="text-[16px] font-bold text-white">산란 기록 저장</Text>
        </Pressable>
      </View>
      <DatePickerModal
        visible={datePickerVisible}
        value={form.layDate}
        onCancel={() => setDatePickerVisible(false)}
        onConfirm={(value) => {
          update('layDate')(value);
          setDatePickerVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
