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