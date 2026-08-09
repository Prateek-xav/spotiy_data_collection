import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import researchRoutes from './routes/researchRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://spotiy-data-collection.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
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
