
import { useState } from "react";
import api from "../../services/api";

const RestaurantImageUpload = ({ restaurant, setRestaurant }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please choose an image first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await api.post(
        `/restaurant/${restaurant._id}/image`,
        formData
      );

      setRestaurant((previous) => ({
        ...previous,
        ...data.restaurant,
        image: data.image || data.restaurant?.image,
      }));

      setImage(null);
      setPreview("");
      setMessage("Restaurant image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage(
        error.response?.data?.message || "Image upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Restaurant Image
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Upload or update the main image displayed on your restaurant listing.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Current image
          </p>

          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-52 object-cover rounded-lg border"
          />
        </div>

        <div>
          <label
            htmlFor="restaurant-image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a new image
          </label>

          <input
            id="restaurant-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 border rounded-lg p-3"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview</p>
              <img
                src={preview}
                alt="Selected restaurant preview"
                className="w-full h-52 object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={!image || uploading}
            className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {message && (
            <p className="mt-3 text-sm text-gray-700" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RestaurantImageUpload;
