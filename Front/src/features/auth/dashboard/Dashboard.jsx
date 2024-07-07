import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import ExpenseList from './ExpenseList';
import IncomeList from './IncomeList';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addIncome = (incomeEntry) => {
    setIncome([...income, incomeEntry]);
  };

  
  useEffect(() => {
    const calculateTotals = () => {
      const totalInc = income.reduce((acc, item) => acc + Number(item.amount), totalIncome);
      const totalExp = expenses.reduce((acc, item) => acc + Number(item.amount), totalExpenses);
      const netInc = totalInc - totalExp;
      
      setTotalIncome(totalInc);
      setTotalExpenses(totalExp);
      setNetIncome(netInc);
    };
  
    calculateTotals();
  }, [income, expenses]);
  

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      <div className="financial-summaries">
        <h2>Financial Summaries</h2>
        <p>Total Income: ${totalIncome}</p>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Net Income: ${netIncome}</p>
      </div>
      <ExpenseForm addExpense={addExpense} />
      <IncomeForm addIncome={addIncome} />
      <ExpenseList setExpenses={setExpenses} />
      <IncomeList setIncome={setIncome} />
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Dashboard;
