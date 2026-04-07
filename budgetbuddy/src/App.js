import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import './App.css';

const DUMMY_DATA = [
  { id: '1', title: 'Weekend Groceries', amount: 1500, category: 'Food' },
  { id: '2', title: 'Monthly Train Pass', amount: 850, category: 'Travel' },
  { id: '3', title: 'React Course', amount: 2000, category: 'Education' },
  { id: '4', title: 'Movie Tickets', amount: 400, category: 'Entertainment' }
];

function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("budgetUserName") || '';
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("budgetData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
    return DUMMY_DATA;
  });

  useEffect(() => {
    localStorage.setItem("budgetData", JSON.stringify(expenses));
  }, [expenses]);

  const handleLogin = (name) => {
    localStorage.setItem("budgetUserName", name);
    setUserName(name);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  if (!userName) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter basename="/budget-buddy">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} userName={userName} />} />
          <Route path="/add" element={<AddExpense addExpense={addExpense} />} />
          <Route path="/history" element={<History expenses={expenses} deleteExpense={deleteExpense} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
