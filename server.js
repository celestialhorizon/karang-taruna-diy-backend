import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars first before any other imports
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

// Debug: Check if env vars are loaded
console.log('Cloudinary ENV check:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? 'EXISTS' : 'MISSING',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'EXISTS' : 'MISSING'
});

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tutorialRoutes from './routes/tutorialRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Karang Taruna API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tutorials', tutorialRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
