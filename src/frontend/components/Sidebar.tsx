import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // Make sure the CSS file is updated accordingly

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Track the sidebar state

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState); // Toggle sidebar visibility
  };

  return (
    <>
    <div className="openMenu">
      <button className="openMenuButton" onClick={toggleSidebar}>Open Menu</button>
    </div>
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? 'Close Menu' : 'Close Menu'}
        </button>
        <ul>
          <li>
            <Link to="/viewdeletedtasks" onClick={toggleSidebar}>View Deleted Tasks</Link>
          </li>
          <li>
            <Link to="/viewprivatetasks" onClick={toggleSidebar}>View Private Tasks</Link>
          </li>
          <li>
            <Link to="/deletetask" onClick={toggleSidebar}>Delete A Task</Link>
          </li>
          <li>
            <Link to="/updatetask" onClick={toggleSidebar}>Update A Task</Link>
          </li>
          <li>
            <Link to="/addtask" onClick={toggleSidebar}>Add A Task</Link>
          </li>
          <li id="userButton">
            <Link to="/userprofile" id="userButton" onClick={toggleSidebar}>User Profile</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;