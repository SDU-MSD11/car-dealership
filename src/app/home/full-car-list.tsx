import { ScrollView, View } from 'react-native';
import { CarPaginatedList } from '@/features/cars';

const FullCarListScreen = () => {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 p-4">
        <CarPaginatedList pageSize={5} />
      </View>
    </ScrollView>
  );
};

export default FullCarListScreen;
