const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 255,
    validate: {
      validator: function(email) {
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
      validator: function(username) {
        return /^[a-zA-Z0-9_]+$/.test(username);
      },
      message: 'Username can only contain letters, numbers, and underscores'
    }
  },
  password_hash: {
    type: String,
    required: true,
    maxlength: 255
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
    maxlength: 255,
    validate: {
      validator: function(url) {
        if (!url) return true; // Allow null/empty values
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
      },
      message: 'Please enter a valid image URL'
    }
  },
  country: {
    type: String,
    default: null,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true, // This will create createdAt and updatedAt fields automatically
  versionKey: false // Removes the __v field
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.first_name} ${this.last_name}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password_hash; // Remove password hash from JSON output
    return ret;
  }
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ created_at: -1 });

// Pre-save middleware example (you might want to hash passwords here)
userSchema.pre('save', function(next) {
  // Add any pre-save logic here (like password hashing)
  next();
});

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username: username });
};

// Instance methods
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password_hash;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;