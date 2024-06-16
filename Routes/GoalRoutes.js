import express from 'express';
import {
  createGoal,
  getUserGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from '../Controllers/GoalController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(verifyJWT, createGoal)
  .get(verifyJWT, getUserGoals);

router.route('/:goalId')
  .get(verifyJWT, getGoalById)
  .put(verifyJWT, updateGoal)
  .delete(verifyJWT, deleteGoal);

export default router;
