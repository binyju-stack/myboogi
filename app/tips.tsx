import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { careTips } from '@/mockData/tips';

const badgeTones = [
  { backgroundColor: '#EAF8EE', color: '#228B5A' },
  { backgroundColor: '#EAF5FF', color: '#2F80ED' },
  { backgroundColor: '#FFF1E6', color: '#E56B00' },
  { backgroundColor: '#F3E8FF', color: '#7C3AED' },
];

export default function TipsScreen() {
  return (
    <Page>
      <TopBar title="사육 꿀팁" />
      <View className="px-5 pb-4 pt-5">
        <Text className="text-[22px] font-bold leading-8 text-[#222222]">거북이와 더 건강하게 지내는 법</Text>
        <Text className="mt-1 text-[13px] font-medium leading-5 text-[#8A8F98]">
          초보 사육자에게 필요한 세팅과 관리 기준을 차근차근 정리했어요.
        </Text>

        {careTips.map((tip, index) => {
          const tone = badgeTones[index % badgeTones.length];
          return (
            <View key={tip.id} className="mt-5 overflow-hidden rounded-[18px] border border-[#ECECEC] bg-white">
              <Image source={{ uri: tip.thumbnail }} className="h-[176px] w-full bg-shell" resizeMode="cover" />
              <View className="p-4">
                <View className="self-start rounded-full px-2.5 py-1" style={{ backgroundColor: tone.backgroundColor }}>
                  <Text className="text-[11px] font-semibold leading-[15px]" style={{ color: tone.color }}>
                    {tip.category}
                  </Text>
                </View>
                <Text className="mt-2.5 text-[17px] font-bold leading-6 text-[#222222]">{tip.title}</Text>
                <Text className="mt-2 text-[13px] font-medium leading-5 text-[#8A8F98]">{tip.description}</Text>
                <Pressable
                  onPress={() => router.push(tip.relatedProductUrl as never)}
                  className="mt-4 flex-row items-center border-t border-[#F1F3F5] pt-3"
                >
                  <Text className="text-[13px] font-semibold leading-[18px] text-[#FF4F8B]">{tip.relatedProductText}</Text>
                  <Ionicons name="chevron-forward" size={14} color="#FF4F8B" />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </Page>
  );
}
