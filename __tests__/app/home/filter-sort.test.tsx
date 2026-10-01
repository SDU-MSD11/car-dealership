import { render } from '@testing-library/react-native';
import FilterSortScreen from '@/app/home/filter-sort';

describe('FilterSortScreen', () => {
  it('renders the filter / sort placeholder', () => {
    const { getByText } = render(<FilterSortScreen />);

    expect(getByText('Filter / Sort')).toBeTruthy();
  });
});
