import React from 'react';
import { STORE_CATEGORY, textByStoreCategory } from '@/types/restaurant';

const CategoryTabs: React.FC = () => {
    return (
        <div className="flex overflow-x-scroll p-4 space-x-4">
            {Object.keys(STORE_CATEGORY).map((category) => (
                <div key={category} className="flex flex-col items-center">
                    <svg className="w-8 h-8" /* Add SVG icon logic here */></svg>
                    <span className="text-sm">{textByStoreCategory[category as STORE_CATEGORY]}</span>
                </div>
            ))}
        </div>
    );
};

export default CategoryTabs;
