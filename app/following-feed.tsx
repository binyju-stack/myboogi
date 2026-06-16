import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { useMockUserState } from '@/components/MockUserState';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { followActivities } from '@/data/followData';

function EmptyFeed() {
  return (
    <View className="mx-5 mt-6 items-center rounded-[28px] bg-white px-5 py-14 shadow-sm">
      <View className="h-14 w-14 items-center justify-center rounded-full bg-blush">
        <Ionicons name="people-outline" size={24} color={colors.berry} />
      </View>
      <Text className="mt-4 text-[14px] font-black text-ink">관심있는 브리더를 팔로우해보세요</Text>
      <Text className="mt-2 text-center text-[10px] leading-5 text-muted">팔로우한 브리더의 신규 분양과 후기 소식이 이곳에 표시됩니다.</Text>
    </View>
  );
}

export default function FollowingFeedScreen() {
  const { followedBreederIds } = useMockUserState();
  const activities = followActivities.filter((item) => followedBreederIds.includes(item.breederId));

  return (
    <Page>
      <TopBar title="팔로우 피드" />
      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">FOLLOWING FEED</Text>
        <Text className="mt-1 text-[24px] font-black text-ink">브리더 소식</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">팔로우한 브리더의 신규 분양과 활동을 확인해요.</Text>
      </View>

      <View className="px-5 pb-5 pt-6">
        {activities.length ? (
          activities.map((activity, index) => (
            <FadeInView key={activity.id} delay={index * 50}>
              <AnimatedPressable
                onPress={() => router.push(activity.targetType === 'listing' ? `/listing/${activity.targetId}` as never : `/breeder/${activity.targetId}` as never)}
                className="mb-3 rounded-[24px] bg-white p-4 shadow-sm"
              >
                <View className="flex-row items-center">
                  <Image source={{ uri: activity.breederLogo }} className="h-12 w-12 rounded-[16px] bg-shell" />
                  <View className="ml-3 flex-1">
                    <Text className="text-[13px] font-black text-ink">{activity.breederName}</Text>
                    <Text className="mt-1 text-[9px] text-muted">{activity.createdAt}</Text>
                  </View>
                  <View className="rounded-full bg-blush px-2.5 py-1.5">
                    <Text className="text-[9px] font-black text-berry">{activity.activityType === 'listing' ? '신규 분양' : activity.activityType === 'completed' ? '분양완료' : activity.activityType === 'review' ? '후기' : '대표 개체'}</Text>
                  </View>
                </View>
                <View className="mt-4 rounded-[18px] bg-soft p-4">
                  <Text className="text-[15px] font-black text-ink">{activity.title}</Text>
                  <Text className="mt-1 text-[11px] text-muted">{activity.description}</Text>
                  {activity.listingStatus ? <Text className="mt-3 self-start rounded-full bg-berry px-2.5 py-1.5 text-[9px] font-black text-white">{activity.listingStatus}</Text> : null}
                </View>
                <View className="mt-4 flex-row items-center justify-center rounded-[16px] bg-blush py-3">
                  <Text className="text-[11px] font-black text-berry">상세 이동</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.berry} />
                </View>
              </AnimatedPressable>
            </FadeInView>
          ))
        ) : (
          <EmptyFeed />
        )}
      </View>
    </Page>
  );
}
