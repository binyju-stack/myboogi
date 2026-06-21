export const colors = {
  ink: '#111827',
  muted: '#6B7280',
  subtle: '#9CA3AF',
  page: '#F6F7F9',
  soft: '#F3F4F6',
  blush: '#FFF1F6',
  petal: '#FFB6CD',
  berry: '#FF5C93',
  shell: '#FFE8F0',
  moss: '#65A986',
  mint: '#E9F7EF',
  cream: '#FFF7E8',
  white: '#FFFFFF',
  line: '#E5E7EB',
  blue: '#EAF5FF',
};

export const typography = {
  h1: { fontSize: 28, lineHeight: 38, fontWeight: '700' as const },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: '700' as const },
  cardTitle: { fontSize: 17, lineHeight: 26, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 24, fontWeight: '500' as const },
  description: { fontSize: 13, lineHeight: 20, fontWeight: '500' as const },
  meta: { fontSize: 12, lineHeight: 18, fontWeight: '500' as const },
};

export const radii = {
  sm: 12,
  md: 14,
  lg: 14,
  xl: 14,
  pill: 999,
};

export const spacing = {
  screenX: 20,
  sectionTop: 28,
  cardPadding: 20,
};

export const shadows = {
  card: {
    shadowColor: '#191F28',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  bar: {
    shadowColor: '#191F28',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
};
