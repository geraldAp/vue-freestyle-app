const express = require("express");
const {
  getAllGoals,
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
  deleteAllGoals, // If needed, add a route for this
} = require("../controller/goals/goalController");
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/goals/tasksController");
const authMiddleWare = require("../middleware/verifyJwt");
const { upload } = require("../helpers/imageUploader");
const router = express.Router();

// Apply middleware to all routes
router.use(authMiddleWare);

// Goal routes
router.route("/").get(getAllGoals).post(upload.single("image"), createGoal);
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);
// If deleteAllGoals is needed, add the route below
router.route("/").delete(deleteAllGoals);

// Task routes
router.route("/:id/tasks").get(getAllTasks).post(createTask);
router.delete("/:id/task", deleteTask);
router.put("/:id/task/:goalId", updateTask);
module.exports = router;
