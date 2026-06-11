import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { VerifiedBadge } from '@/components/common';
import { EmptyList, MyListLayout } from '@/components/MyListLayout';
import { useMockUserState } from '@/components/MockUserState';
import { breeders } from '@/data/mockData';

export default function FollowingBreedersScreen() {
  const { followedBreederIds, toggleFollow } = useMockUserState();
  const followed = breeders.filter((item) => followedBreederIds.includes(item.id));
  return <MyListLayout title="팔로우 브리더" eyebrow="FOLLOWING SHOP" description="팔로우한 브리더의 새 분양 소식을 놓치지 마세요." count={followed.length}>{followed.length ? followed.map((item, index) => <FadeInView key={item.id} delay={index * 50}><AnimatedPressable onPress={() => router.push(`/breeder/${item.id}`)} className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm"><View className="flex-row items-center"><Image source={{ uri: item.avatar }} className="h-16 w-16 rounded-full bg-shell" /><View className="ml-3 flex-1"><VerifiedBadge label={item.badge} /><Text className="mt-2 text-[14px] font-black text-ink">{item.name}</Text><Text className="mt-1 text-[9px] text-muted">팔로워 {(item.followers + 1).toLocaleString()} · 평점 {item.rating}</Text></View><AnimatedPressable onPress={(event) => { event.stopPropagation(); toggleFollow(item.id); }} className="rounded-full bg-blush px-3 py-2"><Text className="text-[9px] font-black text-berry">팔로잉</Text></AnimatedPressable></View><Text className="mt-3 text-[10px] leading-5 text-muted" numberOfLines={2}>{item.intro}</Text></AnimatedPressable></FadeInView>) : <EmptyList title="팔로우한 브리더가 없어요" description="마음에 드는 브리더를 팔로우하고 새 소식을 받아보세요." />}</MyListLayout>;
}
