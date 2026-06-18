export const colors = {
  ink: '#222222',
  muted: '#666666',
  subtle: '#A0A5AD',
  page: '#F7F8FA',
  soft: '#F2F4F6',
  blush: '#FFF5F8',
  petal: '#FFB6CD',
  berry: '#F0447D',
  shell: '#FFE8F0',
  moss: '#65A986',
  mint: '#E9F7EF',
  cream: '#FFF7E8',
  white: '#FFFFFF',
  line: '#ECECEC',
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
  sm: 14,
  md: 18,
  lg: 22,
  xl: 26,
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
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  bar: {
    shadowColor: '#191F28',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
};
