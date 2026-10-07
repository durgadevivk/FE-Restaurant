import { useState } from "react";
import { updateRestaurant } from "../../services/restaurantService";

const RestaurantImage = ({ restaurant, setRestaurant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(restaurant.image || "");

  const handleSave = async () => {
    if (!image.trim()) {
      alert("Please enter an image URL");
      return;
    }

    try {
      const data = await updateRestaurant(
        restaurant._id,
        {
          image: image.trim(),
        }
      );

      setRestaurant(data.restaurant);
      setIsEditing(false);

      alert("Restaurant image updated successfully");
    } catch (error) {
      console.error("Failed to update restaurant image", error);

      alert(
        error.response?.data?.message ||
        "Failed to update restaurant image"
      );
    }
  };

  const handleCancel = () => {
    setImage(restaurant.image || "");
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-6">

      {/* Restaurant Image */}

      {restaurant.image ? (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 md:h-80 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">
            No restaurant image available
          </p>
        </div>
      )}

      <div className="p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Restaurant Image
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Update the image displayed for your restaurant.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition"
            >
              ✏️ Change Image
            </button>
          )}

        </div>

        {/* Edit Image */}

        {isEditing && (
          <div className="mt-6">

            <label className="block font-semibold text-gray-700 mb-2">
              Image URL
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/restaurant.jpg"
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Preview */}

            {image && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Preview
                </p>

                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="flex gap-3 mt-5">

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
                Save Image
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default RestaurantImage;
