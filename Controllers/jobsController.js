const job = require('../Models/Jobs');

// Create a new job
const createJob = async (req, res) => {
    try {
        const { client, title, description, specialty, skills, budget } = req.body;
        const newJob = new job({
            client,
            title,
            description,
            specialty,
            skills,
            budget
        });
        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await job.find();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Get job by ID
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const foundJob = await job.findById(jobId);
        if (!foundJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(foundJob);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Update job by ID
const updateJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedData = req.body;
        const updatedJob = await job.findByIdAndUpdate(jobId, updatedData, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Delete job by ID
const deleteJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJobById,
    deleteJobById
};
