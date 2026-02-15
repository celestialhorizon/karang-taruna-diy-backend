import mongoose from 'mongoose';

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul tutorial wajib diisi'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Deskripsi tutorial wajib diisi']
  },
  category: {
    type: String,
    required: [true, 'Kategori wajib diisi'],
    enum: ['Pertukangan Kayu', 'Pengecatan', 'Listrik', 'Plambing', 'Perawatan']
  },
  difficulty: {
    type: String,
    required: [true, 'Tingkat kesulitan wajib diisi'],
    enum: ['Pemula', 'Menengah', 'Mahir'],
    default: 'Pemula'
  },
  duration: {
    type: Number,
    required: [true, 'Durasi wajib diisi'],
    min: 1
  },
  imageUrl: {
    type: String,
    required: [true, 'URL gambar wajib diisi']
  },
  imagePublicId: {
    type: String,
    description: 'Cloudinary public ID for tutorial cover image'
  },
  videoUrl: {
    type: String
  },
  videoPublicId: {
    type: String
  },
  materials: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    notes: String
  }],
  steps: [{
    stepNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: String,
    videoUrl: String,
    safetyNote: String
  }],
  author: {
    type: String,
    required: [true, 'Nama penulis wajib diisi']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;
