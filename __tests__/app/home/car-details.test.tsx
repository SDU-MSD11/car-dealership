import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import CarDetailsScreen from '@/app/home/car-details';
import { useCarStore } from '@/features/cars';

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@expo/vector-icons/FontAwesome5', () => {
  const { View: MockView } = require('react-native');
  return {
    __esModule: true,
    default: () => <MockView testID="mock-car-icon" />,
  };
});

const { useLocalSearchParams } = require('expo-router');

describe('CarDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCarStore.setState({
      cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'Comfortable sedan for trips.' },
      ],
    });
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('renders full car information with booking button', () => {
    const { getByText, getByTestId } = render(<CarDetailsScreen />);

    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('Comfortable sedan for trips.')).toBeTruthy();
    expect(getByText('5 passengers')).toBeTruthy();
    expect(getByTestId('continue-booking-button')).toBeTruthy();
  });

  it('continues to booking when the button is pressed', () => {
    const { getByTestId } = render(<CarDetailsScreen />);

    fireEvent.press(getByTestId('continue-booking-button'));

    expect(router.push).toHaveBeenCalledWith('/home/booking-details?carId=1');
  });

  it('shows a not found state for unknown cars', () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '999' });

    const { getByText } = render(<CarDetailsScreen />);

    expect(getByText('Car not found')).toBeTruthy();
  });
});
