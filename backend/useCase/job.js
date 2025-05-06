const mongoose = require('mongoose');
const Job = require('../models/Job');
const Status = require('../models/Status');
const UserJobStatus = require('../models/UserJobStatus');

/**
 * Create a new job
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Created job
 */
const createJob = async (req, res) => {
  try {
    const { title, description, latitude, longitude, city } = req.body;
    
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Invalid title' });
    }
    
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid description' });
    }
    
    const parsedLatitude = Number(latitude);
    if (isNaN(parsedLatitude)) {
      return res.status(400).json({ error: 'Invalid latitude' });
    }
    
    const parsedLongitude = Number(longitude);
    if (isNaN(parsedLongitude)) {
      return res.status(400).json({ error: 'Invalid longitude' });
    }
    
    if (!city || !mongoose.Types.ObjectId.isValid(city)) {
      return res.status(400).json({ error: 'Invalid city' });
    }
    
    const sanitizedJob = new Job({
      title: title.trim(),
      description: description.trim(),
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      city: mongoose.Types.ObjectId(city),
      createdAt: new Date()
    });

    const savedJob = await sanitizedJob.save();
    
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all jobs
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Array>} List of jobs
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a job by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Job object
 */
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(`Error fetching job: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update job information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Updated job
 */
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    console.error(`Error updating job: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a job
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Deletion result
 */
const deleteJob = async (req, res) => {
  try {
    const result = await Job.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.status(200).json({ message: 'Job deleted successfully', id: req.params.id });
  } catch (error) {
    console.error(`Error deleting job: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Apply to a job
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Application result
 */
const applyToJob = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const jobId = req.params.jobId;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        if (!description || typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid description' });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (!job.applicants) {
            job.applicants = [];
        }

        if (job.applicants.includes(userId)) {
            return res.status(400).json({ error: 'User has already applied to this job' });
        }

        job.applicants.push(userId);
        await job.save();

        const pendingStatus = await Status.findOne({ status: 'Pending' });
        if (!pendingStatus) {
            return res.status(500).json({ error: 'Pending status not found' });
        }
        const userJobStatus = new UserJobStatus({
            userId,
            statusId: pendingStatus._id,
            description: description,
        });
        await userJobStatus.save();

        res.status(200).json({ message: 'Application successful', job });
    } catch (error) {
        console.error(`Error applying to job: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob,
};