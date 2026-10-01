import { render } from '@testing-library/react-native';
import SupportScreen from '@/app/(main)/support';

describe('SupportScreen', () => {
  it('renders the contact / support placeholder', () => {
    const { getByText } = render(<SupportScreen />);

    expect(getByText('Contact / Support')).toBeTruthy();
  });
});
