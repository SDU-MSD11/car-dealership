import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export const SPLASH_DURATION_MS = 2000;

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(main)');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
