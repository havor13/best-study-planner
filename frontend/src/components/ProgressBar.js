import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-label">Progress: {Math.round(progress)}%</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
