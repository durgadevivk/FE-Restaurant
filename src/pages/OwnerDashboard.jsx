import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOwnerRestaurant,updateRestaurant } from "../services/restaurantService";

const OwnerDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [menuForm, setMenuForm] = useState({
  name: "",
  price: "",
  description: ""
});

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
  const handleSave = async () => {
  try {
    const data = await updateRestaurant(
      restaurant._id,
      {
        openingHours: restaurant.openingHours,
        contactNumber: restaurant.contactNumber
      }
    );

    setRestaurant(data.restaurant);
    setIsEditing(false);

    alert("Restaurant updated successfully");
  } catch (error) {
    console.error("Failed to update restaurant", error);
    alert("Failed to update restaurant");
  }
};
const handleAddMenuItem = async () => {
  try {
    const updatedMenu = [
      ...(restaurant.menu || []),
      {
        name: menuForm.name,
        price: Number(menuForm.price),
        description: menuForm.description
      }
    ];

    const data = await updateRestaurant(
      restaurant._id,
      {
        menu: updatedMenu
      }
    );

    setRestaurant(data.restaurant);

    setMenuForm({
      name: "",
      price: "",
      description: ""
    });

    alert("Menu item added successfully");
  } catch (error) {
    console.error("Failed to add menu item", error);
    alert("Failed to add menu item");
  }
};

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (loading) {
    return <p className="p-6">Loading restaurant...</p>;
  }

  if (!restaurant) {
    return <p className="p-6">No restaurant found for this owner.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Restaurant Owner Dashboard</h1>

      <p className="text-gray-600 mb-6">
        Welcome, {user?.name || "Restaurant Owner"}
      </p>

      {/* Restaurant Information */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>

        <p className="text-gray-600 mb-4">{restaurant.description}</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Cuisine</p>
            <p>{restaurant.cuisine}</p>
          </div>

          <div>
            <p className="font-semibold">Location</p>
            <p>{restaurant.location}</p>
          </div>

          <div>
            <p className="font-semibold">Opening Hours</p>
            <p>{restaurant.openingHours || "Not available"}</p>
          </div>

          <div>
            <p className="font-semibold">Contact</p>
            <p>{restaurant.contactNumber || "Not available"}</p>
          </div>
        </div>
        {isEditing && (
  <div className="mt-6 border-t pt-6">

    <h3 className="text-xl font-bold mb-4">
      Edit Restaurant
    </h3>

    <div className="grid md:grid-cols-2 gap-4">

      <div>
        <label className="block font-semibold mb-2">
          Opening Hours
        </label>

        <input
          type="text"
          value={restaurant.openingHours || ""}
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              openingHours: e.target.value
            })
          }
          className="border p-3 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Contact Number
        </label>

        <input
          type="text"
          value={restaurant.contactNumber || ""}
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              contactNumber: e.target.value
            })
          }
          className="border p-3 rounded w-full"
        />
      </div>

    </div>

    <div className="mt-4">
      <button
        onClick={() => setIsEditing(false)}
        className="bg-gray-500 text-white px-5 py-2 rounded mr-2"
      >
        Cancel
      </button>

      <button
      onClick={handleSave}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Save Changes
      </button>
    </div>

  </div>
)}
        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Edit Restaurant
        </button>
      </div>

      {/* Menu */}
      <div className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>

        {restaurant.menu?.length > 0 ? (
          <div className="space-y-3">
            {restaurant.menu.map((item, index) => (
              <div key={item._id || index} className="border rounded p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{item.name}</h3>

                  <span>₹{item.price}</span>
                </div>

                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
      <div className="mt-6 border-t pt-6">

  <h3 className="text-xl font-bold mb-4">
    Add Menu Item
  </h3>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Item name"
      value={menuForm.name}
      onChange={(e) =>
        setMenuForm({
          ...menuForm,
          name: e.target.value
        })
      }
      className="border p-3 rounded w-full"
    />

    <input
      type="number"
      placeholder="Price"
      value={menuForm.price}
      onChange={(e) =>
        setMenuForm({
          ...menuForm,
          price: e.target.value
        })
      }
      className="border p-3 rounded w-full"
    />

    <textarea
      placeholder="Description"
      value={menuForm.description}
      onChange={(e) =>
        setMenuForm({
          ...menuForm,
          description: e.target.value
        })
      }
      className="border p-3 rounded w-full"
      rows="3"
    />

    <button
    onClick={handleAddMenuItem} 
      className="bg-green-600 text-white px-5 py-2 rounded"
    >
      Add Menu Item
    </button>

  </div>

</div>  
    </div>

  );
};

export default OwnerDashboard;
