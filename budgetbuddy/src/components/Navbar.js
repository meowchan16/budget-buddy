import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Budget Buddy</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Expense</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
