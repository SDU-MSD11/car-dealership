import { create } from 'zustand';

export type Transmission = 'Automatic' | 'Manual';

export interface Car {
    id: string;
    maker: string;
    model: string;
    price: number;
    passengers: number;
    transmission: Transmission;
    description: string;
}

interface CarState {
    cars: Car[];
    setCars: (cars: Car[]) => void;
    addCar: (car: Car) => void;
    removeCar: (id: string) => void;
}

export const useCarStore = create<CarState>()((set) => ({
    cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'Comfortable mid-size sedan, ideal for city trips and longer journeys.' },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'Iconic sports coupe with strong performance and head-turning style.' },
        { id: '3', maker: 'Tesla', model: 'Model 3', price: 99, passengers: 5, transmission: 'Automatic', description: 'Electric sedan with autopilot features and minimal running costs.' },
        { id: '4', maker: 'Honda', model: 'Civic', price: 55, passengers: 5, transmission: 'Manual', description: 'Reliable compact car with great fuel economy.' },
        { id: '5', maker: 'BMW', model: '3 Series', price: 109, passengers: 5, transmission: 'Automatic', description: 'Premium sedan with sporty handling and refined interior.' },
        { id: '6', maker: 'Audi', model: 'Q5', price: 119, passengers: 5, transmission: 'Automatic', description: 'Spacious SUV with quattro all-wheel drive and plenty of luggage room.' },
        { id: '7', maker: 'Volkswagen', model: 'Golf', price: 49, passengers: 5, transmission: 'Manual', description: 'Practical hatchback, easy to park and fun to drive.' }
    ],
    setCars: (cars) => set({ cars }),
    addCar: (car) => set((state) => ({
        cars: [...state.cars, car]
    })),
    removeCar: (id) => set((state) => ({
        cars: state.cars.filter((car) => car.id !== id)
    })),
}));