import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/budget', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBudgets(data);
      } catch (error) {
        setError('Failed to fetch budgets');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const addBudget = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/budget',
        { category, amount, endDate: new Date().toISOString() },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setBudgets([...budgets, data]);
      setCategory('');
      setAmount('');
    } catch (error) {
      setError('Failed to add budget');
    }
  };

  const deleteBudget = async (id) => {
    console.log(`Attempting to delete budget with id: ${id}`);
    try {
      await axios.delete(`http://localhost:5001/api/budget/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBudgets(budgets.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
      setError('Failed to delete budget');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Budget Management</h2>
      <form onSubmit={addBudget}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Clothes">Clothes</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <button type="submit">Add Budget</button>
      </form>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            {budget.category}: ${budget.amount}{' '}
            <button onClick={() => deleteBudget(budget._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;
