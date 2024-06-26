import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
    onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchText);
    };

    const handleClear = () => {
        setSearchText('');
        onSearch('');
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 relative">
                <input
                    type="text"
                    placeholder="맛집 이름을 검색해보세요"
                    className="w-full p-3 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-tint-color text-gray-800 pr-28"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-20 p-0.5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-gray-300 hover:text-white rounded-full">
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                )}
                <button
                    type="submit"
                    className="absolute right-2 bg-tint-color hover:bg-tint-color text-white font-bold py-2 px-4 rounded">
                    <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
