// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import LessonsPage from "./components/Lessons";
import AssignmentsPage from "./components/Assignments";
import StudentsPage from "./components/StudentsPage";
import SubmissionsPage from './pages/SubmissionsPage';

import StudentDashboard from './pages/student/StudentDashboard'
// import StudentLessons from './pages/student/StudentLessons'
import StudentCourses from './pages/student/StudentCourses'
// import StudentAssignments from './pages/student/StudentAssignments'


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses/:id/lessons"
          element={
            <ProtectedRoute>
              <LessonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses/:id/assignments"
          element={
            <ProtectedRoute>
              <AssignmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses/:id/students"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments/:assignmentId/submissions"
          element={
            <ProtectedRoute>
              <SubmissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute>
              <StudentCourses />
            </ProtectedRoute>
          }
        />
        {/* Future student routes:
        <Route
          path="/student/courses/:id/lessons"
          element={
            <ProtectedRoute>
              <StudentLessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses/:id/assignments"
          element={
            <ProtectedRoute>
              <StudentAssignments />
            </ProtectedRoute>
          }
        /> */}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
