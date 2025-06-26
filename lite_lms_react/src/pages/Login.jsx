import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    const { access_token, user } = response.data;

    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user)); // ✅ this stores user.id
    localStorage.setItem('role', user.role);            // optional
    localStorage.setItem('name', user.name);            // optional

    navigate('/dashboard');
  } catch (err) {
    alert(err.response?.data?.error || 'Login failed');
  }
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
