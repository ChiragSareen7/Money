const Expense = require('../models/Expense');
const Budget = require('../models/Budget');


const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

const addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      description,
    });
    await expense.save();


    const budget = await Budget.findOne({ user: req.user.id, category });
    console.log(`Budget for category ${category}:`, budget); 

    let exceedsBudget = false;
    if (budget) {
      const totalExpenses = await Expense.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.user.id), category } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      console.log(`Total expenses for category ${category}:`, totalExpenses); 

      if (totalExpenses.length > 0 && totalExpenses[0].total > budget.amount) {
        console.log(`Total expenses for category ${category} exceeds budget`);
        exceedsBudget = true;
      }
    }

    res.status(201).json({ expense, exceedsBudget });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();
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
