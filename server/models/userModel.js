const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for user registration
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensures no duplicate emails
    },
    password: {
      type: String,
      required: true,
      minlength: 8,  // Password should be at least 8 characters long
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password is not modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
