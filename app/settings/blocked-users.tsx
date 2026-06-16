import { Alert, Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { blockedUsers } from '@/data/mockData';

export default function BlockedUsersScreen() {
  return (
    <Page>
      <TopBar title="차단한 사용자" />

      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">BLOCKED USERS</Text>
        <Text className="mt-1 text-[24px] font-black text-ink">차단 목록을 관리해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">분쟁 방지를 위해 차단한 사용자를 한곳에서 확인합니다.</Text>
      </View>

      <View className="px-5 pt-5">
        {blockedUsers.map((user, index) => (
          <FadeInView key={user.id} delay={index * 45}>
            <View className="mb-3 rounded-[24px] border border-line bg-white p-4 shadow-sm">
              <View className="flex-row items-center">
                <Image source={{ uri: user.avatar }} className="h-12 w-12 rounded-[18px] bg-shell" />
                <View className="ml-3 flex-1">
                  <Text className="text-[13px] font-black text-ink">{user.nickname}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{user.userType} · {user.blockedAt} 차단</Text>
                </View>
                <AnimatedPressable onPress={() => Alert.alert('차단 해제 기능은 준비중입니다.')} className="rounded-full bg-blush px-3.5 py-2.5">
                  <Text className="text-[10px] font-black text-berry">차단 해제</Text>
                </AnimatedPressable>
              </View>
            </View>
          </FadeInView>
        ))}
      </View>
    </Page>
  );
}
