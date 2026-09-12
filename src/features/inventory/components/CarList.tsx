import { FlatList, Text } from 'react-native';
import { useCarStore } from '../store/useCarStore';

export const CarList = () => {
    const cars = useCarStore((state) => state.cars);

    return (
        <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            contentContainerClassName="flex-1 justify-center"
            renderItem={({ item }) => (
                <Text>
                    ({item.id}) {item.maker} {item.model}
                </Text>
            )}
        />
    );
}