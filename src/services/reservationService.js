// services/reservationService.js

import api from "./api";

export const checkAvailability = async (data) => {
    const response = await api.get("/reservation/availability", {
        params: data
    });

    return response.data;
};

export const createReservation = async (data) => {
    const response = await api.post("/reservation", data);

    return response.data;
};
// Get logged-in user's reservations
export const getMyReservations = async () => {
    const response = await api.get("/reservation/my");

    return response.data;
};

// Cancel reservation
export const cancelReservation = async (id) => {
    const response = await api.patch(`/reservation/${id}`);

    return response.data;
};

// Update reservation
export const updateReservation = async (id, data) => {
    const response = await api.put(`/reservation/${id}`, data);

    return response.data;
};