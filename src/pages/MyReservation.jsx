import { useEffect, useState } from "react";
import axios from "axios";

const MyReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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
