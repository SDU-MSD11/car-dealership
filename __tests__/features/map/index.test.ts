jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('react-native-webview', () => ({
  __esModule: true,
  WebView: () => null,
}));

import { DealershipMap, MapCard, useMapStore } from '@/features/map';

describe('map public exports', () => {
  it('exports the map components and store', () => {
    expect(DealershipMap).toEqual(expect.any(Function));
    expect(MapCard).toEqual(expect.any(Function));
    expect(useMapStore).toEqual(expect.any(Function));
  });
});
