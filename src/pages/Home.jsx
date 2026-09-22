
import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../services/restaurantService";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [dietary, setDietary] = useState("");
  const [ambiance, setAmbiance] = useState("");
  const [specialFeatures, setSpecialFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);

      console.log("Filters being sent:", {
        search,
        cuisine,
        location,
        priceRange,
        dietary,
        ambiance,
        specialFeatures,
      });

      const data = await getRestaurants({
        search,
        cuisine,
        location,
        priceRange,
        dietary,
        ambiance,
        specialFeatures,
      });

      setRestaurants(data.restaurants || data);
    } catch (error) {
      console.error(error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const recommendedRestaurants = [...restaurants]
    .filter((restaurant) => {
      if (
        cuisine &&
        !restaurant.cuisine
          ?.toLowerCase()
          .includes(cuisine.toLowerCase())
      ) {
        return false;
      }

      if (
        dietary &&
        !restaurant.dietaryOptions?.includes(dietary)
      ) {
        return false;
      }

      if (
        ambiance &&
        !restaurant.ambiance?.includes(ambiance)
      ) {
        return false;
      }

      if (
        specialFeatures &&
        !restaurant.specialFeatures?.includes(specialFeatures)
      ) {
        return false;
      }

      return true;
    })
    .sort(
      (a, b) =>
        (b.averageRating || 0) - (a.averageRating || 0)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-orange-50/40">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400">

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">

          <div className="max-w-3xl text-white">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              🍽️ Discover • Reserve • Enjoy
            </div>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Find Your Perfect
              <span className="block text-amber-100">
                Dining Experience
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-50 md:text-xl">
              Discover amazing restaurants, explore different cuisines,
              and reserve your table effortlessly.
            </p>

          </div>
        </div>
      </section>


      {/* ================= FILTER SECTION ================= */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 md:px-6">

        <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-gray-100 md:p-7">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Explore Restaurants
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search and filter restaurants based on your preferences.
            </p>
          </div>


          {/* Search */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Search
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />

            </div>
          </div>


          {/* Filters */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

            {/* Cuisine */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Cuisine
              </label>

              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
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
            </div>


            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>


            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price Range
              </label>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">All Prices</option>
                <option value="100-500">₹100 - ₹500</option>
                <option value="501-1000">₹501 - ₹1000</option>
                <option value="1001-5000">₹1001 - ₹5000</option>
                <option value="10000">₹10000+</option>
              </select>
            </div>


            {/* Dietary */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Dietary
              </label>

              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Any Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Jain">Jain</option>
              </select>
            </div>


            {/* Ambiance */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Ambiance
              </label>

              <select
                value={ambiance}
                onChange={(e) => setAmbiance(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Any Ambiance</option>
                <option value="Romantic">Romantic</option>
                <option value="Casual">Casual</option>
                <option value="Family">Family</option>
                <option value="Fine Dining">Fine Dining</option>
              </select>
            </div>


            {/* Special Features */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Features
              </label>

              <select
                value={specialFeatures}
                onChange={(e) =>
                  setSpecialFeatures(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Any Features</option>
                <option value="Outdoor Seating">
                  Outdoor Seating
                </option>
                <option value="Live Music">
                  Live Music
                </option>
                <option value="Parking">Parking</option>
                <option value="WiFi">WiFi</option>
              </select>
            </div>

          </div>


          {/* Search Button */}
          <div className="mt-6 flex justify-end">

            <button
              onClick={fetchRestaurants}
              disabled={loading}
              className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "🔍 Search Restaurants"}
            </button>

          </div>

        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-7xl px-6 py-12">


        {/* Recommended Restaurants */}
        {recommendedRestaurants.length > 0 && (
          <section className="mb-14">

            <div className="mb-6 flex items-end justify-between">

              <div>
                <div className="mb-2 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  ⭐ TOP PICKS
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Recommended for You
                </h2>

                <p className="mt-2 text-gray-500">
                  Highly rated restaurants worth exploring.
                </p>
              </div>

            </div>


            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {recommendedRestaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="transition duration-300 hover:-translate-y-1"
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}

            </div>

          </section>
        )}


        {/* All Restaurants */}
        <section>

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Explore All Restaurants
              </h2>

              <p className="mt-2 text-gray-500">
                {restaurants.length > 0
                  ? `${restaurants.length} restaurant${
                      restaurants.length > 1 ? "s" : ""
                    } available`
                  : "Discover your next favourite place to eat"}
              </p>
            </div>

          </div>


          {/* Loading */}
          {loading && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl bg-gray-200"
                ></div>
              ))}

            </div>
          )}


          {/* Restaurants */}
          {!loading && restaurants.length > 0 && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {restaurants
                .filter(
                  (restaurant) =>
                    !recommendedRestaurants.some(
                      (recommended) =>
                        recommended._id === restaurant._id
                    )
                )
                .map((restaurant) => (
                  <div
                    key={restaurant._id}
                    className="transition duration-300 hover:-translate-y-1"
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}

            </div>
          )}


          {/* Empty State */}
          {!loading && restaurants.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mb-4 text-5xl">
                🍽️
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                No restaurants found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                We couldn't find restaurants matching your search.
                Try changing your filters or searching for something else.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCuisine("");
                  setLocation("");
                  setPriceRange("");
                  setDietary("");
                  setAmbiance("");
                  setSpecialFeatures("");
                }}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Clear Filters
              </button>

            </div>
          )}

        </section>

      </main>


      {/* ================= FOOTER CTA ================= */}
      <section className="mt-8 bg-gray-900 px-6 py-14 text-center text-white">

        <h2 className="text-3xl font-bold">
          Ready for your next dining experience?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          Discover great food, find the perfect restaurant,
          and reserve your table with DineReserve.
        </p>

      </section>

    </div>
  );
};

export default Home;

