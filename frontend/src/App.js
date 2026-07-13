import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Settings from "./components/Settings";
import Login from "./components/Login"; 
import TaskManager from "./components/TaskManager";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";   // ✅ import Footer
import "./styles.css";

function App() {
  return (
    <Router>
      <header>Smart Study Planner</header>
      <div className="sidebar">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
      <div className="main">
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={() => window.location.href = "/dashboard"} />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>

      {/* ✅ Global Footer */}
      <Footer />
    </Router>
  );
}

export default App;
