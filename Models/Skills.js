const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate skill names
        trim: true
    },
    // This connects each skill to its parent category (e.g., "Web Development")
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    }
});

module.exports = mongoose.model('Skill', skillSchema);