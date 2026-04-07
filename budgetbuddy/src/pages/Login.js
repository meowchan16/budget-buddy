import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      onLogin(name.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">✨</div>
        <h2>Welcome to Budget Buddy!</h2>
        <p>Let's get started by knowing your name.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="login-input"
              autoFocus
            />
          </div>
          <button type="submit" className="cta-button login-btn">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
