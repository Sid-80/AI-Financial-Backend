import { RetirementFile } from "../Models/RetirementModel.js";

export const createFile = async (req, res) => {
  const {
    userId,
    Filename,
    currentAge,
    retirementAge,
    currentIncome,
    currentSavings,
    monthlySavings,
    expectedRetireExpenses,
    expectedRateOfReturn,
    inflationRate,
  } = req.body();

  if (
    userId &&
    Filename &&
    currentAge &&
    retirementAge &&
    currentIncome &&
    currentSavings &&
    monthlySavings &&
    expectedRetireExpenses &&
    expectedRateOfReturn &&
    inflationRate
  ) {
    return res.status(400).json({ message: "Error occured!" });
  }

  const file = await RetirementFile.create(
    userId,
    Filename,
    currentAge,
    retirementAge,
    currentIncome,
    currentSavings,
    monthlySavings,
    expectedRetireExpenses,
    expectedRateOfReturn,
    inflationRate
  );

  return res.json(201).json({ message: "File created!!" });
};

export const getFile = async(req,res) => {
    const {userId} = req.body()

    if(!userId) return res.status(400);

    const files = await RetirementFile.findOne({userId})

    return res.status(200).json({files});
}