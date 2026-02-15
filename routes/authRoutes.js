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

    // Manual validation for better error messages
    const errors = {};
    
    if (!name || name.trim() === '') {
      errors.name = 'Nama lengkap wajib diisi';
    }
    
    if (!username || username.trim() === '') {
      errors.username = 'Username wajib diisi';
    } else if (username.length < 3) {
      errors.username = 'Username minimal 3 karakter';
    } else if (username.length > 30) {
      errors.username = 'Username maksimal 30 karakter';
    }
    
    if (!email || email.trim() === '') {
      errors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!password) {
      errors.password = 'Password wajib diisi';
    } else if (password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }
    
    if (!karangTarunaName || karangTarunaName.trim() === '') {
      errors.karangTarunaName = 'Nama karang taruna wajib diisi';
    }
    
    if (!provinsi || provinsi.trim() === '') {
      errors.provinsi = 'Provinsi wajib diisi';
    }
    
    if (!kabupatenKota || kabupatenKota.trim() === '') {
      errors.kabupatenKota = 'Kabupaten/Kota wajib diisi';
    }
    
    if (!kecamatan || kecamatan.trim() === '') {
      errors.kecamatan = 'Kecamatan wajib diisi';
    }
    
    if (!jalan || jalan.trim() === '') {
      errors.jalan = 'Jalan wajib diisi';
    }
    
    if (!phone || phone.trim() === '') {
      errors.phone = 'Nomor telepon wajib diisi';
    }
    
    if (!interests || interests.length === 0) {
      errors.interests = 'Pilih minimal satu minat DIY';
    }
    
    if (!skillLevel || skillLevel.trim() === '') {
      errors.skillLevel = 'Tingkat keahlian wajib dipilih';
    } else if (!['Pemula', 'Menengah', 'Mahir'].includes(skillLevel)) {
      errors.skillLevel = 'Tingkat keahlian tidak valid';
    }
    
    if (!peranAnggota || peranAnggota.trim() === '') {
      errors.peranAnggota = 'Peran anggota wajib diisi';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors 
      });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }
      if (userExists.username === username) {
        return res.status(400).json({ message: 'Username sudah terdaftar' });
      }
    }

    const user = await User.create({
      name: name.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      karangTarunaName: karangTarunaName.trim(),
      provinsi: provinsi.trim(),
      kabupatenKota: kabupatenKota.trim(),
      kecamatan: kecamatan.trim(),
      jalan: jalan.trim(),
      phone: phone.trim(),
      interests: interests || [],
      skillLevel: skillLevel || 'Pemula',
      peranAnggota: peranAnggota.trim()
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
      const errors = {};
      Object.values(error.errors).forEach(err => {
        errors[err.path] = err.message;
      });
      return res.status(400).json({ 
        message: 'Validasi gagal', 
        errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const fieldMap = {
        email: 'Email',
        username: 'Username'
      };
      return res.status(400).json({ 
        message: `${fieldMap[field] || field} sudah digunakan` 
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
