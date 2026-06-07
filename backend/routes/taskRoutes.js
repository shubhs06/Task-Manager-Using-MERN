import express from "express";
import { body } from "express-validator";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";
import { TASK_STATUS } from "../models/Task.js";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// All task routes require authentication.
router.use(protect);

const taskValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("status")
    .optional()
    .isIn(TASK_STATUS)
    .withMessage(`Status must be one of: ${TASK_STATUS.join(", ")}`),
];

router.route("/").get(getTasks).post(taskValidators, validate, createTask);

router
  .route("/:id")
  .get(getTaskById)
  .put(taskValidators, validate, updateTask)
  .delete(deleteTask);

router.patch(
  "/:id/status",
  [
    body("status")
      .optional()
      .isIn(TASK_STATUS)
      .withMessage(`Status must be one of: ${TASK_STATUS.join(", ")}`),
  ],
  validate,
  updateTaskStatus
);

export default router;
