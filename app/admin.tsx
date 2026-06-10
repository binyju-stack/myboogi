import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';

const menus = ['회원관리', '브리더 승인', '인증 브리더 승인', '게시글 관리', '분양글 관리', '배너 관리', '공지사항 관리', 'AI FAQ 관리'];

export default function AdminScreen() {
  return (
    <Page>
      <TopBar title="관리자 페이지" />
      <View className="bg-blush p-4"><Text className="text-lg font-black text-ink">MyBoogi Admin</Text><Text className="mt-1 text-xs text-muted">현재는 관리자 UI 구조만 준비되어 있습니다.</Text></View>
      <View className="flex-row flex-wrap justify-between p-4">{menus.map((menu, index) => <View key={menu} className="mb-3 w-[48%] rounded-2xl border border-line bg-white p-4"><View className="h-10 w-10 items-center justify-center rounded-xl bg-shell"><Ionicons name={['people-outline', 'checkmark-circle-outline', 'shield-checkmark-outline', 'document-text-outline', 'storefront-outline', 'images-outline', 'megaphone-outline', 'sparkles-outline'][index] as never} size={20} color={colors.berry} /></View><Text className="mt-3 text-sm font-black text-ink">{menu}</Text><Text className="mt-1 text-[10px] text-muted">관리 화면 준비중</Text></View>)}</View>
    </Page>
  );
}
