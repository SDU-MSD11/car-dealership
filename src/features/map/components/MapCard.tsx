import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DealershipMap } from './DealershipMap';

export const MapCard = () => {
    return (
        <View testID="map-card" className="h-64 w-full rounded-2xl bg-white shadow-lg">
            <View className="flex-1 overflow-hidden rounded-2xl">
                <DealershipMap className="flex-1" />
                <Pressable
                    accessibilityLabel="Expand map"
                    testID="expand-map-button"
                    onPress={() => router.push('/home/expanded-map')}
                    className="absolute right-2 top-2 bg-transparent p-2"
                >
                    <FontAwesome5 name="expand-arrows-alt" size={16} color="black" />
                </Pressable>
            </View>
        </View>
    );
};
