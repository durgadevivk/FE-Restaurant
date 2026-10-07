const OwnerHeader = ({ user, restaurant }) => {
  return (
    <div className="mb-8">

      <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
        Restaurant Owner
      </span>

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Owner Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome, {user?.name || "Restaurant Owner"}
      </p>

      <p className="text-gray-400 mt-1">
        Manage {restaurant.name}, your menu and restaurant information.
      </p>

    </div>
  );
};

export default OwnerHeader;
