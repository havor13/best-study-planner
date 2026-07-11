const API_URL = "https://smart-study-planner-tfp8.onrender.com/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchTasks() {
  const response = await fetch(`${API_URL}/tasks/`, {
    headers: getAuthHeaders(),
  });
  return await response.json();
}

export async function addTask(taskData) {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(taskData),
  });
  return await response.json();
}

export async function deleteTask(taskId) {
  await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}

export async function updateTask(taskId, updatedData) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
}
