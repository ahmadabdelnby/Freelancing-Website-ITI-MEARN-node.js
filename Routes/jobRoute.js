const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJobById, deleteJobById } = require('../Controllers/jobsController');

/**
 * @swagger
 * /Freelancing/api/v1/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               specialty:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               budget:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [hourly, fixed]
 *                   amount:
 *                     type: number
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.post('/', createJob);

/**
 * @swagger
 * /Freelancing/api/v1/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 */
router.get('/', getAllJobs);

/**
 * @swagger
 * /Freelancing/api/v1/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job retrieved successfully
 */
router.get('/:id', getJobById);

/**
 * @swagger
 * /Freelancing/api/v1/jobs/{id}:
 *   put:
 *     summary: Update job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               specialty:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               budget:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [hourly, fixed]
 *                   amount:
 *                     type: number
 *               status:
 *                 type: string
 *                 enum: [open, in_progress, completed, cancelled]
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put('/:id', updateJobById);

/**
 * @swagger
 * /Freelancing/api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
router.delete('/:id', deleteJobById);

module.exports = router;