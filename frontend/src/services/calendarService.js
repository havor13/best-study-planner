// frontend/src/services/calendarService.js

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://best-study-planner.onrender.com"
    : "http://127.0.0.1:8000";

// ✅ Connect Google Calendar (redirects to backend OAuth route)
export function connectGoogleCalendar() {
  window.location.href = `${API_URL}/api/auth/google`;
}

// ✅ Fetch events from backend (after OAuth tokens are stored)
export async function fetchCalendarEvents() {
  const response = await fetch(`${API_URL}/api/calendar/events`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch calendar events");
  }
  return await response.json();
}

// ✅ Add a new study session event
export async function addCalendarEvent(eventData) {
  const response = await fetch(`${API_URL}/api/calendar/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to add calendar event");
  }
  return await response.json();
}
