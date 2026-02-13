const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true }).populate('instructor', 'name');
    res.json(courses);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createCourse = async (req, res) => {
  try {
    const course = new Course({ ...req.body, instructor: req.user._id });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMyCreatedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) { res.status(500).json({ message: error.message }); }
};