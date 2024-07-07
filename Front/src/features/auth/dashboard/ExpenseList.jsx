import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Failed to fetch expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.category}: ${expense.amount} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
