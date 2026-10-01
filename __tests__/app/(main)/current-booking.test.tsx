import { render } from '@testing-library/react-native';
import CurrentBookingScreen from '@/app/(main)/current-booking';

describe('CurrentBookingScreen', () => {
  it('renders the current booking placeholder', () => {
    const { getByText } = render(<CurrentBookingScreen />);

    expect(getByText('Current Booking')).toBeTruthy();
  });
});
