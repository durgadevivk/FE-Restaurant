
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  checkAvailability,
  createReservation,
} from "../../services/reservationService";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/paymentService";

const ReservationForm = ({ restaurant, restaurantId, user }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [availability, setAvailability] = useState(null);

  const handleCheckAvailability = async () => {
    try {
      const data = await checkAvailability({
        restaurantId,
        date,
        time,
        partySize,
      });

      setAvailability(data);
    } catch (error) {
      console.error("Failed to check availability", error);
    }
  };

  const bookTable = async () => {
    try {
      const data = await createPaymentOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "DineReserve",
        description: `Table reservation at ${restaurant.name}`,
        order_id: data.order.id,

        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            await createReservation({
              restaurantId,
              date,
              time,
              partySize,
            });

            alert("Payment successful and reservation confirmed!");

            navigate("/my-reservations");
          } catch (error) {
            console.error("Payment verification failed", error);

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error("Payment failed", error);

      alert(
        error.response?.data?.message ||
          "Payment failed"
      );
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border overflow-hidden">

      <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-6 md:p-8 text-white">

        <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">
          Reserve your table
        </p>

        <h2 className="text-3xl font-extrabold mt-1">
          Book Your Table
        </h2>

        <p className="text-orange-50 mt-2">
          Choose your preferred date, time and number of guests.
        </p>

      </div>

      <div className="p-6 md:p-8">

        <div className="grid md:grid-cols-3 gap-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time
            </label>

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl"
            >
              <option value="">Select Time</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Guests
            </label>

            <input
              type="number"
              min="1"
              value={partySize}
              onChange={(e) =>
                setPartySize(Number(e.target.value))
              }
              className="w-full border border-gray-300 p-3 rounded-xl"
            />
          </div>

        </div>

        <button
          onClick={handleCheckAvailability}
          className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Check Availability
        </button>

        {availability && (
          <AvailabilityMessage availability={availability} />
        )}

        {availability?.available && (
          <button
            onClick={bookTable}
            className="mt-4 bg-orange-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            💳 Confirm Reservation & Pay
          </button>
        )}

      </div>
    </div>
  );
};

const AvailabilityMessage = ({ availability }) => {
  return (
    <div
      className={`mt-5 p-4 rounded-xl border ${
        availability.available
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      {availability.available ? (
        <>
          <p className="text-green-700 font-bold">
            ✓ Table Available!
          </p>

          <p className="text-green-600 text-sm mt-1">
            Great! You can proceed with your reservation.
          </p>
        </>
      ) : (
        <>
          <p className="text-red-700 font-bold">
            ✕ No Availability
          </p>

          <p className="text-red-600 text-sm mt-1">
            Sorry, there are no available tables for this time.
          </p>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
