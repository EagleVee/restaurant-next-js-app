import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <div className="p-4 ">
            <input
                type="text"
                placeholder="맛집 이름을 검색해보세요"
                className="w-full p-3 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;
