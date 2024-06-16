import { Goal } from "../Models/GoalModel.js";
import { User } from "../Models/UserModel.js";

import { asyncHandler } from "../Utils/AsyncHandler.js";

// Create a new goal
export const createGoalCore = async (userId, goalData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  const goal = new Goal({ ...goalData, user: user._id });
  await goal.save();
  return goal;
};

// Get all goals for a user
export const getUserGoalsCore = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  const goals = await Goal.find({ user: user._id }).select(["_id", "goalName", "updatedAt"]);
  return goals;
};

// Get a specific goal by ID
export const getGoalByIdCore = async (goalId) => {
  const goal = await Goal.findById(goalId);
  if (!goal) {
    throw new Error("Goal not found!");
  }

  return goal;
};

// Update a goal
export const updateGoalCore = async (goalId, goalData) => {
  const goal = await Goal.findByIdAndUpdate(goalId, goalData, { new: true });
  if (!goal) {
    throw new Error("Goal not found!");
  }

  return goal;
};

// Delete a goal
export const deleteGoalCore = async (goalId) => {
  const goal = await Goal.findByIdAndDelete(goalId);
  if (!goal) {
    throw new Error("Goal not found!");
  }

  return goal;
};


// Requests handling

// Create a new goal
export const createGoal = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const goalData = req.body;

  try {
    const goal = await createGoalCore(userId, goalData);
    res.status(201).json({ status: "success", data: goal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating goal!" });
  }
});

// Get all goals for the current user
export const getUserGoals = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const goals = await getUserGoalsCore(userId);
    res.status(200).json({ status: "success", data: goals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving user goals!" });
  }
});

// Get a specific goal by ID
export const getGoalById = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  try {
    const goal = await getGoalByIdCore(goalId);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found!" });
    }
    res.status(200).json({ status: "success", data: goal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving goal!" });
  }
});

// Update a specific goal by ID
export const updateGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const goalData = req.body;

  try {
    const goal = await updateGoalCore(goalId, goalData);
    res.status(200).json({ status: "success", data: goal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating goal!" });
  }
});

// Delete a specific goal by ID
export const deleteGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  try {
    await deleteGoalCore(goalId);
    res.status(200).json({ status: "success", message: "Goal deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting goal!" });
  }
});
