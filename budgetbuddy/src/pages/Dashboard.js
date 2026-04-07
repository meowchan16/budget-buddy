import React from 'react';
import SummaryCard from '../components/SummaryCard';

function Dashboard({ expenses }) {
  // Calculate total expenses
  const total = expenses.reduce((acc, current) => acc + current.amount, 0);

  return (
    <div className="page-container">
      <h2>Dashboard</h2>
      <SummaryCard total={total} />
    </div>
  );
}

export default Dashboard;
