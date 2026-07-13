import React from "react";
import "../styles.css";

const ProgressBar = ({ completed, total }) => {
  // Prevent division by zero
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Dynamic color based on progress
  let fillColor = "#27ae60"; // green
  if (percentage < 40) fillColor = "#e74c3c"; // red
  else if (percentage < 70) fillColor = "#f39c12"; // orange

  return (
    <div className="progress-container">
      <div className="progress-label">
        {total > 0
          ? `${completed} of ${total} tasks completed (${percentage}%)`
          : "No tasks yet"}
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%`, background: fillColor }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
