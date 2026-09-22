import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-reservation-3lvs.onrender.com/api/v1",
    withCredentials: true
});

export default api;