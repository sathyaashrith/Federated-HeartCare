import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarTop">
        <h2 className="sidebarLogo">💓 HeartCare</h2>
        <p className="sidebarTag">Federated Health Dashboard</p>
      </div>

      <nav className="sidebarNav">
        <NavLink to="/dashboard" className="navItem">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/predict" className="navItem">
          🩺 Predict
        </NavLink>

        <NavLink to="/history" className="navItem">
          📊 History
        </NavLink>

        <NavLink to="/settings" className="navItem">
          ⚙️ Settings
        </NavLink>
      </nav>

      <div className="sidebarBottom">
        <p className="sidebarFooter">© 2026 HeartCare</p>
      </div>
    </div>
  );
}
