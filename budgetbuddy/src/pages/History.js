import React from 'react';
import ExpenseItem from '../components/ExpenseItem';

function History({ expenses }) {
  return (
    <div className="page-container">
      <h2>Expense History</h2>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense, index) => (
            <ExpenseItem key={index} title={expense.title} amount={expense.amount} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
