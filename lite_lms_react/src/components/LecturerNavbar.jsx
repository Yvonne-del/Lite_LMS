import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LecturerNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white'
    }}>
      <h2>LMS</h2>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        <button onClick={logout} style={{ ...linkStyle, background: 'red', border: 'none' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '6px 10px',
  borderRadius: '4px',
  backgroundColor: '#555'
};

export default LecturerNavbar;
