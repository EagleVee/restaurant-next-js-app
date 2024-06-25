const EmptyRestaurant = () => {
    return (
        <div className="flex flex-col justify-center items-center h-96 w-full">
            <p className="text-gray-500 text-xl mb-2">No restaurants found</p>
            <p className="text-gray-400">We found no restaurants matching your search and filter.</p>
        </div>
    );
};

export default EmptyRestaurant;
