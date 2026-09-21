import { useState } from "react";
import { addOwnerResponse } from "../services/reviewService";

const OwnerResponse = ({ review, onResponseAdded }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }

    try {
      setLoading(true);

      await addOwnerResponse(review._id, response);

      alert("Response added successfully");

      setResponse("");

      if (onResponseAdded) {
        onResponseAdded();
      }

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to add owner response"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
      <h4 className="font-semibold mb-2">
        Respond to this review
      </h4>

      <form onSubmit={handleSubmit}>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write your response..."
          className="border p-3 rounded w-full"
          rows="3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Sending..." : "Send Response"}
        </button>
      </form>
    </div>
  );
};

export default OwnerResponse;