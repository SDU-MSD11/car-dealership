import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(main)/index';

describe('HomeScreen', () => {
  it('renders the map / car list placeholder', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Map / Car List')).toBeTruthy();
  });
});
