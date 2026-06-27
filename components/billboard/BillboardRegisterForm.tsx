import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckCircle2, Clock3, Megaphone, Ticket } from 'lucide-react-native';

import { billboardTargetOptions, mockBillboardPolicy, mockBillboardSlots, mockBillboardTickets } from '@/mocks/billboard';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';
import type { BillboardSlot, BillboardSubmission, BillboardTargetType } from '@/types/billboard';

type RouteTargetType = BillboardTargetType;

function getSingleParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function normalizeTargetType(value: string | string[] | undefined): BillboardTargetType | undefined {
  const targetType = getSingleParam(value) as RouteTargetType | undefined;
  if (targetType === 'post' || targetType === 'listing' || targetType === 'breeder' || targetType === 'notice') return targetType;
  return undefined;
}

const copy = {
  ticketCount: '보유 이용권',
  monthlyUsage: '이번 달 사용',
  remainingTickets: '남은 이용권',
  ticketUnit: '장',
  originalContent: '원본 콘텐츠',
  exposureTitle: '전광판 노출 제목',
  titlePlaceholder: '전광판에 노출할 제목을 입력하세요',
  targetLabel: '연결 대상',
  exposureLabel: '노출 시간',
  slotLabel: '예약 시간',
  previewLabel: '미리보기',
  submit: '전광판 등록하기',
  ready: '준비중',
  complete: '등록 완료',
  completeDescription: '이용권 1장이 mock으로 차감되었고, 상태는 scheduled로 처리되었습니다.',
  noTicket: '이용권이 부족합니다',
};

const exposureOptions = [
  { label: '1시간', value: '1h', disabled: false },
  { label: '2시간', value: '2h', disabled: true },
  { label: '6시간', value: '6h', disabled: true },
  { label: '24시간', value: '24h', disabled: true },
] as const;

function formatSlotTime(slot: BillboardSlot) {
  const start = new Date(slot.startAt);
  const end = new Date(slot.endAt);
  const startLabel = `${String(start.getHours()).padStart(2, '0')}:00`;
  const endLabel = `${String(end.getHours()).padStart(2, '0')}:00`;
  return `${startLabel} - ${endLabel}`;
}

function createMockSubmission({
  userId,
  ticketId,
  originalTitle,
  title,
  type,
  targetId,
  slotId,
}: {
  userId: string;
  ticketId: string;
  originalTitle: string;
  title: string;
  type: BillboardTargetType;
  targetId: string;
  slotId: string;
}): BillboardSubmission {
  return {
    id: `submission-${Date.now()}`,
    userId,
    ticketId,
    originalTitle,
    title,
    type,
    targetId,
    slotId,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };
}

