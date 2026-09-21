import { useEffect, useState } from "react";
import axios from "axios";
import { updateReservation } from "../services/reservationService";

const MyReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    time: "",
    partySize: 2,
  });

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/reservation/my",
        {
          withCredentials: true,
        },
      );

      setReservations(response.data.reservations);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (reservation) => {
    setEditingId(reservation._id);

    setEditForm({
      date: reservation.date.split("T")[0],
      time: reservation.time,
      partySize: reservation.partySize,
    });
  };
  const handleUpdate = async (reservationId) => {
    try {
      await updateReservation(reservationId, editForm);

      alert("Reservation updated successfully");

      setEditingId(null);

      fetchReservations();
    } catch (error) {
      console.error("Failed to update reservation", error);

      alert(error.response?.data?.message || "Failed to update reservation");
    }
  };
  //handle cancel reservation
  const handleCancel = async (reservationId) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/v1/reservation/${reservationId}`,
        {},
        {
          withCredentials: true,
        },
      );

      alert("Reservation cancelled successfully");

      fetchReservations();
    } catch (error) {
      console.error("Failed to cancel reservation", error);

      alert("Failed to cancel reservation");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reservations</h1>

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="border rounded-lg p-5 shadow">
              <h2 className="text-xl font-bold">
                {reservation.restaurant?.name}
              </h2>

              <p>Cuisine: {reservation.restaurant?.cuisine}</p>

              <p>Location: {reservation.restaurant?.location}</p>

              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>

              <p>Time: {reservation.time}</p>

              <p>Guests: {reservation.partySize}</p>

              <p className="mt-2">
                Status: <strong>{reservation.status}</strong>
              </p>
              {reservation.status !== "cancelled" && (
                <button
                  onClick={() => handleEdit(reservation)}
                  className="mt-4 mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              )}
              {editingId === reservation._id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-3">Update Reservation</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium">Date</label>

                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            date: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Time</label>

                      <select
                        value={editForm.time}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            time: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                      >
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Guests
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={editForm.partySize}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            partySize: Number(e.target.value),
                          })
                        }
                        className="border p-2 rounded w-full"
                      />
                    </div>

                    <button
                      onClick={() => handleUpdate(reservation._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Update Reservation
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancel Edit
                    </button>
                  </div>
                </div>
              )}
              {/* Cancel button */}
              {reservation.status !== "cancelled" && (
                <button
                  onClick={() => handleCancel(reservation._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservation;
