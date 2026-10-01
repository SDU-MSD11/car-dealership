import { render } from '@testing-library/react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Layout from '@/app/_layout';

jest.mock('expo-router');
jest.mock('expo-status-bar');

describe('Layout', () => {
  it('configures the splash, tab group and stack routes', () => {
    render(<Layout />);

    const screenMock = Stack.Screen as unknown as jest.Mock;
    const statusBarMock = StatusBar as unknown as jest.Mock;

    expect(screenMock).toHaveBeenCalledTimes(4);
    expect(screenMock.mock.calls).toEqual([
      [{ name: 'splash', options: { headerShown: false } }],
      [{ name: '(main)', options: { headerShown: false } }],
      [{ name: 'home', options: { headerShown: false } }],
      [{ name: 'booking', options: { headerShown: false } }],
    ]);
    expect(statusBarMock).toHaveBeenCalledWith({ style: 'dark' }, undefined);
  });
});
