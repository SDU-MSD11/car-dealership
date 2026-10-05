import { ScrollView, View } from 'react-native';
import { MapCard } from '@/features/map';
import { CarPreviewList } from '@/features/cars';

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 p-4">
        <MapCard />
        <CarPreviewList />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
