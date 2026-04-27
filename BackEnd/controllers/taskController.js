import Task from "../models/taskModel.js";
import { createError } from "../middleware/errorHandling.js";

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });

  res.status(200).json({ success: true, tasks });
};

export const createTask = async (req, res) => {
  const { title, description, priority, date, category, tags } = req.body;

  if (!title || !date) {
    throw createError(400, "Title and date are required");
  }

  const task = await Task.create({
    userId: req.user.id,
    title,
    description,
    priority,
    date,
    category,
    tags,
  });
  res.status(201).json({ success: true, task });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { $set: req.body },
    { returnDocument: "after" },
  );

  if (!task) {
    throw createError(404, "Task not found");
  }

  res.status(200).json({ success: true, task });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

  if (!task) {
    throw createError(404, "Task not found");
  }

  res.status(200).json({ success: true, message: "Task deleted successfully" });
};
