import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/datas"; // Replace with your backend URL if different

/**
 * Fetch cities data from the backend
 * @returns {Promise<Array>} List of cities with calculated ratio
 */
export const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    console.log("Fetched cities:", response.data);

    // Add calculated attribute for each city
    const citiesWithRatio = response.data.map((city) => ({
      ...city,
      populationPerDoctor: city.nb_doctors > 0 ? city.nb_population / city.nb_doctors : null, // Avoid division by zero
    }));

    return citiesWithRatio;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities.");
  }
};