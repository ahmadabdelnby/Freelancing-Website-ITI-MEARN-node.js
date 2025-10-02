const express = require('express');
const router = express.Router();
const {register , login , adminDashboard,userDashboard,profile} = require('../Controllers/userController');
const authentic = require('../middleware/authenticationMiddle');
const authorize = require('../middleware/authorizationMiddle');

/**
 * @swagger
 * /Freelancing/api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               profile_picture_url:
 *                 type: string
 *               country:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', register);

/**
 * @swagger
 * /Freelancing/api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', login);

/**
 * @swagger
 * /Freelancing/api/v1/auth/admin-dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 */
router.get('/admin-dashboard', authentic, authorize('admin'),adminDashboard);

/**
 * @swagger
 * /Freelancing/api/v1/auth/user-dashboard:
 *   get:
 *     summary: Get user dashboard data
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User dashboard data retrieved successfully
 */
router.get('/user-dashboard', authentic, authorize('user'),userDashboard);

/**
 * @swagger
 * /Freelancing/api/v1/auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get('/profile', authentic, profile);

module.exports = router;