const express = require('express');
const router = express.Router();
const { enrollCourse, getMyEnrollments } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, enrollCourse);
router.get('/my', protect, getMyEnrollments);

module.exports = router;