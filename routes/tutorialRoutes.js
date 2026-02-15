import express from 'express';
import Tutorial from '../models/Tutorial.js';
import Progress from '../models/Progress.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const tutorials = await Tutorial.find(filter).sort({ createdAt: -1 });
    res.json(tutorials);
  } catch (error) {
    console.error(error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial tidak ditemukan' });
    }
    res.json(tutorial);
  } catch (error) {
    console.error(error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json(tutorial);
  } catch (error) {
    console.error(error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial tidak ditemukan' });
    }
    res.json(tutorial);
  } catch (error) {
    console.error(error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial tidak ditemukan' });
    }

    // Delete all progress records for this tutorial
    await Progress.deleteMany({ tutorial: req.params.id });

    res.json({ message: 'Tutorial dan semua progress terkait berhasil dihapus' });
  } catch (error) {
    console.error(error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.post('/:id/progress', protect, async (req, res) => {
  try {
    const { stepNumber, completed } = req.body;
    const userId = req.user._id;
    const tutorialId = req.params.id;

    // Validate required fields
    if (!userId) {
      return res.status(401).json({ message: 'User ID tidak ditemukan' });
    }

    if (!tutorialId) {
      return res.status(400).json({ message: 'Tutorial ID diperlukan' });
    }

    if (typeof stepNumber !== 'number' || stepNumber < 1) {
      return res.status(400).json({ message: 'Nomor langkah tidak valid' });
    }

    let progress = await Progress.findOne({ user: userId, tutorial: tutorialId });

    if (!progress) {
      progress = await Progress.create({
        user: userId,
        tutorial: tutorialId,
        completedSteps: completed ? [stepNumber] : []
      });
    } else {
      if (completed) {
        if (!progress.completedSteps.includes(stepNumber)) {
          progress.completedSteps.push(stepNumber);
        }
      } else {
        progress.completedSteps = progress.completedSteps.filter(s => s !== stepNumber);
      }
      
      const tutorial = await Tutorial.findById(tutorialId);
      if (tutorial && progress.completedSteps.length === tutorial.steps.length) {
        progress.isCompleted = true;
        progress.completedAt = new Date();
      } else {
        progress.isCompleted = false;
        progress.completedAt = undefined;
      }
      
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Progress update error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.get('/user/progress', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID tidak ditemukan' });
    }
    
    const progress = await Progress.find({ user: userId })
      .populate('tutorial', 'title category difficulty duration imageUrl steps');
    
    res.json(progress);
  } catch (error) {
    console.error('Get user progress error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

router.get('/:id/progress', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const tutorialId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID tidak ditemukan' });
    }

    if (!tutorialId) {
      return res.status(400).json({ message: 'Tutorial ID diperlukan' });
    }

    const progress = await Progress.findOne({ user: userId, tutorial: tutorialId })
      .populate('tutorial', 'title steps');
    
    res.json(progress || { completedSteps: [], isCompleted: false, timeSpent: 0 });
  } catch (error) {
    console.error('Get tutorial progress error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

// Update time spent
router.post('/:id/time', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const tutorialId = req.params.id;
    const { timeSpent } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User ID tidak ditemukan' });
    }

    if (!tutorialId) {
      return res.status(400).json({ message: 'Tutorial ID diperlukan' });
    }

    if (typeof timeSpent !== 'number' || timeSpent < 0) {
      return res.status(400).json({ message: 'Waktu tidak valid' });
    }

    const progress = await Progress.findOne({ user: userId, tutorial: tutorialId });
    
    if (progress) {
      progress.timeSpent = (progress.timeSpent || 0) + timeSpent;
      await progress.save();
    }
    
    res.json({ success: true, timeSpent: progress?.timeSpent || 0 });
  } catch (error) {
    console.error('Time tracking error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors: error.errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: `${field} sudah digunakan` 
      });
    }
    
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

export default router;
