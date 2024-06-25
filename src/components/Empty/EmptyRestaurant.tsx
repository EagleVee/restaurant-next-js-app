const EmptyRestaurant = () => {
    return (
        <div className="flex flex-col justify-center items-center h-96 w-full">
            <p className="text-gray-900 text-xl mb-2">No restaurants found</p>
            <p className="text-gray-600">We found no restaurants matching your search and filter.</p>
        </div>
    );
};

export default EmptyRestaurant;
