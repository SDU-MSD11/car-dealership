import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import { CarPreviewList, useCarStore } from '@/features/cars';

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

describe('CarPreviewList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCarStore.setState({
      cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'a' },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'b' },
        { id: '3', maker: 'Tesla', model: 'Model 3', price: 99, passengers: 5, transmission: 'Automatic', description: 'c' },
        { id: '4', maker: 'Honda', model: 'Civic', price: 55, passengers: 5, transmission: 'Manual', description: 'd' },
        { id: '5', maker: 'BMW', model: '3 Series', price: 109, passengers: 5, transmission: 'Automatic', description: 'e' },
      ],
    });
  });

  it('shows the top 3 cars plus a view more entry', () => {
    const { getByText, queryByText, getByTestId } = render(<CarPreviewList />);

    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('Ford Mustang')).toBeTruthy();
    expect(getByText('Tesla Model 3')).toBeTruthy();
    expect(queryByText('Honda Civic')).toBeNull();
    expect(getByTestId('view-more-results')).toBeTruthy();
    expect(getByText('View more results')).toBeTruthy();
  });

  it('navigates to the full car list when view more is pressed', () => {
    const { getByTestId } = render(<CarPreviewList />);

    fireEvent.press(getByTestId('view-more-results'));

    expect(router.push).toHaveBeenCalledWith('/home/full-car-list');
  });
});
