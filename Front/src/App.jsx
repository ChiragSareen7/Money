import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/auth/dashboard/Dashboard';
import Budget from './features/auth/Budget';
import Navbar from './features/auth/dashboard/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
};

export default App;



