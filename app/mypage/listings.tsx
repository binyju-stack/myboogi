import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { ListingCard } from '@/components/ListingCard';
import { EmptyList } from '@/components/MyListLayout';
import { Page } from '@/components/screen';
import { TopBar } from '@/components/common';
import { colors } from '@/constants/theme';
import { getListingStatus, listingStatusMeta, listingStatusOptions } from '@/data/listingStatusData';
import { listings } from '@/data/mockData';
import type { Listing, ListingStatus } from '@/types';

const myListingIds = ['l1', 'l4', 'l5'];
const tabs: { key: 'all' | ListingStatus; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '분양중' },
  { key: 'reserved', label: '예약중' },
  { key: 'completed', label: '분양완료' },
];

function StatusSheet({
  item,
  visible,
  onClose,
  onChange,
}: {
  item?: Listing;
  visible: boolean;
  onClose: () => void;
  onChange: (status: ListingStatus) => void;
}) {
  const insets = useSafeAreaInsets();
  if (!item) return null;
  const currentStatus = getListingStatus(item);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/35">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="rounded-t-[30px] bg-white px-5 pt-5 shadow-lg" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <View className="mb-5 flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-[10px] font-bold text-berry">STATUS</Text>
              <Text className="mt-1 text-[22px] font-bold text-ink">상태 변경</Text>
              <Text className="mt-2 text-[11px] text-muted" numberOfLines={1}>{item.species}</Text>
            </View>
            <AnimatedPressable onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-soft">
              <Ionicons name="close" size={20} color={colors.ink} />
            </AnimatedPressable>
          </View>

          {listingStatusOptions.map((option) => {
            const meta = listingStatusMeta[option.key];
            const selected = currentStatus === option.key;
            return (
              <AnimatedPressable key={option.key} onPress={() => onChange(option.key)} className={`mb-3 flex-row items-center rounded-[20px] px-4 py-4 ${selected ? meta.softClass : 'bg-soft'}`}>
                <View className={`h-3 w-3 rounded-full ${meta.badgeClass}`} />
                <Text className="ml-3 flex-1 text-[14px] font-bold text-ink">{option.actionLabel}</Text>
                {selected ? <Ionicons name="checkmark-circle" size={20} color={colors.berry} /> : null}
              </AnimatedPressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

export default function MyListingsScreen() {
  const initialItems = useMemo(() => listings.filter((item) => myListingIds.includes(item.id)), []);
  const [items, setItems] = useState(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | ListingStatus>('all');
  const [selectedItem, setSelectedItem] = useState<Listing | undefined>();
  const visibleItems = activeTab === 'all' ? items : items.filter((item) => getListingStatus(item) === activeTab);

  const changeStatus = (status: ListingStatus) => {
    if (!selectedItem) return;
    setItems((current) => current.map((item) => item.id === selectedItem.id ? { ...item, listingStatus: status, reviewEligible: status === 'completed' } : item));
    setSelectedItem(undefined);
  };

  return (
    <Page>
      <TopBar title="내 분양글" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[9px] font-bold text-berry">MY MARKETPLACE</Text>
        <Text className="mt-1 text-[24px] font-bold text-ink">내 분양글</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">등록한 분양글과 진행 상태를 관리해요.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 py-4">
        {tabs.map((tab) => (
          <AnimatedPressable key={tab.key} onPress={() => setActiveTab(tab.key)} className={`mr-2 rounded-full px-4 py-2.5 ${activeTab === tab.key ? 'bg-ink' : 'bg-white'}`}>
            <Text className={`text-[12px] font-bold ${activeTab === tab.key ? 'text-white' : 'text-muted'}`}>{tab.label}</Text>
          </AnimatedPressable>
        ))}
      </ScrollView>

      <View className="px-5">
        {visibleItems.length ? visibleItems.map((item, index) => (
          <ListingCard key={item.id} item={item} list index={index} onStatusPress={setSelectedItem} />
        )) : <EmptyList title="해당 상태의 분양글이 없어요" description="상태 변경 버튼으로 진행 상황을 관리할 수 있어요." />}
      </View>

      <StatusSheet item={selectedItem} visible={Boolean(selectedItem)} onClose={() => setSelectedItem(undefined)} onChange={changeStatus} />
    </Page>
  );
}
