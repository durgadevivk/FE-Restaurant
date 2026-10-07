
import { useNavigate } from "react-router-dom";

const RestaurantHero = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate("/restaurants")}
        className="mb-4 text-gray-700 hover:text-orange-600 font-semibold"
      >
        ← Back to Restaurants
      </button>

      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-72 md:h-96 object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              {restaurant.cuisine}
            </span>

            <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ {restaurant.averageRating || 0}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold">
            {restaurant.name}
          </h1>

          <p className="mt-2 text-gray-200">
            📍 {restaurant.location}
          </p>

        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
