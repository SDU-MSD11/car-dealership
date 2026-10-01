import { render } from '@testing-library/react-native';
import ReturnSystemScreen from '@/app/booking/return-system';

describe('ReturnSystemScreen', () => {
  it('renders the return system placeholder', () => {
    const { getByText } = render(<ReturnSystemScreen />);

    expect(getByText('Return System')).toBeTruthy();
  });
});
