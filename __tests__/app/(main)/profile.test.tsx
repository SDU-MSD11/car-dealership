import { render } from '@testing-library/react-native';
import ProfileScreen from '@/app/(main)/profile';

describe('ProfileScreen', () => {
  it('renders the account profile placeholder', () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText('Account Profile')).toBeTruthy();
  });
});
