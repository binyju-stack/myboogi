import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { MyListLayout } from '@/components/MyListLayout';
import { ReviewRatingSummary, ReviewTypeBadge } from '@/components/StarRating';
import { breeders } from '@/data/mockData';
import { getReviewSummary, myReviews } from '@/data/reviewData';

export default function MyReviewsScreen() {
  return (
    <MyListLayout title="내가 작성한 후기" eyebrow="MY REVIEW" description="내가 남긴 후기의 평점과 신뢰도 유형을 확인해요." count={myReviews.length}>
      {myReviews.map((review, index) => {
        const breeder = breeders.find((item) => item.id === review.breederId);
        const summary = getReviewSummary(review.breederId);

        return (
          <FadeInView key={review.id} delay={index * 45}>
            <AnimatedPressable onPress={() => router.push(`/breeder/${review.breederId}` as never)} className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-[13px] font-bold text-ink">{breeder?.name ?? '브리더'}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{review.species} · {review.createdAt}</Text>
                </View>
                <ReviewRatingSummary rating={review.rating} reviewCount={summary.totalReviews} size={15} />
              </View>
              <View className="mt-3">
                <ReviewTypeBadge type={review.reviewType} />
              </View>
              <Text className="mt-3 text-[12px] leading-6 text-ink" numberOfLines={2}>{review.content}</Text>
            </AnimatedPressable>
          </FadeInView>
        );
      })}
    </MyListLayout>
  );
}
