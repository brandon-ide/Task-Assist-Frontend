import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddATask from "./pages/AddATask";
import DeleteATask from "./pages/DeleteATask";
import DisplayTasks from "./pages/DisplayTasks";
import UpdateATask from "./pages/UpdateATask";
import ViewDeleted from "./pages/ViewDeleted";
import ViewPrivate from "./pages/ViewPrivate";
import UserProfile from "./pages/UserProfile";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      {/* Optional Global Header with logo */}
      <header className="global-header">
        <img src="../src/frontend/assets/logo.png" alt="TaskAssist Logo" />
        <h1>TaskAssist</h1>
      </header>

      <div className="app">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/tasks" element={<DisplayTasks />} />
            <Route path="/addtask" element={<AddATask />} />
            <Route path="/deletetask" element={<DeleteATask />} />
            <Route path="/updatetask" element={<UpdateATask />} />
            <Route path="/viewdeletedtasks" element={<ViewDeleted />} />
            <Route path="/viewprivatetasks" element={<ViewPrivate />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
