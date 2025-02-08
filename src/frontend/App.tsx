// src/App.tsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Sidebar from "./components/Sidebar";
import AddATask from "./pages/AddATask";
import TaskShareForm from "./pages/ShareATask";
import DeleteATask from "./pages/DeleteATask";
import DisplayTasks from "./pages/DisplayTasks";
import UpdateTasks from "./pages/UpdateATask";
import ViewPrivateTasks from "./pages/ViewPrivate";
import UserProfile from "./pages/UserProfile";
import LandingPage from "./pages/LandingPage";

import "./App.css";

const App: React.FC = () => {
  // Keep track of the logged in user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Bring back isDarkMode & toggle function
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Listen to Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Dark Mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      {/* Conditionally apply dark-mode or light-mode to the entire app */}
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <header className="global-header">
          <img
            src="../src/frontend/assets/logo_no_bg.png"
            alt="TaskAssist Logo"
          />
          <h1>TaskAssist</h1>

          {/* If you want the Dark Mode button ALWAYS visible: */}
          <button id="darkModeToggle" onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <div className="app">
          {/*
            Sidebar still gets currentUser, so it can show/hide "Open Menu" 
            and "Logout" appropriately
          */}
          <Sidebar currentUser={currentUser} />

          <main className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/tasks" element={<DisplayTasks />} />
              <Route path="/addtask" element={<AddATask />} />
              <Route path="/deletetask" element={<DeleteATask />} />
              <Route path="/updatetask" element={<UpdateTasks />} />
              <Route path="/sharetask" element={<TaskShareForm />} />
              <Route path="/viewprivatetasks" element={<ViewPrivateTasks />} />
              <Route
                path="/userprofile"
                element={<UserProfile currentUser={currentUser} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
