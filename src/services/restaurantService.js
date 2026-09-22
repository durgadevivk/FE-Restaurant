import axios from "axios";
import api from "./api";


export const getRestaurants = async (params = {}) => {
   const response = await api.get("/restaurant", { params });
  return response.data;
};

export const getRestaurantById = async (id) => {
   const response = await api.get(`/restaurant/${id}`);
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