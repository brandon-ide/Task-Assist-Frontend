import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button */}
      <button className="openMenuButton" onClick={toggleSidebar}>
        {isOpen ? "Close Menu" : "☰ Open Menu"}
      </button>

      <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              View Tasks
            </Link>
          </li>
          <li>
            <Link to="/addtask" onClick={toggleSidebar}>
              Add Task
            </Link>
          </li>
          <li>
            <Link to="/updatetask" onClick={toggleSidebar}>
              Update Task
            </Link>
          </li>
          <li>
            <Link to="/deletetask" onClick={toggleSidebar}>
              Delete Task
            </Link>
          </li>
          <li>
            <Link to="/viewdeletedtasks" onClick={toggleSidebar}>
              View Deleted Tasks
            </Link>
          </li>
          <li>
            <Link to="/viewprivatetasks" onClick={toggleSidebar}>
              View Private Tasks
            </Link>
          </li>
          <li>
            <Link to="/userprofile" onClick={toggleSidebar}>
              User Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
