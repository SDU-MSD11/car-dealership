import { render } from '@testing-library/react-native';
import ConfirmationScreen from '@/app/home/confirmation';

describe('ConfirmationScreen', () => {
  it('renders the confirmation placeholder', () => {
    const { getByText } = render(<ConfirmationScreen />);

    expect(getByText('Confirmation')).toBeTruthy();
  });
});
