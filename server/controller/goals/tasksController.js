const Task = require("../model/task");
const Goal = require("../model/goals");

const getAllTasks = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid Id " });
    }
    // Find the goal by _id and extract its tasks
    const tasks = await Task.find({ goalId: id });
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }
    // Return tasks
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
  }
};
const createTask = async (req, res) => {
  const { id } = req.params;
  const { name: taskName } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid Id " });
    }
    if (!taskName) {
      res.status(400).json({ message: "TaskName  field is required please" });
    }
    const task = await Task.create({
      name: taskName,
      goalId: id,
    });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ message: "task not found " });
    }
    const task = await Task.findById(id);
    if (task) {
      res.status(400).json({ message: "no task found" });
    }
    await task.deleteOne();
    res.status(200).json({ message: "task has been deleted" });
  } catch (error) {
    console.error(error);
  }
};
const updateTask = async (req, res) => {
  const { id, goalId } = req.params;
  const { name: taskName, completed } = req.body;
  try {
    if (!id) {
      return res.status(404).json({ message: "invalid id " });
    }
    const task = await Task.findById(id);
    const goal = await Goal.findById(goalId);

    if (!task) {
      return res.status(404).json({ message: `No task found with id ${id}` });
    }
    if (!goal) {
      return res
        .status(404)
        .json({ message: `No task found with id ${goalId}` });
    }
    if (taskName) {
      task.name = taskName;
    } else {
      return res.status(400).json({ message: "taskName field is required" });
    }
    if (typeof completed !== "undefined") {
      task.completed = completed;
      if (completed === false) {
        goal.isComplete = false;
      }
    }
    const result = await task.save();
    res.status(200).json([{ message: "Updated Successfully" }, result]);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};

module.exports = { getAllTasks, createTask, deleteTask, updateTask };
