import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: function() {
      return this.isNew; // Only required for new documents
    }
  },
  lastName: {
    type: String,
    required: function() {
      return this.isNew; // Only required for new documents
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique userId before validation
userSchema.pre('validate', function(next) {
  if (this.isNew && !this.userId) {
    this.userId = `USR${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  }
  next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Static method to create initial admin
userSchema.statics.createInitialAdmin = async function() {
  try {
    const adminEmail = 'admin@sns.com';
    const adminExists = await this.findOne({ email: adminEmail });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const admin = new this({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'approved',
        userId: 'ADM001'
      });
      
      await admin.save();
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating initial admin:', error);
  }
};

const User = mongoose.model('User', userSchema);

export default User; 