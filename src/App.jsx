import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "./redux/authSlice";
import { getCurrentUser } from "./services/authService";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDetails from "./pages/RestaurantDetails";
import MyReservation from "./pages/MyReservation";
import Navbar from "./components/Navbar";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();

                dispatch(setUser(data.user));
            } catch (error) {
                dispatch(clearUser());
            }
        };

        fetchUser();
    }, [dispatch]);

    return (
        <BrowserRouter>

            {/* Keep your current Navbar behavior for now */}
            <Navbar />

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/restaurants"
                    element={<Home />}
                />

                <Route
                    path="/restaurants/:id"
                    element={<RestaurantDetails />}
                />

                {/* USER ONLY */}
                <Route
                    path="/my-reservations"
                    element={
                        <ProtectedRoute allowedRoles={["user"]}>
                            <MyReservation />
                        </ProtectedRoute>
                    }
                />

                {/* RESTAURANT OWNER ONLY */}
                <Route
                    path="/owner-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["restaurant_owner"]}>
                            <OwnerDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN ONLY */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
