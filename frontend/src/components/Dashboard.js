import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchTasks } from "../services/taskService";
import TaskManager from "./TaskManager";
import ProgressBar from "./ProgressBar";
import {
  connectGoogleCalendar,
  fetchCalendarEvents,
  addCalendarEvent,
} from "../services/calendarService";
import "../styles.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
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

    // ✅ Load calendar events if already connected
    async function loadCalendar() {
      try {
        const events = await fetchCalendarEvents();
        setCalendarEvents(events || []);
      } catch (err) {
        console.error("Failed to load calendar events", err);
      }
    }
    loadCalendar();
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

  // ✅ Connect Google Calendar
  const handleConnectGoogle = () => {
    connectGoogleCalendar(); // triggers backend /api/auth/google
  };

  // ✅ Add event to Google Calendar
  const handleAddCalendarEvent = async () => {
    try {
      await addCalendarEvent({
        summary: "Study Session",
        description: "Focus on Algorithms",
        start: "2026-07-19T10:00:00",
        end: "2026-07-19T12:00:00",
      });
      alert("Event added to Google Calendar!");
    } catch (err) {
      console.error("Failed to add calendar event", err);
    }
  };

  return (
    <div className="dashboard">
      {/* ===== Header with Logo ===== */}
      <header className="dashboard-header">
        <div className="logo-container">
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

      {/* ===== Full TaskManager ===== */}
      <TaskManager />

      {/* ===== Progress Snapshot ===== */}
      <section className="progress-section">
        <h3>📊 Progress Overview</h3>
        <ProgressBar completed={completedCount} total={tasks.length} />
      </section>

      {/* ===== Recent Tasks Snapshot ===== */}
      <section className="tasks-section">
        <h3>📝 Recent Tasks</h3>
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

      {/* ===== Reminders Snapshot with Form ===== */}
      <section className="reminders-section">
        <h3>⏰ Upcoming Reminders</h3>
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
          <button type="submit" className="reminder-btn">
            ➕ Add Reminder
          </button>
        </form>

        <ul className="reminder-list">
          {reminders.map((r) => (
            <li key={r.id} className="reminder-item">
              {r.text}{" "}
              {r.date && (
                <span className="reminder-date-display">📅 {r.date}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Calendar Snapshot ===== */}
      <section className="calendar-section">
        <h3>📅 Calendar Highlights</h3>
        <button onClick={handleConnectGoogle} className="calendar-btn">
          Connect Google Calendar
        </button>
        <button onClick={handleAddCalendarEvent} className="calendar-btn">
          ➕ Add Study Session
        </button>

        <ul className="calendar-list">
          {calendarEvents.map((event) => (
            <li key={event.id} className="calendar-item">
              {event.summary}{" "}
              {event.start && (
                <span className="calendar-date-display">
                  📅 {event.start}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
