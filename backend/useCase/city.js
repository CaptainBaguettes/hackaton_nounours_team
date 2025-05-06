const mongoose = require('mongoose');
const City = require('../models/City');

/**
 * Create a new city
 * @param {Object} cityData - The city data
 * @returns {Promise<Object>} Created city
 */
const createCity = async (req, res) => {
  try {
    const { name, latitude, longitude, nb_population, nb_doctors } = req.body;
    // Validate and sanitize input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
    if (typeof nb_population !== 'number' || typeof nb_doctors !== 'number') {
      return res.status(400).json({ error: 'Invalid population or doctors count' });
    }

    const city = await City.create({
      name,
      latitude,
      longitude,
      nb_population,
      nb_doctors
    });
    res.status(201).json(city);
  } catch (error) {
    console.error('Error creating city:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all cities
 * @param {Object} filter - Optional filter criteria
 * @returns {Promise<Array>} List of cities
 */
const getAllCities = async (req, res) => {
    try {
      const cities = await City.find();
      res.status(200).json(cities);
    } catch (error) {
      console.error(`Error fetching cities: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
};

/**
 * Get all city names
 * @returns {Promise<Array>} List of city names
 */
const getAllCitiesName = async (req, res) => {
  try {
    const cities = await City.find().select('name -_id');
    const cityNames = cities.map(city => city.name);
    res.status(200).json(cityNames);
  } catch (error) {
    console.error(`Error fetching city names: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a city by ID
 * @param {string} id - City ID
 * @returns {Promise<Object>} City object
 */
const getCityById = async (id) => {
  try {
    const city = await City.findById(id);
    if (!city) {
      throw new Error('City not found');
    }
    return city;
  } catch (error) {
    throw new Error(`Error fetching city: ${error.message}`);
  }
};

/**
 * Update city information
 * @param {string} id - City ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated city
 */
const updateCity = async (id, updateData) => {
  try {
    const city = await City.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!city) {
      throw new Error('City not found');
    }
    
    return city;
  } catch (error) {
    throw new Error(`Error updating city: ${error.message}`);
  }
};

/**
 * Delete a city
 * @param {string} id - City ID
 * @returns {Promise<Object>} Deletion result
 */
const deleteCity = async (id) => {
  try {
    const result = await City.findByIdAndDelete(id);
    
    if (!result) {
      throw new Error('City not found');
    }
    
    return { message: 'City deleted successfully', id };
  } catch (error) {
    throw new Error(`Error deleting city: ${error.message}`);
  }
};

module.exports = {
  createCity,
  getAllCities,
  getAllCitiesName,
  getCityById,
  updateCity,
  deleteCity
};