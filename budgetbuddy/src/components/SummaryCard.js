import React, { Component } from "react";

class SummaryCard extends Component {
  render() {
    return (
      <div className="summary-card">
        <h2>Total Balance</h2>
        <h1>₹{this.props.total}</h1>
      </div>
    );
  }
}

export default SummaryCard;
