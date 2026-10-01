import { render } from '@testing-library/react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '@/app/(main)/_layout';

jest.mock('expo-router');
jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn(() => null),
}));

describe('MainLayout', () => {
  it('registers the four tab buttons with Ionicons', () => {
    render(<MainLayout />);

    const screenMock = Tabs.Screen as unknown as jest.Mock;

    expect(screenMock).toHaveBeenCalledTimes(4);

    const calls = screenMock.mock.calls.map(([args]) => args);
    expect(calls.map((args) => args.name)).toEqual([
      'index',
      'current-booking',
      'profile',
      'support',
    ]);
    expect(calls.map((args) => args.options.title)).toEqual([
      'Home',
      'Current Booking',
      'Account Profile',
      'Contact / Support',
    ]);

    const expectedIcons = [
      'map-outline',
      'calendar-outline',
      'person-circle-outline',
      'help-circle-outline',
    ];
    calls.forEach((args, index) => {
      expect(typeof args.options.tabBarIcon).toBe('function');
      const icon = (args.options.tabBarIcon as Function)({
        color: 'black',
        size: 24,
        focused: false,
      });
      expect(icon.type).toBe(Ionicons);
      expect(icon.props).toMatchObject({
        name: expectedIcons[index],
        size: 24,
        color: 'black',
      });
    });
  });
});
