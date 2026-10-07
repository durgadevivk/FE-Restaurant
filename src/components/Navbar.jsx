import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(setUser(null));

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

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
          >
            Restaurants
          </Link>

          {/* Logged-in user */}
          {user && (
            <Link
              to="/my-reservations"
              className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
            >
              My Reservations
            </Link>
          )}

          {/* Restaurant Owner */}
          {user?.role === "restaurant_owner" && (
            <Link
              to="/owner-dashboard"
              className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
            >
              Owner Dashboard
            </Link>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Login / Register */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* User name */}
              <span className="px-3 py-2 text-gray-700 font-medium">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;