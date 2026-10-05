import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import { CarCard } from '@/features/cars';

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

const car = {
  id: '1',
  maker: 'Toyota',
  model: 'Camry',
  price: 59,
  passengers: 5,
  transmission: 'Automatic' as const,
  description: 'Sedan',
};

describe('CarCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title, specs and price', () => {
    const { getByText } = render(<CarCard car={car} />);

    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('Automatic')).toBeTruthy();
    expect(getByText('$59/day')).toBeTruthy();
  });

  it('opens the car detail page when pressed', () => {
    const { getByTestId } = render(<CarCard car={car} />);

    fireEvent.press(getByTestId('car-card-1'));

    expect(router.push).toHaveBeenCalledWith('/home/car-details?id=1');
  });
});
