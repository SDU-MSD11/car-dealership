import { Car, useCarStore } from '@/features/inventory';

const initialCars: Car[] = [
  { id: '1', maker: 'Toyota', model: 'Camry', price: 25000 },
  { id: '2', maker: 'Ford', model: 'Mustang', price: 45000 },
  { id: '3', maker: 'Tesla', model: 'X', price: 40000 },
];

describe('useCarStore', () => {
  beforeEach(() => {
    useCarStore.setState({ cars: initialCars });
  });

  it('contains the initial inventory', () => {
    expect(useCarStore.getState().cars).toEqual(initialCars);
  });

  it('replaces the inventory with setCars', () => {
    const cars: Car[] = [
      { id: '4', maker: 'Honda', model: 'Civic', price: 28000 },
    ];

    useCarStore.getState().setCars(cars);

    expect(useCarStore.getState().cars).toEqual(cars);
  });

  it('adds a car with addCar', () => {
    const car: Car = {
      id: '4',
      maker: 'Honda',
      model: 'Civic',
      price: 28000,
    };

    useCarStore.getState().addCar(car);

    expect(useCarStore.getState().cars).toEqual([...initialCars, car]);
  });

  it('removes a car with removeCar', () => {
    useCarStore.getState().removeCar('2');

    expect(useCarStore.getState().cars).toEqual([initialCars[0], initialCars[2]]);
  });
});
