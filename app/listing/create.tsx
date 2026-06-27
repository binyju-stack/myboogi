import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BillboardPromoteCTA } from '@/components/billboard/BillboardPromoteCTA';
import { emptyListingDraft, ListingForm, type ListingDraft } from '@/components/ListingForm';
import { ReadyModal } from '@/components/ReadyModal';
import { xpMessages } from '@/data/levelData';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type CreatedListing = {
  id: string;
  title: string;
};

export default function ListingCreateScreen() {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<ListingDraft>(emptyListingDraft);
  const [readyVisible, setReadyVisible] = useState(false);
  const [readyTitle, setReadyTitle] = useState(`분양글 등록 기능은 준비중입니다.\n${xpMessages.listing}`);
  const [createdListing, setCreatedListing] = useState<CreatedListing | null>(null);

  const listingTitle = useMemo(() => {
    const species = draft.species.trim();
    const stage = draft.stage.trim();
    if (species && stage) return `${species} ${stage}`;
    return species || '새 분양글';
  }, [draft.species, draft.stage]);

  const updateDraft = (key: keyof ListingDraft, value: string) => setDraft((current) => ({ ...current, [key]: value }));

  const showReady = (title: string) => {
    setReadyTitle(title);
    setReadyVisible(true);
  };

  const handleSubmit = () => {
    setCreatedListing({
      id: `listing-${Date.now()}`,
      title: listingTitle,
    });
    showReady(`분양글 등록 완료\n${xpMessages.listing}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton} accessibilityRole="button">
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>분양글 등록</Text>
        <Pressable onPress={() => showReady('임시저장 기능은 준비중입니다.')} style={styles.saveButton} accessibilityRole="button">
          <Text style={styles.saveText}>임시저장</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView style={styles.content} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Spacing.xxl * 3 + insets.bottom }]}
        >
          <View style={styles.intro}>
            <Text style={styles.screenTitle}>새 가족을 기다리는 거북이를 소개해주세요</Text>
            <Text style={styles.screenDescription}>정확하고 자세한 정보가 좋은 인연을 만나는 첫 단계예요.</Text>
          </View>

          <ListingForm draft={draft} onChange={updateDraft} />

          {createdListing ? (
            <View style={styles.completeCard}>
              <Text style={styles.completeTitle}>분양글 등록 완료</Text>
              <Text style={styles.completeDescription}>작성한 분양글을 전광판으로 더 많은 사용자에게 보여줄 수 있어요.</Text>
              <BillboardPromoteCTA targetType="listing" targetId={createdListing.id} originalTitle={createdListing.title} />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        <Pressable onPress={handleSubmit} style={styles.submitButton} accessibilityRole="button">
          <Text style={styles.submitText}>분양글 등록하기</Text>
        </Pressable>
      </View>

      <ReadyModal visible={readyVisible} title={readyTitle} description="작성한 내용은 실제 DB에 저장되지 않는 mock 상태예요." onClose={() => setReadyVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerButton: {
    width: Spacing.xxl + Spacing.sm,
    height: Spacing.xxl + Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: Colors.text,
    fontSize: Typography.heading.fontSize,
    lineHeight: Typography.heading.lineHeight,
    fontWeight: Typography.body.fontWeight,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.text,
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: Typography.subtitle.fontWeight,
  },
  saveButton: {
    minWidth: Spacing.xxl * 2,
    height: Spacing.xxl + Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: Colors.primary,
    fontSize: Typography.captionBold.fontSize,
    lineHeight: Typography.captionBold.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  intro: {
    marginBottom: Spacing.lg,
  },
  screenTitle: {
    color: Colors.text,
    fontSize: Typography.title.fontSize,
    lineHeight: Typography.title.lineHeight,
    fontWeight: Typography.title.fontWeight,
  },
  screenDescription: {
    marginTop: Spacing.sm,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  completeCard: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
  },
  completeTitle: {
    color: Colors.text,
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: Typography.subtitle.fontWeight,
  },
  completeDescription: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  bottomBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
  },
  submitText: {
    color: Colors.card,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
});

