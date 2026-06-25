import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

import { AnimatedPressable } from './AnimatedPressable';
import { colors } from '@/constants/theme';

export function ReportActionMenu({ visible, canBlock = true, onReport, onBlock, onClose }: { visible: boolean; canBlock?: boolean; onReport: () => void; onBlock: () => void; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/35 px-4 pb-6">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="rounded-[28px] bg-white p-4 shadow-lg">
          <View className="items-center pb-3 pt-1"><View className="h-1 w-10 rounded-full bg-line" /></View>
          <AnimatedPressable onPress={onReport} className="flex-row items-center rounded-[18px] px-3 py-4">
            <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-[#FFF1F1]"><Ionicons name="flag-outline" size={19} color="#E45B5B" /></View>
            <View className="ml-3 flex-1"><Text className="text-[13px] font-bold text-ink">신고하기</Text><Text className="mt-1 text-[9px] text-muted">운영정책에 맞지 않는 콘텐츠를 알려주세요.</Text></View>
            <Ionicons name="chevron-forward" size={16} color={colors.subtle} />
          </AnimatedPressable>
          {canBlock ? (
            <AnimatedPressable onPress={onBlock} className="mt-1 flex-row items-center rounded-[18px] px-3 py-4">
              <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-soft"><Ionicons name="ban-outline" size={19} color={colors.ink} /></View>
              <View className="ml-3 flex-1"><Text className="text-[13px] font-bold text-ink">차단하기</Text><Text className="mt-1 text-[9px] text-muted">해당 사용자의 콘텐츠를 더 이상 보지 않아요.</Text></View>
              <Ionicons name="chevron-forward" size={16} color={colors.subtle} />
            </AnimatedPressable>
          ) : null}
          <AnimatedPressable onPress={onClose} className="mt-2 items-center rounded-[18px] bg-soft py-4"><Text className="text-[12px] font-bold text-muted">취소</Text></AnimatedPressable>
        </View>
      </View>
    </Modal>
  );
}
