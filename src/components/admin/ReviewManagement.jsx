import { useEffect, useState } from "react";
import api from "../../services/api";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/review/admin/all");

      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await api.delete(`/review/admin/${id}`);

      alert("Review deleted successfully");

      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete review"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6">

      <h2 className="text-2xl font-bold mb-5">
        Review Management
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews found.
        </p>
      ) : (
        <div className="space-y-4">

          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4"
            >

              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold">
                    {review.restaurant?.name || "Restaurant"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    By: {review.user?.name || "User"}
                  </p>

                  <p className="mt-2">
                    Rating: ⭐ {review.rating}/5
                  </p>

                  <p className="text-gray-700 mt-2">
                    {review.comment}
                  </p>

                  {review.ownerResponse && (
                    <p className="text-sm text-gray-500 mt-2">
                      Owner Response: {review.ownerResponse}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ReviewManagement;