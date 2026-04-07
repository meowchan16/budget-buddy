import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Load from local storage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("budgetData");
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
  }, []);

  // Save to local storage whenever expenses change
  useEffect(() => {
    localStorage.setItem("budgetData", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} />} />
          <Route path="/add" element={<AddExpense addExpense={addExpense} />} />
          <Route path="/history" element={<History expenses={expenses} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
