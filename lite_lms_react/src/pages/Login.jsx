// src/pages/Login.js
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    // Backend connection 
  }

  return (
    <div className="login-container">
      <h2>Login to LearnHub</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="e.g. you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p className="redirect-text">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
