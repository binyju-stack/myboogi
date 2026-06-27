import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/theme';

export function AppDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});