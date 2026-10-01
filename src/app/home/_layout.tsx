import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="filter-sort" options={{ title: 'Filter / Sort' }} />
      <Stack.Screen name="car-details" options={{ title: 'Car Details' }} />
      <Stack.Screen name="full-car-list" options={{ title: 'Full Car List' }} />
      <Stack.Screen name="expanded-map" options={{ title: 'Expanded Map' }} />
      <Stack.Screen name="booking-details" options={{ title: 'Booking Details' }} />
      <Stack.Screen name="login-register" options={{ title: 'Login / Register' }} />
      <Stack.Screen name="confirmation" options={{ title: 'Confirmation' }} />
    </Stack>
  );
};

export default HomeLayout;
