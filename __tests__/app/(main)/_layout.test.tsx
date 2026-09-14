import { render } from '@testing-library/react-native';
import { Tabs } from 'expo-router';
import MainLayout from '@/app/(main)/_layout';

jest.mock('expo-router');

describe('MainLayout', () => {
  it('registers the main application tabs', () => {
    render(<MainLayout />);

    const screenMock = Tabs.Screen as unknown as jest.Mock;

    expect(screenMock).toHaveBeenCalledTimes(3);
    expect(screenMock.mock.calls).toEqual([
      [{ name: 'index', options: { title: 'Home' } }],
      [{ name: 'cars', options: { title: 'Cars' } }],
      [{ name: 'settings', options: { title: 'Settings' } }],
    ]);
  });
});
