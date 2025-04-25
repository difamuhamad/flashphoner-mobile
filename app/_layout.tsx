import { useAuthStore } from "@/auth/auth-store";
import SafeScreen from "@/components/safe-screen";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const router = useRouter();
  // segment = folder/app location
  const segments = useSegments();

  const { refreshUser, user, token, profile } = useAuthStore();

  //   fetchUser();
  // }, []);
  useEffect(() => {
    (async () => {
      await refreshUser();
    })();
  }, []);
  // code above is IIFE (invoked function)

  // handle navigarion
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      {/* To show mobile status bar (clock,battery,wifi) */}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
