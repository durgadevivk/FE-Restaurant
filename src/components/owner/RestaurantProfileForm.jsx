
import { useEffect, useState } from "react";
import { updateRestaurant } from "../../services/restaurantService";

const RestaurantProfileForm = ({ restaurant, setRestaurant }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    location: "",
    priceRange: "100-500",
    totalTables: 1,
    image: "",
    openingHours: "",
    contactNumber: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData({
      name: restaurant.name || "",
      description: restaurant.description || "",
      cuisine: restaurant.cuisine || "",
      location: restaurant.location || "",
      priceRange: restaurant.priceRange || "100-500",
      totalTables: restaurant.totalTables || 1,
      image: restaurant.image || "",
      openingHours: restaurant.openingHours || "",
      contactNumber: restaurant.contactNumber || "",
    });
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await updateRestaurant(restaurant._id, {
        ...formData,
        totalTables: Number(formData.totalTables),
      });

      const updatedRestaurant =
        response.restaurant || response;

      setRestaurant(updatedRestaurant);
      setMessage("Restaurant profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      setMessage(
        error.response?.data?.message ||
        "Failed to update restaurant profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400";

  return (
    <section className="bg-white border rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">
        Restaurant Profile
      </h2>

      <p className="text-gray-500 mb-6">
        Update your restaurant details and listing information.
      </p>

      {message && (
        <p className="mb-4 text-sm" role="status">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Restaurant Name
          </label>
          <input
            className={inputClass}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Description
          </label>
          <textarea
            className={inputClass}
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Cuisine
            </label>
            <input
              className={inputClass}
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Location
            </label>
            <input
              className={inputClass}
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Price Range
            </label>
            <select
              className={inputClass}
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
            >
              <option value="100-500">₹100–₹500</option>
              <option value="501-1000">₹501–₹1,000</option>
              <option value="1001-5000">₹1,001–₹5,000</option>
              <option value="10000">₹10,000</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Total Tables
            </label>
            <input
              className={inputClass}
              type="number"
              name="totalTables"
              min="1"
              value={formData.totalTables}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Opening Hours
            </label>
            <input
              className={inputClass}
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              placeholder="e.g. 10 AM - 10 PM"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Contact Number
            </label>
            <input
              className={inputClass}
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Restaurant Image URL
          </label>
          <input
            className={inputClass}
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/restaurant.jpg"
            required
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="Restaurant preview"
              className="mt-3 h-48 w-full max-w-md rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </section>
  );
};

export default RestaurantProfileForm;
