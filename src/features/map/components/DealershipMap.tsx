import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { useMapStore, type MapRegion } from '../store/useMapStore';

interface DealershipMapProps {
    className?: string;
}

const deltaToZoom = (latitudeDelta: number): number => {
    const zoom = Math.round(Math.log2(360 / latitudeDelta));
    return Math.min(Math.max(zoom, 1), 18);
};

const zoomToDeltas = (zoom: number): Pick<MapRegion, 'latitudeDelta' | 'longitudeDelta'> => {
    const latitudeDelta = 360 / Math.pow(2, zoom);
    return { latitudeDelta, longitudeDelta: latitudeDelta };
};

const regionKey = (region: MapRegion): string =>
    `${region.latitude}|${region.longitude}|${region.latitudeDelta}|${region.longitudeDelta}`;

interface MapPageOptions {
    region: MapRegion;
    showUserLocation: boolean;
    accuracy: number | null;
}

const buildMapHtml = ({ region, showUserLocation, accuracy }: MapPageOptions): string => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>html,body,#map{height:100%;margin:0;padding:0;}</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var map = L.map('map').setView([${region.latitude}, ${region.longitude}], ${deltaToZoom(region.latitudeDelta)});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
var ACCURACY = ${accuracy ?? 50};
var halo = null;
${showUserLocation ? `halo = L.circle([${region.latitude}, ${region.longitude}], { radius: ACCURACY, color: '#1a73e8', weight: 1, opacity: 0.4, fillColor: '#1a73e8', fillOpacity: 0.15 }).addTo(map);
L.circleMarker([${region.latitude}, ${region.longitude}], { radius: 8, color: '#ffffff', weight: 3, fillColor: '#1a73e8', fillOpacity: 1 }).addTo(map);` : ''}
function clampHalo() {
  if (!halo) return;
  var size = map.getSize();
  var px = Math.min(size.x, size.y) * 0.2;
  var middle = map.containerPointToLatLng([size.x / 2, size.y / 2]);
  var edge = map.containerPointToLatLng([size.x / 2 + px, size.y / 2]);
  halo.setRadius(Math.min(ACCURACY, map.distance(middle, edge)));
}
clampHalo();
// The circle scales and tracks natively every frame, so only the capped
// radius needs refreshing once a zoom settles. Never touch it mid-gesture.
map.on('zoomend', clampHalo);
map.on('moveend', function () {
  var center = map.getCenter();
  window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: center.lat, longitude: center.lng, zoom: map.getZoom() }));
});
</script>
</body>
</html>`;

export const DealershipMap = ({ className = 'flex-1' }: DealershipMapProps) => {
    const region = useMapStore((state) => state.region);
    const accuracy = useMapStore((state) => state.accuracy);
    const permissionStatus = useMapStore((state) => state.permissionStatus);
    const setRegion = useMapStore((state) => state.setRegion);
    const requestLocation = useMapStore((state) => state.requestLocation);
    const [hasError, setHasError] = useState(false);
    const webViewRef = useRef<WebView | null>(null);
    const lastSyncedRef = useRef<string | null>(null);

    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    // Rebuild the page only when a real location fix arrives, never on pan,
    // so panning the map doesn't reload the WebView.
    const html = useMemo(
        () =>
            region
                ? buildMapHtml({ region, showUserLocation: permissionStatus === 'granted', accuracy })
                : '',
        [permissionStatus], // eslint-disable-line react-hooks/exhaustive-deps
    );

    // When returning from the other screen, push the shared store state into
    // this page instead of showing its stale pre-navigation view.
    useFocusEffect(
        useCallback(() => {
            const key = regionKey(region);
            if (lastSyncedRef.current !== null && lastSyncedRef.current !== key) {
                webViewRef.current?.injectJavaScript(
                    `map.setView([${region.latitude}, ${region.longitude}], ${deltaToZoom(region.latitudeDelta)});true;`,
                );
            }
            lastSyncedRef.current = key;
        }, [region]),
    );

    if (!region) {
        return (
            <View className={className}>
                <Text>Loading map...</Text>
            </View>
        );
    }

    if (hasError) {
        return (
            <View className={className}>
                <Text>Could not load the map. Check your connection.</Text>
            </View>
        );
    }

    const handleMessage = (event: WebViewMessageEvent) => {
        try {
            const { latitude, longitude, zoom } = JSON.parse(event.nativeEvent.data);
            if (typeof latitude === 'number' && typeof longitude === 'number') {
                const nextRegion: MapRegion = {
                    ...region,
                    latitude,
                    longitude,
                    ...(typeof zoom === 'number' ? zoomToDeltas(zoom) : {}),
                };
                // Ignore float-dust echoes of the current view so repeated
                // navigations can't random-walk the stored center.
                const sameView =
                    Math.abs(nextRegion.latitude - region.latitude) < 1e-7 &&
                    Math.abs(nextRegion.longitude - region.longitude) < 1e-7 &&
                    Math.abs(nextRegion.latitudeDelta - region.latitudeDelta) <
                        region.latitudeDelta * 1e-6 &&
                    Math.abs(nextRegion.longitudeDelta - region.longitudeDelta) <
                        region.longitudeDelta * 1e-6;
                lastSyncedRef.current = regionKey(sameView ? region : nextRegion);
                if (!sameView) {
                    setRegion(nextRegion);
                }
            }
        } catch {
            // Ignore malformed messages from the map page.
        }
    };

    return (
        <WebView
            ref={webViewRef}
            testID="dealership-map"
            className={className}
            originWhitelist={['*']}
            source={{ html }}
            onMessage={handleMessage}
            onError={() => setHasError(true)}
        />
    );
};
