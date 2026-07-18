import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";   // ✅ Import Link here
import { fetchTasks } from "../services/taskService";
import TaskManager from "./TaskManager";
import ProgressBar from "./ProgressBar";   // ✅ import ProgressBar
import "../styles.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await fetchTasks();
        setTasks(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    }
    loadTasks();

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // ✅ Progress calculation
  const completedCount = tasks.filter((t) => t.completed).length;

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // ✅ Add reminder handler
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.trim()) return;
    const reminder = {
      id: Date.now(),
      text: newReminder,
      date: reminderDate,
    };
    setReminders((prev) => [...prev, reminder]);
    setNewReminder("");
    setReminderDate("");
  };

  return (
    <div className="dashboard">
      {/* ===== Header with Logo ===== */}
      <header className="dashboard-header">
        <div className="logo-container">
          {/* Logo is clickable and routes to home */}
          <Link to="/">
            <img
              src="/logo.png"
              alt="Smart Study Planner Logo"
              className="logo"
            />
          </Link>
          <h2 className="dashboard-title">
            Welcome, {username || "Student"} 👋
          </h2>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <p className="dashboard-subtitle">
        Here’s your Smart Study Planner overview:
      </p>

      {/* Full TaskManager */}
      <TaskManager />

      {/* ✅ Progress Snapshot */}
      <section className="progress-section">
        <h3>Progress Overview</h3>
        <ProgressBar completed={completedCount} total={tasks.length} />
      </section>

      {/* Recent Tasks Snapshot */}
      <section className="tasks-section">
        <h3>Recent Tasks</h3>
        <ul className="task-list">
          {tasks.slice(0, 3).map((task) => (
            <li
              key={task.id}
              className={`task-card ${task.completed ? "task-completed" : ""}`}
            >
              {task.title}
            </li>
          ))}
        </ul>
        <p>
          <a href="/tasks">Go to full TaskManager →</a>
        </p>
      </section>

      {/* ✅ Reminders Snapshot with form */}
      <section className="reminders-section">
        <h3>Upcoming Reminders</h3>
        <form onSubmit={handleAddReminder} className="reminder-form">
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Reminder text..."
            className="reminder-input"
          />
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="reminder-date"
          />
          <button type="submit" className="reminder-btn">Add Reminder</button>
        </form>

        <ul className="reminder-list">
          {reminders.map((r) => (
            <li key={r.id} className="reminder-item">
              {r.text} {r.date && <span className="reminder-date-display">📅 {r.date}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Calendar Snapshot */}
      <section className="calendar-section">
        <h3>Calendar Highlights</h3>
        <p>Next study session: July 15, 2026</p>
        <p>Algorithms exam: July 20, 2026</p>
      </section>
    </div>
  );
}

export default Dashboard;