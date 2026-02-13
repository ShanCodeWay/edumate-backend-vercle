const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/gptController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, getRecommendations);

module.exports = router;