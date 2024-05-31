const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  // Define other task fields here
  name: { type: String, required: true },
  priority: { type: String, default: "medium" },
  completed: { type: Boolean, default: false },
});

const goalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    miniDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: { type: String, default: "medium" },
    },
    tasks: [taskSchema],
    userId: {
      type: String,
      required: true,
    },
    isComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
