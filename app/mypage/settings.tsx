import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { ReadyModal } from '@/components/ReadyModal';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
type SettingItem = { label: string; description: string; icon: IconName; href?: string; danger?: boolean };

const accountItems: SettingItem[] = [
  { label: '프로필 수정', description: '닉네임과 소개, 문의 정보를 관리해요', icon: 'person-outline', href: '/mypage/profile' },
  { label: '알림 설정', description: '받고 싶은 알림을 설정해요', icon: 'notifications-outline', href: '/notifications' },
];

const supportItems: SettingItem[] = [
  { label: '앱 소개 보기', description: '마이부기의 핵심 기능을 다시 확인해요', icon: 'sparkles-outline', href: '/onboarding' },
  { label: '문의하기', description: '궁금한 점을 마이부기에 문의해요', icon: 'help-circle-outline' },
  { label: '이용약관', description: '서비스 이용약관을 확인해요', icon: 'document-text-outline' },
  { label: '개인정보처리방침', description: '개인정보 처리 기준을 확인해요', icon: 'shield-checkmark-outline' },
  { label: '로그아웃', description: '현재 계정에서 로그아웃해요', icon: 'log-out-outline', danger: true },
];

function SettingGroup({ title, items, onReady }: { title: string; items: SettingItem[]; onReady: (title: string) => void }) {
  return (
    <View className="mt-5 rounded-[26px] bg-white px-5 py-2 shadow-sm">
      <Text className="pb-2 pt-4 text-[10px] font-bold text-berry">{title}</Text>
      {items.map((item, index) => (
        <AnimatedPressable
          key={item.label}
          onPress={() => item.href ? router.push(item.href as never) : onReady(`${item.label} 기능은 준비중입니다.`)}
          className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}
        >
          <View className={`h-11 w-11 items-center justify-center rounded-[15px] ${item.danger ? 'bg-[#FFF1F1]' : 'bg-soft'}`}>
            <Ionicons name={item.icon} size={19} color={item.danger ? '#E45B5B' : colors.ink} />
          </View>
          <View className="ml-3 flex-1">
            <Text className={`text-[13px] font-bold ${item.danger ? 'text-[#E45B5B]' : 'text-ink'}`}>{item.label}</Text>
            <Text className="mt-1 text-[9px] text-muted">{item.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.subtle} />
        </AnimatedPressable>
      ))}
    </View>
  );
}

export default function SettingsScreen() {
  const [readyTitle, setReadyTitle] = useState('');

  return (
    <Page>
      <TopBar title="설정" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-bold text-berry">MYBOOGI SETTINGS</Text>
        <Text className="mt-1 text-[24px] font-bold text-ink">내게 맞게 설정해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">계정 정보와 서비스 이용 설정을 관리할 수 있어요.</Text>
      </View>

      <View className="px-5 pb-5">
        <FadeInView>
          <SettingGroup title="계정" items={accountItems} onReady={setReadyTitle} />
        </FadeInView>
        <FadeInView delay={60}>
          <SettingGroup title="고객지원 및 약관" items={supportItems} onReady={setReadyTitle} />
        </FadeInView>
        <Text className="pb-5 pt-6 text-center text-[9px] text-subtle">마이부기 앱 버전 1.0.0</Text>
      </View>

      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}
