import React from 'react';

const TaskList = () => {
  const tasks = [
    { id: 1, title: 'Complete CSE340 Assignment', due: '2026-07-13' },
    { id: 2, title: 'Revise Math Notes', due: '2026-07-14' },
    { id: 3, title: 'Prepare for BYU–Pathway meeting', due: '2026-07-15' }
  ];

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>Due: {task.due}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
