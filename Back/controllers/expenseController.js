const Expense = require('../models/Expense');

const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

const addExpense = async (req, res) => {
  const { amount, category, description } = req.body;

  const expense = new Expense({
    user: req.user._id,
    amount,
    category,
    description,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.remove();
    res.json({ message: 'Expense removed' });
  } else {
    res.status(404).json({ message: 'Expense not found' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
};
