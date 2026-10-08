
import { useEffect, useState } from "react";
import {
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../../services/restaurantService";

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  // Get all restaurants
  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data.restaurants || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Edit restaurant
  const handleEdit = (restaurant) => {
    setEditingId(restaurant._id);
    setName(restaurant.name);
  };

  // Update restaurant
  const handleUpdate = async (id) => {
    try {
      await updateRestaurant(id, { name });

      alert("Restaurant updated successfully");

      setEditingId(null);
      setName("");

      fetchRestaurants();
    } catch (error) {
      console.error("Error updating restaurant:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update restaurant"
      );
    }
  };

  // Delete restaurant
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this restaurant?")) {
      return;
    }

    try {
      await deleteRestaurant(id);

      alert("Restaurant deleted successfully");

      fetchRestaurants();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete restaurant"
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">
        Restaurant Management
      </h2>

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="border rounded-lg p-4"
            >
              {editingId === restaurant._id ? (
                // Edit mode
                <div className="flex gap-2">
                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="border rounded px-3 py-2"
                  />

                  <button
                    onClick={() =>
                      handleUpdate(restaurant._id)
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setName("");
                    }}
                    className="border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Display mode
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {restaurant.name}
                    </h3>

                    <p className="text-gray-600">
                      {restaurant.cuisine}
                    </p>

                    <p className="text-gray-500">
                      {restaurant.location}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(restaurant)
                      }
                      className="bg-black text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(restaurant._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;