import React, { useMemo, useState } from 'react';
import { trpc } from '@/utils/trpc';

import { STORE_CATEGORY } from '@/types/restaurant';
import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import EmptyRestaurant from '@/components/Empty/EmptyRestaurant';

const RESTAURANT_FETCH_SIZE = 12;

const Home: React.FC = () => {
    const [searchCategory, setSearchCategory] = useState<STORE_CATEGORY | undefined>();
    const [searchText, setSearchText] = useState<string>('');
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } =
        trpc.restaurants.getRestaurants.useInfiniteQuery(
            {
                queryString: searchText,
                category: searchCategory,
                take: RESTAURANT_FETCH_SIZE,
            },
            {
                keepPreviousData: true,
                getNextPageParam: (lastResult) => lastResult.nextCursor,
            }
        );
    const toggleFavoriteMutation = trpc.restaurants.toggleFavorite.useMutation();

    const restaurants = useMemo(() => {
        return data?.pages.flatMap((page) => page.restaurants || []) || [];
    }, [data]);

    const onFavoriteClick = (restaurantId: string, isFavorite: boolean) => {
        toggleFavoriteMutation.mutate({ id: restaurantId, isFavorite });
    };

    const onCategoryChange = (category?: STORE_CATEGORY) => {
        setSearchCategory(category);
        refetch();
    };

    const onSearchRestaurant = (text: string) => {
        setSearchText(text);
        refetch();
    };

    const loadMore = () => {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    };

    return (
        <div>
            <SearchBar onSearch={onSearchRestaurant} />
            <CategoryTabs onCategoryChange={onCategoryChange} />
            <div className="p-2 mb-8">
                <div className="flex flex-wrap -mx-2">
                    {isLoading || isRefetching ? (
                        <div className="flex justify-center items-center h-96 w-full">
                            <LoadingSpinner size={48} />
                        </div>
                    ) : restaurants.length ? (
                        restaurants.map((restaurant) => (
                            <div key={restaurant.id} className="w-full md:w-1/2 lg:w-1/3 px-1 mb-1">
                                <RestaurantCard restaurant={restaurant} onFavoriteClick={onFavoriteClick} />
                            </div>
                        ))
                    ) : (
                        <EmptyRestaurant />
                    )}
                    {hasNextPage && !isLoading && (
                        <button
                            className="w-48 py-1 mx-auto block text-center text-tint-color hover:text-white bg-white hover:bg-tint-color rounded border-tint-color border-2"
                            onClick={loadMore}>
                            {isFetchingNextPage ? <LoadingSpinner size={16} /> : 'Load more'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
