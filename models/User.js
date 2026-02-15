import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Progress from './Progress.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username wajib diisi'],
    unique: true,
    trim: true,
    minlength: [3, 'Username minimal 3 karakter'],
    maxlength: [30, 'Username maksimal 30 karakter']
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Mohon masukkan email yang valid']
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi'],
    minlength: [6, 'Password minimal 6 karakter']
  },
  karangTarunaName: {
    type: String,
    required: [true, 'Nama Karang Taruna wajib diisi'],
    trim: true
  },
  provinsi: {
    type: String,
    required: [true, 'Provinsi wajib diisi'],
    trim: true
  },
  kabupatenKota: {
    type: String,
    required: [true, 'Kabupaten/Kota wajib diisi'],
    trim: true
  },
  kecamatan: {
    type: String,
    required: [true, 'Kecamatan wajib diisi'],
    trim: true
  },
  jalan: {
    type: String,
    required: [true, 'Jalan wajib diisi'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  interests: [{
    type: String
  }],
  skillLevel: {
    type: String,
    enum: ['Pemula', 'Menengah', 'Mahir']
  },
  peranAnggota: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-delete middleware to clean up progress records
userSchema.pre('deleteOne', { document: true, query: false }, async function() {
  await Progress.deleteMany({ user: this._id });
});

userSchema.pre('deleteMany', async function() {
  const users = await this.model.find(this.getFilter());
  const userIds = users.map(u => u._id);
  await Progress.deleteMany({ user: { $in: userIds } });
});

const User = mongoose.model('User', userSchema);

export default User;
