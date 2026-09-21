import OwnerResponse from "./OwnerResponse";
const ReviewList = ({
  reviews,
  user,
  handleEditReview,
  handleDeleteReview,
  fetchReviews
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-lg p-5">
              {console.log("Logged in user:", user)}
              {console.log("Review user:", review.user)}
              <div className="flex justify-between">
                <h3 className="font-bold">{review.user?.name || "User"}</h3>

                <span>{"⭐".repeat(review.rating)}</span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              {review.ownerResponse && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <p className="font-semibold">Restaurant Owner Response</p>

                  <p className="mt-1 text-gray-700">{review.ownerResponse}</p>
                </div>
              )}
              {user?.role === "restaurant_owner" && !review.ownerResponse && (
                <OwnerResponse review={review} onResponseAdded={fetchReviews} />
              )}
              {/* Review Photos */}
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
              {/* Edit / Delete only for own review */}
              {user && user._id === review.user?._id && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewList;
