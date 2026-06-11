import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MockUserStateProvider } from '@/components/MockUserState';

export default function RootLayout() {
  return (
    <MockUserStateProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 220 }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </MockUserStateProvider>
  );
}
