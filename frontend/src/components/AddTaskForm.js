import React, { useState } from "react";
import axios from "axios";
import './styles.css';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://smart-study-planner-tfp8.onrender.com/api/tasks/", {
        title,
        description,
        due_date: dueDate,
      });
      onTaskAdded(response.data); // update parent state
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
