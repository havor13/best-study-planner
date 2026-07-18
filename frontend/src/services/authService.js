const API_URL = "https://smart-study-planner-tfp8.onrender.com/api/"; 
// or use your live API: "https://smart-study-planner-tfp8.onrender.com/api"

export async function login(username, password) {
  const response = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const data = await response.json();

  // ✅ Save token in localStorage
  if (data.access || data.token) {
    localStorage.setItem("token", data.access || data.token);
  }

  // ✅ Optionally save user info
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
}
