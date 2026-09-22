import { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("ADMIN USER:", user);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/reservation/admin/all");
      console.log("ADMIN RESPONSE:", response.data);

      setReservations(response.data.reservations || []);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };
  const handleConfirm = async (id) => {
    try {
      await api.patch(`/reservation/admin/${id}/confirm`);

      alert("Reservation confirmed");

      fetchReservations();
    } catch (error) {
      console.error("Failed to confirm reservation", error);
      alert("Failed to confirm reservation");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/reservation/admin/${id}/reject`);

      alert("Reservation rejected");

      fetchReservations();
    } catch (error) {
      console.error("Failed to reject reservation", error);
      alert("Failed to reject reservation");
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <p className="p-6">Loading reservations...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-2xl font-bold mb-4">All Reservations</h2>

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="border rounded-lg p-5">
              <h3 className="text-xl font-bold">
                {reservation.restaurant?.name}
              </h3>

              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>

              <p>Time: {reservation.time}</p>

              <p>Party Size: {reservation.partySize}</p>

              <p>
                Status:{" "}
                <span className="font-semibold">{reservation.status}</span>
              </p>
              <div className="mt-4 flex gap-3">
                {reservation.status !== "confirmed" &&
                  reservation.status !== "rejected" &&
                  reservation.status !== "cancelled" && (
                    <>
                      <button
                        onClick={() => handleConfirm(reservation._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => handleReject(reservation._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
