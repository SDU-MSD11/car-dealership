import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(main)/index';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'denied' }),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useFocusEffect: jest.fn(),
}));

jest.mock('react-native-webview', () => {
  const { View: MockView } = require('react-native');
  return {
    __esModule: true,
    WebView: (props: Record<string, unknown>) => (
      <MockView testID="mock-web-view" {...props} />
    ),
  };
});

jest.mock('@expo/vector-icons/FontAwesome5', () => {
  const { View: MockView } = require('react-native');
  return {
    __esModule: true,
    default: () => <MockView testID="mock-expand-icon" />,
  };
});

describe('HomeScreen', () => {
  it('renders the map card and car list placeholder', () => {
    const { getByTestId, getByText } = render(<HomeScreen />);

    expect(getByTestId('map-card')).toBeTruthy();
    expect(getByText('Map / Car List')).toBeTruthy();
  });
});
