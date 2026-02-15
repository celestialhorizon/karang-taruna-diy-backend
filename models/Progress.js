import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial',
    required: true
  },
  completedSteps: [{
    type: Number
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  notes: String,
  timeSpent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

progressSchema.index({ user: 1, tutorial: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
