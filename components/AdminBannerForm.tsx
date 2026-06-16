import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, View } from 'react-native';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import type { HomeBanner } from '@/data/homeScreenData';

const emptyBanner: HomeBanner = {
  id: 'new-banner',
  title: '',
  description: '',
  image: '',
  actionLabel: '',
  linkUrl: '',
  isActive: true,
  isAd: false,
  sortOrder: 1,
  startDate: '',
  endDate: '',
};

function Field({ label, value, placeholder, onChangeText }: { label: string; value: string; placeholder: string; onChangeText: (value: string) => void }) {
  return (
    <View className="mt-4">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtle}
        className="rounded-[18px] bg-soft px-4 py-4 text-[13px] text-ink"
      />
    </View>
  );
}

function ToggleRow({ label, description, value, onPress }: { label: string; description: string; value: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable onPress={onPress} className="mt-4 flex-row items-center rounded-[18px] bg-soft p-4">
      <View className={`h-6 w-6 items-center justify-center rounded-[8px] ${value ? 'bg-berry' : 'bg-white'}`}>
        {value ? <Ionicons name="checkmark" size={15} color="white" /> : null}
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[12px] font-black text-ink">{label}</Text>
        <Text className="mt-1 text-[9px] leading-4 text-muted">{description}</Text>
      </View>
    </AnimatedPressable>
  );
}

export function AdminBannerForm({ mode, initialBanner }: { mode: 'create' | 'edit'; initialBanner?: HomeBanner }) {
  const [banner, setBanner] = useState<HomeBanner>(initialBanner ?? emptyBanner);

  const update = (key: keyof HomeBanner, value: string | boolean | number) => setBanner((current) => ({ ...current, [key]: value }));

  return (
    <Page>
      <TopBar title={mode === 'create' ? '배너 등록' : '배너 수정'} />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">BANNER ADMIN</Text>
        <Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">{mode === 'create' ? '새 배너를 등록해요' : '배너 정보를 수정해요'}</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">현재는 Mock UI이며 실제 저장과 이미지 업로드는 나중에 연결합니다.</Text>
      </View>

      <View className="px-5 pb-5 pt-6">
        <View className="rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[10px] font-black text-berry">IMAGE</Text>
          <View className="mt-3 h-44 overflow-hidden rounded-[22px] bg-blush">
            {banner.image ? (
              <Image source={{ uri: banner.image }} className="h-full w-full" resizeMode="cover" />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Ionicons name="image-outline" size={30} color={colors.berry} />
                <Text className="mt-2 text-[11px] font-black text-berry">배너 이미지 추가</Text>
              </View>
            )}
          </View>

          <Field label="이미지 URL" value={banner.image} placeholder="https://..." onChangeText={(value) => update('image', value)} />
          <Field label="제목" value={banner.title} placeholder="배너 제목을 입력하세요" onChangeText={(value) => update('title', value)} />
          <Field label="설명" value={banner.description} placeholder="배너 설명을 입력하세요" onChangeText={(value) => update('description', value)} />
          <Field label="버튼 문구" value={banner.actionLabel} placeholder="자세히 보기" onChangeText={(value) => update('actionLabel', value)} />
          <Field label="연결 경로" value={banner.linkUrl} placeholder="/marketplace" onChangeText={(value) => update('linkUrl', value)} />
          <Field label="노출 순서" value={String(banner.sortOrder)} placeholder="1" onChangeText={(value) => update('sortOrder', Number(value) || 1)} />
          <Field label="시작일" value={banner.startDate} placeholder="2026.06.16" onChangeText={(value) => update('startDate', value)} />
          <Field label="종료일" value={banner.endDate} placeholder="2026.06.30" onChangeText={(value) => update('endDate', value)} />

          <ToggleRow label="노출 여부" description="켜두면 홈 프로모션 배너 영역에 노출됩니다." value={banner.isActive} onPress={() => update('isActive', !banner.isActive)} />
          <ToggleRow label="광고 배너로 표시" description="체크 시 홈 화면 배너 우측 상단에 광고 표시가 노출됩니다." value={banner.isAd} onPress={() => update('isAd', !banner.isAd)} />

          <AnimatedPressable onPress={() => Alert.alert('안내', '배너 저장 기능은 준비중입니다.')} className="mt-6 items-center rounded-[20px] bg-berry py-4">
            <Text className="text-[13px] font-black text-white">저장</Text>
          </AnimatedPressable>
        </View>
      </View>
    </Page>
  );
}
