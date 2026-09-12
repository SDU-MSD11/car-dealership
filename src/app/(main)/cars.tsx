import { Text, View } from 'react-native';
import { CarList } from '@/features/inventory';

const CarsScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <CarList />
    </View>
  );
};

export default CarsScreen;