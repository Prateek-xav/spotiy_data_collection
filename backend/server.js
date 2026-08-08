import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import researchRoutes from './routes/researchRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'Spotify Age Research API',
    timestamp: new Date().toISOString()
  });
});

// Mount Research API routes
app.use('/api/research', researchRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Spotify Age Research Backend Server running on http://localhost:${PORT}`);
});
