import { View } from 'react-native';
import { DealershipMap } from '@/features/map';

const ExpandedMapScreen = () => {
  return (
    <View className="flex-1">
      <DealershipMap className="flex-1" />
    </View>
  );
};

export default ExpandedMapScreen;
