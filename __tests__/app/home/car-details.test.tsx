import { render } from '@testing-library/react-native';
import CarDetailsScreen from '@/app/home/car-details';

describe('CarDetailsScreen', () => {
  it('renders the car details placeholder', () => {
    const { getByText } = render(<CarDetailsScreen />);

    expect(getByText('Car Details')).toBeTruthy();
  });
});
