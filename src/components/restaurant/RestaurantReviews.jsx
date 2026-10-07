
import { useState } from "react";

import {
  createReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";

import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";

const RestaurantReviews = ({
  restaurantId,
  reviews,
  user,
  fetchReviews,
}) => {
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    photos: [],
  });

  const [editingReviewId, setEditingReviewId] = useState(null);

  const resetForm = () => {
    setReviewForm({
      rating: 5,
      comment: "",
      photos: [],
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        restaurantId,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
        photos: reviewForm.photos,
      });

      alert("Review added successfully!");

      resetForm();
      fetchReviews();

    } catch (error) {
      console.error("Failed to create review", error);

      alert(
        error.response?.data?.message ||
          "Failed to add review"
      );
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);

    setReviewForm({
      rating: review.rating,
      comment: review.comment,
      photos: review.photos || [],
    });
  };

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
      resetForm();
      fetchReviews();

    } catch (error) {
      console.error("Failed to update review", error);

      alert(
        error.response?.data?.message ||
          "Failed to update review"
      );
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await deleteReview(reviewId);

      alert("Review deleted successfully");

      fetchReviews();

    } catch (error) {
      console.error("Failed to delete review", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete review"
      );
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border p-6 md:p-8">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>

        <p className="text-gray-500 mt-1">
          See what other diners have to say about this restaurant.
        </p>
      </div>

      <ReviewForm
        reviewForm={reviewForm}
        setReviewForm={setReviewForm}
        editingReviewId={editingReviewId}
        handleReviewSubmit={handleReviewSubmit}
        handleUpdateReview={handleUpdateReview}
        setEditingReviewId={setEditingReviewId}
      />

      <div className="mt-8 border-t pt-8">
        <ReviewList
          reviews={reviews}
          user={user}
          handleEditReview={handleEditReview}
          handleDeleteReview={handleDeleteReview}
          fetchReviews={fetchReviews}
        />
      </div>

    </div>
  );
};

export default RestaurantReviews;
