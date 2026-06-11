import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

export function ReadyModal({ visible, title, description, onClose }: { visible: boolean; title: string; description?: string; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/45 px-6">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="w-full max-w-sm rounded-[26px] bg-white p-5 shadow-lg">
          <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-blush">
            <Ionicons name="checkmark-circle-outline" size={25} color={colors.berry} />
          </View>
          <Text className="mt-5 text-[18px] font-black text-ink">{title}</Text>
          {description ? <Text className="mt-2 text-[12px] leading-6 text-muted">{description}</Text> : null}
          <Pressable onPress={onClose} className="mt-6 items-center rounded-[16px] bg-berry py-4">
            <Text className="text-[13px] font-black text-white">확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
