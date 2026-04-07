import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Navbar from './components/Navbar';
import './App.css';

const DUMMY_DATA = [
  { id: '1', title: 'Weekend Groceries', amount: 1500, category: 'Food' },
  { id: '2', title: 'Monthly Train Pass', amount: 850, category: 'Travel' },
  { id: '3', title: 'React Course', amount: 2000, category: 'Education' },
  { id: '4', title: 'Movie Tickets', amount: 400, category: 'Entertainment' }
];

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("budgetData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If they already have an empty array, let's show them the dummy data once so they see the cool UI!
        if (parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
    return DUMMY_DATA;
  });

  // Save to local storage whenever expenses change
  useEffect(() => {
    localStorage.setItem("budgetData", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} />} />
          <Route path="/add" element={<AddExpense addExpense={addExpense} />} />
          <Route path="/history" element={<History expenses={expenses} deleteExpense={deleteExpense} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
