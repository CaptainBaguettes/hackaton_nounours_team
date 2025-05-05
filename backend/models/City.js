const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  nb_population: Number,
  nb_doctors: Number
});

module.exports = mongoose.model('City', CitySchema);