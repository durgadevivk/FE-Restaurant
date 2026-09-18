// components/RestaurantCard.jsx

import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {restaurant.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {restaurant.cuisine}
        </p>

        <p className="text-gray-500">
          {restaurant.location}
        </p>

        <p className="mt-2 text-sm">
          {restaurant.priceRange}
        </p>

        <Link
          to={`/restaurants/${restaurant._id}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;