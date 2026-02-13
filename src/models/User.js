const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'] 
  },
  role: { 
    type: String, 
    enum: ['student', 'instructor'], 
    default: 'student' 
  },
  // Fields for password reset
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);