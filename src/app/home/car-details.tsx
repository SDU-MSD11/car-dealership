import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useCarStore } from '@/features/cars';

const CarDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const car = useCarStore((state) => state.cars.find((c) => c.id === id));

  if (!car) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text>Car not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 gap-4 p-4">
        <View testID="car-detail-image" className="h-52 w-full items-center justify-center rounded-2xl bg-teal-100">
          <FontAwesome5 name="car" size={64} color="#0f766e" />
        </View>
        <Text className="text-2xl font-bold text-black">
          {car.maker} {car.model}
        </Text>
        <View className="flex-row items-center gap-5">
          <View className="flex-row items-center">
            <FontAwesome5 name="users" size={14} color="#6b7280" />
            <Text className="ml-1.5 text-sm text-gray-700">{car.passengers} passengers</Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome5 name="cog" size={14} color="#6b7280" />
            <Text className="ml-1.5 text-sm text-gray-700">{car.transmission}</Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome5 name="tag" size={14} color="#6b7280" />
            <Text className="ml-1.5 text-sm font-semibold text-gray-900">${car.price}/day</Text>
          </View>
        </View>
        <Text className="text-sm leading-5 text-gray-700">{car.description}</Text>
        <Pressable
          testID="continue-booking-button"
          accessibilityRole="button"
          accessibilityLabel="Continue booking"
          onPress={() => router.push(`/home/booking-details?carId=${car.id}`)}
          className="mt-2 w-full items-center rounded-2xl bg-black py-4"
        >
          <Text className="text-base font-semibold text-white">Continue booking</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CarDetailsScreen;
