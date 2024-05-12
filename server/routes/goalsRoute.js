const express = require("express");
const {
  getAllGoals,
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
  deleteAllGoals,
} = require("../controller/goalController");
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/tasksController");
const router = express.Router();
// goals
router.route("/").get(getAllGoals).post(createGoal);
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);

// tasks
router.route("/:id/task").get(getAllTasks).post(createTask);
router.route("/:id/task/:taskId").delete(deleteTask).put(updateTask);

module.exports = router;
