import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/datas"; // Replace with your backend URL if different

/**
 * Fetch communes data from the backend
 * @returns {Promise<Array>} List of communes
 */
export const fetchCommunes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/communes`);
    console.log("Fetched communes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching communes:", error);
    throw new Error("Failed to fetch communes.");
  }
};

/**
 * Fetch cities data from the backend
 * @returns {Promise<Array>} List of cities
 */
export const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    console.log("Fetched cities:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities.");
  }
};