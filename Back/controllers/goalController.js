const Goal = require('../models/Goal');

const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.json(goals);
};

const addGoal = async (req, res) => {
  const { name, targetAmount, deadline, currentAmount } = req.body;

  const goal = new Goal({
    user: req.user._id,
    name,
    targetAmount,
    deadline,
    currentAmount,
  });

  const createdGoal = await goal.save();
  res.status(201).json(createdGoal);
};

const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (goal) {
    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await goal.remove();
    res.json({ message: 'Goal removed' });
  } else {
    res.status(404).json({ message: 'Goal not found' });
  }
};

module.exports = {
  getGoals,
  addGoal,
  deleteGoal,
};
