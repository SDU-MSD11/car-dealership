import { create } from 'zustand';
import * as Location from 'expo-location';

export interface MapRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export type MapPermissionStatus = 'undetermined' | 'granted' | 'denied';

export const FALLBACK_REGION: MapRegion = {
    latitude: 55.6761,
    longitude: 12.5683,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

interface MapState {
    region: MapRegion;
    accuracy: number | null;
    permissionStatus: MapPermissionStatus;
    isLoading: boolean;
    error: string | null;
    requestLocation: () => Promise<void>;
    setRegion: (region: MapRegion) => void;
}

export const useMapStore = create<MapState>()((set, get) => ({
    region: FALLBACK_REGION,
    accuracy: null,
    permissionStatus: 'undetermined',
    isLoading: false,
    error: null,
    requestLocation: async () => {
        // Fetch only once per session: later mounts must never clobber
        // a viewport the user already panned or zoomed.
        if (get().isLoading || get().permissionStatus !== 'undetermined') {
            return;
        }
        set({ isLoading: true, error: null });
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                set({ permissionStatus: 'denied', isLoading: false });
                return;
            }
            const position = await Location.getCurrentPositionAsync({});
            set({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                },
                accuracy: position.coords.accuracy ?? null,
                permissionStatus: 'granted',
                isLoading: false,
            });
        } catch {
            set({ error: 'Could not fetch your location.', isLoading: false });
        }
    },
    setRegion: (region) => set({ region }),
}));
