import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();

        dispatch(setUser(data.user));

      } catch (error) {
        console.log("No logged-in user");
      }
    };

    fetchUser();

  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />
        {/* Restaurant Listing Page */}
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
