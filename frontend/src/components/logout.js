import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{ padding: "8px 16px", margin: "10px" }}>
      Logout
    </button>
  );
}

export default Logout;
