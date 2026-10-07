
const RestaurantInfo = ({ restaurant }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-8">

      {/* About */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6 md:p-8">

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          About the Restaurant
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {restaurant.description}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">

          <InfoCard
            label="Cuisine"
            value={`🍴 ${restaurant.cuisine}`}
          />

          <InfoCard
            label="Price Range"
            value={`₹${restaurant.priceRange}`}
          />

          <InfoCard
            label="Opening Hours"
            value={`🕐 ${restaurant.openingHours || "Not available"}`}
          />

          <InfoCard
            label="Contact"
            value={`📞 ${restaurant.contactNumber || "Not available"}`}
          />

        </div>
      </div>

      {/* Rating */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-center items-center text-center">

        <div className="text-5xl mb-3">
          ⭐
        </div>

        <p className="text-4xl font-extrabold text-gray-900">
          {restaurant.averageRating || 0}
        </p>

        <p className="text-gray-500 mt-2">
          Restaurant Rating
        </p>

        <div className="mt-5 px-4 py-2 bg-orange-50 rounded-full text-orange-700 font-semibold">
          {restaurant.cuisine} Cuisine
        </div>

      </div>

    </div>
  );
};

const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-orange-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
};

export default RestaurantInfo;