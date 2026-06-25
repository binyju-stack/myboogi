import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { VerifiedBadge } from '@/components/common';
import { EmptyList, MyListLayout } from '@/components/MyListLayout';
import { useMockUserState } from '@/components/MockUserState';
import { colors } from '@/constants/theme';
import { followingBreeders } from '@/data/followData';
import { breeders } from '@/data/mockData';

export default function FollowingBreedersScreen() {
  const { followedBreederIds, toggleFollow } = useMockUserState();
  const followed = breeders
    .filter((item) => followedBreederIds.includes(item.id))
    .map((breeder) => ({ breeder, meta: followingBreeders.find((item) => item.breederId === breeder.id) }));

  return (
    <MyListLayout title="팔로우 브리더" eyebrow="FOLLOWING SHOP" description="팔로우한 브리더의 새 분양과 활동을 모아볼 수 있어요." count={followed.length}>
      {followed.length ? (
        followed.map(({ breeder, meta }, index) => (
          <FadeInView key={breeder.id} delay={index * 50}>
            <AnimatedPressable onPress={() => router.push(`/breeder/${breeder.id}` as never)} className="mb-3 rounded-[24px] border border-line bg-white p-4 shadow-sm">
              <View className="flex-row items-center">
                <View>
                  <Image source={{ uri: breeder.logo ?? breeder.avatar }} className="h-16 w-16 rounded-[20px] bg-shell" />
                  {meta?.isNew ? <Text className="absolute -right-1 -top-1 rounded-full bg-berry px-2 py-1 text-[8px] font-bold text-white">NEW</Text> : null}
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center">
                    <VerifiedBadge label={breeder.verificationBadgeLabel ?? breeder.badge} />
                  </View>
                  <Text className="mt-2 text-[14px] font-bold text-ink">{breeder.name}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{breeder.specialty ?? '전문 품종 준비중'}</Text>
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="people-outline" size={12} color={colors.muted} />
                    <Text className="ml-1 text-[9px] font-bold text-muted">팔로워 {(breeder.followers + 1).toLocaleString()}</Text>
                    {(breeder.newListingCount ?? 0) > 0 ? <Text className="ml-2 rounded-full bg-blush px-2 py-1 text-[8px] font-bold text-berry">신규 {breeder.newListingCount}</Text> : null}
                  </View>
                </View>
                <AnimatedPressable
                  onPress={(event) => {
                    event.stopPropagation();
                    toggleFollow(breeder.id);
                  }}
                  className="rounded-full bg-blush px-3 py-2"
                >
                  <Text className="text-[9px] font-bold text-berry">팔로잉</Text>
                </AnimatedPressable>
              </View>
              <View className="mt-4 rounded-[18px] bg-soft px-4 py-3">
                <Text className="text-[10px] font-bold text-muted">최근 활동</Text>
                <Text className="mt-1 text-[12px] font-bold text-ink">{meta?.recentActivity ?? '최근 활동 준비중'}</Text>
              </View>
            </AnimatedPressable>
          </FadeInView>
        ))
      ) : (
        <EmptyList title="팔로우한 브리더가 없어요" description="관심있는 브리더를 팔로우해보세요." />
      )}
    </MyListLayout>
  );
}
