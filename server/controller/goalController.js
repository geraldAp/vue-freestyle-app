const Goal = require("../model/goals");

const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user });
    if (!goals) return res.status(204).json({ message: `no goals found` });
    res.status(201).json(goals);
  } catch (error) {
    console.error(error);
  }
};
const getGoal = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const goal = await Goal.findOne({ _id });
    if (!goal) {
      res.status(204).json({ message: `no goal found` });
    }
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
  }
};
const createGoal = async (req, res) => {
  try {
    const { name, priority } = req.body;
    if (!name || !priority) {
      res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user;
    const goal = await Goal.create({
      name,
      priority,
      userId,
    });
    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
  }
};
const updateGoal = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) {
      res.status(400).json({ message: "kindly provide an id " });
    }
    const goal = await Goal.findOne({ _id });
    const { name, priority } = req.body;
    if (!goal) {
      res.status(400).json({ message: `no goal with id ${req.body.id}` });
    }
    // doing the update
    if (name) goal.name = name;
    if (priority) goal.priority = priority;
    const result = await goal.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};
const deleteGoal = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "kindly provide an id " });
    }
    const goal = await Goal.findOne({ _id });

    if (!goal) {
      res.status(400).json({ message: "no goal found" });
    }

    await goal.deleteOne({ _id });
    res.status(201).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error(error);
  }
};

const deleteAllGoals = async (req, res) => {
  try {
    // Use deleteMany to delete all documents from the Goal collection
    const result = await Goal.deleteMany({});

    res
      .status(200)
      .json({ message: `${result.deletedCount} goals deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllGoals,
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal,
  deleteAllGoals,
};
