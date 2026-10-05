import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import type { Car } from '../store/useCarStore';

interface CarCardProps {
    car: Car;
    testID?: string;
}

export const CarCard = ({ car, testID }: CarCardProps) => {
    const handlePress = () => {
        router.push(`/home/car-details?id=${car.id}`);
    };

    return (
        <Pressable
            testID={testID ?? `car-card-${car.id}`}
            accessibilityRole="button"
            accessibilityLabel={`${car.maker} ${car.model} details`}
            onPress={handlePress}
            className="w-full flex-row rounded-2xl bg-white p-3 shadow-lg"
        >
            <View className="h-28 w-28 items-center justify-center rounded-xl bg-teal-100">
                <FontAwesome5 name="car" size={32} color="#0f766e" />
            </View>
            <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-black">
                    {car.maker} {car.model}
                </Text>
                <Text className="mt-0.5 text-xs text-gray-500">
                    {car.transmission} · {car.passengers} seats
                </Text>
                <View className="mt-2 flex-row items-center gap-4">
                    <View className="flex-row items-center">
                        <FontAwesome5 name="users" size={12} color="#6b7280" />
                        <Text className="ml-1 text-xs text-gray-700">{car.passengers}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <FontAwesome5 name="cog" size={12} color="#6b7280" />
                        <Text className="ml-1 text-xs text-gray-700">{car.transmission}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <FontAwesome5 name="tag" size={12} color="#6b7280" />
                        <Text className="ml-1 text-xs font-semibold text-gray-900">${car.price}/day</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
