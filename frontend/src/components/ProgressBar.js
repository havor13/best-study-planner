import React from 'react';

const ProgressBar = ({ completed, total }) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="progress-container">
      <div className="progress-label">
        {completed} of {total} tasks completed ({percentage}%)
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
