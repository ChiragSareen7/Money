const Budget = require('../models/Budget');

const getBudgets = async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id });
  res.json(budgets);
};

const addBudget = async (req, res) => {
  const { amount, category, startDate, endDate } = req.body;

  const budget = new Budget({
    user: req.user._id,
    amount,
    category,
    startDate,
    endDate,
  });

  const createdBudget = await budget.save();
  res.status(201).json(createdBudget);
};

const deleteBudget = async (req, res) => {
  const budget = await Budget.findById(req.params.id);

  if (budget) {
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await budget.remove();
    res.json({ message: 'Budget removed' });
  } else {
    res.status(404).json({ message: 'Budget not found' });
  }
};

module.exports = {
  getBudgets,
  addBudget,
  deleteBudget,
};
