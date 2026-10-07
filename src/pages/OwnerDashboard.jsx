import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getOwnerRestaurant } from "../services/restaurantService";

import OwnerHeader from "../components/owner/OwnerHeader";
import RestaurantInfo from "../components/owner/RestaurantInfo";
import MenuManager from "../components/owner/MenuManager";

const OwnerDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRestaurant = async () => {
    try {
      const data = await getOwnerRestaurant();
      setRestaurant(data.restaurant);
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading restaurant...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl p-6">
          <h2 className="text-xl font-bold">
            No restaurant found
          </h2>

          <p className="text-gray-500 mt-2">
            No restaurant is associated with your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        <OwnerHeader user={user} restaurant={restaurant} />

        <RestaurantInfo
          restaurant={restaurant}
          setRestaurant={setRestaurant}
        />

        <MenuManager
          restaurant={restaurant}
          setRestaurant={setRestaurant}
        />

      </div>
    </div>
  );
};

export default OwnerDashboard;
