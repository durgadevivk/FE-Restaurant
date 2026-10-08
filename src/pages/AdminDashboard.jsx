import { useState } from "react";
import ReservationManagement from "../components/admin/ReservationManagement";
import RestaurantManagement from "../components/admin/RestaurantManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("reservations");

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
        <div>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-2xl font-bold mb-2">
                Admin Overview
              </h2>

              <p className="text-gray-500">
                Dashboard overview will be displayed here.
              </p>
            </div>
          )}

          {/* Restaurant Management */}
          {activeTab === "restaurants" && (
            <RestaurantManagement />
          )}

          {/* Reservation Management */}
          {activeTab === "reservations" && (
            <ReservationManagement />
          )}

          {/* Review Management */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-2xl font-bold mb-2">
                Review Management
              </h2>

              <p className="text-gray-500">
                Review management will be added here.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;