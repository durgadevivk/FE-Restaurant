// pages/RestaurantDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/restaurantService";
import {
  checkAvailability,
  createReservation
} from "../services/reservationService";
import {
  getRestaurantReviews,
  createReview
} from "../services/reviewService";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);

  const [availability, setAvailability] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
  rating: 5,
  comment: "",
  photos: []
});
const fetchReviews = async () => {
  try {
    const data = await getRestaurantReviews(id);
    setReviews(data.reviews || []);
  } catch (error) {
    console.error("Failed to fetch reviews", error);
  }
};


  const fetchRestaurant = async () => {
    const data = await getRestaurantById(id);
    setRestaurant(data.restaurant || data);
  };

  const handleCheckAvailability = async () => {
  try {
    const data = await checkAvailability({
      restaurantId: id,
      date,
      time,
      partySize,
    });

    setAvailability(data);
  } catch (error) {
    console.error(error);
  }
};

  const bookTable = async () => {
  try {
    await createReservation({
      restaurantId: id,
      date,
      time,
      partySize,
    });

    alert("Table booked successfully!");
  } catch (error) {
    alert(error.response?.data?.message || "Booking failed");
  }
};
const handleReviewSubmit = async (e) => {
  e.preventDefault();

  try {
    await createReview({
      restaurantId: id,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      photos: reviewForm.photos
    });

    alert("Review added successfully!");

    setReviewForm({
      rating: 5,
      comment: "",
      photos: []
    });

    fetchReviews();

  } catch (error) {
    console.error("Failed to create review", error);

    alert(
      error.response?.data?.message ||
      "Failed to add review"
    );
  }
};
  
  useEffect(() => {
    fetchRestaurant();
    fetchReviews();
  }, []);

  if (!restaurant) {
    return <p>Loading...</p>;
  }
  

  return (
    <div className="container mx-auto p-6">

      <img
        src={restaurant.image}
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
  onClick={handleCheckAvailability}
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
      <hr className="my-8" />

<h2 className="text-2xl font-bold mb-4">
  Write a Review
</h2>

<form
  onSubmit={handleReviewSubmit}
  className="border rounded-lg p-6 mb-8"
>
  <div className="mb-4">

    <label className="block font-semibold mb-2">
      Rating
    </label>

    <select
      value={reviewForm.rating}
      onChange={(e) =>
        setReviewForm({
          ...reviewForm,
          rating: Number(e.target.value)
        })
      }
      className="border p-3 rounded"
    >
      <option value="5">⭐⭐⭐⭐⭐ 5</option>
      <option value="4">⭐⭐⭐⭐ 4</option>
      <option value="3">⭐⭐⭐ 3</option>
      <option value="2">⭐⭐ 2</option>
      <option value="1">⭐ 1</option>
    </select>

  </div>

  <div className="mb-4">

    <label className="block font-semibold mb-2">
      Comment
    </label>

    <textarea
      value={reviewForm.comment}
      onChange={(e) =>
        setReviewForm({
          ...reviewForm,
          comment: e.target.value
        })
      }
      placeholder="Share your dining experience..."
      className="border p-3 rounded w-full"
      rows="4"
      required
    />

  </div>

  <div className="mb-4">

    <label className="block font-semibold mb-2">
      Photo URLs
    </label>

    <input
      type="text"
      placeholder="Enter image URL"
      className="border p-3 rounded w-full"
      onChange={(e) =>
        setReviewForm({
          ...reviewForm,
          photos: e.target.value
            ? [e.target.value]
            : []
        })
      }
    />

  </div>

  <button
    type="submit"
    className="bg-purple-600 text-white px-6 py-3 rounded"
  >
    Submit Review
  </button>

</form>
<h2 className="text-2xl font-bold mb-4">
  Customer Reviews
</h2>

{reviews.length === 0 ? (
  <p className="text-gray-600">
    No reviews yet. Be the first to review!
  </p>
) : (
  <div className="space-y-4">

    {reviews.map((review) => (
      <div
        key={review._id}
        className="border rounded-lg p-5"
      >

        <div className="flex justify-between">

          <h3 className="font-bold">
            {review.user?.name || "User"}
          </h3>

          <span>
            {"⭐".repeat(review.rating)}
          </span>

        </div>

        <p className="mt-2 text-gray-700">
          {review.comment}
        </p>

        {review.photos?.length > 0 && (
          <div className="flex gap-3 mt-4">

            {review.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt="Review"
                className="w-24 h-24 object-cover rounded"
              />
            ))}

          </div>
        )}

        <p className="text-sm text-gray-500 mt-3">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>

      </div>
    ))}

  </div>
)}

    </div>
  );
};

export default RestaurantDetails;