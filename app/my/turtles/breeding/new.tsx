import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { TopBar } from '@/components/common';
import { createBreedingClutch } from '@/mockData/breeding';
import { managedTurtles } from '@/mockData/turtles';
import type { BreedingTargetSex } from '@/types/breeding';

type FieldKey = 'layDate' | 'eggCount' | 'incubatorName' | 'targetTemperature' | 'currentTemperature' | 'humidity' | 'memo';

const targetSexOptions: { value: BreedingTargetSex; label: string }[] = [
  { value: 'male', label: '숫컷' },
  { value: 'female', label: '암컷' },
  { value: 'mixed', label: '혼합' },
];

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
      <Text className="text-[13px] font-medium leading-5 text-[#8A8F98]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A5AD"
        keyboardType={keyboardType}
        multiline={multiline}
        className={`mt-2 rounded-[16px] border border-[#ECECEC] bg-white px-4 text-[15px] font-medium text-[#111827] ${multiline ? 'min-h-[92px] py-3' : 'h-12'}`}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

function toNumber(value: string) {
  return Number(value.replace(/[^\d.]/g, ''));
}

export default function BreedingCreateScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTurtleId, setSelectedTurtleId] = useState(managedTurtles[0]?.id ?? '');
  const [targetSex, setTargetSex] = useState<BreedingTargetSex>('female');
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
        <View className="mx-5 mt-5 rounded-[22px] border border-[#ECECEC] bg-white p-5">
          <Text className="text-[22px] font-bold leading-7 text-[#111827]">산란 정보</Text>
          <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]">저장하면 검란, 부화, 온도 체크 일정이 자동 생성돼요.</Text>

          <View className="mt-5">
            <Text className="text-[13px] font-medium leading-5 text-[#8A8F98]">거북이 선택</Text>
            <View className="mt-2">
              {managedTurtles.map((turtle) => {
                const active = selectedTurtleId === turtle.id;
                return (
                  <Pressable
                    key={turtle.id}
                    onPress={() => setSelectedTurtleId(turtle.id)}
                    className={`mb-2 flex-row items-center rounded-[16px] border px-4 py-3 ${active ? 'border-[#FF4F8B] bg-[#FFF0F6]' : 'border-[#ECECEC] bg-white'}`}
                  >
                    <View className={`h-5 w-5 items-center justify-center rounded-full border ${active ? 'border-[#FF4F8B] bg-[#FF4F8B]' : 'border-[#D1D5DB]'}`}>
                      {active ? <Ionicons name="checkmark" size={13} color="#FFFFFF" /> : null}
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-[15px] font-semibold text-[#111827]">{turtle.name}</Text>
                      <Text className="mt-0.5 text-[12px] font-medium text-[#8A8F98]">{turtle.species}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Field label="산란일" value={form.layDate} onChangeText={update('layDate')} placeholder="2026.06.18" />
          <Field label="알 개수" value={form.eggCount} onChangeText={update('eggCount')} placeholder="6" keyboardType="numeric" />
          <Field label="인큐베이터명" value={form.incubatorName} onChangeText={update('incubatorName')} placeholder="부기룸 1호" />
          <Field label="세팅 온도" value={form.targetTemperature} onChangeText={update('targetTemperature')} placeholder="31.5" keyboardType="decimal-pad" />
          <Field label="현재 온도" value={form.currentTemperature} onChangeText={update('currentTemperature')} placeholder="31.4" keyboardType="decimal-pad" />
          <Field label="습도" value={form.humidity} onChangeText={update('humidity')} placeholder="82" keyboardType="numeric" />

          <View className="mt-4">
            <Text className="text-[13px] font-medium leading-5 text-[#8A8F98]">목표 성별</Text>
            <View className="mt-2 flex-row">
              {targetSexOptions.map((option) => {
                const active = targetSex === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setTargetSex(option.value)}
                    className={`mr-2 flex-1 items-center rounded-full px-3 py-3 ${active ? 'bg-[#FF4F8B]' : 'bg-[#F5F6F8]'}`}
                  >
                    <Text className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-[#8A8F98]'}`}>{option.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Field label="메모" value={form.memo} onChangeText={update('memo')} placeholder="특이사항을 남겨주세요." multiline />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-[#ECECEC] bg-white px-5 pt-3" style={{ paddingBottom: 12 + insets.bottom }}>
        <Pressable onPress={handleSave} className="h-14 items-center justify-center rounded-[18px] bg-[#FF4F8B]">
          <Text className="text-[16px] font-bold text-white">산란 기록 저장</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
