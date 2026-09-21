import axios from "axios";
import api from "./api";
const API_URL = "http://localhost:3001/api/v1/restaurant";

export const getRestaurants = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateRestaurant = async (id, data) => {
  const response = await api.put(`/restaurant/${id}`, data);
  return response.data;
};
export const getOwnerRestaurant = async () => {
  const response = await api.get("/restaurant/owner/my-restaurant");
  return response.data;
};