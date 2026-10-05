# Feature: map

Dealership location map. Provides the small map card used on the front page (above the car preview list) and the shared region store that keeps the mini map and expanded map in sync.

## Public API (`src/features/map/index.ts`)

```ts
// Store
export { FALLBACK_REGION, useMapStore } from './store/useMapStore';
export type { MapPermissionStatus, MapRegion } from './store/useMapStore';

// Components
export { DealershipMap } from './components/DealershipMap';
export { MapCard } from './components/MapCard';
```

Import via the barrel file only: `import { MapCard, useMapStore } from '@/features/map';`

## Store (`store/useMapStore.ts`, zustand)

```ts
export interface MapRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export type MapPermissionStatus = 'undetermined' | 'granted' | 'denied';
```

State: `region`, `accuracy`, `permissionStatus`, `isLoading`, `error`. Actions: `requestLocation()`, `setRegion(region)`.

- `FALLBACK_REGION` is central Copenhagen (`55.6761, 12.5683`, deltas `0.05`) and the initial `region`.
- `requestLocation()` runs once per session (no-ops unless `permissionStatus === 'undetermined'` and not loading): requests foreground permission via `expo-location`, then sets `region`/`accuracy` from the fix. Denied permission keeps the fallback region; failures set `error`.
- Panning/zooming calls `setRegion`; both map views share this state, so returning from the expanded map syncs the mini map instead of showing a stale view.

## Components (`components/`)

| Component       | Props                   | Behavior                                                                                                                                                        | Key `testID`s                             |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `MapCard`       | —                       | Small card (`h-64`, `map-card`) embedding `DealershipMap` with an overlay expand button (top-right, `expand-map-button`, `expand-arrows-alt` icon) → `router.push('/home/expanded-map')`. | `map-card`, `expand-map-button`           |
| `DealershipMap` | `{ className?: string }` (default `flex-1`) | Renders the Leaflet map inside a `WebView` (`dealership-map`). Shows `Loading map...` when `region` is null and an error message on WebView failure. Posts pan/zoom back via `onMessage` → `setRegion` (float-dust echoes ignored). The page rebuilds only on real location fixes, never on pan, so gestures don't reload the view. | `dealership-map` |

## Routes using this feature

| Route                  | Content                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `(main)/index.tsx`     | Front page: `<MapCard />` on top, car preview list below.      |
| `home/expanded-map.tsx` | Full-screen map (shares `useMapStore` region with the card). |

## Tests (`__tests__/features/map/` + screen tests, Jest + `@testing-library/react-native` only)

| Test file                                         | Covers                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| `index.test.ts`                                   | Barrel exports.                                                     |
| `store/useMapStore.test.ts`                       | Fallback region, `requestLocation` flows, `setRegion`.              |
| `components/MapCard.test.tsx`                     | Card + expand button placement; press → `/home/expanded-map`.       |
| `components/DealershipMap.test.tsx`               | Map rendering states.                                               |
| `__tests__/app/(main)/index.test.tsx`             | Front-page integration (map card present).                          |
| `__tests__/app/home/expanded-map.test.tsx`        | Expanded map screen.                                                |

Standard mocks: `expo-location` (`requestForegroundPermissionsAsync`, `getCurrentPositionAsync`), `expo-router` (`router.push`, `useFocusEffect`), `react-native-webview` (`WebView` → `MockView`), `FontAwesome5` → `MockView`.

> Environment note: `expo-location` and `react-native-webview` are declared in `package.json` but not installed in `node_modules`, so these suites fail with `Cannot find module` unless mocks use `{ virtual: true }` or the packages are installed. Touching those tests is out of scope unless the task involves the map.

## Conventions / notes

- Never rebuild the WebView HTML on pan/zoom — only on genuine location fixes (`DealershipMap` memoizes on `permissionStatus`).
- Keep the expand button at `absolute right-2 top-2` (covered by test); it is the only navigation affordance on the card.
- Styling via NativeWind `className`; no `StyleSheet`.
