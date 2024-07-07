const Income = require('../models/Income');

const getIncome = async (req, res) => {
  const income = await Income.find({ user: req.user._id });
  res.json(income);
};

const addIncome = async (req, res) => {
  const { amount, source, description } = req.body;

  const income = new Income({
    user: req.user._id,
    amount,
    source,
    description,
  });

  const createdIncome = await income.save();
  res.status(201).json(createdIncome);
};


const deleteIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (income) {
    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await income.deleteOne();
    res.json({ message: 'Income removed' });
  } else {
    res.status(404).json({ message: 'Income not found' });
  }
};

module.exports = {
  getIncome,
  addIncome,
  deleteIncome,
};
