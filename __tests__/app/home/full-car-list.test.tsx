import { render } from '@testing-library/react-native';
import FullCarListScreen from '@/app/home/full-car-list';

describe('FullCarListScreen', () => {
  it('renders the full car list placeholder', () => {
    const { getByText } = render(<FullCarListScreen />);

    expect(getByText('Full Car List')).toBeTruthy();
  });
});
