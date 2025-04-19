import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true
  },
  applicationName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formData: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  remarks: {
    type: String
  }
}, { timestamps: true });

// Generate applicationId before saving
formSchema.pre('save', function(next) {
  if (this.isNew && !this.applicationId) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    this.applicationId = `APP${timestamp}${random}`;
  }
  next();
});

const Form = mongoose.model('Form', formSchema);

export default Form; 