import { fireEvent, render } from '@testing-library/react-native';
import { CarPaginatedList, useCarStore } from '@/features/cars';

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

describe('CarPaginatedList', () => {
  beforeEach(() => {
    useCarStore.setState({
      cars: [
        { id: '1', maker: 'Toyota', model: 'Camry', price: 59, passengers: 5, transmission: 'Automatic', description: 'a' },
        { id: '2', maker: 'Ford', model: 'Mustang', price: 129, passengers: 4, transmission: 'Manual', description: 'b' },
        { id: '3', maker: 'Tesla', model: 'Model 3', price: 99, passengers: 5, transmission: 'Automatic', description: 'c' },
      ],
    });
  });

  it('paginates without showing all data at once', () => {
    const { getByText, queryByText, getByTestId } = render(<CarPaginatedList pageSize={2} />);

    expect(getByText('Toyota Camry')).toBeTruthy();
    expect(getByText('Ford Mustang')).toBeTruthy();
    expect(queryByText('Tesla Model 3')).toBeNull();
    expect(getByText('Page 1 of 2')).toBeTruthy();

    fireEvent.press(getByTestId('page-button-2'));

    expect(getByText('Tesla Model 3')).toBeTruthy();
    expect(queryByText('Toyota Camry')).toBeNull();
    expect(getByText('Page 2 of 2')).toBeTruthy();
  });

  it('supports prev and next navigation', () => {
    const { getByTestId, getByText } = render(<CarPaginatedList pageSize={2} />);

    fireEvent.press(getByTestId('next-page'));
    expect(getByText('Page 2 of 2')).toBeTruthy();

    fireEvent.press(getByTestId('prev-page'));
    expect(getByText('Page 1 of 2')).toBeTruthy();
  });
});
