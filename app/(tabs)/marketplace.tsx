import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { BrandHeader, Chip } from '@/components/common';
import { ListingCard } from '@/components/ListingCard';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { listings } from '@/data/mockData';

const filterGroups = [
  { title: '품종', options: ['레오파드', '머스크터틀', '레드풋', '설가타'] },
  { title: '지역', options: ['서울', '경기', '인천', '전국 상담'] },
  { title: '가격대', options: ['30만원 이하', '30-50만원', '50만원 이상'] },
  { title: '성별', options: ['수컷', '암컷', '미구분'] },
  { title: '성장 단계', options: ['유체', '성체'] },
];

function FilterSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/35">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="max-h-[86%] rounded-t-[30px] bg-white px-5 pt-5 shadow-lg" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-[10px] font-black text-berry">FILTER</Text>
              <Text className="mt-1 text-[22px] font-black text-ink">분양 조건 찾기</Text>
            </View>
            <AnimatedPressable onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-soft">
              <Ionicons name="close" size={20} color={colors.ink} />
            </AnimatedPressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="max-h-[520px]">
            {filterGroups.map((group) => (
              <View key={group.title} className="mb-5">
                <Text className="mb-3 text-[13px] font-black text-ink">{group.title}</Text>
                <View className="flex-row flex-wrap">
                  {group.options.map((option, index) => (
                    <AnimatedPressable key={option} className={`mb-2 mr-2 rounded-full px-3.5 py-2.5 ${index === 0 ? 'bg-berry' : 'bg-soft'}`}>
                      <Text className={`text-[11px] font-black ${index === 0 ? 'text-white' : 'text-muted'}`}>{option}</Text>
                    </AnimatedPressable>
                  ))}
                </View>
              </View>
            ))}

            {['인증 브리더만 보기', '분양중만 보기'].map((label) => (
              <AnimatedPressable key={label} className="mb-3 flex-row items-center justify-between rounded-[18px] bg-soft px-4 py-4">
                <Text className="text-[13px] font-black text-ink">{label}</Text>
                <View className="h-6 w-11 items-end justify-center rounded-full bg-berry px-1">
                  <View className="h-4 w-4 rounded-full bg-white" />
                </View>
              </AnimatedPressable>
            ))}
          </ScrollView>

          <View className="mt-4 flex-row gap-3 border-t border-line pt-4">
            <AnimatedPressable className="flex-1 items-center rounded-[18px] bg-soft py-4">
              <Text className="text-[13px] font-black text-muted">초기화</Text>
            </AnimatedPressable>
            <AnimatedPressable onPress={() => Alert.alert('필터 적용 기능은 준비중입니다.')} className="flex-[1.5] items-center rounded-[18px] bg-berry py-4">
              <Text className="text-[13px] font-black text-white">적용하기</Text>
            </AnimatedPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function MarketplaceScreen() {
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <Page>
      <BrandHeader compact />
      <View className="bg-white px-5 pb-4">
        <Text className="mb-4 text-[22px] font-black text-ink">건강한 새 가족을 만나보세요</Text>
        <View className="flex-row gap-2">
          <Pressable onPress={() => router.push('/search')} className="flex-1 flex-row items-center rounded-[18px] bg-soft px-4 py-3.5">
            <Ionicons name="search" size={18} color={colors.muted} />
            <Text className="ml-2 text-[13px] text-muted">어떤 거북이를 찾고 계신가요?</Text>
          </Pressable>
          <AnimatedPressable onPress={() => setFilterVisible(true)} className="h-[50px] w-[50px] items-center justify-center rounded-[18px] bg-blush">
            <Ionicons name="options-outline" size={20} color={colors.berry} />
          </AnimatedPressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-4">
        <AnimatedPressable onPress={() => setFilterVisible(true)}><Chip label="전체" selected /></AnimatedPressable>
        <AnimatedPressable onPress={() => setFilterVisible(true)}><Chip label="품종" icon="chevron-down" /></AnimatedPressable>
        <AnimatedPressable onPress={() => setFilterVisible(true)}><Chip label="가격" icon="chevron-down" /></AnimatedPressable>
        <AnimatedPressable onPress={() => setFilterVisible(true)}><Chip label="지역" icon="chevron-down" /></AnimatedPressable>
        <AnimatedPressable onPress={() => setFilterVisible(true)}><Chip label="유체/성체" icon="chevron-down" /></AnimatedPressable>
      </ScrollView>

      <View className="flex-row items-center justify-between px-5 pb-4 pt-1">
        <View>
          <Text className="text-[10px] font-black text-berry">MARKETPLACE</Text>
          <Text className="mt-1 text-[19px] font-black text-ink">분양 중인 거북이</Text>
        </View>
        <Pressable onPress={() => router.push('/listing/create')} className="flex-row items-center rounded-full bg-berry px-3.5 py-2.5">
          <Ionicons name="add" size={14} color="white" />
          <Text className="ml-1 text-[10px] font-black text-white">분양글 등록</Text>
        </Pressable>
      </View>

      <View className="px-5">{listings.map((item, index) => <ListingCard key={item.id} item={item} list index={index} />)}</View>
      <FilterSheet visible={filterVisible} onClose={() => setFilterVisible(false)} />
    </Page>
  );
}
