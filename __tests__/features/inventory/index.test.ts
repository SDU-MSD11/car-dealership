import { CarList, useCarStore } from '@/features/inventory';

describe('inventory public exports', () => {
  it('exports the inventory component and store', () => {
    expect(CarList).toEqual(expect.any(Function));
    expect(useCarStore).toEqual(expect.any(Function));
  });
});
