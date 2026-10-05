import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import { FALLBACK_REGION, useMapStore } from '@/features/map';
import { MapCard } from '@/features/map';

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

describe('MapCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMapStore.setState({
      region: FALLBACK_REGION,
      accuracy: null,
      // Seed 'denied' so requestLocation() no-ops on mount: with
      // 'undetermined' its async denial-settling fires outside act().
      permissionStatus: 'denied',
      isLoading: false,
      error: null,
    });
  });

  it('renders the small map card with an expand button', () => {
    const { getByTestId } = render(<MapCard />);

    expect(getByTestId('map-card')).toBeTruthy();
    expect(getByTestId('expand-map-button')).toBeTruthy();
  });

  it('places the expand button in the top right corner', () => {
    const { getByTestId } = render(<MapCard />);
    const className = getByTestId('expand-map-button').props.className as string;

    expect(className).toContain('top-2');
    expect(className).toContain('right-2');
    expect(className).not.toContain('bottom-2');
  });

  it('navigates to the expanded map when the expand button is pressed', () => {
    const { getByTestId } = render(<MapCard />);

    fireEvent.press(getByTestId('expand-map-button'));

    expect(router.push).toHaveBeenCalledWith('/home/expanded-map');
  });
});
