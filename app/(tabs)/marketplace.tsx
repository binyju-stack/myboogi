import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/common';
import { ListingGridCard } from '@/components/ListingGridCard';
import { colors } from '@/constants/theme';
import { listings } from '@/data/mockData';

const filterPills = ['전체', '모프', '성별', '크기', '가격', '지역'];
const checkOptions = ['네고', '분양완료', '신규개체'];

function FilterPill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="mr-2 h-9 items-center justify-center rounded-full border px-3.5"
      style={{
        borderColor: selected ? colors.berry : '#E5E7EB',
        backgroundColor: selected ? '#FFF0F6' : '#FFFFFF',
      }}
    >
      <Text className="text-[13px] font-medium leading-[18px]" style={{ color: selected ? colors.berry : '#4B5563' }}>
        {label}
      </Text>
    </Pressable>
  );
}

function CheckOption({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="mr-4 flex-row items-center">
      <View
        className="h-[18px] w-[18px] items-center justify-center rounded-[5px] border"
        style={{
          borderColor: checked ? colors.berry : '#D1D5DB',
          backgroundColor: checked ? colors.berry : '#FFFFFF',
        }}
      >
        {checked ? <Ionicons name="checkmark" size={13} color="#FFFFFF" /> : null}
      </View>
      <Text className="ml-1.5 text-[13px] font-medium leading-[18px] text-[#4B5563]">{label}</Text>
    </Pressable>
  );
}

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [checkedOptions, setCheckedOptions] = useState<string[]>(['신규개체']);
  const cardWidth = useMemo(() => Math.floor((width - 40 - 10) / 2), [width]);
  const sortedListings = useMemo(
    () => [...listings].sort((a, b) => (b.listedAt ?? '').localeCompare(a.listedAt ?? '')),
    [],
  );

  const toggleOption = (label: string) => {
    setCheckedOptions((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#FAFAFA]">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 118 }} showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <BrandHeader compact />
          <View className="px-5 pt-3">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-[24px] font-bold leading-8 text-[#111827]">분양</Text>
                <Text className="mt-1 text-[13px] font-medium leading-[18px] text-[#8A8F98]">믿을 수 있는 브리더의 새 개체를 만나보세요</Text>
              </View>
              <Pressable onPress={() => router.push('/search')} className="h-10 w-10 items-center justify-center rounded-full bg-white">
                <Ionicons name="search" size={20} color="#111827" />
              </Pressable>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pt-5">
            {filterPills.map((label) => (
              <FilterPill key={label} label={label} selected={selectedFilter === label} onPress={() => setSelectedFilter(label)} />
            ))}
          </ScrollView>

          <View className="mt-3 flex-row items-center justify-between px-5">
            <View className="flex-row items-center">
              {checkOptions.map((label) => (
                <CheckOption key={label} label={label} checked={checkedOptions.includes(label)} onPress={() => toggleOption(label)} />
              ))}
            </View>
            <Pressable className="flex-row items-center">
              <Text className="text-[13px] font-semibold leading-[18px] text-[#4B5563]">최신순</Text>
              <Ionicons name="chevron-down" size={15} color="#6B7280" />
            </Pressable>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between px-5">
          {sortedListings.map((item, index) => (
            <ListingGridCard key={item.id} item={item} index={index} width={cardWidth} />
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => router.push('/listing/create')}
        className="absolute right-5 h-[60px] w-[60px] items-center justify-center rounded-full shadow-lg"
        style={{ bottom: insets.bottom + 92, backgroundColor: colors.berry }}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}
