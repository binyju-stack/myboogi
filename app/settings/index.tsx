import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { Alert, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

type SettingMenu = {
  label: string;
  description: string;
  icon: IconName;
  href?: string;
  value?: string;
  danger?: boolean;
};

const menus: SettingMenu[] = [
  { label: '프로필 수정', description: '닉네임, 소개, SNS 정보를 관리해요', icon: 'person-outline', href: '/mypage/edit' },
  { label: '알림 설정', description: '활동과 서비스 알림을 선택해요', icon: 'notifications-outline', href: '/settings/notifications' },
  { label: '차단한 사용자', description: '차단 목록을 확인하고 관리해요', icon: 'ban-outline', href: '/settings/blocked-users' },
  { label: '문의하기', description: '서비스 이용 중 궁금한 점을 보내요', icon: 'help-circle-outline', href: '/settings/contact' },
  { label: '공지사항', description: '마이부기 소식을 확인해요', icon: 'megaphone-outline', href: '/notices' },
  { label: '이용약관', description: '서비스 이용 기준을 확인해요', icon: 'document-text-outline', href: '/settings/terms' },
  { label: '개인정보처리방침', description: '개인정보 처리 기준을 확인해요', icon: 'shield-checkmark-outline', href: '/settings/privacy' },
  { label: '앱 버전', description: '현재 설치된 앱 버전', icon: 'information-circle-outline', value: '1.0.0' },
  { label: '로그아웃', description: '현재 계정에서 로그아웃해요', icon: 'log-out-outline', danger: true },
];

export default function SettingsScreen() {
  return (
    <Page>
      <TopBar title="설정" />

      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-bold text-berry">MYBOOGI SETTINGS</Text>
        <Text className="mt-1 text-[24px] font-bold text-ink">앱 설정을 관리해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">알림, 차단, 약관 등 출시 전 기본 설정 UI를 준비했어요.</Text>
      </View>

      <View className="px-5 pt-5">
        <FadeInView>
          <View className="bg-white py-2">
            {menus.map((item, index) => (
              <AnimatedPressable
                key={item.label}
                onPress={() => {
                  if (item.href) router.push(item.href as never);
                  else if (item.danger) Alert.alert('로그아웃 기능은 준비중입니다.');
                }}
                className={`flex-row items-center py-4 ${index ? 'border-t border-line' : ''}`}
              >
                <View className={`h-11 w-11 items-center justify-center rounded-[15px] ${item.danger ? 'bg-[#FFF1F1]' : 'bg-soft'}`}>
                  <Ionicons name={item.icon} size={19} color={item.danger ? '#E45B5B' : colors.berry} />
                </View>
                <View className="ml-3 flex-1">
                  <Text className={`text-[13px] font-bold ${item.danger ? 'text-[#E45B5B]' : 'text-ink'}`}>{item.label}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{item.description}</Text>
                </View>
                {item.value ? <Text className="text-[11px] font-bold text-muted">{item.value}</Text> : <Ionicons name="chevron-forward" size={16} color={colors.subtle} />}
              </AnimatedPressable>
            ))}
          </View>
        </FadeInView>
      </View>
    </Page>
  );
}
