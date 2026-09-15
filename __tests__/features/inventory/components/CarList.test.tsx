import { render } from '@testing-library/react-native';
import { CarList } from '@/features/inventory';

describe('CarList', () => {
  it('renders every car from the inventory store', () => {
    const { getByText } = render(<CarList />);

    expect(getByText('(1) Toyota Camry')).toBeTruthy();
    expect(getByText('(2) Ford Mustang')).toBeTruthy();
    expect(getByText('(3) Tesla X')).toBeTruthy();
  });
});
