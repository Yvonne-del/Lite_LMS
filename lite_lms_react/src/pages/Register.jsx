// src/pages/Register.js
import React, { useState } from 'react';
import './Register.css';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Step 1: Register user
    const response = await api.post('/register', {
      name,
      email,
      role,
      password,
    });

    // Step 2: Immediately log in the user
    const loginRes = await api.post('/login', {
      email,
      password,
    });

    const { access_token, user } = loginRes.data;

    // Step 3: Save token and full user info
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    navigate('/dashboard'); // Redirect to dashboard
  } catch (err) {
    alert(err.response?.data?.error || 'Registration or login failed');
  }
  }


  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="e.g. Yvonne Nyambura"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="e.g. yvonne@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p className="redirect-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
