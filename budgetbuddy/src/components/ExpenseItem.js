import React from 'react';
import PropTypes from "prop-types";

function ExpenseItem({ id, title, amount, category, onDelete }) {
  return (
    <div className="expense-item">
      <div className="expense-details">
        <h3>{title} <span className="expense-category">({category || 'Other'})</span></h3>
        <span style={{ color: amount > 500 ? 'red' : 'green', fontWeight: 'bold' }}>
          ₹{amount}
        </span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

// Props Validation
ExpenseItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default ExpenseItem;
