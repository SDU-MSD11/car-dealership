import { render } from '@testing-library/react-native';
import ExpandedMapScreen from '@/app/home/expanded-map';

describe('ExpandedMapScreen', () => {
  it('renders the expanded map placeholder', () => {
    const { getByText } = render(<ExpandedMapScreen />);

    expect(getByText('Expanded Map')).toBeTruthy();
  });
});
