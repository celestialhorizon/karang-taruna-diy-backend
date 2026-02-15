import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

router.post('/register', async (req, res) => {
  try {
    const { 
      name,
      username, 
      email, 
      password,
      karangTarunaName,
      provinsi,
      kabupatenKota,
      kecamatan,
      jalan,
      phone,
      interests,
      skillLevel,
      peranAnggota
    } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'Pengguna sudah terdaftar' });
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
      karangTarunaName,
      provinsi,
      kabupatenKota,
      kecamatan,
      jalan,
      phone: phone || '',
      interests: interests || [],
      skillLevel: skillLevel || 'Pemula',
      peranAnggota: peranAnggota || ''
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      karangTarunaName: user.karangTarunaName,
      provinsi: user.provinsi,
      kabupatenKota: user.kabupatenKota,
      kecamatan: user.kecamatan,
      jalan: user.jalan,
      phone: user.phone,
      interests: user.interests,
      skillLevel: user.skillLevel,
      peranAnggota: user.peranAnggota,
      role: user.role,
      token,
    });
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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Akun tidak aktif' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      karangTarunaName: user.karangTarunaName,
      provinsi: user.provinsi,
      kabupatenKota: user.kabupatenKota,
      kecamatan: user.kecamatan,
      jalan: user.jalan,
      phone: user.phone,
      interests: user.interests,
      skillLevel: user.skillLevel,
      peranAnggota: user.peranAnggota,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    karangTarunaName: req.user.karangTarunaName,
    provinsi: req.user.provinsi,
    kabupatenKota: req.user.kabupatenKota,
    kecamatan: req.user.kecamatan,
    jalan: req.user.jalan,
    phone: req.user.phone,
    interests: req.user.interests,
    skillLevel: req.user.skillLevel,
    peranAnggota: req.user.peranAnggota,
    role: req.user.role,
  });
});

export default router;
