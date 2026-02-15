import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if users already exist
    const existingUsers = await User.find({});
    if (existingUsers.length > 0) {
      console.log('Users already exist. Skipping seeding.');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = [
      {
        username: 'admin',
        email: 'admin@email.com',
        password: adminPassword,
        role: 'admin',
        isActive: true,
      },
      {
        username: 'user',
        email: 'user@email.com',
        password: userPassword,
        role: 'user',
        isActive: true,
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully:');
    console.log('- Admin: admin@email.com / admin123');
    console.log('- User: user@email.com / user123');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
