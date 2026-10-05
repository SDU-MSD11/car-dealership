import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useCarStore } from '../store/useCarStore';
import { CarCard } from './CarCard';

const PREVIEW_COUNT = 3;

export const CarPreviewList = () => {
    const cars = useCarStore((state) => state.cars);
    const previewCars = cars.slice(0, PREVIEW_COUNT);

    return (
        <View testID="car-preview-list" className="mt-4 gap-3">
            {previewCars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
            <Pressable
                testID="view-more-results"
                accessibilityRole="button"
                accessibilityLabel="View more results"
                onPress={() => router.push('/home/full-car-list')}
                className="w-full flex-row items-center justify-center rounded-2xl bg-white p-4 shadow-lg"
            >
                <Text className="mr-2 text-sm font-semibold text-black">View more results</Text>
                <FontAwesome5 name="arrow-right" size={14} color="black" />
            </Pressable>
        </View>
    );
};
