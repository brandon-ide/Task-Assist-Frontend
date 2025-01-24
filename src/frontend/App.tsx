import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ViewPrivate from './pages/ViewPrivate';
import AddATask from './pages/AddATask';
import DeleteATask from './pages/DeleteATask';
import UpdateATask from './pages/UpdateATask';
import UserProfile from './pages/UserProfile';
import ViewDeleted from './pages/ViewDeleted';

const App: React.FC = () => {

  return (
    <>
      <div className="logoAndGreetingAndProfileImageContainer">
        <img src="../src/assets/logo.png" className="logo" alt="TaskAssistLogo" />
          <p id="dashboardWelcomeMessage">Welcome to your dashboard user!</p>
        <img src="../src/assets/placeholder.jpg" className="userPicture" alt="profileImage" />
      </div>
      
      <div className="taskListDisplayContainer">
        <p>This is where the most up to date task list will be displayed</p> {/*This paragraph is a placeholder */}
      </div>

      {/* <div className="desktopButtonsContainer">
        <button className="desktopButton" id="viewDeletedTasksButton">View Deleted Tasks</button>
        <button className="desktopButton" id="viewPrivateTasksButton">View Private Tasks</button>
        <button className="desktopButton" id="downloadMobileAppButton">Download Mobile App</button>
      </div> */}

      <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/viewdeletedtasks" element={<ViewDeleted />} />
            <Route path="/viewprivatetasks" element={<ViewPrivate />} />
            <Route path="/deletetask" element={<DeleteATask />} />
            <Route path="/updatetask" element={<UpdateATask />} />
            <Route path="/addtask" element={<AddATask />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
};

export default App;
