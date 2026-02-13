const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

// ===== CONNECT DATABASE =====
// In serverless environments, we connect once and reuse the connection
connectDB();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.send('EduMate API Running');
});

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/enrollments', require('./src/routes/enrollmentRoutes'));
app.use('/api/gpt', require('./src/routes/gptRoutes'));

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== START SERVER (FOR LOCAL DEV) =====
// Vercel handles the listening part in production. 
// We only call app.listen() if we are running the file directly locally.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ===== EXPORT FOR VERCEL =====
// This is the most important line for Vercel!
module.exports = app;