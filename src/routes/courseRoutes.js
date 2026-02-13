const express = require('express');
const router = express.Router();
const { getCourses, createCourse, getMyCreatedCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getCourses);
router.post('/', protect, authorize('instructor'), createCourse);
router.get('/my-created', protect, authorize('instructor'), getMyCreatedCourses);

module.exports = router;