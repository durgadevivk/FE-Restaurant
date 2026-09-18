
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
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          DineReserve
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            className="hover:text-gray-200 transition"
          >
            Restaurants
          </Link>

          {token && (
            <Link
              to="/my-reservations"
              className="hover:text-gray-200 transition"
            >
              My Reservations
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
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

