const Goal = require("../model/goals");

const getAllTasks = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!_id) {
      return res.status(400).json({ message: "Invalid Id " });
    }
    // Find the goal by _id and extract its tasks
    const goal = await Goal.findById(_id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    const tasks = goal.tasks;
    // Return tasks
    res.json(tasks);
  } catch (err) {
    console.error(err);
  }
};
const createTask = async (req, res) => {
  const { id: _id } = req.params;
  const { name: taskName, priority } = req.body;
  try {
    if (!_id) {
      return res.status(400).json({ message: "Invalid Id " });
    }
    if (!taskName) {
      res.status(400).json({ message: "TaskName  field is required please" });
    }
    const goal = await Goal.findById(_id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    const tasks = goal.tasks;
    // Create a task object with a name
    const newTask = { name: taskName };
    if (priority) {
      newTask.priority = priority;
    }
    tasks.push(newTask);
    await goal.save();
  } catch (error) {}
};
const deleteTask = async (req, res) => {
  const { goalId, taskId } = req.params;
  try {
    if (!goalId) {
      return res.status(400).json({ message: "Invalid goal id " });
    }
    if (!taskId) {
      return res.status(400).json({ message: "task not found " });
    }
    const goal = await Goal.findById(goalId);
    const task = goal.tasks.id(taskId);
    task.remove();
    await goal.save();
  } catch (error) {
    console.error(error);
  }
};
const updateTask = async (req, res) => {
  const { goalId, taskId } = req.params;
  const { name: taskName, priority } = req.body;
  try {
    if (!goalId) {
      return res.status(400).json({ message: "Invalid goal id " });
    }
    if (!taskId) {
      return res.status(400).json({ message: "task not found " });
    }
    const goal = await Goal.findById(goalId);
    const task = goal.tasks.id(taskId);
    if (taskName) {
      task.name = taskName;
    }
    if (priority) {
      task.priority = priority;
    }
    await goal.save();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllTasks, createTask, deleteTask, updateTask };
