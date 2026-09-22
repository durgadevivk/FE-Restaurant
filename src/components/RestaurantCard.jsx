
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* ================= IMAGE ================= */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"></div>


        {/* Rating */}
        <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-gray-800 shadow-md">
          ⭐ {restaurant.averageRating || "New"}
        </div>


        {/* Price badge */}
        <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-gray-800 shadow">
          ₹ {restaurant.priceRange}
        </div>

      </div>


      {/* ================= CONTENT ================= */}
      <div className="p-5">

        {/* Restaurant Name */}
        <h2 className="truncate text-xl font-bold text-gray-900 transition group-hover:text-orange-600">
          {restaurant.name}
        </h2>


        {/* Cuisine */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span>🍴</span>
          <span>{restaurant.cuisine}</span>
        </div>


        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <span>📍</span>
          <span className="truncate">
            {restaurant.location}
          </span>
        </div>


        {/* Divider */}
        <div className="my-4 border-t border-gray-100"></div>


        {/* Bottom Section */}
        <div className="flex items-center justify-between gap-3">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Dining
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-700">
              Reserve your table
            </p>
          </div>


          {/* View Details */}
          <Link
            to={`/restaurants/${restaurant._id}`}
            className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-md"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default RestaurantCard;

