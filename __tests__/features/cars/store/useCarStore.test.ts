import { Car, useCarStore } from '@/features/cars';

const initialCars: Car[] = [
  { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'Sedan' },
  { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'Coupe' },
  { id: '3', maker: 'Tesla', model: 'Model 3', price: 99, passengers: 5, transmission: 'Automatic', description: 'Electric' },
];

describe('useCarStore', () => {
  beforeEach(() => {
    useCarStore.setState({ cars: initialCars });
  });

  it('contains the initial cars', () => {
    expect(useCarStore.getState().cars).toEqual(initialCars);
  });

  it('replaces the cars with setCars', () => {
    const cars: Car[] = [
      { id: '4', maker: 'Honda', model: 'Civic', price: 55, passengers: 5, transmission: 'Manual', description: 'Compact' },
    ];

    useCarStore.getState().setCars(cars);

    expect(useCarStore.getState().cars).toEqual(cars);
  });

  it('adds a car with addCar', () => {
    const car: Car = {
      id: '4',
      maker: 'Honda',
      model: 'Civic',
      price: 55,
      passengers: 5,
      transmission: 'Manual',
      description: 'Compact',
    };

    useCarStore.getState().addCar(car);

    expect(useCarStore.getState().cars).toEqual([...initialCars, car]);
  });

  it('removes a car with removeCar', () => {
    useCarStore.getState().removeCar('2');

    expect(useCarStore.getState().cars).toEqual([initialCars[0], initialCars[2]]);
  });
});
