import React, { useEffect, useState } from "react";
import { fetchTasks, addTask, deleteTask, updateTask } from "../services/taskService";
import "../styles.css";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await fetchTasks();
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (data.results) {
          setTasks(data.results);
        } else {
          setTasks([]);
        }
      } catch (err) {
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  async function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const created = await addTask({
        title,
        description,
        due_date: dueDate,   // ✅ send due date to backend
        completed: false,
      });
      setTasks((prev) => [...prev, created]);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch {
      setError("Could not add task. Please try again.");
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Could not delete task. Please try again.");
    }
  }

  async function handleToggleComplete(task) {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch {
      setError("Could not update task. Please try again.");
    }
  }

  return (
    <div className="task-container">
      <h2 className="task-title">My Tasks</h2>

      {loading && <div className="spinner"></div>}
      {error && <div className="error">{error}</div>}

      {/* ✅ Task creation form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="task-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description..."
          className="task-textarea"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="task-button">Add Task</button>
      </form>

      {/* ✅ Task list */}
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-card">
              <span
                className={`task-text ${task.completed ? "completed" : ""}`}
                onClick={() => handleToggleComplete(task)}
              >
                <strong>{task.title}</strong> — {task.description}
                {task.due_date && (
                  <em style={{ marginLeft: "10px", color: "#555" }}>
                    Due: {task.due_date}
                  </em>
                )}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDeleteTask(task.id)}
              >
                ✕
              </button>
            </li>
          ))
        ) : (
          !loading && <p className="no-tasks">No tasks found.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskManager;
