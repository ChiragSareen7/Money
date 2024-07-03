const express = require('express');
const { getIncome, addIncome, deleteIncome } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getIncome)
  .post(protect, addIncome);

router.route('/:id')
  .delete(protect, deleteIncome);

module.exports = router;
