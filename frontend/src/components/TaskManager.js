import React, { useEffect, useState } from "react";
import { fetchTasks, addTask, deleteTask, updateTask } from "../services/taskService";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
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
    if (!newTask.trim()) return;
    try {
      const created = await addTask({ title: newTask });
      setTasks([...tasks, created]);
      setNewTask("");
    } catch {
      setError("Could not add task. Please try again.");
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError("Could not delete task. Please try again.");
    }
  }

  async function handleToggleComplete(task) {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
    } catch {
      setError("Could not update task. Please try again.");
    }
  }

  return (
    <div className="task-container">
      <h2 className="task-title">My Tasks</h2>

      {loading && <div className="spinner">Loading tasks...</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          className="task-input"
        />
        <button type="submit" className="task-button">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-card">
            <span
              className={`task-text ${task.completed ? "completed" : ""}`}
              onClick={() => handleToggleComplete(task)}
            >
              {task.title}
            </span>
            <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
