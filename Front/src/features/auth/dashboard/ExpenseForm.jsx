import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount && category && description) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5001/api/expenses', {
          amount,
          category,
          description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addExpense(response.data);
        setAmount('');
        setCategory('');
        setDescription('');
        toast.success('Expense added successfully');
      } catch (error) {
        toast.error('Failed to add expense');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
