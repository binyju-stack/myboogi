import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BillboardPromoteCTA } from '@/components/billboard/BillboardPromoteCTA';
import { createPostCategories } from '@/data/communityData';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type CreatedPost = {
  id: string;
  title: string;
};

export default function CommunityCreateScreen() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState(createPostCategories[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdPost, setCreatedPost] = useState<CreatedPost | null>(null);

  const displayTitle = useMemo(() => title.trim() || '새 커뮤니티 글', [title]);

  const handleSubmit = () => {
    setCreatedPost({
      id: `post-${Date.now()}`,
      title: displayTitle,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton} accessibilityRole="button">
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>글쓰기</Text>
        <View style={styles.headerButton} />
      </View>

      <KeyboardAvoidingView style={styles.content} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Spacing.xxl * 3 + insets.bottom }]}
        >
          <View style={styles.intro}>
            <Text style={styles.screenTitle}>커뮤니티에 이야기를 공유해보세요</Text>
            <Text style={styles.screenDescription}>사육 일상, 질문, 성장 기록을 가볍게 남길 수 있어요.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionEyebrow}>CATEGORY</Text>
            <Text style={styles.sectionTitle}>카테고리 선택</Text>
            <View style={styles.categoryList}>
              {createPostCategories.map((item) => {
                const selected = category === item;
                return (
                  <Pressable key={item} onPress={() => setCategory(item)} style={[styles.categoryPill, selected ? styles.categorySelected : null]} accessibilityRole="button">
                    <Text style={[styles.categoryText, selected ? styles.categoryTextSelected : null]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.fieldLabel}>제목</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="제목을 입력해주세요"
              placeholderTextColor={Colors.subText}
              style={styles.input}
            />

            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>내용</Text>
              <Text style={styles.countText}>{content.length} / 2,000</Text>
            </View>
            <TextInput
              value={content}
              onChangeText={setContent}
              multiline
              maxLength={2000}
              textAlignVertical="top"
              placeholder="함께 나누고 싶은 이야기를 자세히 적어주세요"
              placeholderTextColor={Colors.subText}
              style={[styles.input, styles.contentInput]}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>이미지 추가</Text>
            <Text style={styles.sectionDescription}>사진을 추가하면 상황을 더 정확하게 공유할 수 있어요.</Text>
            <Pressable style={styles.imageBox} accessibilityRole="button">
              <View style={styles.imageIconBox}>
                <Ionicons name="images-outline" size={23} color={Colors.primary} />
              </View>
              <Text style={styles.imageTitle}>사진 추가하기</Text>
              <Text style={styles.imageDescription}>최대 10장까지 등록할 수 있어요</Text>
            </Pressable>
          </View>

          {createdPost ? (
            <View style={styles.completeCard}>
              <Text style={styles.completeTitle}>게시글 등록 완료</Text>
              <Text style={styles.completeDescription}>작성한 글을 전광판으로 더 많은 사용자에게 보여줄 수 있어요.</Text>
              <BillboardPromoteCTA targetType="post" targetId={createdPost.id} originalTitle={createdPost.title} />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        <Pressable onPress={handleSubmit} style={styles.submitButton} accessibilityRole="button">
          <Text style={styles.submitText}>등록</Text>
        </Pressable>
      </View>
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.text,
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: Typography.subtitle.fontWeight,
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
  card: {
    marginBottom: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
  },
  sectionEyebrow: {
    color: Colors.primary,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: Typography.subtitle.fontWeight,
  },
  sectionDescription: {
    marginTop: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  categoryPill: {
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  categorySelected: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  categoryTextSelected: {
    color: Colors.card,
    fontWeight: Typography.captionBold.fontWeight,
  },
  fieldLabel: {
    color: Colors.text,
    fontSize: Typography.captionBold.fontSize,
    lineHeight: Typography.captionBold.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  countText: {
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  input: {
    minHeight: Spacing.xxl + Spacing.md,
    marginTop: Spacing.sm,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.body.lineHeight,
    fontWeight: Typography.body.fontWeight,
  },
  contentInput: {
    minHeight: Spacing.xxl * 4,
    paddingVertical: Spacing.md,
  },
  imageBox: {
    marginTop: Spacing.md,
    aspectRatio: 4 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.xl,
    backgroundColor: Colors.badge,
  },
  imageIconBox: {
    width: Spacing.xxl + Spacing.lg,
    height: Spacing.xxl + Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.card,
  },
  imageTitle: {
    marginTop: Spacing.md,
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  imageDescription: {
    marginTop: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
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

