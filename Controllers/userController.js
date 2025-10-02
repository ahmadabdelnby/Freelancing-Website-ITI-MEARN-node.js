const user = require('../Models/User');
const JWT = require('jsonwebtoken');

function generateToken(user) {
    return JWT.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

// Register a new user
const register = async (req, res) => {
    try {
        const { email, username, password, first_name, last_name, profile_picture_url, country, role } = req.body;
        
        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        
        // Check if username already exists
        const existingUsername = await user.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use' });
        }
        
        const newUser = new user({
            email,
            username,
            password,
            first_name,
            last_name,
            profile_picture_url,
            country,
            role
        });
        
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation error', 
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const isPasswordValid = await existingUser.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const token = generateToken(existingUser);
        res.status(200).json({ 
            message: 'Login successful',
            token,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                username: existingUser.username,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const Users = await user.find();
        res.json(Users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const User = await user.findById(userId);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const User = await user.findByIdAndDelete(userId);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update user details / put and patch
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const User = await user.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const adminDashboard = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        res.status(200).json({ 
            message: 'Welcome to the admin dashboard', 
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const userDashboard = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        res.status(200).json({ 
            message: 'Welcome to the user dashboard', 
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('User dashboard error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const profile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        // Get full user details from database
        const userDetails = await user.findById(req.user.id).select('-password');
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: 'User profile retrieved successfully',
            user: userDetails
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    adminDashboard,
    userDashboard,
    profile
}
