import { render } from '@testing-library/react-native';
import FullCarListScreen from '@/app/home/full-car-list';
import { useCarStore } from '@/features/cars';

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

describe('FullCarListScreen', () => {
  beforeEach(() => {
    useCarStore.setState({
      cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'a' },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'b' },
      ],
    });
  });

  it('renders the paginated car list', () => {
    const { getByTestId, getByText } = render(<FullCarListScreen />);

    expect(getByTestId('car-paginated-list')).toBeTruthy();
    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('Page 1 of 1')).toBeTruthy();
  });
});
