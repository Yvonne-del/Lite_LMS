// src/pages/Dashboard.js
import React from 'react';
import './Dashboard.css';

function Dashboard() {

  return (
    <div className="dashboard">
      <h2>Welcome back, {name}!</h2>
      <p>You are logged in as a <strong>{role}</strong>.</p>

      {role === "student" ? (
        <div className="dashboard-section">
          <h3>Your Actions</h3>
          <ul>
            <li>📚 View and Enroll in Courses</li>
            <li>📝 View Lessons and Assignments</li>
            <li>✅ Submit Assignments</li>
            <li>📈 Track your Progress</li>
          </ul>
        </div>
      ) : (
        <div className="dashboard-section">
          <h3>Your Tools</h3>
          <ul>
            <li>➕ Create and Manage Courses</li>
            <li>📄 Add Lessons and Assignments</li>
            <li>🧑‍🎓 View Enrolled Students</li>
            <li>✅ Grade Submissions</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
