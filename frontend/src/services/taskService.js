const API_URL = "https://smart-study-planner-tfp8.onrender.com/api";

export async function fetchTasks() {
  const response = await fetch(`${API_URL}/tasks/`);
  return await response.json();
}

export async function addTask(taskData) {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return await response.json();
}

export async function deleteTask(taskId) {
  await fetch(`${API_URL}/tasks/${taskId}/`, { method: "DELETE" });
}

export async function updateTask(taskId, updatedData) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
}
