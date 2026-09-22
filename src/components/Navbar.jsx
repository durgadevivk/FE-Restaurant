
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-orange-600 tracking-tight hover:text-orange-700 transition"
        >
          🍽️ DineReserve
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">

          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
          >
            Restaurants
          </Link>

          {token && (
            <Link
              to="/my-reservations"
              className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
            >
              My Reservations
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="ml-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-orange-700 hover:shadow-md transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition shadow-sm"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
