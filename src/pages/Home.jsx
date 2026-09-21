import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../services/restaurantService";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants({
        search,
        cuisine,
        location,
        priceRange,
      });

      console.log("Restaurant API Response:", data);

      setRestaurants(data.restaurants || data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Find Your Perfect Restaurant
      </h1>

      {/* Search Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded"
        />

        {/* Cuisine */}
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">All Cuisines</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Japanese">Japanese</option>
          <option value="Cafe">Cafe</option>
          <option value="Punjabi">Punjabi</option>
          <option value="Healthy">Healthy</option>
        </select>

        {/* Price Range */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">All Price Ranges</option>
          <option value="100-500">₹100 - ₹500</option>
          <option value="501-1000">₹501 - ₹1000</option>
          <option value="1001-5000">₹1001 - ₹5000</option>
          <option value="10000">₹10000+</option>
        </select>

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded"
        />

      </div>

      {/* Search Button */}
      <button
        onClick={fetchRestaurants}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
      >
        Search
      </button>

      {/* Restaurant Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))
        ) : (
          <p>No restaurants found.</p>
        )}

      </div>

    </div>
  );
};

export default Home;

