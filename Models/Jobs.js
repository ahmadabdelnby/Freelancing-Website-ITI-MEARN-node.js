const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // Reference to the client who posted the job(user id)
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    specialty: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Specialty', 
        required: true 
    },
    // An array of references to the specific skills needed
    skills: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Skill' 
    }],
    budget: {
        type: { 
            type: String, 
            enum: ['hourly', 'fixed'], 
            required: true 
        },
        amount: { 
            type: Number, 
            required: true 
        }
    },
    status: { 
        type: String, 
        enum: ['open', 'in_progress', 'completed', 'cancelled'], 
        default: 'open' 
    }
}, { 
    // Automatically adds createdAt and updatedAt fields
    timestamps: true 
});

module.exports = mongoose.model('Job', jobSchema);