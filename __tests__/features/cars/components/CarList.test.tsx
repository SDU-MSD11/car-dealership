import { render } from '@testing-library/react-native';
import { CarList, useCarStore } from '@/features/cars';

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}));

jest.mock('@expo/vector-icons/FontAwesome5', () => {
  const { View: MockView } = require('react-native');
  return {
    __esModule: true,
    default: () => <MockView testID="mock-car-icon" />,
  };
});

describe('CarList', () => {
  beforeEach(() => {
    useCarStore.setState({
      cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'Sedan' },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'Coupe' },
        { id: '3', maker: 'Tesla', model: 'Model 3', price: 99, passengers: 5, transmission: 'Automatic', description: 'Electric' },
      ],
    });
  });

  it('renders every car from the cars store', () => {
    const { getByText } = render(<CarList />);

    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('Ford Mustang')).toBeTruthy();
    expect(getByText('Tesla Model 3')).toBeTruthy();
  });
});
