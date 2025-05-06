const mongoose = require('mongoose');
const Job = require('../models/Job');
const Status = require('../models/Status');
const City = require('../models/City');
const UserJobStatus = require('../models/UserJobStatus');

/**
 * Create a new job
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Created job
 */
const createJob = async (req, res) => {
  try {
    const { title, description, city } = req.body;

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
    
    if (!city || typeof city !== 'string' || city.trim() === '') {
      return res.status(400).json({ error: 'Invalid city' });
    }

    const cityExists = await City.findOne({ name: city.trim() });
    if (!cityExists) {
      return res.status(404).json({ error: 'City not found' });
    }

    const sanitizedJob = new Job({
      title: title.trim(),
      description: description.trim(),
      city: cityExists._id,
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
            jobId: job._id,
            description: description,
        });
        await userJobStatus.save();

        res.status(200).json({ message: 'Application successful', job });
    } catch (error) {
        console.error(`Error applying to job: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Find jobs by user ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Array>} List of jobs applied by the user with their status
 */
const findJobsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const userJobStatuses = await UserJobStatus.find({ userId })
      .populate({
        path: 'jobId',
        populate: { path: 'city' }
      })
      .populate('statusId');
    
    if (!userJobStatuses || userJobStatuses.length === 0) {
      return res.status(404).json({ error: 'No jobs found for this user' });
    }

    const formattedJobs = userJobStatuses.map(application => {
      const jobData = application.jobId ? application.jobId.toObject() : {};
      
      return {
        job: jobData,
        application: {
          id: application._id,
          description: application.description,
          date: application._id.getTimestamp(),
          status: application.statusId ? application.statusId.status : 'Unknown'
        }
      };
    });

    res.status(200).json(formattedJobs);
  } catch (error) {
    console.error(`Error finding jobs by user ID: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Find jobs by city ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Array>} List of jobs in the specified city
 */
const findJobsByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ error: 'Invalid city ID' });
    }

    const jobs = await Job.find({ city: cityId });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: 'No jobs found for this city' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error(`Error finding jobs by city ID: ${error.message}`);
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
  findJobsByUserId,
  findJobsByCityId,
};