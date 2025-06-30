import React from "react";
import { Navigate } from "react-router-dom";
import LecturerDashboard from "../components/LecturerDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.role) {
    // No user is logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Conditional render based on role
  if (user.role === "lecturer") {
    return <LecturerDashboard />;
  }

  if (user.role === "student") {
    return <StudentDashboard />;
  }

  // Unknown role
  return <div>Unauthorized</div>;
};

export default Dashboard;
