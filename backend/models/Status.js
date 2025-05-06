const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  status: { type: String, required: true, unique: true },
});

StatusSchema.statics.StatusEnum = {
    VALIDATED: 'Validated',
    REFUSED: 'Refused',
    PENDING: 'Pending',
};

module.exports = mongoose.model('Status', StatusSchema);
