import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const IncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount && source && description) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5001/api/income', {
          amount,
          source,
          description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addIncome(response.data);
        setAmount('');
        setSource('');
        setDescription('');
        toast.success('Income added successfully');
      } catch (error) {
        toast.error('Failed to add income');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Income</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;
