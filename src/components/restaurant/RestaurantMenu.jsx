
const RestaurantMenu = ({ menu = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mt-8">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Our Menu
          </h2>

          <p className="text-gray-500 mt-1">
            Explore delicious dishes
          </p>
        </div>

        <span className="text-2xl">
          🍽️
        </span>
      </div>

      {menu.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">

          {menu.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
            />
          ))}

        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-500">
            Menu information is not available.
          </p>
        </div>
      )}

    </div>
  );
};

const MenuCard = ({ item }) => {
  const imageUrl = item.image;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-44 object-cover"
          onError={() => {
            console.error(
              `Failed to load image for ${item.name}:`,
              imageUrl
            );
          }}
        />
      ) : (
        <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-500">
          No food image available
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-lg text-gray-900">
            {item.name}
          </h3>

          <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-bold whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>

        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default RestaurantMenu;
