// src/services/taskService.js

const BASE_URL = "http://127.0.0.1:8000/api/tasks/";

// Helper: attach JWT token if available
function getAuthHeaders() {
  const token = localStorage.getItem("access");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

// 🟢 Fetch all tasks
export async function fetchTasks() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }

    const data = await response.json();

    // Normalize response shape
    if (Array.isArray(data)) return data;
    if (data.results && Array.isArray(data.results)) return data.results;
    if (data.tasks && Array.isArray(data.tasks)) return data.tasks;

    console.error("Unexpected tasks response:", data);
    return [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// 🟢 Add a new task
export async function addTask(task) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: task.title,
        description: task.description || "",
        due_date: task.due_date || null,   // must be YYYY-MM-DD
        completed: task.completed || false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error("Failed to add task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

// 🟢 Delete a task
export async function deleteTask(id) {
  try {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

// 🟢 Update a task (toggle completion or edit fields)
export async function updateTask(id, updates) {
  try {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error("Failed to update task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
