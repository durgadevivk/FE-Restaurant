import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/restaurant";

export const getRestaurants = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};