export function BillboardRegisterForm() {
  const params = useLocalSearchParams<{ targetType?: string; targetId?: string; originalTitle?: string; title?: string }>();
  const initialType = normalizeTargetType(params.targetType) ?? 'listing';
  const initialOriginalTitle = getSingleParam(params.originalTitle) ?? getSingleParam(params.title) ?? '보석거북 연구소 다이아몬드백 분양 오픈';
  const initialTargetId = getSingleParam(params.targetId);
  const monthlyUsedTickets = 2;
  const availableTickets = useMemo(() => mockBillboardTickets.filter((ticket) => ticket.status === 'available'), []);
  const availableSlots = useMemo(() => mockBillboardSlots.filter((slot) => slot.status === 'available'), []);
  const [usedTicketCount, setUsedTicketCount] = useState(0);
  const [title, setTitle] = useState(initialOriginalTitle);
  const [selectedType, setSelectedType] = useState<BillboardTargetType>(initialType);
  const [selectedSlotId, setSelectedSlotId] = useState(availableSlots[0]?.id ?? '');
  const [submission, setSubmission] = useState<BillboardSubmission | null>(null);

  const remainingTickets = Math.max(availableTickets.length - usedTicketCount, 0);
  const selectedTargetOption = billboardTargetOptions.find((option) => option.value === selectedType) ?? billboardTargetOptions[0];
  const selectedTarget = { ...selectedTargetOption, targetId: initialTargetId ?? selectedTargetOption.targetId };
  const selectedSlot = availableSlots.find((slot) => slot.id === selectedSlotId) ?? availableSlots[0];
  const canSubmit = Boolean(title.trim() && selectedSlot && remainingTickets > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;

    const nextSubmission = createMockSubmission({
      userId: 'user-1',
      ticketId: availableTickets[usedTicketCount]?.id ?? availableTickets[0].id,
      originalTitle: initialOriginalTitle,
      title: title.trim(),
      type: selectedTarget.value,
      targetId: selectedTarget.targetId,
      slotId: selectedSlot.id,
    });

    setSubmission(nextSubmission);
    setUsedTicketCount((count) => count + 1);
  };

  return (
    <View style={styles.root}>
      <View style={styles.ticketCard}>
        <View style={styles.ticketIconBox}>
          <Ticket size={22} strokeWidth={2} color={Colors.primary} />
        </View>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketLabel}>{copy.ticketCount}</Text>
          <Text style={styles.ticketValue}>{availableTickets.length}{copy.ticketUnit}</Text>
          <Text style={styles.ticketMeta}>{copy.monthlyUsage}: {monthlyUsedTickets}{copy.ticketUnit}</Text>
          <Text style={styles.ticketMeta}>{copy.remainingTickets}: {remainingTickets}{copy.ticketUnit}</Text>
        </View>
        <Text style={styles.policyText}>무료 {mockBillboardPolicy.exposureMinutes}분</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{copy.originalContent}</Text>
        <View style={styles.originalBox}>
          <Text style={styles.originalType}>{selectedTargetOption.label}</Text>
          <Text style={styles.originalTitle} numberOfLines={2}>{initialOriginalTitle}</Text>
          <Text style={styles.originalMeta} numberOfLines={1}>targetId: {selectedTarget.targetId}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{copy.exposureTitle}</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={copy.titlePlaceholder}
          placeholderTextColor={Colors.subText}
          style={styles.input}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{copy.targetLabel}</Text>
        <View style={styles.optionGrid}>
          {billboardTargetOptions.map((option) => {
            const selected = selectedType === option.value;
            return (
              <Pressable key={option.value} onPress={() => setSelectedType(option.value)} style={[styles.optionPill, selected ? styles.optionSelected : null]}>
                <Text style={[styles.optionText, selected ? styles.optionTextSelected : null]}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{copy.exposureLabel}</Text>
        <View style={styles.optionGrid}>
          {exposureOptions.map((option) => (
            <Pressable key={option.value} disabled={option.disabled} style={[styles.optionPill, option.disabled ? styles.optionDisabled : styles.optionSelected]}>
              <Text style={[styles.optionText, option.disabled ? styles.optionTextDisabled : styles.optionTextSelected]}>
                {option.label}{option.disabled ? ` · ${copy.ready}` : ''}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{copy.slotLabel}</Text>
        <View style={styles.slotList}>
          {availableSlots.map((slot) => {
            const selected = selectedSlotId === slot.id;
            return (
              <Pressable key={slot.id} onPress={() => setSelectedSlotId(slot.id)} style={[styles.slotRow, selected ? styles.slotSelected : null]}>
                <Clock3 size={18} strokeWidth={2} color={selected ? Colors.primary : Colors.subText} />
                <Text style={[styles.slotText, selected ? styles.slotTextSelected : null]}>{formatSlotTime(slot)}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewLabel}>{copy.previewLabel}</Text>
        <View style={styles.previewTicker}>
          <Megaphone size={Typography.subtitle.fontSize} strokeWidth={2} color={Colors.primary} />
          <Text style={styles.previewFixedLabel}>전광판</Text>
          <View style={styles.previewDivider} />
          <Text style={styles.previewTitle} numberOfLines={1}>{title || copy.titlePlaceholder}</Text>
        </View>
      </View>

      {submission ? (
        <View style={styles.completeBox}>
          <CheckCircle2 size={20} strokeWidth={2} color={Colors.success} />
          <View style={styles.completeTextBox}>
            <Text style={styles.completeTitle}>{copy.complete}</Text>
            <Text style={styles.completeDescription}>{copy.completeDescription}</Text>
          </View>
        </View>
      ) : null}

      <Pressable disabled={!canSubmit} onPress={handleSubmit} style={[styles.submitButton, canSubmit ? null : styles.submitDisabled]}>
        <Text style={styles.submitText}>{remainingTickets > 0 ? copy.submit : copy.noTicket}</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>돌아가기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  ticketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.xl,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  ticketIconBox: {
    width: Spacing.xxl + Spacing.md,
    height: Spacing.xxl + Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.badge,
  },
  ticketInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  ticketLabel: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  ticketValue: {
    marginTop: Spacing.xxs,
    color: Colors.text,
    fontSize: Typography.title.fontSize,
    lineHeight: Typography.title.lineHeight,
    fontWeight: Typography.title.fontWeight,
  },
  ticketMeta: {
    marginTop: Spacing.xxs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  policyText: {
    color: Colors.primary,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  card: {
    marginTop: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  originalBox: {
    marginTop: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  originalType: {
    color: Colors.primary,
    fontSize: Typography.captionBold.fontSize,
    lineHeight: Typography.captionBold.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  originalTitle: {
    marginTop: Spacing.xs,
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  originalMeta: {
    marginTop: Spacing.xs,
    color: Colors.subText,
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: Typography.small.fontWeight,
  },
  input: {
    marginTop: Spacing.md,
    minHeight: Spacing.xxl + Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.body.lineHeight,
    fontWeight: Typography.body.fontWeight,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  optionPill: {
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.badge,
  },
  optionDisabled: {
    backgroundColor: Colors.surface,
  },
  optionText: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: Typography.captionBold.fontWeight,
  },
  optionTextDisabled: {
    color: Colors.subText,
  },
  slotList: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  slotRow: {
    minHeight: Spacing.xxl + Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  slotSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.badge,
  },
  slotText: {
    marginLeft: Spacing.sm,
    color: Colors.text,
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.body.lineHeight,
    fontWeight: Typography.body.fontWeight,
  },
  slotTextSelected: {
    color: Colors.primary,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  previewCard: {
    marginTop: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  previewLabel: {
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  previewTicker: {
    height: Spacing.xxl + Spacing.md,
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: Radius.lg,
    backgroundColor: Colors.text,
    paddingHorizontal: Spacing.md,
  },
  previewFixedLabel: {
    marginLeft: Spacing.xs,
    color: Colors.card,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.captionBold.fontWeight,
  },
  previewDivider: {
    width: StyleSheet.hairlineWidth,
    height: Typography.title.lineHeight,
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.border,
  },
  previewTitle: {
    flex: 1,
    color: Colors.card,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  completeBox: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  completeTextBox: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  completeTitle: {
    color: Colors.text,
    fontSize: Typography.bodyBold.fontSize,
    lineHeight: Typography.bodyBold.lineHeight,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  completeDescription: {
    marginTop: Spacing.xxs,
    color: Colors.subText,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: Typography.caption.fontWeight,
  },
  submitButton: {
    height: Spacing.xxl + Spacing.lg,
    marginTop: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
  },
  submitDisabled: {
    backgroundColor: Colors.subText,
  },
  submitText: {
    color: Colors.card,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
  secondaryButton: {
    height: Spacing.xxl + Spacing.md,
    marginTop: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: Colors.subText,
    fontSize: Typography.button.fontSize,
    lineHeight: Typography.button.lineHeight,
    fontWeight: Typography.button.fontWeight,
  },
});
