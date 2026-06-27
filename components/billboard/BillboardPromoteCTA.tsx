import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Megaphone } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/theme';

type BillboardPromoteCTAProps = {
  targetType: 'post' | 'listing' | 'breeder' | 'notice';
  targetId: string;
  originalTitle: string;
};

export function BillboardPromoteCTA({ targetType, targetId, originalTitle }: BillboardPromoteCTAProps) {
  const openBillboardCreate = () => {
    router.push({
      pathname: '/billboard/create',
      params: {
        targetType,
        targetId,
        originalTitle,
      },
    } as never);
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Megaphone size={20} strokeWidth={2} color={Colors.primary} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>전광판으로 홍보하기</Text>
        <Text style={styles.description}>이 콘텐츠를 홈·분양·커뮤니티 상단에 노출할 수 있어요</Text>
      </View>
      <Pressable onPress={openBillboardCreate} style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>홍보하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
  },
  iconBox: {
    width: Spacing.xxl + Spacing.sm,
    height: Spacing.xxl + Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  textBox: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  description: {
    marginTop: Spacing.xxs,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  button: {
    marginLeft: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  buttonText: {
    color: Colors.card,
    fontSize: Typography.captionBold.fontSize,
    lineHeight: Typography.captionBold.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
});

