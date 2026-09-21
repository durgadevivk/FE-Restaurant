import api from "./api";

// Get reviews for a restaurant
export const getRestaurantReviews = async (restaurantId) => {
  const response = await api.get(
    `/review/restaurant/${restaurantId}`
  );

  return response.data;
};

// Create a review
export const createReview = async (data) => {
  const response = await api.post(
    "/review",
    data
  );

  return response.data;
};

// Update a review
export const updateReview = async (id, data) => {
  const response = await api.put(
    `/review/${id}`,
    data
  );

  return response.data;
};

// Delete a review
export const deleteReview = async (id) => {
  const response = await api.delete(
    `/review/${id}`
  );

  return response.data;
};