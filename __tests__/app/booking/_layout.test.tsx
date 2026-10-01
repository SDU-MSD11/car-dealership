import { render } from '@testing-library/react-native';
import { Stack } from 'expo-router';
import BookingLayout from '@/app/booking/_layout';

jest.mock('expo-router');

describe('BookingLayout', () => {
  it('registers the return system screen', () => {
    render(<BookingLayout />);

    const screenMock = Stack.Screen as unknown as jest.Mock;

    expect(screenMock).toHaveBeenCalledTimes(1);
    expect(screenMock.mock.calls).toEqual([
      [{ name: 'return-system', options: { title: 'Return System' } }],
    ]);
  });
});
