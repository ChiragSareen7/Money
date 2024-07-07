import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncomeList = () => {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/income', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncome(response.data);
      } catch (error) {
        console.error('Failed to fetch income', error);
      }
    };

    fetchIncome();
  }, []);

  return (
    <div>
      <h3>Income</h3>
      <ul>
        {income.map((incomeEntry) => (
          <li key={incomeEntry._id}>
            {incomeEntry.source}: ${incomeEntry.amount} - {incomeEntry.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
