const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  // Define other task fields here
  name: { type: String, required: true },
  priority: String,
});

const goalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
