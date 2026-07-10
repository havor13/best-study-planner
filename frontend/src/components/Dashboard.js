import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import ProgressBar from "./ProgressBar";
import Reminders from "./Reminders";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks/")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="dashboard">
      <h1>📚 Smart Study Planner</h1>

      <AddTaskForm onTaskAdded={handleTaskAdded} />

      <ProgressBar progress={progress} />

      <Reminders tasks={tasks} />

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.completed ? "done" : ""}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className="due-date">Due: {task.due_date}</p>
            <button className="complete-btn">
              {task.completed ? "✅ Completed" : "Mark Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
