import { render } from '@testing-library/react-native';
import LoginRegisterScreen from '@/app/home/login-register';

describe('LoginRegisterScreen', () => {
  it('renders the login / register placeholder', () => {
    const { getByText } = render(<LoginRegisterScreen />);

    expect(getByText('Login / Register')).toBeTruthy();
  });
});
