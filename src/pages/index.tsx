import React from 'react';
import { trpc } from '@/utils/trpc';

import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';

const Home: React.FC = () => {
    const { data, isLoading } = trpc.restaurants.getRestaurants.useQuery();
    const [favorite, setFavorite] = React.useState<string | null>(null);
    const addFavorite = trpc.restaurants.toggleFavorite.useMutation();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No restaurants found</div>;
    }

    const handleFavorite = (id: string) => {
        addFavorite.mutate({ id });
        setFavorite(id);
    };

    return (
        <div>
            <SearchBar />
            <CategoryTabs />
            <div className="p-4">
                <div className="flex flex-wrap -mx-2">
                    {data.map((restaurant) => (
                        <div key={restaurant.id} className="w-full md:w-1/2 lg:w-1/3 px-1 mb-1">
                            <RestaurantCard restaurant={restaurant} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
