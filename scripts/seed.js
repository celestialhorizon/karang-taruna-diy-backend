import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    console.log('Cleared existing users');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = [
      {
        username: 'admin',
        email: 'admin@karangtaruna.com',
        password: adminPassword,
        role: 'admin',
        isActive: true,
      },
      {
        username: 'user',
        email: 'user@karangtaruna.com',
        password: userPassword,
        role: 'user',
        isActive: true,
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully:');
    console.log('- Admin: admin@karangtaruna.com / admin123');
    console.log('- User: user@karangtaruna.com / user123');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
