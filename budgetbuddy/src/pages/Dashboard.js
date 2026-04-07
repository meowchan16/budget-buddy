import React from 'react';
import SummaryCard from '../components/SummaryCard';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

function Dashboard({ expenses }) {
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

  return (
    <div className="page-container">
      <h2>Dashboard</h2>
      <SummaryCard total={total} />
      
      {expenses.length > 0 && (
        <div className="chart-container">
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
