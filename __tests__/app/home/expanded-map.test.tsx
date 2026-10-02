import { render } from '@testing-library/react-native';
import ExpandedMapScreen from '@/app/home/expanded-map';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'denied' }),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('expo-router', () => ({
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

describe('ExpandedMapScreen', () => {
  it('renders the fullscreen map', () => {
    const { getByTestId } = render(<ExpandedMapScreen />);

    expect(getByTestId('dealership-map')).toBeTruthy();
  });
});
