import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalName: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  timeHorizon: { type: Number, required: true },
  currentSavings: { type: Number, required: true },
  monthlyContribution: { type: Number, required: true },
  expectedRateOfReturn: { type: Number, required: true },
  inflationRate: { type: Number, required: true },
}, {
  timestamps: true,
});

export const Goal = mongoose.model('Goal', goalSchema);

