import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["work", "personal", "study"],
    default: "work",
  },
  tags: {
    type: [String],
    default: [],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
