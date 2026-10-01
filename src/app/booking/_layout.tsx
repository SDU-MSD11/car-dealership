import { Stack } from 'expo-router';

const BookingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="return-system" options={{ title: 'Return System' }} />
    </Stack>
  );
};

export default BookingLayout;
