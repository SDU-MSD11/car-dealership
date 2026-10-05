import { render } from '@testing-library/react-native';
import ExpandedMapScreen from '@/app/home/expanded-map';
import { useMapStore } from '@/features/map';

jest.mock(
  'expo-location',
  () => ({
    requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'denied' }),
    getCurrentPositionAsync: jest.fn(),
  }),
  { virtual: true },
);

jest.mock('expo-router', () => ({
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

describe('ExpandedMapScreen', () => {
  beforeEach(() => {
    // Seed 'denied' so requestLocation() no-ops on mount: with the default
    // 'undetermined' its async denial-settling fires outside act().
    useMapStore.setState({ permissionStatus: 'denied' });
  });

  it('renders the fullscreen map', () => {
    const { getByTestId } = render(<ExpandedMapScreen />);

    expect(getByTestId('dealership-map')).toBeTruthy();
  });
});
