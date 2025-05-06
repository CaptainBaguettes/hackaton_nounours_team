const mongoose = require('mongoose');

const UserJobStatusSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    statusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    description: { type: String, required: true },
});

module.exports = mongoose.model('UserJobStatus', UserJobStatusSchema);
