import React from 'react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#1cb5e0', '#ff4b2b', '#FFBB28', '#A28DFF', '#00C49F'];

function Dashboard({ expenses, userName }) {
  // Calculate total expenses
  const total = expenses.reduce((acc, current) => acc + current.amount, 0);

  // Group expenses by category for the chart
  const categoryData = expenses.reduce((acc, current) => {
    const category = current.category || 'Other';
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += current.amount;
    } else {
      acc.push({ name: category, value: current.amount });
    }
    return acc;
  }, []);

  // Top 3 most recent expenses for quick glance
  const recentExpenses = [...expenses].reverse().slice(0, 3);

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-header">
        <h2>👋 Welcome{userName ? `, ${userName}` : ' Back'}!</h2>
        <p>Here is your financial overview for this month.</p>
      </div>

      <SummaryCard total={total} />
      
      {expenses.length === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-icon">📊</div>
          <h3>No Data Available</h3>
          <p>Add some expenses to see your spending breakdown.</p>
          <Link to="/add" className="cta-button">Add First Expense</Link>
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="chart-container dashboard-box">
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent"/>
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value}`} 
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="recent-transactions dashboard-box">
            <div className="recent-header">
              <h3>Recent Transactions</h3>
              <Link to="/history" className="view-all-link">View All</Link>
            </div>
            <div className="expense-list compact-list">
              {recentExpenses.map((expense, index) => (
                <div className="compact-item" key={expense.id || index}>
                  <div className="compact-info">
                    <span className="compact-title">{expense.title}</span>
                    <span className="compact-category">{expense.category}</span>
                  </div>
                  <span className="compact-amount">₹{expense.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
