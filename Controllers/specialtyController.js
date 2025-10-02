const specialty = require('../Models/Specialties');

// Create a new specialty
const createSpecialty = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingSpecialty = await specialty.findOne({ name });
        if (existingSpecialty) {
            return res.status(400).json({ message: 'Specialty already exists' });
        }
        const newSpecialty = new specialty({ name, description });
        await newSpecialty.save();
        res.status(201).json(newSpecialty);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all specialties
const getAllSpecialties = async (req, res) => {
    try {
        const specialties = await specialty.find();
        res.json(specialties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Get a specialty by ID
const getSpecialtyById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const foundSpecialty = await specialty.findById(specialtyId);
        if (!foundSpecialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json(foundSpecialty);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Update a specialty by ID
const updateSpecialtyById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const updatedData = req.body;
        const updatedSpecialty = await specialty.findByIdAndUpdate(specialtyId, updatedData, { new: true });
        if (!updatedSpecialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json(updatedSpecialty);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Delete a specialty by ID
const deleteSpecialtyById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const deletedSpecialty = await specialty.findByIdAndDelete(specialtyId);
        if (!deletedSpecialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json({ message: 'Specialty deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    createSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    updateSpecialtyById,
    deleteSpecialtyById
};