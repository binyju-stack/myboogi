import { Easing } from 'react-native';

export const Motion = {
  duration: {
    fast: 120,
    normal: 220,
    slow: 360,
    marquee: 22000,
    tickerHold: 3200,
    tickerSlide: 360,
  },
  scale: {
    pressed: 0.97,
    card: 0.98,
    modal: 0.96,
  },
  easing: {
    standard: Easing.out(Easing.cubic),
    linear: Easing.linear,
  },
} as const;

