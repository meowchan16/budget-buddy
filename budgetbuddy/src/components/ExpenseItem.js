import React from 'react';
import PropTypes from "prop-types";

function ExpenseItem({ title, amount }) {
  return (
    <div className="expense-item">
      <h3>{title}</h3>
      <span style={{ color: amount > 500 ? 'red' : 'green', fontWeight: 'bold' }}>
        ₹{amount}
      </span>
    </div>
  );
}

// Props Validation
ExpenseItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ExpenseItem;
