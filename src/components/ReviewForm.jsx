const ReviewForm = ({
  reviewForm,
  setReviewForm,
  editingReviewId,
  handleReviewSubmit,
  handleUpdateReview,
  setEditingReviewId
}) => {

  const handleCancelEdit = () => {
    setEditingReviewId(null);

    setReviewForm({
      rating: 5,
      comment: "",
      photos: []
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Write a Review
      </h2>

      <form
        onSubmit={
          editingReviewId
            ? handleUpdateReview
            : handleReviewSubmit
        }
        className="border rounded-lg p-6 mb-8"
      >

        {/* Rating */}
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

        {/* Comment */}
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

        {/* Photo */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Photo URLs
          </label>

          <input
            type="text"
            placeholder="Enter image URL"
            value={reviewForm.photos[0] || ""}
            onChange={(e) =>
              setReviewForm({
                ...reviewForm,
                photos: e.target.value
                  ? [e.target.value]
                  : []
              })
            }
            className="border p-3 rounded w-full"
          />
        </div>

        {/* Submit / Update */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          {editingReviewId
            ? "Update Review"
            : "Submit Review"}
        </button>

        {/* Cancel Edit */}
        {editingReviewId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="ml-2 bg-gray-400 text-white px-6 py-3 rounded"
          >
            Cancel Edit
          </button>
        )}

      </form>
    </>
  );
};

export default ReviewForm;