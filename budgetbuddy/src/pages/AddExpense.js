import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExpense({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) {
      alert("Please enter a valid title and amount.");
      return;
    }
    
    // Form Validation Polish
    const parsedAmount = Number(amount);
    if (parsedAmount <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    addExpense({ 
      id: Date.now().toString(), // Added unique ID for delete capability
      title: title.trim(), 
      amount: parsedAmount, 
      category 
    });
    
    navigate("/history");
  };

  return (
    <div className="page-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input 
          placeholder="Item Name" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
          min="1"
          step="any"
          required
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
