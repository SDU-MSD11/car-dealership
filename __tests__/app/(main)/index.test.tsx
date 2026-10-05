import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(main)/index';
import { useCarStore } from '@/features/cars';

jest.mock(
  'expo-location',
  () => ({
    requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'denied' }),
    getCurrentPositionAsync: jest.fn(),
  }),
  { virtual: true },
);

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useFocusEffect: jest.fn(),
}));

jest.mock(
  'react-native-webview',
  () => {
    const { View: MockView } = require('react-native');
    return {
      __esModule: true,
      WebView: (props: Record<string, unknown>) => (
        <MockView testID="mock-web-view" {...props} />
      ),
    };
  },
  { virtual: true },
);

jest.mock('@expo/vector-icons/FontAwesome5', () => {
  const { View: MockView } = require('react-native');
  return {
    __esModule: true,
    default: () => <MockView testID="mock-expand-icon" />,
  };
});

describe('HomeScreen', () => {
  beforeEach(() => {
    useCarStore.setState({
      cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'a' },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'b' },
        { id: '3', maker: 'Tesla', model: 'Model 3', price: 99, passengers: 5, transmission: 'Automatic', description: 'c' },
      ],
    });
  });

  it('renders the map card and top car preview below it', () => {
    const { getByTestId, getByText } = render(<HomeScreen />);

    expect(getByTestId('map-card')).toBeTruthy();
    expect(getByTestId('car-preview-list')).toBeTruthy();
    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('View more results')).toBeTruthy();
  });
});
