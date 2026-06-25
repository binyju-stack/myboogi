import '../global.css';

import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { MockUserStateProvider } from '@/components/MockUserState';
import { configurePretendardTypography } from '@/utils/typography';

SplashScreen.preventAutoHideAsync().catch(() => undefined);
configurePretendardTypography();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <MockUserStateProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 220 }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" options={{ animation: 'slide_from_right', animationDuration: 220 }} />
      </Stack>
    </MockUserStateProvider>
  );
}
