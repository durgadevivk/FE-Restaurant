// pages/RestaurantDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/restaurantService";
import axios from "axios";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);

  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    const data = await getRestaurantById(id);
    setRestaurant(data.restaurant || data);
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/reservations/availability",
        {
          params: {
            restaurantId: id,
            date,
            time,
            partySize,
          },
        }
      );

      setAvailability(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const bookTable = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/v1/reservations",
        {
          restaurantId: id,
          date,
          time,
          partySize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Table booked successfully!");

    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">

      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-6">
        {restaurant.name}
      </h1>

      <p className="text-gray-600 mt-2">
        {restaurant.description}
      </p>

      <p className="mt-2">
        Cuisine: {restaurant.cuisine}
      </p>

      <p>
        Location: {restaurant.location}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">
        Book Your Table
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-3 rounded"
        />

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">Select Time</option>
          <option value="12:00">12:00 PM</option>
          <option value="13:00">1:00 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="20:00">8:00 PM</option>
          <option value="21:00">9:00 PM</option>
        </select>

        <input
          type="number"
          min="1"
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
          className="border p-3 rounded"
        />

      </div>

      <button
        onClick={checkAvailability}
        className="bg-green-600 text-white px-6 py-3 rounded mt-4"
      >
        Check Availability
      </button>

      {availability && (
        <div className="mt-4 p-4 bg-gray-100 rounded">

          {availability.available ? (
            <p className="text-green-600 font-bold">
              Table Available! You can book now.
            </p>
          ) : (
            <p className="text-red-600 font-bold">
              Sorry, no availability for this time.
            </p>
          )}

        </div>
      )}

      {availability?.available && (
        <button
          onClick={bookTable}
          className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
        >
          Confirm Reservation
        </button>
      )}

    </div>
  );
};

export default RestaurantDetails;