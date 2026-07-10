import React, { useEffect, useState } from "react";
import { fetchTasks, addTask, deleteTask, updateTask } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }
    loadTasks();
  }, []);

  async function handleAddTask() {
    const newTask = { title: "Study Algorithms", completed: false };
    await addTask(newTask);
    setTasks(await fetchTasks());
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks(await fetchTasks());
  }

  async function handleCompleteTask(id) {
    await updateTask(id, { completed: true });
    setTasks(await fetchTasks());
  }

  return (
    <div>
      <h2>My Tasks</h2>
      <button onClick={handleAddTask}>Add Sample Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.completed ? "✅" : ""}
            <button onClick={() => handleCompleteTask(task.id)}>Mark Done</button>
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
