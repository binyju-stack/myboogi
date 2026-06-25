import { Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';

const termsText = [
  '마이부기는 반려 거북이 정보 공유와 분양 정보를 돕기 위한 서비스입니다.',
  '회원은 다른 이용자에게 정확한 정보를 제공하고, 허위 정보나 분쟁을 유발할 수 있는 게시물을 등록하지 않아야 합니다.',
  '분양, 문의, 후기 기능은 서비스 정책에 따라 제한될 수 있으며, 안전결제 기능은 추후 별도 약관과 함께 제공될 예정입니다.',
  '운영 정책을 위반한 콘텐츠는 신고 또는 관리자 검토 후 숨김 처리될 수 있습니다.',
].join('\n\n');

export default function TermsScreen() {
  return (
    <Page>
      <TopBar title="이용약관" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-bold text-berry">TERMS</Text>
        <Text className="mt-1 text-[24px] font-bold text-ink">이용약관</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">앱스토어 제출 전 검토용 Mock 약관입니다.</Text>
      </View>
      <View className="px-5 pt-5">
        <View className="rounded-[26px] bg-white p-5 shadow-sm">
          <Text className="text-[13px] leading-7 text-ink">{termsText}</Text>
        </View>
      </View>
    </Page>
  );
}
