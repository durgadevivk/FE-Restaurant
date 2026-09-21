import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getRestaurantById
} from "../services/restaurantService";

const OwnerDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // We will connect the owner's restaurant ID here
  }, []);

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Restaurant Owner Dashboard
      </h1>

      <p className="mb-4">
        Welcome, {user?.name || "Restaurant Owner"}
      </p>

      <div className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Manage Your Restaurant
        </h2>

        <p className="text-gray-600">
          Restaurant management options will appear here.
        </p>
      </div>

    </div>
  );
};

export default OwnerDashboard;