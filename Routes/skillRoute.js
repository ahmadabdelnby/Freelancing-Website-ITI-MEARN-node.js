const express = require('express');
const router = express.Router();
const { createSkill, getAllSkills, getSkillById, updateSkillById, deleteSkillById } = require('../Controllers/skillsController');

/**
 * @swagger
 * /Freelancing/api/v1/skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill created successfully
 */
router.post('/', createSkill);

/**
 * @swagger
 * /Freelancing/api/v1/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 */
router.get('/', getAllSkills);

/**
 * @swagger
 * /Freelancing/api/v1/skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill retrieved successfully
 */
router.get('/:id', getSkillById);

/**
 * @swagger
 * /Freelancing/api/v1/skills/{id}:
 *   put:
 *     summary: Update skill by ID
 *     tags: [Skills]
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
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Skill updated successfully
 */
router.put('/:id', updateSkillById);

/**
 * @swagger
 * /Freelancing/api/v1/skills/{id}:
 *   delete:
 *     summary: Delete skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 */
router.delete('/:id', deleteSkillById);

module.exports = router;
