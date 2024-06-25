import React, { useState } from 'react';
import { Restaurant } from '@prisma/client';
import IconHeart from '@/assets/icons/heart.svg';
import IconStar from '@/assets/icons/star.svg';
import styles from './RestaurantCard.module.css';
import { Featured, STORE_CATEGORY, textByStoreCategory } from '@/types/restaurant';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { HeroIcon } from '@/types/heroicons';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onFavoriteClick: (restaurantId: string, isFavorite: boolean) => void;
}

const FeaturedIcons: Record<string, HeroIcon> = {
    'stars-02': SparklesIcon,
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onFavoriteClick }) => {
    const { name, desc, rating, rating_count, images, isFavorite, featured, price_range, city, category } = restaurant;

    const [favourite, setFavourite] = useState(isFavorite);
    const [animate, setAnimate] = useState(false);

    const typedFeatured = featured as unknown as Featured;
    const FeaturedIcon = FeaturedIcons[typedFeatured.icon];

    const handleFavoriteClick = () => {
        setAnimate(true);
        const nextFavorite = !favourite;
        setFavourite(nextFavorite);
        onFavoriteClick(restaurant.id, nextFavorite);

        setTimeout(() => {
            setAnimate(false);
        }, 500);
    };

    return (
        <div className="p-2">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full pb-[56.25%]">
                    <img
                        src={images[0]}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full absolute object-cover top-0 left-0 rounded-lg"
                    />
                    <button
                        className={`${styles.heartButton} flex justify-center items-center rounded-full bg-black bg-opacity-50 absolute top-2 right-2`}
                        onClick={handleFavoriteClick}>
                        <IconHeart
                            className={animate ? styles.animateHeart : ''}
                            width="20"
                            height="20"
                            fill={favourite ? '#FF692E' : 'none'}
                            stroke={favourite ? '#FF692E' : 'white'}
                        />
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex items-center">
                        {!!FeaturedIcon && (
                            <span className="text-tint-color mr-1">{<FeaturedIcon className="w-4 h-4" />}</span>
                        )}
                        <span className="flex-1 text-tint-color text-xs">{typedFeatured?.text || ''}</span>
                    </div>
                    <div className="row-auto flex align-items-center mt-1">
                        <h2 className="flex-1 text-lg font-bold truncate text-gray-900">{name}</h2>
                        <div className="flex items-center text-gray-900 text-sm">
                            <IconStar fill="#FDB022" />
                            <span className="ml-1">
                                {rating_count === 0 ? '-' : rating.toFixed(1)}({rating_count})
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-900 mt-1 truncate text-sm">{desc}</p>
                    <p className="text-gray-900 mt-1 truncate text-sm">
                        {city?.length ? `${city} · ` : ''}
                        {textByStoreCategory[category as STORE_CATEGORY] || ''}
                        {price_range?.length ? ` · ${price_range}만원` : ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
