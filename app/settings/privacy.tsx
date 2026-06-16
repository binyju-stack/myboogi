import { Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';

const privacyText = [
  '마이부기는 서비스 제공을 위해 회원 프로필, 게시글, 댓글, 문의 내역 등 필요한 최소 정보를 처리합니다.',
  '현재 화면은 Mock UI이며 실제 저장소 연결 전까지 입력 정보는 서버에 저장되지 않습니다.',
  '알림, 차단, 문의 기능에서 생성되는 데이터는 추후 DB 연결 시 개인정보처리방침에 맞춰 보관 및 삭제 정책을 제공합니다.',
  '회원은 자신의 개인정보 열람, 수정, 삭제를 요청할 수 있으며 세부 절차는 정식 출시 전 보완됩니다.',
].join('\n\n');

export default function PrivacyScreen() {
  return (
    <Page>
      <TopBar title="개인정보처리방침" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">PRIVACY</Text>
        <Text className="mt-1 text-[24px] font-black text-ink">개인정보처리방침</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">출시 전 검토를 위한 Mock 개인정보 안내입니다.</Text>
      </View>
      <View className="px-5 pt-5">
        <View className="rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[13px] leading-7 text-ink">{privacyText}</Text>
        </View>
      </View>
    </Page>
  );
}
