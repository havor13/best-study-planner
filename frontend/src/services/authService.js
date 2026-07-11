const API_URL = "https://smart-study-planner-tfp8.onrender.com/api";

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.access);
  return data;
}
