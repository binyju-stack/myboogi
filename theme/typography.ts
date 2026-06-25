export const Typography = {
  heading: { fontSize: 28, lineHeight: 38, fontWeight: '700' as const },
  title: { fontSize: 20, lineHeight: 28, fontWeight: '700' as const },
  subtitle: { fontSize: 17, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 15, lineHeight: 24, fontWeight: '500' as const },
  bodyBold: { fontSize: 15, lineHeight: 24, fontWeight: '700' as const },
  caption: { fontSize: 12, lineHeight: 18, fontWeight: '500' as const },
  captionBold: { fontSize: 12, lineHeight: 18, fontWeight: '700' as const },
  small: { fontSize: 11, lineHeight: 16, fontWeight: '500' as const },
  button: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  price: { fontSize: 18, lineHeight: 24, fontWeight: '700' as const },
} as const;

export type TypographyRole = keyof typeof Typography;
