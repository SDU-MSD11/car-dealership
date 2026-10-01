import { render } from '@testing-library/react-native';
import { Stack } from 'expo-router';
import HomeLayout from '@/app/home/_layout';

jest.mock('expo-router');

describe('HomeLayout', () => {
  it('registers the home stack screens', () => {
    render(<HomeLayout />);

    const screenMock = Stack.Screen as unknown as jest.Mock;

    expect(screenMock).toHaveBeenCalledTimes(7);
    expect(screenMock.mock.calls).toEqual([
      [{ name: 'filter-sort', options: { title: 'Filter / Sort' } }],
      [{ name: 'car-details', options: { title: 'Car Details' } }],
      [{ name: 'full-car-list', options: { title: 'Full Car List' } }],
      [{ name: 'expanded-map', options: { title: 'Expanded Map' } }],
      [{ name: 'booking-details', options: { title: 'Booking Details' } }],
      [{ name: 'login-register', options: { title: 'Login / Register' } }],
      [{ name: 'confirmation', options: { title: 'Confirmation' } }],
    ]);
  });
});
