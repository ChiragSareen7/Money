const Budget = require('../models/Budget');

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addBudget = async (req, res) => {
  try {
    const { category, amount, endDate } = req.body; 
    const budget = new Budget({
      user: req.user.id,
      category,
      amount,
      endDate,
    });
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await budget.deleteOne();
    res.json({ message: 'Budget removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getBudgets,
  addBudget,
  deleteBudget,
};
