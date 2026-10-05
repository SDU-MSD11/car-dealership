import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCarStore } from '../store/useCarStore';
import { CarCard } from './CarCard';

interface CarPaginatedListProps {
    pageSize?: number;
}

export const CarPaginatedList = ({ pageSize = 5 }: CarPaginatedListProps) => {
    const cars = useCarStore((state) => state.cars);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(cars.length / pageSize));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const start = (safePage - 1) * pageSize;
    const pageCars = cars.slice(start, start + pageSize);

    return (
        <View testID="car-paginated-list" className="gap-3">
            {pageCars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
            <View className="mt-2 flex-row items-center justify-center gap-2">
                <Pressable
                    testID="prev-page"
                    accessibilityRole="button"
                    accessibilityLabel="Previous page"
                    disabled={safePage <= 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                    className={`rounded-xl px-4 py-2 ${safePage <= 1 ? 'bg-gray-200' : 'bg-black'}`}
                >
                    <Text className={`text-sm font-semibold ${safePage <= 1 ? 'text-gray-400' : 'text-white'}`}>
                        Prev
                    </Text>
                </Pressable>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Pressable
                        key={pageNumber}
                        testID={`page-button-${pageNumber}`}
                        accessibilityRole="button"
                        accessibilityLabel={`Page ${pageNumber}`}
                        onPress={() => setPage(pageNumber)}
                        className={`rounded-xl px-3 py-2 ${pageNumber === safePage ? 'bg-black' : 'bg-white'}`}
                    >
                        <Text
                            className={`text-sm font-semibold ${pageNumber === safePage ? 'text-white' : 'text-black'}`}
                        >
                            {pageNumber}
                        </Text>
                    </Pressable>
                ))}
                <Pressable
                    testID="next-page"
                    accessibilityRole="button"
                    accessibilityLabel="Next page"
                    disabled={safePage >= totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`rounded-xl px-4 py-2 ${safePage >= totalPages ? 'bg-gray-200' : 'bg-black'}`}
                >
                    <Text
                        className={`text-sm font-semibold ${safePage >= totalPages ? 'text-gray-400' : 'text-white'}`}
                    >
                        Next
                    </Text>
                </Pressable>
            </View>
            <Text testID="page-indicator" className="text-center text-xs text-gray-500">
                Page {safePage} of {totalPages}
            </Text>
        </View>
    );
};
