import React from "react";
import './styles.css';

const Reminders = ({ tasks }) => {
  // Filter tasks due within the next 3 days
  const upcoming = tasks.filter((task) => {
    const due = new Date(task.due_date);
    const now = new Date();
    const diffDays = (due - now) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3 && !task.completed;
  });

  return (
    <div className="reminders">
      <h2>⏰ Upcoming Deadlines</h2>
      {upcoming.length === 0 ? (
        <p>No urgent tasks 🎉</p>
      ) : (
        <ul>
          {upcoming.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> — due {task.due_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reminders;
