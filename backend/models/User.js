const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  password: { type: String, required: true },
  postal_code: String,
  profession: { type: mongoose.Schema.Types.ObjectId, ref: 'Profession' },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }] // postule à plusieurs jobs
});

module.exports = mongoose.model('User', UserSchema);
