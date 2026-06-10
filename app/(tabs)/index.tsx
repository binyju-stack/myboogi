import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { CommunityMenuIcon, HomeFeedCard, PinkTurtle, RankingList } from '@/components/HomeCommunity';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { commentRankings, homeCommunityMenus, homeFeedPosts, viewRankings } from '@/data/homeMockData';

export default function HomeScreen() {
  return (
    <Page>
      <View className="overflow-hidden bg-berry px-4 pb-6 pt-3">
        <View className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-white/10" />
        <View className="flex-row items-center justify-between"><Text className="text-[20px] font-black tracking-tight text-white">마이부기</Text><Ionicons name="notifications-outline" size={20} color="white" /></View>
        <View className="mt-5 flex-row items-center">
          <View className="flex-1 pr-2"><Text className="text-[18px] font-black leading-6 text-white">마이부기 핫한 게시글</Text><Text className="mt-2 text-[10px] font-semibold leading-4 text-white/85">거북이 집사들의 따뜻한 이야기와{'\n'}유용한 사육 정보를 만나보세요!</Text></View>
          <PinkTurtle size={118} dark />
        </View>
      </View>

      <View className="border-b-8 border-[#F7F5F7] bg-white px-4 pb-5 pt-4">
        <Text className="mb-3 text-[14px] font-black text-ink">오늘 핫한 마이부기 소식을 알아볼까요?</Text>
        <View className="flex-row gap-2">
          <Pressable onPress={() => router.push('/community')} className="flex-1 overflow-hidden rounded-xl border border-line bg-white p-3"><View className="flex-row items-center"><View className="rounded bg-blue px-1.5 py-1"><Text className="text-[8px] font-black text-muted">자유</Text></View><Text className="ml-2 text-[9px] text-muted">조회수 HOT</Text></View><Text className="mt-2 text-[11px] font-black leading-4 text-ink">우리집 거북이의 귀여운 순간을 공유해요</Text><View className="mt-3 h-12 items-end justify-center"><PinkTurtle size={68} /></View></Pressable>
          <Pressable onPress={() => router.push('/disease')} className="flex-1 overflow-hidden rounded-xl border border-line bg-white p-3"><View className="flex-row items-center"><View className="rounded bg-mint px-1.5 py-1"><Text className="text-[8px] font-black text-moss">사육정보</Text></View><Text className="ml-2 text-[9px] text-muted">댓글 HOT</Text></View><Text className="mt-2 text-[11px] font-black leading-4 text-ink">초보 집사를 위한 건강 관리 체크리스트</Text><View className="mt-3 h-12 items-end justify-center"><PinkTurtle size={68} /></View></Pressable>
        </View>
      </View>

      <View className="border-b-8 border-[#F7F5F7] bg-white px-4 pb-3 pt-5">
        <Text className="text-[15px] font-black text-ink">마이부기 커뮤니티 <Text className="text-berry">›</Text></Text>
        <View className="mt-3 flex-row gap-2"><View className="rounded-full bg-berry px-3 py-1.5"><Text className="text-[10px] font-black text-white">전체</Text></View><View className="rounded-full bg-blue px-3 py-1.5"><Text className="text-[10px] font-bold text-muted">인기글</Text></View><View className="rounded-full bg-mint px-3 py-1.5"><Text className="text-[10px] font-bold text-moss">최신글</Text></View><View className="rounded-full bg-cream px-3 py-1.5"><Text className="text-[10px] font-bold text-muted">공지</Text></View></View>
        <Pressable className="mt-4 flex-row items-center rounded-xl bg-[#F7F5F7] px-3 py-2.5"><Ionicons name="search" size={16} color={colors.muted} /><Text className="ml-2 text-[11px] text-muted">궁금한 내용을 검색해보세요</Text></Pressable>
        <View className="mt-5 flex-row flex-wrap">{homeCommunityMenus.map((menu) => <CommunityMenuIcon key={menu.label} label={menu.label} icon={menu.icon} />)}</View>
      </View>

      <View className="border-b-8 border-[#F7F5F7] bg-white p-4">
        <View className="overflow-hidden rounded-xl bg-[#8E284A] px-4 py-4"><View className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10" /><View className="flex-row items-center"><View className="flex-1"><Text className="text-[10px] font-bold text-white/75">마이부기 회원 특별 혜택</Text><Text className="mt-1 text-[15px] font-black text-white">거북이 먹이 80% 할인</Text><Text className="mt-1 text-[9px] text-white/75">건강한 먹이를 특별한 가격으로 만나보세요</Text></View><PinkTurtle size={82} dark /></View></View>
      </View>

      {homeFeedPosts.map((post) => <HomeFeedCard key={post.id} post={post} />)}
      <RankingList title="조회수순 인기글" items={viewRankings} />
      <RankingList title="댓글순 인기글" items={commentRankings} />
    </Page>
  );
}
