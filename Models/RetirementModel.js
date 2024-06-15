import mongoose, { Schema } from "mongoose";

const retirementSchema = new Schema(
  {
    Filename: {
      type: String,
      required: true,
    },
    currentAge: {
      type: Number,
      required: true,
    },
    retirementAge: {
      type: Number,
      required: true,
    },
    currentIncome: {
      type: Number,
      required: true,
    },
    currentSavings: {
      type: Number,
      required: true,
    },
    monthlySavings: {
      type: Number,
      required: true,
    },
    expectedRetireExpenses: {
      type: Number,
      required: true,
    },
    expectedRateOfReturn: {
      type: Number,
      required: true,
    },
    inflationRate: {
      type: Number,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const RetirementFile = mongoose.model(
  "RetirementFile",
  retirementSchema
);
