// ------------------------------------
// File: Sidebar.tsx
// Enhancements:
// 1. Overlay for dimming main content
// 2. Close icon inside the sidebar
// 3. Active link highlighting using useLocation
// 4. Optional icons from react-icons
// ------------------------------------

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// OPTIONAL ICONS (if you want them):
import {
  FaTasks,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Utility function for highlighting current route
  const isActiveLink = (path: string) => {
    return location.pathname === path ? "activeLink" : "";
  };

  return (
    <>
      {/* Button to open or close the sidebar */}
      <button className="openMenuButton" onClick={toggleSidebar}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Off-canvas Sidebar */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* OPTIONAL: Internal close icon in top-right corner */}
        <button className="closeIcon" onClick={toggleSidebar}>
          ✕
        </button>

        <ul>
          {/* Use isActiveLink(...) to highlight whichever route user is on */}
          <li className={isActiveLink("/tasks")}>
            <Link to="/tasks" onClick={toggleSidebar}>
              <FaTasks style={{ marginRight: "8px" }} />
              View Tasks
            </Link>
          </li>
          <li className={isActiveLink("/addtask")}>
            <Link to="/addtask" onClick={toggleSidebar}>
              <FaPlus style={{ marginRight: "8px" }} />
              Add Task
            </Link>
          </li>
          <li className={isActiveLink("/updatetask")}>
            <Link to="/updatetask" onClick={toggleSidebar}>
              <FaEdit style={{ marginRight: "8px" }} />
              Update Task
            </Link>
          </li>
          <li className={isActiveLink("/deletetask")}>
            <Link to="/deletetask" onClick={toggleSidebar}>
              <FaTrash style={{ marginRight: "8px" }} />
              Delete Task
            </Link>
          </li>
          <li className={isActiveLink("/viewprivatetasks")}>
            <Link to="/viewprivatetasks" onClick={toggleSidebar}>
              <FaLock style={{ marginRight: "8px" }} />
              View Private Tasks
            </Link>
          </li>
          <li className={isActiveLink("/userprofile")}>
            <Link to="/userprofile" onClick={toggleSidebar}>
              <FaUser style={{ marginRight: "8px" }} />
              User Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay to dim the screen behind the sidebar */}
      <div
        className={`sidebarOverlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar;
