// App.tsx

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddATask from "./pages/AddATask";
import TaskShareForm from "./pages/ShareATask";
import DeleteATask from "./pages/DeleteATask";
import DisplayTasks from "./pages/DisplayTasks";
import UpdateTasks from "./pages/UpdateATask";
import ViewPrivateTasks from "./pages/ViewPrivate";
import UserProfile from "./pages/UserProfile";
import "./App.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      {/* Wrap EVERYTHING (including the header) inside the .dark-mode/.light-mode container */}
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        {/* Global Header is now inside the dark-mode container */}
        <header className="global-header">
          <img
            src="../src/frontend/assets/logo_no_bg.png"
            alt="TaskAssist Logo"
          />
          <h1>TaskAssist</h1>
          <button id="darkModeToggle" onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <div className="app">
          <Sidebar />

          <main className="content">
            <Routes>
              <Route path="/" element={<DisplayTasks />} />
              <Route path="/tasks" element={<DisplayTasks />} />
              <Route path="/addtask" element={<AddATask />} />
              <Route path="/deletetask" element={<DeleteATask />} />
              <Route path="/updatetask" element={<UpdateTasks />} />
              <Route path="/sharetask" element={<TaskShareForm />} />
              <Route path="/viewprivatetasks" element={<ViewPrivateTasks />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
