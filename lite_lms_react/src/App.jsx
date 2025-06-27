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



function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Sub-routes for courses */}
        <Route path="/dashboard/courses/:id/lessons" element={<LessonsPage />} />
        <Route path="/dashboard/courses/:id/assignments" element={<AssignmentsPage />} />
        <Route path="/dashboard/courses/:id/students" element={<StudentsPage />} />
        <Route path="/assignments/:assignmentId/submissions" element={<SubmissionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
