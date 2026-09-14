import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(main)/index';

describe('HomeScreen', () => {
  it('renders the home screen', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Home Screen')).toBeTruthy();
  });
});
