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
const menus: { label: string; description: string; icon: IconName; href?: string }[] = [
  { label: '회원관리', description: '회원 상태와 활동을 확인해요', icon: 'people-outline' },
  { label: '브리더 승인 관리', description: '브리더 인증 신청을 검토해요', icon: 'shield-checkmark-outline', href: '/admin/breeder-verifications' },
  { label: '신고 관리', description: '접수된 신고를 검토하고 처리해요', icon: 'flag-outline', href: '/admin/reports' },
  { label: '게시글 관리', description: '커뮤니티 게시글을 관리해요', icon: 'document-text-outline' },
  { label: '분양글 관리', description: '등록된 분양글을 관리해요', icon: 'storefront-outline' },
  { label: '배너 관리', description: '홈 배너 노출을 관리해요', icon: 'images-outline' },
  { label: '공지사항 관리', description: '공지사항을 작성하고 관리해요', icon: 'megaphone-outline' },
  { label: 'AI FAQ 관리', description: 'AI 상담 답변 기준을 관리해요', icon: 'sparkles-outline' },
];

export default function AdminScreen() {
  const [readyTitle, setReadyTitle] = useState('');

  return (
    <Page>
      <TopBar title="관리자 페이지" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">MYBOOGI ADMIN</Text>
        <Text className="mt-1 text-[24px] font-black tracking-[-0.8px] text-ink">서비스 운영을 관리해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">중요한 신청과 콘텐츠 상태를 모바일에서도 확인할 수 있어요.</Text>
      </View>

      <View className="px-5 pb-5 pt-6">
        {menus.map((item, index) => (
          <FadeInView key={item.label} delay={index * 45}>
            <AnimatedPressable onPress={() => item.href ? router.push(item.href as never) : setReadyTitle(`${item.label} 기능은 준비중입니다.`)} className="mb-3 flex-row items-center rounded-[22px] bg-white p-4 shadow-sm">
              <View className="h-12 w-12 items-center justify-center rounded-[17px] bg-blush"><Ionicons name={item.icon} size={21} color={colors.berry} /></View>
              <View className="ml-3 flex-1"><Text className="text-[13px] font-black text-ink">{item.label}</Text><Text className="mt-1 text-[9px] text-muted">{item.description}</Text></View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtle} />
            </AnimatedPressable>
          </FadeInView>
        ))}
      </View>
      <ReadyModal visible={Boolean(readyTitle)} title={readyTitle} onClose={() => setReadyTitle('')} />
    </Page>
  );
}
