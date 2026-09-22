// pages/RestaurantDetails.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getRestaurantById } from "../services/restaurantService";

import {
  checkAvailability,
  createReservation,
} from "../services/reservationService";

import {
  getRestaurantReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../services/reviewService";

import { createPaymentOrder, verifyPayment } from "../services/paymentService";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const RestaurantDetails = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.auth.user);

  console.log("RestaurantDetails user:", user);

  const [restaurant, setRestaurant] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);

  const [availability, setAvailability] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    photos: [],
  });

  const [editingReviewId, setEditingReviewId] = useState(null);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const data = await getRestaurantReviews(id);

      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  // Fetch restaurant
  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurantById(id);
      console.log("URL ID:", id);
console.log("Restaurant returned from backend:", data.restaurant);
console.log("Restaurant ID returned:", data.restaurant._id);    
      setRestaurant(data.restaurant || data);
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
    }
  };

  // Check table availability
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
      console.error("Failed to check availability", error);
    }
  };

  // Payment + Razorpay
  const bookTable = async () => {
    try {
      // Create Razorpay order
      const data = await createPaymentOrder();

      console.log("Payment Order:", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "DineReserve",

        description: `Table reservation at ${restaurant.name}`,

        order_id: data.order.id,

        // This function runs after successful payment
        handler: async function (response) {
          try {
            console.log("Payment successful:", response);

            // Send Razorpay payment details to backend
            const verificationData = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("Verification response:", verificationData);
            console.log("Restaurant ID being sent:", id);
            console.log("Date:", date);
            console.log("Time:", time);
            console.log("Party Size:", partySize);
            const reservationData = await createReservation({
              restaurantId: id,
              date,
              time,
              partySize,
            });

            console.log("Reservation created:", reservationData);

            alert("Payment successful and reservation confirmed!");
          } catch (error) {
            console.error("Payment verification failed:", error);

            alert(
              error.response?.data?.message || "Payment verification failed",
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

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);

      alert(error.response?.data?.message || "Payment failed");
    }
  };

  // Create review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        restaurantId: id,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
        photos: reviewForm.photos,
      });

      alert("Review added successfully!");

      setReviewForm({
        rating: 5,
        comment: "",
        photos: [],
      });

      fetchReviews();
    } catch (error) {
      console.error("Failed to create review", error);

      alert(error.response?.data?.message || "Failed to add review");
    }
  };

  // Edit review
  const handleEditReview = (review) => {
    setEditingReviewId(review._id);

    setReviewForm({
      rating: review.rating,
      comment: review.comment,
      photos: review.photos || [],
    });
  };

  // Update review
  const handleUpdateReview = async (e) => {
    e.preventDefault();

    try {
      await updateReview(editingReviewId, {
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
        photos: reviewForm.photos,
      });

      alert("Review updated successfully");

      setEditingReviewId(null);

      setReviewForm({
        rating: 5,
        comment: "",
        photos: [],
      });

      fetchReviews();
    } catch (error) {
      console.error("Failed to update review", error);

      alert(error.response?.data?.message || "Failed to update review");
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(reviewId);

      alert("Review deleted successfully");

      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review", error);

      alert(error.response?.data?.message || "Failed to delete review");
    }
  };

  // Load restaurant and reviews
  useEffect(() => {
    fetchRestaurant();
    fetchReviews();
  }, []);

  // Loading state
  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Restaurant Image */}
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Restaurant Profile */}
      <div className="mt-6 mb-4 border rounded-lg p-6">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>

        <p className="text-gray-600 mt-2">{restaurant.description}</p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <p className="font-semibold">Cuisine</p>

            <p className="text-gray-600">{restaurant.cuisine}</p>
          </div>

          <div>
            <p className="font-semibold">Location</p>

            <p className="text-gray-600">{restaurant.location}</p>
          </div>

          <div>
            <p className="font-semibold">Price Range</p>

            <p className="text-gray-600">₹{restaurant.priceRange}</p>
          </div>

          <div>
            <p className="font-semibold">Opening Hours</p>

            <p className="text-gray-600">
              {restaurant.openingHours || "Not available"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Contact</p>

            <p className="text-gray-600">
              {restaurant.contactNumber || "Not available"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Rating</p>

            <p className="text-gray-600">⭐ {restaurant.averageRating || 0}</p>
          </div>
        </div>
      </div>

      {/* Restaurant Menu */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>

        {restaurant.menu && restaurant.menu.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {restaurant.menu.map((item, index) => (
              <div key={item._id || index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{item.name}</h3>

                  <span className="font-semibold">₹{item.price}</span>
                </div>

                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Menu information is not available.</p>
        )}
      </div>

      <hr className="my-6" />

      {/* Reservation */}
      <h2 className="text-2xl font-bold mb-4">Book Your Table</h2>

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

      {/* Check Availability */}
      <button
        onClick={handleCheckAvailability}
        className="bg-green-600 text-white px-6 py-3 rounded mt-4"
      >
        Check Availability
      </button>

      {/* Availability Result */}
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

      {/* Payment Button */}
      {availability?.available && (
        <button
          onClick={bookTable}
          className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
        >
          Confirm Reservation
        </button>
      )}

      <hr className="my-8" />

      {/* Review Form */}
      <ReviewForm
        reviewForm={reviewForm}
        setReviewForm={setReviewForm}
        editingReviewId={editingReviewId}
        handleReviewSubmit={handleReviewSubmit}
        handleUpdateReview={handleUpdateReview}
        setEditingReviewId={setEditingReviewId}
      />

      {/* Review List */}
      <ReviewList
        reviews={reviews}
        user={user}
        handleEditReview={handleEditReview}
        handleDeleteReview={handleDeleteReview}
        fetchReviews={fetchReviews}
      />
    </div>
  );
};

export default RestaurantDetails;
