import { useState } from "react";
import { updateRestaurant } from "../../services/restaurantService";

const MenuManager = ({ restaurant, setRestaurant }) => {
  const [isAdding, setIsAdding] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
    });

    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (!form.name || !form.price) {
      alert("Item name and price are required");
      return;
    }

    try {
      const updatedMenu = [
        ...(restaurant.menu || []),
        {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          image: form.image,
        },
      ];

      const data = await updateRestaurant(
        restaurant._id,
        {
          menu: updatedMenu,
        }
      );

      setRestaurant(data.restaurant);

      resetForm();

      alert("Menu item added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add menu item");
    }
  };

  const handleEdit = (item, index) => {
    setEditingIndex(index);

    setForm({
      name: item.name || "",
      price: item.price || "",
      description: item.description || "",
      image: item.image || "",
    });

    setIsAdding(false);
  };

  const handleUpdate = async () => {
    try {
      const updatedMenu = [...restaurant.menu];

      updatedMenu[editingIndex] = {
        ...updatedMenu[editingIndex],
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image: form.image,
      };

      const data = await updateRestaurant(
        restaurant._id,
        {
          menu: updatedMenu,
        }
      );

      setRestaurant(data.restaurant);

      resetForm();

      alert("Menu item updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update menu item");
    }
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      const updatedMenu = restaurant.menu.filter(
        (_, itemIndex) => itemIndex !== index
      );

      const data = await updateRestaurant(
        restaurant._id,
        {
          menu: updatedMenu,
        }
      );

      setRestaurant(data.restaurant);

      alert("Menu item deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete menu item");
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Menu Management
          </h2>

          <p className="text-gray-500 mt-1">
            Add, edit or remove menu items.
          </p>
        </div>

        {!isAdding && editingIndex === null && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-700"
          >
            + Add Item
          </button>
        )}

      </div>

      {/* Add/Edit Form */}

      {(isAdding || editingIndex !== null) && (
        <div className="border rounded-xl p-5 mb-6 bg-gray-50">

          <h3 className="font-bold text-lg mb-4">
            {editingIndex !== null
              ? "Edit Menu Item"
              : "Add Menu Item"}
          </h3>

          <div className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Item name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="text"
              name="image"
              placeholder="Food image URL"
              value={form.image}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <div className="flex gap-3">

              <button
                onClick={resetForm}
                className="bg-gray-200 px-5 py-2.5 rounded-xl font-semibold"
              >
                Cancel
              </button>

              {editingIndex !== null ? (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold"
                >
                  Update Item
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold"
                >
                  Add Item
                </button>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Menu Items */}

      {restaurant.menu?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">

          {restaurant.menu.map((item, index) => (
            <div
              key={item._id || index}
              className="border rounded-xl overflow-hidden bg-white"
            >

              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">

                <div className="flex justify-between gap-3">

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <span className="font-bold text-orange-600">
                    ₹{item.price}
                  </span>

                </div>

                <p className="text-gray-500 mt-2">
                  {item.description}
                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => handleEdit(item, index)}
                    className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No menu items yet.
        </div>
      )}

    </div>
  );
};

export default MenuManager;
