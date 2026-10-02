import { Text, View } from 'react-native';
import { MapCard } from '@/features/map';

const HomeScreen = () => {
  return (
    <View className="flex-1 p-4">
      <MapCard />
      <Text>Map / Car List</Text>
    </View>
  );
};

export default HomeScreen;
