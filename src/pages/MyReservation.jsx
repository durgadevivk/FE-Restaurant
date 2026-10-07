import { useEffect, useState } from "react";
import {
  updateReservation,
  cancelReservation,
  getMyReservations,
} from "../services/reservationService";

// Check whether the reservation date + time has already passed
const isReservationPast = (reservation) => {
  const reservationDate = new Date(reservation.date);

  const [hours, minutes] = reservation.time.split(":").map(Number);

  reservationDate.setHours(hours, minutes, 0, 0);

  return reservationDate < new Date();
};

const MyReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    date: "",
    time: "",
    partySize: 2,
  });

  // Fetch user's reservations
  const fetchReservations = async () => {
    try {
      const response = await getMyReservations();

      setReservations(response.reservations);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const handleEdit = (reservation) => {
    // Extra protection:
    // Do not allow editing past reservations
    if (isReservationPast(reservation)) {
      alert("Past reservations cannot be edited.");
      return;
    }

    setEditingId(reservation._id);

    setEditForm({
      date: reservation.date.split("T")[0],
      time: reservation.time,
      partySize: reservation.partySize,
    });
  };

  // Update reservation
  const handleUpdate = async (reservationId) => {
    try {
      await updateReservation(reservationId, editForm);

      alert("Reservation updated successfully");

      setEditingId(null);

      await fetchReservations();
    } catch (error) {
      console.error("Failed to update reservation", error);

      alert(
        error.response?.data?.message ||
          "Failed to update reservation"
      );
    }
  };

  // Cancel reservation
  const handleCancel = async (reservation) => {
    // Extra frontend protection
    if (isReservationPast(reservation)) {
      alert("Past reservations cannot be cancelled.");
      return;
    }

    try {
      await cancelReservation(reservation._id);

      alert("Reservation cancelled successfully");

      await fetchReservations();
    } catch (error) {
      console.error("Failed to cancel reservation", error);

      alert(
        error.response?.data?.message ||
          "Failed to cancel reservation"
      );
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-10">

          <div className="h-9 bg-gray-200 rounded-lg w-64 animate-pulse mb-8"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border p-6 shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        {/* Page Header */}
        <div className="mb-8">

          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
            Your dining plans
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            My Reservations
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your upcoming restaurant reservations.
          </p>

        </div>

        {/* Empty State */}
        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">

            <div className="text-6xl mb-4">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No reservations yet
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't booked a table yet. Explore our restaurants
              and reserve your next dining experience.
            </p>

          </div>
        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {reservations.map((reservation) => {

              // Check whether this particular reservation is past
              const isPast = isReservationPast(reservation);

              return (
                <div
                  key={reservation._id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden"
                >

                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-5 text-white">

                    <div className="flex justify-between items-start gap-3">

                      <div>
                        <h2 className="text-xl font-bold">
                          {reservation.restaurant?.name}
                        </h2>

                        <p className="text-orange-100 text-sm mt-1">
                          {reservation.restaurant?.cuisine}
                        </p>
                      </div>

                      {/* Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          reservation.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : reservation.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : reservation.status === "rejected"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {reservation.status}
                      </span>

                    </div>

                  </div>

                  {/* Reservation Details */}
                  <div className="p-5">

                    <div className="space-y-3 text-gray-700">

                      {/* Location */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📍</span>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Location
                          </p>

                          <p className="font-medium">
                            {reservation.restaurant?.location}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📅</span>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Date
                          </p>

                          <p className="font-medium">
                            {new Date(
                              reservation.date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🕐</span>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Time
                          </p>

                          <p className="font-medium">
                            {reservation.time}
                          </p>
                        </div>
                      </div>

                      {/* Guests */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl">👥</span>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Guests
                          </p>

                          <p className="font-medium">
                            {reservation.partySize}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* =========================================
                        EDIT FORM
                    ========================================== */}

                    {editingId === reservation._id && !isPast && (

                      <div className="mt-6 border-t pt-5">

                        <h3 className="font-bold text-lg text-gray-900 mb-4">
                          Update Reservation
                        </h3>

                        <div className="space-y-4">

                          {/* Date */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Date
                            </label>

                            <input
                              type="date"
                              value={editForm.date}
                              min={new Date()
                                .toISOString()
                                .split("T")[0]}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  date: e.target.value,
                                })
                              }
                              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>

                          {/* Time */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Time
                            </label>

                            <select
                              value={editForm.time}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  time: e.target.value,
                                })
                              }
                              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              <option value="12:00">
                                12:00 PM
                              </option>

                              <option value="13:00">
                                1:00 PM
                              </option>

                              <option value="19:00">
                                7:00 PM
                              </option>

                              <option value="20:00">
                                8:00 PM
                              </option>

                              <option value="21:00">
                                9:00 PM
                              </option>
                            </select>
                          </div>

                          {/* Guests */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                              Guests
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={editForm.partySize}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  partySize: Number(
                                    e.target.value
                                  ),
                                })
                              }
                              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>

                          {/* Edit Buttons */}
                          <div className="flex flex-wrap gap-2">

                            <button
                              onClick={() =>
                                handleUpdate(reservation._id)
                              }
                              className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition"
                            >
                              Save Changes
                            </button>

                            <button
                              onClick={() =>
                                setEditingId(null)
                              }
                              className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition"
                            >
                              Cancel Edit
                            </button>

                          </div>

                        </div>

                      </div>
                    )}

                    {/* =========================================
                        ACTION BUTTONS
                    ========================================== */}

                    {!isPast &&
                      reservation.status !== "cancelled" &&
                      reservation.status !== "rejected" && (

                        <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t">

                          {/* Edit */}
                          <button
                            onClick={() =>
                              handleEdit(reservation)
                            }
                            className="flex-1 min-w-[120px] border border-orange-600 text-orange-600 px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-50 transition"
                          >
                            ✏️ Edit
                          </button>

                          {/* Cancel */}
                          <button
                            onClick={() =>
                              handleCancel(reservation)
                            }
                            className="flex-1 min-w-[120px] bg-red-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition"
                          >
                            Cancel Booking
                          </button>

                        </div>
                      )}

                    {/* =========================================
                        PAST RESERVATION MESSAGE
                    ========================================== */}

                    {isPast &&
                      reservation.status !== "cancelled" &&
                      reservation.status !== "rejected" && (

                        <div className="mt-5 pt-4 border-t">

                          <p className="text-sm text-gray-500">
                            ⏰ This reservation has already passed.
                            It can no longer be edited or cancelled.
                          </p>

                        </div>
                      )}

                    {/* =========================================
                        CANCELLED MESSAGE
                    ========================================== */}

                    {reservation.status === "cancelled" && (

                      <div className="mt-5 pt-4 border-t">

                        <p className="text-sm text-red-500">
                          This reservation has been cancelled.
                        </p>

                      </div>
                    )}

                    {/* =========================================
                        REJECTED MESSAGE
                    ========================================== */}

                    {reservation.status === "rejected" && (

                      <div className="mt-5 pt-4 border-t">

                        <p className="text-sm text-gray-500">
                          This reservation was rejected.
                        </p>

                      </div>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyReservation;
