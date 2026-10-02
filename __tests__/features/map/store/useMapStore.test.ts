import * as Location from 'expo-location';
import { FALLBACK_REGION, useMapStore } from '@/features/map/store/useMapStore';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

const mockedLocation = Location as jest.Mocked<typeof Location>;

describe('useMapStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMapStore.setState({
      region: FALLBACK_REGION,
      accuracy: null,
      permissionStatus: 'undetermined',
      isLoading: false,
      error: null,
    });
  });

  it('starts with the fallback region', () => {
    expect(useMapStore.getState().region).toEqual(FALLBACK_REGION);
    expect(useMapStore.getState().accuracy).toBeNull();
  });

  it('updates the region with setRegion', () => {
    const region = { ...FALLBACK_REGION, latitude: 55.7, longitude: 12.6 };

    useMapStore.getState().setRegion(region);

    expect(useMapStore.getState().region).toEqual(region);
  });

  it('centers on the user location when permission is granted', async () => {
    mockedLocation.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' } as never);
    mockedLocation.getCurrentPositionAsync.mockResolvedValue({
      coords: { latitude: 55.7, longitude: 12.6, accuracy: 20 },
    } as never);

    await useMapStore.getState().requestLocation();

    expect(useMapStore.getState().permissionStatus).toBe('granted');
    expect(useMapStore.getState().region.latitude).toBe(55.7);
    expect(useMapStore.getState().region.longitude).toBe(12.6);
    expect(useMapStore.getState().accuracy).toBe(20);
  });

  it('keeps the fallback region when permission is denied', async () => {
    mockedLocation.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'denied' } as never);

    await useMapStore.getState().requestLocation();

    expect(useMapStore.getState().permissionStatus).toBe('denied');
    expect(useMapStore.getState().region).toEqual(FALLBACK_REGION);
    expect(mockedLocation.getCurrentPositionAsync).not.toHaveBeenCalled();
  });

  it('does not refetch once permission is resolved', async () => {
    const zoomed = {
      ...FALLBACK_REGION,
      latitude: 55.7,
      longitude: 12.6,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    useMapStore.setState({ region: zoomed, permissionStatus: 'granted', accuracy: 20 });

    await useMapStore.getState().requestLocation();

    expect(mockedLocation.requestForegroundPermissionsAsync).not.toHaveBeenCalled();
    expect(mockedLocation.getCurrentPositionAsync).not.toHaveBeenCalled();
    expect(useMapStore.getState().region).toEqual(zoomed);
  });

  it('does not refetch when permission was denied', async () => {
    useMapStore.setState({ permissionStatus: 'denied' });

    await useMapStore.getState().requestLocation();

    expect(mockedLocation.requestForegroundPermissionsAsync).not.toHaveBeenCalled();
    expect(useMapStore.getState().region).toEqual(FALLBACK_REGION);
  });
});
