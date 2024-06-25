import React, { useRef } from 'react';
import { STORE_CATEGORY, textByStoreCategory } from '@/types/restaurant';

interface CategoryTabsProps {
    onCategoryChange: (category?: STORE_CATEGORY) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
    const [currentCategory, setCurrentCategory] = React.useState<STORE_CATEGORY | undefined>();
    const containerRef = useRef<HTMLDivElement>(null);

    const renderItem = (category?: string) => {
        const typedCategory = category as STORE_CATEGORY;
        return (
            <div
                onClick={() => {
                    setCurrentCategory(typedCategory);
                    onCategoryChange?.(typedCategory);
                }}
                key={category}
                className={`rounded flex items-center text-gray-900 px-3 py-1 cursor-pointer ${currentCategory === category ? 'bg-gray-200' : ''}`}>
                <span className="text-sm">{category ? textByStoreCategory[typedCategory] : 'All'}</span>
            </div>
        );
    };
    return (
        <div
            ref={containerRef}
            className="flex overflow-x-auto whitespace-nowrap p-4 space-x-2"
            onWheel={(event) => {
                if (containerRef.current) {
                    containerRef.current.scrollLeft += event.deltaY;
                }
            }}>
            {renderItem()}
            {Object.keys(STORE_CATEGORY).map(renderItem)}
        </div>
    );
};

export default CategoryTabs;
