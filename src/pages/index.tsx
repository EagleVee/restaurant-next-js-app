import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';

import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';
import { STORE_CATEGORY } from '@/types/restaurant';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import EmptyRestaurant from '@/components/Empty/EmptyRestaurant';

const Home: React.FC = () => {
    const [searchCategory, setSearchCategory] = useState<STORE_CATEGORY | undefined>();
    const [searchText, setSearchText] = useState<string>('');
    const { data, isLoading } = trpc.restaurants.getRestaurants.useQuery({
        queryString: searchText,
        category: searchCategory,
    });
    const toggleFavoriteMutation = trpc.restaurants.toggleFavorite.useMutation();

    const onFavoriteClick = (restaurantId: string, isFavorite: boolean) => {
        toggleFavoriteMutation.mutate({ id: restaurantId, isFavorite });
    };

    const onCategoryChange = (category?: STORE_CATEGORY) => {
        setSearchCategory(category);
    };

    const onSearchRestaurant = (text: string) => {
        setSearchText(text);
    };

    return (
        <div>
            <SearchBar onSearch={onSearchRestaurant} />
            <CategoryTabs onCategoryChange={onCategoryChange} />
            <div className="p-2">
                <div className="flex flex-wrap -mx-2">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : data?.length ? (
                        data.map((restaurant) => (
                            <div key={restaurant.id} className="w-full md:w-1/2 lg:w-1/3 px-1 mb-1">
                                <RestaurantCard restaurant={restaurant} onFavoriteClick={onFavoriteClick} />
                            </div>
                        ))
                    ) : (
                        <EmptyRestaurant />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
