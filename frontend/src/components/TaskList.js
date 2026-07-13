import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";
import "../styles.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await fetchTasks();

        // ✅ Handle different response shapes (plain array or paginated)
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (data.results && Array.isArray(data.results)) {
          setTasks(data.results);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className="task-container">
      <h2 className="task-title">Upcoming Tasks</h2>

      {loading && <div className="spinner"></div>}
      {error && <div className="error">{error}</div>}

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-card">
              <div className="task-details">
                <span className="task-text">
                  <strong>{task.title}</strong>
                </span>
                {task.description && (
                  <p className="task-desc">{task.description}</p>
                )}
                {task.due_date && (
                  <span className="task-date-display">📅 Due: {task.due_date}</span>
                )}
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="no-tasks">No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
