import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });

      const { access_token, user } = response.data;

      if (access_token && user) {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'lecturer') {
          navigate('/lecturer-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        alert('Login failed: invalid response from server');
        console.error('Login response:', response);
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Login failed';
      alert(msg);
      console.error('Login error:', err);
    }
  }

  return (
    <div className="login-container">
      <h2>Login to Lite LMS</h2>
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
