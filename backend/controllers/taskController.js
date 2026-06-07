import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/Task.js";

/**
 * @desc    Get tasks for the logged-in user with optional search, status
 *          filter and pagination.
 * @route   GET /api/tasks?search=&status=&page=&limit=
 * @access  Private
 */
export const getTasks = asyncHandler(async (req, res) => {
  const { search = "", status = "All" } = req.query;
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);

  const query = { userId: req.user._id };

  if (status && status !== "All") {
    query.status = status;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    query.$or = [{ title: regex }, { description: regex }];
  }

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // Per-user stats are unaffected by search/status filters.
  const [totalTasks, pendingTasks, completedTasks] = await Promise.all([
    Task.countDocuments({ userId: req.user._id }),
    Task.countDocuments({ userId: req.user._id, status: "Pending" }),
    Task.countDocuments({ userId: req.user._id, status: "Completed" }),
  ]);

  res.json({
    success: true,
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
    stats: { totalTasks, pendingTasks, completedTasks },
  });
});

/**
 * @desc    Get a single task owned by the user
 * @route   GET /api/tasks/:id
 * @access  Private
 */
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json({ success: true, task });
});

/**
 * @desc    Create a task
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.create({
    title,
    description,
    status: status || "Pending",
    userId: req.user._id,
  });
  res.status(201).json({ success: true, task });
});

/**
 * @desc    Update a task's title/description/status
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const { title, description, status } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  const updated = await task.save();
  res.json({ success: true, task: updated });
});

/**
 * @desc    Toggle / set a task's status
 * @route   PATCH /api/tasks/:id/status
 * @access  Private
 */
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const { status } = req.body;
  // If a status is provided use it, otherwise toggle between the two values.
  task.status =
    status || (task.status === "Pending" ? "Completed" : "Pending");

  const updated = await task.save();
  res.json({ success: true, task: updated });
});

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json({ success: true, message: "Task deleted", id: req.params.id });
});
