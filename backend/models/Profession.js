const mongoose = require('mongoose');

const ProfessionSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

module.exports = mongoose.model('Profession', ProfessionSchema);
