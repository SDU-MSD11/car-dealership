import { CarCard, CarList, CarPaginatedList, CarPreviewList, useCarStore } from '@/features/cars';

describe('cars public exports', () => {
  it('exports the cars components and store', () => {
    expect(CarList).toEqual(expect.any(Function));
    expect(CarCard).toEqual(expect.any(Function));
    expect(CarPreviewList).toEqual(expect.any(Function));
    expect(CarPaginatedList).toEqual(expect.any(Function));
    expect(useCarStore).toEqual(expect.any(Function));
  });
});
