# Overview

This project is a Expo React Native project, using different technologies such as expo-router, zustand, NativeWind, TailwindCSS, jest and more.

## Overall Structure and Folder placement
```
./__tests__/          # All tests are placed here, with exact duplicate file placement and layout as the ./src/ folder and its files.
├── app/                 
├── components/     
│   ├── layout/     
│   └── ui/                 
├── features/           
├── hooks/              
├── store/              
└── utils/              

./src/
├── app/            # Expo routing folder, with grouped subdirs well structured.
├── components/     # Main components folder, that are not feature specific
│   ├── layout/     # Layout based components
│   └── ui/         # Reusable components like buttons, cards, etc...
├── features/       # Grouped components and stores that are feature specific
├── hooks/          #
├── store/          # Global stores that are not feature specific, but usable across multiple features.
└── utils/          # Global accessable modules and functions
```

# The Feature Pattern

Every feature in the codebase has to follow this pattern.

## Anatomy of a Feature

```
src/features/<name>/
├── index.ts            # File that exports all other functions, components, stores etc. so you only need to import this in pages, and other components, instead of specific path to said component or store in the feature.
├── components/
│   └── Xxx.tsx         # Feature specific components.
├── store/
│   └── useXxxStore.ts  # Feature specific store manager.
```

## Example index

```ts
// Store
export { useCarStore } from './store/useCarStore';
export type { Car } from './store/useCarStore';

// Components
export { CarList } from './components/CarList';
```

## Example store
```ts
import { create } from 'zustand';

export interface Car {
    id: string;
    maker: string;
    model: string;
    price: number;
}

interface CarState {
    cars: Car[];
    setCars: (cars: Car[]) => void;
    addCar: (car: Car) => void;
    removeCar: (id: string) => void;
}

export const useCarStore = create<CarState>()((set) => ({
    cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 25000 },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 45000 },
        { id: '3', maker: 'Tesla', model: 'X', price: 40000 }
    ],
    setCars: (cars) => set({ cars }),
    addCar: (car) => set((state) => ({
        cars: [...state.cars, car]
    })),
    removeCar: (id) => set((state) => ({
        cars: state.cars.filter((car) => car.id !== id)
    })),
}));
```

## Example feature specific component

```ts
import { FlatList, Text } from 'react-native';
import { useCarStore } from '../store/useCarStore';

export const CarList = () => {
    const cars = useCarStore((state) => state.cars);

    return (
        <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            contentContainerClassName="flex-1 justify-center"
            renderItem={({ item }) => (
                <Text>
                    ({item.id}) {item.maker} {item.model}
                </Text>
            )}
        />
    );
}
```

Key points:
- The feature is neat module combined of both stores and components, that makes it easier to split the codebase up, for better readability and a constant overview of what is.

# The Store Pattern

There exists both feature based stores, and global stores, for forexample authentication.

## Anatomy of Store folder

```
src/store/
└── useXxxStore.ts      # Global stores, that are usuable accross different features, and places in the project.
```