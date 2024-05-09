const express = require("express");
const { getAllGoals, createGoal, getGoal, updateGoal, deleteGoal } = require("../controller/goalController");
const { getAllTasks, createTask } = require("../controller/tasksController");
const router = express.Router();
// goals
router.route("/").get(getAllGoals).post(createGoal);
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal)

// tasks
router.route("/:id/task").get(getAllTasks).post(createTask)
router.route("/:id/task/:taskId")



module.exports = router;
