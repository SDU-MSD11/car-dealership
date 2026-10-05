# Feature: cars

Car browsing and selection. Covers the front-page preview below the map, the car detail page, and the paginated full car list. (Renamed from `inventory`; no `inventory` references remain in `src/` or `__tests__/`.)

## Public API (`src/features/cars/index.ts`)

```ts
// Store
export { useCarStore } from './store/useCarStore';
export type { Car, Transmission } from './store/useCarStore';

// Components
export { CarList } from './components/CarList';
export { CarCard } from './components/CarCard';
export { CarPreviewList } from './components/CarPreviewList';
export { CarPaginatedList } from './components/CarPaginatedList';
```

Import via the barrel file only: `import { CarCard, useCarStore } from '@/features/cars';`

## Store (`store/useCarStore.ts`, zustand)

```ts
export type Transmission = 'Automatic' | 'Manual';

export interface Car {
    id: string;
    maker: string;
    model: string;
    price: number; // rental price per day, displayed as `$X/day`
    passengers: number;
    transmission: Transmission;
    description: string;
}
```

Actions: `setCars(cars)`, `addCar(car)`, `removeCar(id)`. Seeded with 7 cars (ids `'1'`–`'7'`), so pagination yields 2 pages at the default page size.

## Components (`components/`)

All styled with NativeWind (`className`), no `StyleSheet`. Icons from `@expo/vector-icons/FontAwesome5`. Images are placeholder views (`bg-teal-100` + `car` icon) until real imagery is added.

| Component          | Props                              | Behavior                                                                                                                              | Key `testID`s                              |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `CarCard`          | `{ car: Car; testID?: string }`    | Whole-card `Pressable` → `router.push('/home/car-details?id={id}')`. Image left, `{maker} {model}` title top-right, icon row (`users`, `cog`, `tag`) with passengers / transmission / `$X/day`. | `car-card-{id}` (default)                 |
| `CarPreviewList`   | — (reads store)                    | Renders first 3 store cars as `CarCard`s, then a 4th `View more results` card → `router.push('/home/full-car-list')`. Preview count is the `PREVIEW_COUNT = 3` constant. | `car-preview-list`, `view-more-results`    |
| `CarPaginatedList` | `{ pageSize?: number }` (default 5) | Numbered pagination over the store: `Prev` / `1 2 …` / `Next` buttons plus a `Page X of Y` indicator. Only the current slice renders. | `car-paginated-list`, `prev-page`, `next-page`, `page-button-{n}`, `page-indicator` |
| `CarList`          | — (reads store)                    | `FlatList` rendering every store car as a `CarCard`.                                                                                  | via `CarCard`                              |

## Routes wired (under `src/app/`)

| Route                    | Content                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `(main)/index.tsx`       | Front page: `<MapCard />` with `<CarPreviewList />` below, inside a `ScrollView`.                                                                                |
| `home/car-details.tsx`   | Reads `id` via `useLocalSearchParams`, looks up `useCarStore`. Shows large placeholder image (`car-detail-image`), title, spec row (`N passengers`, transmission, `$/day`), description, and a `Continue booking` button (`continue-booking-button`) → `/home/booking-details?carId={id}`. Renders `Car not found` for unknown ids. |
| `home/full-car-list.tsx` | Renders `<CarPaginatedList pageSize={5} />` inside a `ScrollView`.                                                                                                |

`src/app/home/_layout.tsx` already registers the `car-details` and `full-car-list` screens; no layout change is needed when editing this feature.

## Tests (`__tests__/features/cars/` + screen tests, Jest + `@testing-library/react-native` only)

| Test file                                            | Covers                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `index.test.ts`                                      | Barrel exports (`CarCard`, `CarList`, `CarPreviewList`, `CarPaginatedList`, `useCarStore`). |
| `store/useCarStore.test.ts`                          | Initial state, `setCars`, `addCar`, `removeCar`.              |
| `components/CarCard.test.tsx`                        | Title/specs/price render; press → `/home/car-details?id=1`.   |
| `components/CarList.test.tsx`                        | Renders every store car.                                      |
| `components/CarPreviewList.test.tsx`                 | Top 3 only + `View more results`; press → `/home/full-car-list`. |
| `components/CarPaginatedList.test.tsx`               | Slicing, page buttons, Prev/Next.                             |
| `__tests__/app/(main)/index.test.tsx`                | Map card + preview list on the front page. Uses `{ virtual: true }` mocks for `expo-location` / `react-native-webview` (not installed in `node_modules`). |
| `__tests__/app/home/car-details.test.tsx`            | Full info + booking navigation + not-found state.             |
| `__tests__/app/home/full-car-list.test.tsx`          | Paginated list renders.                                       |

Mocking pattern for components: `jest.mock('expo-router', () => ({ router: { push: jest.fn() } }))` and a `FontAwesome5` mock rendering a `MockView`.

## Conventions / notes

- Price is per-day rental; keep the `$X/day` format in cards and detail.
- Navigation uses expo-router string pushes with query params (`?id=`, `?carId=`); keep param names stable — booking flow depends on `carId`.
- Preview count and page size are plain constants/props (`PREVIEW_COUNT`, `pageSize`), not store state.
- When adding real images, add an `imageUrl` (or asset) field to `Car` and swap the placeholder views in `CarCard` and `car-details.tsx`.
