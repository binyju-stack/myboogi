import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

export const colors = {
  ink: Colors.text,
  muted: Colors.subText,
  subtle: Colors.subText,
  page: Colors.background,
  soft: Colors.surface,
  blush: Colors.badge,
  petal: Colors.primary,
  berry: Colors.primary,
  shell: Colors.badge,
  moss: Colors.success,
  mint: '#E9F7EF',
  cream: '#FFF7E8',
  white: Colors.card,
  line: Colors.border,
  blue: '#EAF5FF',
};

export const typography = {
  h1: Typography.heading,
  sectionTitle: Typography.title,
  cardTitle: Typography.subtitle,
  body: Typography.body,
  description: Typography.caption,
  meta: Typography.small,
};

export const radii = {
  sm: Radius.md,
  md: Radius.lg,
  lg: Radius.lg,
  xl: Radius.lg,
  pill: Radius.pill,
};

export const spacing = {
  screenX: Spacing.xl,
  sectionTop: Spacing.xl,
  cardPadding: Spacing.lg,
};

export const shadows = Shadows;
export { Colors, Motion, Radius, Shadows, Spacing, Typography } from '@/theme';
