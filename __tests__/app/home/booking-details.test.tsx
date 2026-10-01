import { render } from '@testing-library/react-native';
import BookingDetailsScreen from '@/app/home/booking-details';

describe('BookingDetailsScreen', () => {
  it('renders the booking details placeholder', () => {
    const { getByText } = render(<BookingDetailsScreen />);

    expect(getByText('Booking Details')).toBeTruthy();
  });
});
