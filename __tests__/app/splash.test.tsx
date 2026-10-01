import { act, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import SplashScreen, { SPLASH_DURATION_MS } from '@/app/splash';

jest.mock('expo-router');

describe('SplashScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the splash placeholder', () => {
    const { getByText } = render(<SplashScreen />);

    expect(getByText('Splash Screen')).toBeTruthy();
  });

  it('redirects to home after the splash duration', () => {
    const replace = jest.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({ replace });

    render(<SplashScreen />);

    expect(replace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(SPLASH_DURATION_MS);
    });

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith('/(main)');
  });

  it('does not redirect if unmounted before the timer fires', () => {
    const replace = jest.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({ replace });

    const { unmount } = render(<SplashScreen />);
    unmount();

    act(() => {
      jest.advanceTimersByTime(SPLASH_DURATION_MS);
    });

    expect(replace).not.toHaveBeenCalled();
  });
});
