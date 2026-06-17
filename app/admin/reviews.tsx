import { Alert, Text, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { AdminListLayout } from '@/components/AdminListLayout';
import { ReviewRatingSummary, ReviewTypeBadge } from '@/components/StarRating';
import { adminReviewRows, getReviewSummary, reviewStatusLabels } from '@/data/reviewData';

const statusClass = {
  active: 'bg-mint text-moss',
  hidden: 'bg-soft text-muted',
  pending: 'bg-cream text-[#F59E0B]',
} as const;

export default function AdminReviewsScreen() {
  const showReady = (label: string) => Alert.alert(`${label} 기능은 준비중입니다.`);

  return (
    <AdminListLayout title="후기 관리" description="후기 신뢰도 유형, 신고 수, 노출 상태를 검토해요." count={adminReviewRows.length}>
      {adminReviewRows.map((review, index) => {
        const [bgClass, textClass] = statusClass[review.status].split(' ');
        const summary = getReviewSummary(review.breederId);

        return (
          <FadeInView key={review.id} delay={index * 45}>
            <View className="mb-3 rounded-[22px] border border-line bg-white p-4 shadow-sm">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-[13px] font-black text-ink">{review.author}</Text>
                  <Text className="mt-1 text-[9px] text-muted">{review.breederName} · {review.createdAt}</Text>
                </View>
                <ReviewRatingSummary rating={review.rating} reviewCount={summary.totalReviews} size={15} />
              </View>

              <View className="mt-3 flex-row flex-wrap items-center">
                <ReviewTypeBadge type={review.reviewType} />
                <View className={`ml-2 rounded-full px-2.5 py-1.5 ${bgClass}`}>
                  <Text className={`text-[9px] font-black ${textClass}`}>{reviewStatusLabels[review.status]}</Text>
                </View>
                <Text className="ml-auto text-[9px] font-bold text-muted">신고 {review.reportCount}</Text>
              </View>

              <Text className="mt-3 text-[11px] leading-5 text-muted" numberOfLines={2}>{review.content}</Text>

              <View className="mt-4 flex-row">
                <AnimatedPressable onPress={() => showReady('상세보기')} className="mr-2 flex-1 items-center rounded-[15px] bg-soft py-3">
                  <Text className="text-[10px] font-black text-ink">상세보기</Text>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => showReady('숨김')} className="mr-2 flex-1 items-center rounded-[15px] bg-ink py-3">
                  <Text className="text-[10px] font-black text-white">숨김</Text>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => showReady('복구')} className="flex-1 items-center rounded-[15px] bg-blush py-3">
                  <Text className="text-[10px] font-black text-berry">복구</Text>
                </AnimatedPressable>
              </View>
            </View>
          </FadeInView>
        );
      })}
    </AdminListLayout>
  );
}
