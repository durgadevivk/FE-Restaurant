import { useEffect, useState } from "react";
import ReservationManagement from "../components/admin/ReservationManagement";
import RestaurantManagement from "../components/admin/RestaurantManagement";
import ReviewManagement from "../components/admin/ReviewManagement";
import api from "../services/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [restaurantCount, setRestaurantCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const fetchOverview = async () => {
  try {
    // Get all restaurants
    const restaurantResponse = await api.get("/restaurant");

    setRestaurantCount(
      restaurantResponse.data.restaurants?.length || 0
    );

    // Get all reservations - ADMIN API
    const reservationResponse = await api.get("/reservation/admin/all");

    setReservationCount(
      reservationResponse.data.reservations?.length || 0
    );

    // Get all reviews - ADMIN API
    const reviewResponse = await api.get("/review/admin/all");

    setReviewCount(
      reviewResponse.data.reviews?.length || 0
    );

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage restaurants, reservations and reviews
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border p-2 mb-6 flex flex-wrap gap-2">

          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-lg font-semibold ${
              activeTab === "overview"
                ? "bg-orange-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("restaurants")}
            className={`px-5 py-2.5 rounded-lg font-semibold ${
              activeTab === "restaurants"
                ? "bg-orange-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Restaurants
          </button>

          <button
            onClick={() => setActiveTab("reservations")}
            className={`px-5 py-2.5 rounded-lg font-semibold ${
              activeTab === "reservations"
                ? "bg-orange-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reservations
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-2.5 rounded-lg font-semibold ${
              activeTab === "reviews"
                ? "bg-orange-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reviews
          </button>

        </div>

        {/* Content */}

        {/* Overview */}
        {activeTab === "overview" && (
          <div>

            <h2 className="text-2xl font-bold mb-5">
              Admin Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Restaurants */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-gray-500">
                  Total Restaurants
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {restaurantCount}
                </h3>
              </div>

              {/* Reservations */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-gray-500">
                  Total Reservations
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {reservationCount}
                </h3>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-gray-500">
                  Total Reviews
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {reviewCount}
                </h3>
              </div>

            </div>

          </div>
        )}

        {/* Restaurants */}
        {activeTab === "restaurants" && (
          <RestaurantManagement />
        )}

        {/* Reservations */}
        {activeTab === "reservations" && (
          <ReservationManagement />
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <ReviewManagement />
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;