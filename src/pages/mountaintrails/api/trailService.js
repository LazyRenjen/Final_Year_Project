// This file contains the API service functions for mountain trails
// It handles CRUD operations for trails, including fetching, creating, updating, and deleting trails
import axios from "axios";

const API_URL = "/api/trails";

export const getTrails = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching trails:", error);
    throw error.response?.data || { message: "Network error" };
  }
};

export const getTrailById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trail ${id}:`, error);
    throw error.response?.data || { message: "Network error" };
  }
};

export const createTrail = async (trailData) => {
  try {
    const response = await axios.post(API_URL, trailData);
    return response.data;
  } catch (error) {
    console.error("Error creating trail:", error);
    throw error.response?.data || { message: "Network error" };
  }
};

export const updateTrail = async (id, trailData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, trailData);
    return response.data;
  } catch (error) {
    console.error(`Error updating trail ${id}:`, error);
    throw error.response?.data || { message: "Network error" };
  }
};

export const deleteTrail = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting trail ${id}:`, error);
    throw error.response?.data || { message: "Network error" };
  }
};
