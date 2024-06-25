import React, { useState } from 'react';
import { Restaurant } from '@prisma/client';
import IconHeart from '@/assets/icons/heart.svg';
import IconStar from '@/assets/icons/star.svg';
import styles from './RestaurantCard.module.css';
import { Featured } from '@/types/restaurant';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { HeroIcon } from '@/types/heroicons';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onFavoriteClick: (isFavorite: boolean, restaurant: Restaurant) => void;
}

const FeaturedIcons: Record<string, HeroIcon> = {
    'stars-02': SparklesIcon,
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onFavoriteClick }) => {
    const { name, desc, rating, rating_count, images, isFavorite, featured } = restaurant;
    const [favourite, setFavourite] = useState(isFavorite);
    const typedFeatured = featured as unknown as Featured;
    const FeaturedIcon = FeaturedIcons[typedFeatured.icon];
    return (
        <div className="p-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={images[0]} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <div className="flex items-center">
                        <span className="text-tint-color">
                            {!!FeaturedIcon && <FeaturedIcon className="w-5 h-5" />}
                        </span>
                        <span className="flex-1 text-tint-color ml-1">{typedFeatured?.text || ''}</span>
                        <button
                            className={`${styles['heart-button']} flex justify-center items-center rounded-full bg-black bg-opacity-50`}
                            onClick={() => {
                                setFavourite(!favourite);
                                onFavoriteClick(!favourite, restaurant);
                            }}>
                            <IconHeart
                                width="20"
                                height="20"
                                fill={favourite ? '#FF692E' : 'none'}
                                stroke={favourite ? '#FF692E' : 'white'}
                            />
                        </button>
                    </div>
                    <div className="row-auto flex align-items-center mt-1">
                        <h2 className="flex-1 text-lg font-bold truncate text-gray-900">{name}</h2>
                        <div className="flex items-center text-gray-900">
                            <IconStar fill="#FDB022" />
                            <span className="ml-1">{rating_count === 0 ? '-' : rating.toFixed(1)}</span>
                            <span className="ml-1">({rating_count})</span>
                        </div>
                    </div>
                    <p className="text-gray-900 mt-1 line-clamp-2" style={{ minHeight: '3rem' }}>
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
