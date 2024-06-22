import React from 'react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    const { name, desc, rating, rating_count, images, isFavorite, featured } = restaurant;
    return (
        <div className="p-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={images[0]} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-orange-500">{featured.text}</span>
                        <button>
                            {isFavorite ? (
                                <svg className="w-6 h-6 text-red-500" /* Add filled heart SVG here */></svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-400" /* Add empty heart SVG here */></svg>
                            )}
                        </button>
                    </div>
                    <h2 className="text-lg font-bold truncate">{name}</h2>
                    <p className="text-gray-600">{desc}</p>
                    <div className="flex items-center mt-2">
                        <svg className="w-5 h-5 text-yellow-500" /* Add star SVG here */></svg>
                        <span className="ml-1">{rating.toFixed(1)}</span>
                        <span className="ml-1 text-gray-600">({rating_count})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
