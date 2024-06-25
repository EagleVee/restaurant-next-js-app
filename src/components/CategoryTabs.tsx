import React from 'react';
import { STORE_CATEGORY, textByStoreCategory } from '@/types/restaurant';

const CategoryTabs: React.FC = () => {
    const [currentCategory, setCurrentCategory] = React.useState<STORE_CATEGORY | null>(null);

    const renderItem = (category: string | null) => {
        return (
            <div
                onClick={() => {
                    setCurrentCategory(category as STORE_CATEGORY | null);
                }}
                key={category}
                className={`rounded flex items-center text-gray-900 px-3 py-1 cursor-pointer ${currentCategory === category ? 'bg-gray-200' : ''}`}>
                <span className="text-sm">{category ? textByStoreCategory[category as STORE_CATEGORY] : 'All'}</span>
            </div>
        );
    };
    return (
        <div className="flex overflow-x-auto whitespace-nowrap p-4 space-x-4">
            {renderItem(null)}
            {Object.keys(STORE_CATEGORY).map(renderItem)}
        </div>
    );
};

export default CategoryTabs;
