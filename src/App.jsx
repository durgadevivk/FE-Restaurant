import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./redux/authSlice";
import { getCurrentUser } from "./services/authService";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDetails from "./pages/RestaurantDetails";
import MyReservation from "./pages/MyReservation";
import Navbar from "./components/Navbar";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  
  const dispatch = useDispatch();

  // Get logged-in user from Redux
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();

        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>

      {/* Show Navbar ONLY when user is NOT logged in */}
      {!user && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Home />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/my-reservations" element={<MyReservation />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;