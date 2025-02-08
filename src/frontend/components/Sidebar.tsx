// src/components/Sidebar.tsx

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLock,
  FaUser,
  FaShareAltSquare,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./Sidebar.css";

// ADDED: Accept a currentUser prop
interface SidebarProps {
  currentUser: any; // or use firebase.auth.User if typed
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide "Open Menu" button if on LandingPage ("/") OR if not logged in
  // but per your request: "Hide while in landing page, show after login"
  const showMenuButton = currentUser && location.pathname !== "/";

  const toggleSidebar = () => setIsOpen(!isOpen);

  // For highlighting active route
  const isActiveLink = (path: string) =>
    location.pathname === path ? "activeLink" : "";

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    // Optionally close the sidebar, then redirect to "/"
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Conditionally render the openMenuButton */}
      {showMenuButton && (
        <button className="openMenuButton" onClick={toggleSidebar}>
          {isOpen ? "Close Menu" : "Open Menu"}
        </button>
      )}

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
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
          <li className={isActiveLink("/sharetask")}>
            <Link to="/sharetask" onClick={toggleSidebar}>
              <FaShareAltSquare style={{ marginRight: "8px" }} />
              Share Task
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

          {/* ADDED: Logout option, only if there's a user */}
          {currentUser && (
            <li onClick={handleLogout}>
              <span style={{ cursor: "pointer" }}>
                <FaSignOutAlt style={{ marginRight: "8px" }} />
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>

      <div
        className={`sidebarOverlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar;
