import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Example financial summaries (replace with actual data from API)
  const totalIncome = 5000; // Example value
  const totalExpenses = 3000; // Example value
  const netIncome = totalIncome - totalExpenses; // Example calculation

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>

      <div className="financial-summaries">
        <h2>Financial Summaries</h2>
        <p>Total Income: ${totalIncome}</p>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Net Income: ${netIncome}</p>
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Dashboard;
