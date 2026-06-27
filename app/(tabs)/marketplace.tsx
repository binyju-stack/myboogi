import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/AnimatedPressable';
import { AppHeader } from '@/components/AppHeader';
import { BillboardTicker } from '@/components/BillboardTicker';
import { ListingGridCard } from '@/components/ListingGridCard';
import { colors } from '@/constants/theme';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';
import { listings } from '@/data/mockData';

const filterPills = ['\uC804\uCCB4', '\uBAA8\uD504', '\uC131\uBCC4', '\uD06C\uAE30', '\uAC00\uACA9', '\uC9C0\uC5ED'];
const checkOptions = ['\uB124\uACE0', '\uBD84\uC591\uC644\uB8CC', '\uC2E0\uADDC\uAC1C\uCCB4'];

function FilterPill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.filterPill, selected ? styles.filterPillSelected : styles.filterPillDefault]}
    >
      <Text style={[styles.filterPillText, selected ? styles.filterPillTextSelected : styles.filterPillTextDefault]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}
function CheckOption({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="mr-4 flex-row items-center">
      <View
        className="h-[18px] w-[18px] items-center justify-center rounded-[5px] border"
        style={{
          borderColor: checked ? colors.berry : '#EEF2F6',
          backgroundColor: checked ? colors.berry : '#FFFFFF',
        }}
      >
        {checked ? <Ionicons name="checkmark" size={13} color="#FFFFFF" /> : null}
      </View>
      <Text className="ml-1.5 text-[13px] font-medium leading-[18px] text-[#94A3B8]">{label}</Text>
    </Pressable>
  );
}

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedFilter, setSelectedFilter] = useState('\uC804\uCCB4');
  const [checkedOptions, setCheckedOptions] = useState<string[]>(['\uC2E0\uADDC\uAC1C\uCCB4']);
  const cardWidth = useMemo(() => Math.floor((width - 40 - 10) / 2), [width]);
  const sortedListings = useMemo(
    () => [...listings].sort((a, b) => (b.listedAt ?? '').localeCompare(a.listedAt ?? '')),
    [],
  );

  const toggleOption = (label: string) => {
    setCheckedOptions((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 118 }} showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <AppHeader title="분양" subtitle="인증 브리더의 새 분양을 확인해보세요" showSearch showBell />
          <BillboardTicker category="listing" />

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
              <Text style={styles.sortText}>최신순</Text>
              <Ionicons name="chevron-down" size={15} color={Colors.subText} />
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
const styles = StyleSheet.create({
  sortText: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize + 1,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
  filterPill: {
    height: Spacing.xxl + Spacing.xs,
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.md,
  },
  filterPillSelected: {
    borderColor: Colors.badge,
    backgroundColor: Colors.badge,
    ...Shadows.card,
  },
  filterPillDefault: {
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  filterPillText: {
    fontSize: Typography.caption.fontSize + 1,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  filterPillTextSelected: {
    color: Colors.primary,
  },
  filterPillTextDefault: {
    color: Colors.subText,
  },
});



