import { render } from '@testing-library/react-native';
import CarsScreen from '@/app/(main)/cars';

describe('CarsScreen', () => {
  it('renders the inventory list', () => {
    const { getByText } = render(<CarsScreen />);

    expect(getByText('(1) Toyota Camry')).toBeTruthy();
    expect(getByText('(2) Ford Mustang')).toBeTruthy();
    expect(getByText('(3) Tesla X')).toBeTruthy();
  });
});
