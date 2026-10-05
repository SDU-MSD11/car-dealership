import { act, fireEvent, render } from '@testing-library/react-native';
import { FALLBACK_REGION, useMapStore } from '@/features/map';
import { DealershipMap } from '@/features/map';

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

describe('DealershipMap', () => {
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

  it('renders the map view', () => {
    const { getByTestId } = render(<DealershipMap />);

    expect(getByTestId('dealership-map')).toBeTruthy();
  });

  it('injects a Leaflet page centered on the store region', () => {
    const { getByTestId } = render(<DealershipMap />);
    const html = getByTestId('dealership-map').props.source.html as string;

    expect(html).toContain('leaflet');
    expect(html).toContain(String(FALLBACK_REGION.latitude));
    expect(html).toContain(String(FALLBACK_REGION.longitude));
  });

  it('draws the blue-dot location only when permission is granted', () => {
    const { getByTestId, rerender } = render(<DealershipMap />);
    expect(getByTestId('dealership-map').props.source.html as string).not.toContain('circleMarker');

    act(() => {
      useMapStore.setState({ permissionStatus: 'granted', accuracy: 20 });
    });
    rerender(<DealershipMap />);

    const html = getByTestId('dealership-map').props.source.html as string;
    expect(html).toContain('circleMarker');
    expect(html).toContain('var ACCURACY = 20;');
  });

  it('clamps the halo to the viewport when a zoom settles', () => {
    useMapStore.setState({ permissionStatus: 'granted', accuracy: 20 });
    const { getByTestId } = render(<DealershipMap />);
    const html = getByTestId('dealership-map').props.source.html as string;

    expect(html).toContain('halo.setRadius(Math.min(ACCURACY,');
    expect(html).toContain('* 0.2');
    expect(html).toContain("map.on('zoomend', clampHalo)");
  });

  it('never redraws the halo mid-gesture', () => {
    useMapStore.setState({ permissionStatus: 'granted', accuracy: 20 });
    const { getByTestId } = render(<DealershipMap />);
    const html = getByTestId('dealership-map').props.source.html as string;

    expect(html).not.toContain("map.on('move zoom zoomanim'");
  });

  it('syncs panning and zoom back to the store', () => {
    const { getByTestId } = render(<DealershipMap />);

    fireEvent(getByTestId('dealership-map'), 'onMessage', {
      nativeEvent: { data: JSON.stringify({ latitude: 55.7, longitude: 12.6, zoom: 15 }) },
    });

    const region = useMapStore.getState().region;
    expect(region.latitude).toBe(55.7);
    expect(region.longitude).toBe(12.6);
    expect(region.latitudeDelta).toBeCloseTo(360 / Math.pow(2, 15));
  });

  it('ignores float-dust echoes of the current view', () => {
    const deltas = 360 / Math.pow(2, 15);
    useMapStore.setState({
      region: { latitude: 55.7, longitude: 12.6, latitudeDelta: deltas, longitudeDelta: deltas },
    });
    const { getByTestId } = render(<DealershipMap />);
    const before = useMapStore.getState().region;

    fireEvent(getByTestId('dealership-map'), 'onMessage', {
      nativeEvent: { data: JSON.stringify({ latitude: 55.7 + 1e-9, longitude: 12.6, zoom: 15 }) },
    });

    expect(useMapStore.getState().region).toBe(before);
  });

  it('shows a loading placeholder when there is no region', () => {
    useMapStore.setState({ region: null as never });

    const { getByText } = render(<DealershipMap />);

    expect(getByText('Loading map...')).toBeTruthy();
  });

  it('shows an error message when the page fails to load', () => {
    const { getByTestId, getByText } = render(<DealershipMap />);

    fireEvent(getByTestId('dealership-map'), 'onError');

    expect(getByText('Could not load the map. Check your connection.')).toBeTruthy();
  });
});
