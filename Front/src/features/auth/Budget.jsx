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
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
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
          {budget.category}: ${budget.amount} (Ends: {new Date(budget.endDate).toLocaleDateString()}) 
          <button onClick={() => deleteBudget(budget._id)}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;
