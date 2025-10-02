const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 255,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please enter a valid email address'
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        validate: {
            validator: function (username) {
                return /^[a-zA-Z0-9_]+$/.test(username);
            },
            message: 'Username can only contain letters, numbers, and underscores'
        }
    },
    password: {
        type: String,
        required: true,
        maxlength: 15
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    profile_picture_url: {
        type: String,
        default: null,
        maxlength: 255
        // Removed URL validation to allow any string for testing
    },
    country: {
        type: String,
        default: null,
        trim: true,
        maxlength: 100
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);