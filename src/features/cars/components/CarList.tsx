import { FlatList, View } from 'react-native';
import { useCarStore } from '../store/useCarStore';
import { CarCard } from './CarCard';

export const CarList = () => {
    const cars = useCarStore((state) => state.cars);

    return (
        <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-3"
            renderItem={({ item }) => (
                <View>
                    <CarCard car={item} />
                </View>
            )}
        />
    );
}