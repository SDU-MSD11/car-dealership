import { render } from '@testing-library/react-native';
import SettingsScreen from '@/app/(main)/settings';

describe('SettingsScreen', () => {
  it('renders the settings screen', () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText('Settings Screen')).toBeTruthy();
  });
});
