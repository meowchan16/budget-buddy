import React from 'react';
import ExpenseItem from '../components/ExpenseItem';

function History({ expenses, deleteExpense }) {
  return (
    <div className="page-container">
      <h2>Expense History</h2>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense, index) => (
            <ExpenseItem 
              key={expense.id || index} 
              id={expense.id} 
              title={expense.title} 
              amount={expense.amount} 
              category={expense.category}
              onDelete={deleteExpense}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
