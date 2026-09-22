// pages/RestaurantDetails.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
            navigate("/my-reservations");

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
    <div className="min-h-screen bg-gray-50">
      {" "}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {" "}
        {/* Restaurant Hero Image */}{" "}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {" "}
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-72 md:h-96 object-cover"
          />{" "}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>{" "}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            {" "}
            <div className="flex flex-wrap gap-2 mb-3">
              {" "}
              <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                {" "}
                {restaurant.cuisine}{" "}
              </span>{" "}
              <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                {" "}
                ⭐ {restaurant.averageRating || 0}{" "}
              </span>{" "}
            </div>{" "}
            <h1 className="text-3xl md:text-5xl font-extrabold">
              {" "}
              {restaurant.name}{" "}
            </h1>{" "}
            <p className="mt-2 text-gray-200">
              {" "}
              📍 {restaurant.location}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Restaurant Information */}{" "}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {" "}
          {/* About Restaurant */}{" "}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            {" "}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {" "}
              About the Restaurant{" "}
            </h2>{" "}
            <p className="text-gray-600 leading-relaxed">
              {" "}
              {restaurant.description}{" "}
            </p>{" "}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {" "}
              <div className="bg-orange-50 rounded-xl p-4">
                {" "}
                <p className="text-sm text-gray-500">Cuisine</p>{" "}
                <p className="font-semibold text-gray-900 mt-1">
                  {" "}
                  🍴 {restaurant.cuisine}{" "}
                </p>{" "}
              </div>{" "}
              <div className="bg-orange-50 rounded-xl p-4">
                {" "}
                <p className="text-sm text-gray-500">Price Range</p>{" "}
                <p className="font-semibold text-gray-900 mt-1">
                  {" "}
                  ₹{restaurant.priceRange}{" "}
                </p>{" "}
              </div>{" "}
              <div className="bg-orange-50 rounded-xl p-4">
                {" "}
                <p className="text-sm text-gray-500">Opening Hours</p>{" "}
                <p className="font-semibold text-gray-900 mt-1">
                  {" "}
                  🕐 {restaurant.openingHours || "Not available"}{" "}
                </p>{" "}
              </div>{" "}
              <div className="bg-orange-50 rounded-xl p-4">
                {" "}
                <p className="text-sm text-gray-500">Contact</p>{" "}
                <p className="font-semibold text-gray-900 mt-1">
                  {" "}
                  📞 {restaurant.contactNumber || "Not available"}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Rating Card */}{" "}
          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-center items-center text-center">
            {" "}
            <div className="text-5xl mb-3">⭐</div>{" "}
            <p className="text-4xl font-extrabold text-gray-900">
              {" "}
              {restaurant.averageRating || 0}{" "}
            </p>{" "}
            <p className="text-gray-500 mt-2"> Restaurant Rating </p>{" "}
            <div className="mt-5 px-4 py-2 bg-orange-50 rounded-full text-orange-700 font-semibold">
              {" "}
              {restaurant.cuisine} Cuisine{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Restaurant Menu */}{" "}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mt-8">
          {" "}
          <div className="flex items-center justify-between mb-6">
            {" "}
            <div>
              {" "}
              <h2 className="text-2xl font-bold text-gray-900">
                {" "}
                Our Menu{" "}
              </h2>{" "}
              <p className="text-gray-500 mt-1">
                {" "}
                Explore delicious dishes from {restaurant.name}{" "}
              </p>{" "}
            </div>{" "}
            <span className="hidden sm:block text-2xl"> 🍽️ </span>{" "}
          </div>{" "}
          {restaurant.menu && restaurant.menu.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {" "}
              {restaurant.menu.map((item, index) => (
                <div
                  key={item._id || index}
                  className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition"
                >
                  {" "}
                  <div className="flex justify-between items-start gap-4">
                    {" "}
                    <h3 className="font-bold text-lg text-gray-900">
                      {" "}
                      {item.name}{" "}
                    </h3>{" "}
                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-bold whitespace-nowrap">
                      {" "}
                      ₹{item.price}{" "}
                    </span>{" "}
                  </div>{" "}
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                    {" "}
                    {item.description}{" "}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              {" "}
              <p className="text-gray-500">
                {" "}
                Menu information is not available.{" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
        {/* Reservation Section */}{" "}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border overflow-hidden">
          {" "}
          <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-6 md:p-8 text-white">
            {" "}
            <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">
              {" "}
              Reserve your table{" "}
            </p>{" "}
            <h2 className="text-3xl font-extrabold mt-1">
              {" "}
              Book Your Table{" "}
            </h2>{" "}
            <p className="text-orange-50 mt-2">
              {" "}
              Choose your preferred date, time and number of guests.{" "}
            </p>{" "}
          </div>{" "}
          <div className="p-6 md:p-8">
            {" "}
            <div className="grid md:grid-cols-3 gap-5">
              {" "}
              <div>
                {" "}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {" "}
                  Date{" "}
                </label>{" "}
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {" "}
                  Time{" "}
                </label>{" "}
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {" "}
                  <option value="">Select Time</option>{" "}
                  <option value="12:00">12:00 PM</option>{" "}
                  <option value="13:00">1:00 PM</option>{" "}
                  <option value="19:00">7:00 PM</option>{" "}
                  <option value="20:00">8:00 PM</option>{" "}
                  <option value="21:00">9:00 PM</option>{" "}
                </select>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {" "}
                  Guests{" "}
                </label>{" "}
                <input
                  type="number"
                  min="1"
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* Check Availability */}{" "}
            <button
              onClick={handleCheckAvailability}
              className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-sm"
            >
              {" "}
              Check Availability{" "}
            </button>{" "}
            {/* Availability Result */}{" "}
            {availability && (
              <div
                className={`mt-5 p-4 rounded-xl border ${availability.available ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                {" "}
                {availability.available ? (
                  <div>
                    {" "}
                    <p className="text-green-700 font-bold">
                      {" "}
                      ✓ Table Available!{" "}
                    </p>{" "}
                    <p className="text-green-600 text-sm mt-1">
                      {" "}
                      Great! You can proceed with your reservation.{" "}
                    </p>{" "}
                  </div>
                ) : (
                  <div>
                    {" "}
                    <p className="text-red-700 font-bold">
                      {" "}
                      ✕ No Availability{" "}
                    </p>{" "}
                    <p className="text-red-600 text-sm mt-1">
                      {" "}
                      Sorry, there are no available tables for this time.{" "}
                    </p>{" "}
                  </div>
                )}{" "}
              </div>
            )}{" "}
            {/* Payment Button */}{" "}
            {availability?.available && (
              <button
                onClick={bookTable}
                className="mt-4 w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-md"
              >
                {" "}
                💳 Confirm Reservation & Pay{" "}
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}
        {/* Reviews */}{" "}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          {" "}
          <div className="mb-6">
            {" "}
            <h2 className="text-2xl font-bold text-gray-900">
              {" "}
              Customer Reviews{" "}
            </h2>{" "}
            <p className="text-gray-500 mt-1">
              {" "}
              See what other diners have to say about this restaurant.{" "}
            </p>{" "}
          </div>{" "}
          <ReviewForm
            reviewForm={reviewForm}
            setReviewForm={setReviewForm}
            editingReviewId={editingReviewId}
            handleReviewSubmit={handleReviewSubmit}
            handleUpdateReview={handleUpdateReview}
            setEditingReviewId={setEditingReviewId}
          />{" "}
          <div className="mt-8 border-t pt-8">
            {" "}
            <ReviewList
              reviews={reviews}
              user={user}
              handleEditReview={handleEditReview}
              handleDeleteReview={handleDeleteReview}
              fetchReviews={fetchReviews}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default RestaurantDetails;
