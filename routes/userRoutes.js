import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

router.get('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { 
      name,
      username, 
      email, 
      karangTarunaName,
      provinsi,
      kabupatenKota,
      kecamatan,
      jalan,
      phone,
      interests,
      skillLevel,
      peranAnggota,
      role, 
      isActive 
    } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Nama lengkap wajib diisi' });
    }
    if (!username || !username.trim()) {
      return res.status(400).json({ message: 'Username wajib diisi' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email wajib diisi' });
    }
    if (!karangTarunaName || !karangTarunaName.trim()) {
      return res.status(400).json({ message: 'Nama Karang Taruna wajib diisi' });
    }
    if (!provinsi || !provinsi.trim()) {
      return res.status(400).json({ message: 'Provinsi wajib diisi' });
    }
    if (!kabupatenKota || !kabupatenKota.trim()) {
      return res.status(400).json({ message: 'Kabupaten/Kota wajib diisi' });
    }
    if (!kecamatan || !kecamatan.trim()) {
      return res.status(400).json({ message: 'Kecamatan wajib diisi' });
    }
    if (!jalan || !jalan.trim()) {
      return res.status(400).json({ message: 'Jalan wajib diisi' });
    }
    
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Update all fields
    user.name = name;
    user.username = username;
    user.email = email;
    user.karangTarunaName = karangTarunaName;
    user.provinsi = provinsi;
    user.kabupatenKota = kabupatenKota;
    user.kecamatan = kecamatan;
    user.jalan = jalan;
    user.phone = phone || '';
    user.interests = interests || user.interests;
    user.skillLevel = skillLevel || user.skillLevel;
    user.peranAnggota = peranAnggota !== undefined ? peranAnggota : user.peranAnggota;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      karangTarunaName: updatedUser.karangTarunaName,
      provinsi: updatedUser.provinsi,
      kabupatenKota: updatedUser.kabupatenKota,
      kecamatan: updatedUser.kecamatan,
      jalan: updatedUser.jalan,
      phone: updatedUser.phone,
      interests: updatedUser.interests,
      skillLevel: updatedUser.skillLevel,
      peranAnggota: updatedUser.peranAnggota,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
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

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

export default router;
