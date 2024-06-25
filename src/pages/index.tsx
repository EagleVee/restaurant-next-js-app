import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';

import { Restaurant } from '@prisma/client';
import { STORE_CATEGORY } from '@/types/restaurant';
import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import EmptyRestaurant from '@/components/Empty/EmptyRestaurant';

const RESTAURANT_FETCH_SIZE = 12;

const Home: React.FC = () => {
    const [page, setPage] = useState(0);
    const [searchCategory, setSearchCategory] = useState<STORE_CATEGORY | undefined>();
    const [searchText, setSearchText] = useState<string>('');
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { isLoading } = trpc.restaurants.getRestaurants.useQuery(
        {
            queryString: searchText,
            category: searchCategory,
            skip: page * RESTAURANT_FETCH_SIZE,
            take: RESTAURANT_FETCH_SIZE,
        },
        {
            keepPreviousData: true,
            onSuccess: (data) => {
                setRestaurants((prev) => {
                    return page === 0 ? data.restaurants : [...prev, ...data.restaurants];
                });
                setHasMore(data.hasMore);
                setIsLoadingMore(false);
            },
        }
    );
    const toggleFavoriteMutation = trpc.restaurants.toggleFavorite.useMutation();

    const onFavoriteClick = (restaurantId: string, isFavorite: boolean) => {
        toggleFavoriteMutation.mutate({ id: restaurantId, isFavorite });
    };

    const onCategoryChange = (category?: STORE_CATEGORY) => {
        setPage(0);
        setSearchCategory(category);
    };

    const onSearchRestaurant = (text: string) => {
        setPage(0);
        setSearchText(text);
    };

    const loadMore = () => {
        if (!hasMore) return;
        setIsLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <SearchBar onSearch={onSearchRestaurant} />
            <CategoryTabs onCategoryChange={onCategoryChange} />
            <div className="p-2 mb-8">
                <div className="flex flex-wrap -mx-2">
                    {isLoading ? (
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
                    {hasMore && !isLoading && (
                        <button
                            className="px-4 py-1 mx-auto block text-center text-tint-color hover:text-white bg-white hover:bg-tint-color rounded border-tint-color border-2"
                            onClick={loadMore}>
                            {isLoadingMore ? <LoadingSpinner size={16} /> : 'Load more'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
