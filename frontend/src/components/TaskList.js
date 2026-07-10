import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(response => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div>
      <h2>My Study Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
            {task.due_date && <span> (Due: {task.due_date})</span>}
            {task.completed ? " ✅" : " ⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
