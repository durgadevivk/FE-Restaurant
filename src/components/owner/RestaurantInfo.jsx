import { useState } from "react";
import { updateRestaurant } from "../../services/restaurantService";

const RestaurantInfo = ({ restaurant, setRestaurant }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    description: restaurant.description || "",
    openingHours: restaurant.openingHours || "",
    contactNumber: restaurant.contactNumber || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const data = await updateRestaurant(
        restaurant._id,
        formData
      );

      setRestaurant(data.restaurant);
      setIsEditing(false);

      alert("Restaurant updated successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update restaurant"
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      description: restaurant.description || "",
      openingHours: restaurant.openingHours || "",
      contactNumber: restaurant.contactNumber || "",
    });

    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">

      <div className="flex justify-between items-start gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {restaurant.name}
          </h2>

          <p className="text-gray-500 mt-1">
            Restaurant Information
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-700"
          >
            ✏️ Edit
          </button>
        )}

      </div>

      {!isEditing ? (
        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-400">
              Description
            </p>

            <p className="text-gray-700 mt-1">
              {restaurant.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-sm text-gray-400">
                Cuisine
              </p>

              <p className="font-medium mt-1">
                {restaurant.cuisine}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Location
              </p>

              <p className="font-medium mt-1">
                {restaurant.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Opening Hours
              </p>

              <p className="font-medium mt-1">
                {restaurant.openingHours || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Contact Number
              </p>

              <p className="font-medium mt-1">
                {restaurant.contactNumber || "Not available"}
              </p>
            </div>

          </div>

        </div>
      ) : (
        <div className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Opening Hours
            </label>

            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              placeholder="Example: 10:00 AM - 10:00 PM"
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Contact Number
            </label>

            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3">

            <button
              onClick={handleCancel}
              className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700"
            >
              Save Changes
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default RestaurantInfo;
