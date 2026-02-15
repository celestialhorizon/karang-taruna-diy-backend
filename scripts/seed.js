import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    // Check if specific usernames already exist
    const existingAdmin = await User.findOne({ username: 'admin' });
    const existingUser = await User.findOne({ username: 'user' });
    
    const usersToInsert = [];
    
    if (!existingAdmin) {
      usersToInsert.push({
        name: 'Administrator',
        username: 'admin',
        email: 'admin@email.com',
        password: adminPassword,
        karangTarunaName: 'Karang Taruna Indonesia',
        provinsi: 'DKI Jakarta',
        kabupatenKota: 'Jakarta Pusat',
        kecamatan: 'Menteng',
        jalan: 'Jl. Menteng Raya No. 1',
        phone: '08123456789',
        interests: ['Pengembangan Masyarakat', 'Kepemimpinan'],
        skillLevel: 'Mahir',
        peranAnggota: 'Ketua Umum',
        role: 'admin',
        isActive: true,
      });
    } else {
      console.log('Admin user already exists. Skipping admin user creation.');
    }
    
    if (!existingUser) {
      usersToInsert.push({
        name: 'User Biasa',
        username: 'user',
        email: 'user@email.com',
        password: userPassword,
        karangTarunaName: 'Karang Taruna Setia',
        provinsi: 'Jawa Barat',
        kabupatenKota: 'Bandung',
        kecamatan: 'Coblong',
        jalan: 'Jl. Dago No. 25',
        phone: '08234567890',
        interests: ['Olahraga', 'Seni', 'Pendidikan'],
        skillLevel: 'Menengah',
        peranAnggota: 'Anggota Aktif',
        role: 'user',
        isActive: true,
      });
    } else {
      console.log('Regular user already exists. Skipping regular user creation.');
    }
    
    if (usersToInsert.length === 0) {
      console.log('All users already exist. No users to seed.');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }

    await User.insertMany(usersToInsert);
    console.log('Users seeded successfully:');
    
    if (!existingAdmin) {
      console.log('- Admin: admin@email.com / admin123');
    }
    if (!existingUser) {
      console.log('- User: user@email.com / user123');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
