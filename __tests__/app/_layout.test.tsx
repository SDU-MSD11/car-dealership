import { render } from '@testing-library/react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Layout from '@/app/_layout';

jest.mock('expo-router');
jest.mock('expo-status-bar');

describe('Layout', () => {
  it('configures the main route and dark status bar', () => {
    render(<Layout />);

    const screenMock = Stack.Screen as unknown as jest.Mock;
    const statusBarMock = StatusBar as unknown as jest.Mock;

    expect(screenMock).toHaveBeenCalledWith(
      { name: '(main)', options: { headerShown: false } },
      undefined,
    );
    expect(statusBarMock).toHaveBeenCalledWith({ style: 'dark' }, undefined);
  });
});
