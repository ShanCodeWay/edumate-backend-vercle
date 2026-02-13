const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const serverless = require('serverless-http');

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.get('/', (req, res) => res.send('EduMate API Running'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/enrollments', require('./src/routes/enrollmentRoutes'));
app.use('/api/gpt', require('./src/routes/gptRoutes'));

// ===== 404 HANDLER =====
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ===== START SERVER (LOCAL DEV ONLY) =====
if (process.env.NODE_ENV !== 'production') {
  // Connect DB once for local dev
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
}

// ===== EXPORT FOR VERCEL =====
module.exports = serverless(app);
