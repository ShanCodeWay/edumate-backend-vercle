const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: String, default: 'Beginner' },
  duration: { type: String, default: '0h' },
  lessons: { type: Number, default: 0 },
  syllabus: [{ type: String }],
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);