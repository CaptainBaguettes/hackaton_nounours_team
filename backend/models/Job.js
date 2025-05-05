const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  latitude: Number,
  longitude: Number,
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // inverse de postule
});

module.exports = mongoose.model('Job', JobSchema);
