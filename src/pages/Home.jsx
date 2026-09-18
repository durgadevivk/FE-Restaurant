// pages/Home.jsx

import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../services/restaurantService";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants({
        search,
        cuisine,
        location,
      });

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
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded"
        />

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
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded"
        />

      </div>

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